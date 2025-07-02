// src/app/api/subscribe/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    // This is where you would typically add the email to a database
    // or a mailing list service (like Mailchimp).
    // For this demo, we will just log it to the server console.
    console.log(`New subscriber: ${email}`);

    return NextResponse.json({ message: 'Success! You are now subscribed.' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}