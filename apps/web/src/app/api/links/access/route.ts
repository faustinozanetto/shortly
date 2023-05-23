import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getLinkFromDatabase } from '@modules/url-shortener/lib/url-shortener-db';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { alias, password } = body;

  try {
    const link = await getLinkFromDatabase({ alias });
    if (!link.password) return NextResponse.json({ message: 'Link does not have password!' }, { status: 400 });

    // Password check
    const passwordMatchs = await bcrypt.compare(password, link.password);

    if (!passwordMatchs) return NextResponse.json({ message: 'Invalid password!' }, { status: 401 });

    return NextResponse.json({ url: link.url }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
