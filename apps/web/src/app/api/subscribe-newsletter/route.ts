import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { email } = body;

  if (!email) {
    return NextResponse.json({ message: `Email is required!` }, { status: 400 });
  }

  try {
    const requestBody = JSON.stringify({
      email_address: email,
      status: 'subscribed',
    });

    // Create fetch to mailchimp endpoint
    const response = await fetch(
      `https://${process.env.MAILCHIMP_REGION_ID}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: requestBody,
      }
    );

    if (response.status >= 400) {
      return NextResponse.json({ message: 'An error occurred while subscribing to the newsletter!' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Subscribed to the newsletter!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
