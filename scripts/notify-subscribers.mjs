import { Resend } from 'resend';

const {
  RESEND_API_KEY,
  RESEND_AUDIENCE_ID,
  NEW_POST_TITLE,
  NEW_POST_SLUG,
  SITE_URL,
} = process.env;

if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID || !NEW_POST_TITLE || !NEW_POST_SLUG || !SITE_URL) {
  console.error('Missing required environment variables.');
  process.exit(1);
}

const postUrl = `${SITE_URL.replace(/\/$/, '')}/blog/${NEW_POST_SLUG}/`;

const resend = new Resend(RESEND_API_KEY);

const { data: audienceData, error: listError } = await resend.contacts.list({
  audienceId: RESEND_AUDIENCE_ID,
});

if (listError) {
  console.error('Failed to fetch subscribers:', listError.message);
  process.exit(1);
}

const contacts = (audienceData?.data ?? []).filter((c) => !c.unsubscribed);

if (contacts.length === 0) {
  console.log('No subscribers to notify.');
  process.exit(0);
}

console.log(`Sending notification to ${contacts.length} subscriber(s)...`);

let sent = 0;
let failed = 0;

for (const contact of contacts) {
  const { error } = await resend.emails.send({
    from: "Debesh's Blog <onboarding@resend.dev>",
    to: contact.email,
    subject: `New post: ${NEW_POST_TITLE}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ede8;font-family:'Segoe UI',sans-serif;color:#151112;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #a7a2a5;border-radius:12px;overflow:hidden;max-width:100%;">
        <tr>
          <td style="background:linear-gradient(180deg,#2d2a2c 0%,#161417 100%);padding:32px 32px 24px;color:#f2f2f2;">
            <p style="margin:0 0 8px;font-family:monospace;font-size:0.7rem;letter-spacing:0.18em;text-transform:uppercase;opacity:0.7;">New Post</p>
            <h1 style="margin:0;font-size:clamp(1.6rem,4vw,2.2rem);line-height:1.05;letter-spacing:-0.03em;">${NEW_POST_TITLE}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 32px;">
            <p style="margin:0 0 24px;font-size:1rem;line-height:1.55;color:#383336;">
              A new post just went live on Debesh's Blog. Click below to read it.
            </p>
            <a href="${postUrl}" style="display:inline-block;background:#130f11;color:#f6f4f2;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:600;font-size:0.9rem;letter-spacing:0.04em;">
              Read Now →
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;border-top:1px solid #a7a2a5;">
            <p style="margin:0;font-family:monospace;font-size:0.72rem;color:#a7a2a5;">
              You're receiving this because you subscribed at <a href="${SITE_URL}" style="color:#a7a2a5;">${SITE_URL.replace(/https?:\/\//, '')}</a>.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });

  if (error) {
    console.error(`  ✗ ${contact.email}: ${error.message}`);
    failed++;
  } else {
    console.log(`  ✓ ${contact.email}`);
    sent++;
  }
}

console.log(`\nDone. ${sent} sent, ${failed} failed.`);
if (failed > 0) process.exit(1);
