import emailjs from '@emailjs/nodejs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin)
    return NextResponse.json(
      { error: 'This request is not allowed.' },
      { status: 403 }
    );
  if (Number(request.headers.get('content-length') || 0) > 24000)
    return NextResponse.json(
      { error: 'Your message is too long.' },
      { status: 413 }
    );
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 24000)
      return NextResponse.json(
        { error: 'Your message is too long.' },
        { status: 413 }
      );
    body = JSON.parse(raw);
    if (!body || typeof body !== 'object' || Array.isArray(body))
      throw new Error('Invalid body');
  } catch {
    return NextResponse.json(
      { error: 'Please send a valid message.' },
      { status: 400 }
    );
  }
  const { name, email, message, website } = body;
  if (website)
    return NextResponse.json(
      { error: 'Unable to accept this message.' },
      { status: 400 }
    );
  if (
    typeof name !== 'string' ||
    name.trim().length < 2 ||
    name.length > 100 ||
    typeof email !== 'string' ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== 'string' ||
    message.trim().length < 10 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { error: 'Please check your name, email and message.' },
      { status: 400 }
    );
  }
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  if (!(serviceId && templateId && publicKey && privateKey))
    return NextResponse.json(
      {
        error:
          'Message delivery is not available yet. Please connect with me on LinkedIn.',
      },
      { status: 503 }
    );
  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        to_email: 'sahansudeepa589@gmail.com',
        from_name: name.trim(),
        reply_to: email.trim(),
        message: message.trim(),
        time: new Intl.DateTimeFormat('en-LK', {
          dateStyle: 'medium',
          timeStyle: 'short',
          timeZone: 'Asia/Colombo',
        }).format(new Date()),
      },
      { publicKey, privateKey }
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('EmailJS delivery failed', error);
    return NextResponse.json(
      {
        error:
          'Your message could not be delivered. Please try again or connect on LinkedIn.',
      },
      { status: 502 }
    );
  }
}
