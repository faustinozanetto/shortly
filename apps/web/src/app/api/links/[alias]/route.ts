import { authOptions } from '@modules/auth/lib/auth.lib';
import { prisma } from '@modules/database/lib/database.lib';
import { removeLinkFromRedis, setLinkInRedis } from '@modules/redis/lib/redis.lib';
import { getLinkFromDatabase } from '@modules/url-shortener/lib/url-shortener-db';

import { linkValidationSchema } from '@modules/validations/lib/validations-link';
import { Link } from '@prisma/client';
import { User, getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const routeContextSchema = z.object({
  params: z.object({
    alias: z.string(),
  }),
});

const getUserHasAccessToResource = async (user: User, alias: Link['id']) => {
  const count = await prisma.link.count({
    where: {
      alias,
      user: {
        email: user.email,
      },
    },
  });

  return count > 0;
};

export async function GET(req: NextRequest) {
  try {
    const alias = req.nextUrl.pathname.split('/')[3];
    const link = await getLinkFromDatabase({ alias });
    return NextResponse.json({ link }, { status: 200 });
  } catch (error) {
    return new NextResponse('An error occurred!', { status: 404 });
  }
}

export async function PATCH(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const user = session.user;
    // User does not have access to this link
    const hasAccess = await getUserHasAccessToResource(user, params.alias);
    if (!hasAccess) {
      return new NextResponse(null, { status: 403 });
    }

    // Parse body.
    const json = await req.json();
    const { alias, url, expiresAt, password } = linkValidationSchema.parse(json);

    let hashedPassword: string | undefined = undefined;
    // Hash password
    if (password) hashedPassword = await bcrypt.hash(password, 10);

    const updatedLink = await prisma.link.update({
      where: {
        alias: params.alias,
      },
      data: {
        alias,
        url,
        expiresAt,
        password: hashedPassword,
      },
    });

    await setLinkInRedis({ link: updatedLink });

    return NextResponse.json({ message: 'Link edited successfully!', updatedLink }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }
    return new NextResponse('An error occurred!', { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const user = session.user;
    // User does not have access to this link
    const hasAccess = await getUserHasAccessToResource(user, params.alias);
    if (!hasAccess) {
      return new NextResponse(null, { status: 403 });
    }

    await prisma.link.delete({
      where: { alias: params.alias },
    });

    await removeLinkFromRedis({ alias: params.alias });

    return NextResponse.json({ message: 'Link deleted successfully!' }, { status: 202 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse('An error occurred!', { status: 500 });
  }
}
