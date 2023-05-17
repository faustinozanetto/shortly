import { authOptions } from '@modules/auth/lib/auth.lib';
import { prisma } from '@modules/database/lib/database.lib';
import { updateLinkInRedisStore } from '@modules/url-shortener/lib/url-shortener-db';
import { linkValidationSchema } from '@modules/validations/lib/validations-link';
import { Link } from '@prisma/client';
import { User, getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const routeContextSchema = z.object({
  params: z.object({
    linkId: z.string(),
  }),
});

const getUserHasAccessToResource = async (user: User, linkId: Link['id']) => {
  const count = await prisma.link.count({
    where: {
      id: linkId,
      user: {
        email: user.email,
      },
    },
  });

  return count > 0;
};

export async function PATCH(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const user = session.user;
    // User does not have access to this link
    const hasAccess = await getUserHasAccessToResource(user, params.linkId);
    if (!hasAccess) {
      return new NextResponse(null, { status: 403 });
    }

    // Parse body.
    const json = await req.json();
    const body = linkValidationSchema.parse(json);

    const updatedLink = await prisma.link.update({
      where: {
        id: params.linkId,
      },
      data: {
        ...body,
      },
    });

    await updateLinkInRedisStore({ link: updatedLink });

    return NextResponse.json({ message: 'Link edited successfully!' }, { status: 200 });
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
    const hasAccess = await getUserHasAccessToResource(user, params.linkId);
    if (!hasAccess) {
      return new NextResponse(null, { status: 403 });
    }

    await prisma.link.delete({
      where: { id: params.linkId },
    });

    return NextResponse.json({ message: 'Link deleted successfully!' }, { status: 202 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse('An error occurred!', { status: 500 });
  }
}
