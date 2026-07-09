// Vercel serverless function: commits the edited content.json back to the repo.
// One click in /admin -> this runs -> GitHub commit -> Vercel redeploys -> live.
//
// Required environment variable (set in Vercel -> Project -> Settings -> Environment Variables):
//   GITHUB_TOKEN   fine-grained PAT with "Contents: Read and write" on Shakthe/PORTFOLIO
// Optional (sensible defaults shown):
//   ADMIN_PASSWORD (default "131105")   GITHUB_REPO (default "Shakthe/PORTFOLIO")
//   GITHUB_BRANCH  (default "main")     CONTENT_PATH (default "src/data/content.json")

const GITHUB_API = 'https://api.github.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const expectedPassword = process.env.ADMIN_PASSWORD || '131105';
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || 'Shakthe/PORTFOLIO';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const path = process.env.CONTENT_PATH || 'src/data/content.json';

  // Body is auto-parsed by Vercel when Content-Type is application/json.
  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const { password, content } = body;

  // --- authorize (server-side) ---
  if (password !== expectedPassword) {
    return res.status(401).json({ error: 'Wrong password' });
  }

  // --- validate payload shape ---
  if (!content || !content.hero || !content.about || !Array.isArray(content.projects)) {
    return res.status(400).json({ error: 'Invalid content: expected hero, about and projects.' });
  }

  if (!token) {
    return res.status(500).json({
      error: 'Server not configured: missing GITHUB_TOKEN env var in Vercel.',
    });
  }

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'portfolio-admin',
  };
  const fileUrl = `${GITHUB_API}/repos/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, '/')}`;

  try {
    // 1) Get the current file SHA (required to update an existing file).
    let sha;
    const getRes = await fetch(`${fileUrl}?ref=${encodeURIComponent(branch)}`, {
      headers: authHeaders,
      redirect: 'manual',
    });
    if (getRes.status === 200) {
      const meta = await getRes.json();
      sha = meta.sha;
    } else if (getRes.status !== 404) {
      const t = await getRes.text();
      return res.status(502).json({ error: `GitHub read failed (${getRes.status}): ${t.slice(0, 200)}` });
    }

    // 2) Commit the new content.
    const fileText = JSON.stringify(content, null, 2) + '\n';
    const putRes = await fetch(fileUrl, {
      method: 'PUT',
      headers: { ...authHeaders, 'Content-Type': 'application/json' },
      redirect: 'manual',
      body: JSON.stringify({
        message: 'Update site content via admin panel',
        content: Buffer.from(fileText, 'utf8').toString('base64'),
        branch,
        ...(sha ? { sha } : {}),
      }),
    });

    if (!putRes.ok) {
      const t = await putRes.text();
      return res.status(502).json({ error: `GitHub write failed (${putRes.status}): ${t.slice(0, 200)}` });
    }

    const result = await putRes.json();
    return res.status(200).json({ ok: true, commit: result.commit?.sha ?? null });
  } catch (err) {
    return res.status(500).json({ error: `Publish error: ${err?.message || 'unknown'}` });
  }
}

function safeParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
