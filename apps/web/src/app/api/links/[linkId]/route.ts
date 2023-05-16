import { authOptions } from '@modules/auth/lib/auth.lib';
import { prisma } from '@modules/database/lib/database.lib';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const routeContextSchema = z.object({
  params: z.object({
    linkId: z.string(),
  }),
});

export async function DELETE(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response('Unauthorized', { status: 403 });
    }

    const user = session.user;

    const count = await prisma.link.count({
      where: {
        id: params.linkId,
        userId: user.id,
      },
    });

    // User does not have access to this link
    if (count === 0) {
      return new Response(null, { status: 403 });
    }

    await prisma.link.delete({
      where: { id: params.linkId },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
