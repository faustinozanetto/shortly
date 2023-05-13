import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@shortly/database';

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  console.log({ body });

  const hash = nanoid(15);

  const link = await prisma.link.create({
    data: {
      hash,
      url: body.link,
    },
  });

  console.log({ link });

  return NextResponse.json({ hash });
};
