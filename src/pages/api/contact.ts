import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let senderEmail: string;
  let subject: string;
  let message: string;

  try {
    const body = await request.json();
    senderEmail = (body?.senderEmail ?? '').trim().toLowerCase();
    subject = (body?.subject ?? '').trim();
    message = (body?.message ?? '').trim();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  if (!senderEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
    return json({ error: 'Please enter a valid email address.' }, 400);
  }
  if (!subject) {
    return json({ error: 'Subject is required.' }, 400);
  }
  if (!message || message.length < 10) {
    return json({ error: 'Message must be at least 10 characters.' }, 400);
  }

  const apiKey = import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json({ error: 'Server misconfiguration.' }, 500);
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: "Debesh's Blog <onboarding@resend.dev>",
      to: ['mail2debesh@gmail.com'],
      reply_to: [senderEmail],
      subject: `[Contact] ${subject}`,
      text: `From: ${senderEmail}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return json({ error: (err as { message?: string }).message ?? 'Failed to send message.' }, 500);
  }

  return json({ success: true });
};

function json(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
