const prerender = false;
const POST = async ({ request }) => {
  let email;
  try {
    const body = await request.json();
    email = (body?.email ?? "").trim().toLowerCase();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }
  {
    return json({ error: "Server misconfiguration." }, 500);
  }
};
function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
