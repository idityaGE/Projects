import { Resend } from 'resend';
import { EmailTemplate } from '@/components/ui/email-template';
import { NextRequest, NextResponse } from 'next/server';

const rateLimitStore = new Map();

const resend = new Resend(process.env.RESEND_API_KEY);

function isRateLimited(ip: string) {
  const now = Date.now();
  const limit = 5; // Number of requests allowed
  const windowMs = 60 * 1000; // 1-minute window
  const userData = rateLimitStore.get(ip) || { count: 0, lastRequest: now };
  if (now - userData.lastRequest > windowMs) {
    rateLimitStore.set(ip, { count: 1, lastRequest: now });
    return false;
  }
  if (userData.count < limit) {
    rateLimitStore.set(ip, { count: userData.count + 1, lastRequest: now });
    return false;
  }
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: 'Too many requests, please try again later.' },
      { status: 429 }
    );
  }

  const { firstname, lastname, email, message } = await req.json();

  try {
    const { error } = await resend.emails.send({
      from: `Acme <onboarding@resend.dev>`,
      to: ['adityasingh6574@gmail.com'],
      subject: 'Welcome',
      react: EmailTemplate({
        firstname,
        lastname,
        email,
        message,
      }),
    });

    if (error) {
      console.log('Contact form submission error: ', error);
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Email sent successfully' }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.log('Contact form submission error: ', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
