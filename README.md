# 💼 Shakthevell M — Portfolio Website

Welcome to my personal portfolio website!  
This site showcases my projects, skills, education, and experience as a B.Tech IoT undergraduate with a passion for software and hardware development.

🌐 **Live Site**: [shakthe.vercel.app](https://shakthe.vercel.app/)

---

## 📌 About This Project

This is a fully responsive, modern portfolio website built to reflect my personal brand and technical capabilities.  
It includes:

- Introduction and short bio
- Project highlights with tech stack
- Skills and tools used
- Educational background
- Downloadable resume/CV
- Contact information

---

## 🛠️ Built With

- **React.js**
- **Tailwind CSS**
- **Vite** 
- **Vercel** (for deployment)

---

🚀 Deployment
The website is deployed using Vercel.
You can also run this locally using :
npm install
npm run dev

---

## ✏️ Editing content (no code needed)

All the text and projects live in **`src/data/content.json`**. The site reads from it,
so you never have to touch the components to change your bio or add a project.

There's a built-in editor at **`/admin`** (e.g. `https://shakthe.vercel.app/admin`):

1. Go to `/admin` and enter the password.
2. Edit hero/about text or manage projects — **Add project** puts a new one at the **top**;
   you can edit, delete, reorder (↑/↓), star to feature (large card), or hide any project.
3. Changes preview live on the site instantly (saved in your browser only).
4. Click **Publish** → it commits `content.json` for you → Vercel redeploys → live for everyone in ~30s.

**Fallback without Publish:** click **Export** to download `content.json`, then replace the file
at `src/data/content.json` in GitHub and commit — same result.

### One-time setup for the Publish button

The Publish button needs a GitHub token so it can commit for you. In the browser:

1. **Create a token** — GitHub → Settings → Developer settings → *Fine-grained tokens* → *Generate new token*.
   - Repository access: **Only select repositories → `Shakthe/PORTFOLIO`**
   - Permissions: **Repository permissions → Contents → Read and write**
   - Generate and copy the token.
2. **Add it to Vercel** — Vercel → your project → Settings → *Environment Variables*:
   - `GITHUB_TOKEN` = the token you just copied
   - (optional) `ADMIN_PASSWORD` = your admin password (defaults to the one baked into the app)
3. **Redeploy** once so the env var takes effect. Done — Publish now works.

> The token lives only in Vercel (server-side) and is never shipped to the browser.
> The `/admin` password is a light gate; real protection for publishing is the server-side check.

