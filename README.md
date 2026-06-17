# CrudStudio — Next.js + MongoDB

Brutalist monochrome agency site for [CrudStudio](https://crudstudio.com). Single landing page, dynamic project case studies, and a custom admin panel — all on your own stack.

## Stack

- **Next.js 15** (App Router, RSC, ISR)
- **MongoDB** + Mongoose
- **Tailwind CSS** + custom CSS for brutalist visuals
- **JWT auth** via `jose` (edge-compatible, httpOnly cookies)
- **TypeScript**

## What's inside

```
app/
├── page.tsx                  → Landing page (hero, services, work, stack, process, industries, contact)
├── work/
│   ├── page.tsx              → Public archive — all published projects, grouped by year
│   └── [slug]/page.tsx       → Project detail / case study pages
├── admin/                    → Custom admin panel (login, projects CRUD, leads inbox)
│   ├── login/
│   ├── projects/
│   │   ├── new/
│   │   └── [id]/             → Edit
│   └── leads/                → Inbound contact submissions
│       └── [id]/             → View, set status, add notes, reply
├── api/
│   ├── projects/             → GET/POST/PUT/DELETE projects
│   ├── leads/                → GET list, PATCH status/notes, DELETE
│   ├── auth/                 → login / logout
│   └── contact/              → Public contact form submissions
components/                   → Hero, Services, Showcase, Stack, etc.
models/                       → Project, User, Contact (Mongoose schemas)
lib/                          → db.ts, auth.ts
middleware.ts                 → Protects /admin and mutating /api/projects + all /api/leads
scripts/seed.mjs              → Creates first admin user + 5 starter projects
```

## Setup (5 minutes)

### 1. Install dependencies

```bash
npm install
```

### 2. Set up MongoDB

Either:
- **Local**: install MongoDB and use `mongodb://localhost:27017/crudstudio`
- **Atlas (free)**: create a cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas), get the connection string

### 3. Create `.env.local`

```bash
cp .env.example .env.local
```

Edit it:

```env
MONGODB_URI=mongodb://localhost:27017/crudstudio
AUTH_SECRET=<run: openssl rand -base64 32>
ADMIN_EMAIL=admin@crudstudio.com
ADMIN_PASSWORD=changeme123
```

### 4. Seed the database

```bash
npm run seed
```

This creates your admin user and 5 starter projects (ReloadedMens + 4 others).

### 5. Run it

```bash
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin (sign in with the credentials from step 3)

## Admin panel

### Projects
- `/admin/projects` — list, edit, delete
- `/admin/projects/new` — create
- Each project has: title, slug, tagline, year, client, industry, stack, visual style, layout, featured flag, published flag, body (markdown), and a results array
- Visual styles: `reloaded`, `realty`, `lms`, `saas`, `crm`, `custom` — pure CSS treatments, no image upload needed for the demo
- Layout: `featured` (full width), `half` (2-col), `third` (3-col)

### Leads
- `/admin/leads` — inbound contact form submissions, filtered by status tabs (All / New / Contacted / Qualified / Archived) with live counts
- `/admin/leads/[id]` — view full message, update status (auto-saves), add internal notes, and click "Reply by email" to open the visitor's email pre-filled in your mail client
- Submissions stay immutable — only `status` and `notes` are editable. Deletion is available but confirmed.

## Public pages

- `/` — landing page with featured 5 projects in the showcase
- `/work` — archive of all published projects, grouped by year
- `/work/[slug]` — individual project case study

## Adding image uploads later

The visual treatments are intentionally pure CSS so you can ship without an image pipeline. When you're ready for real screenshots, add an `imageUrl` field to the Project schema and either:
- Upload to **Cloudinary** (free tier, generous) — `npm i cloudinary`
- Upload to **S3 / R2** with a signed-URL endpoint
- Use **Vercel Blob** if deploying to Vercel — `npm i @vercel/blob`

Then replace `visual-${visualStyle}` in `components/Showcase.tsx` with `<Image src={p.imageUrl} ... />`.

## Deployment

### Vercel (recommended)
1. Push to GitHub
2. Import on Vercel
3. Add the same env vars in Vercel settings
4. Deploy

### Other hosts
Any host that supports Node 20+ and standalone Next builds. Run `npm run build` and `npm start`.

## Notes

- The site uses ISR (revalidate every 60s) so admin edits show up within a minute. For instant updates, change `export const revalidate = 60` to `0` in `app/page.tsx` and `app/work/[slug]/page.tsx` (uses dynamic rendering instead).
- The contact form saves submissions to MongoDB (Contact collection). To get email notifications, add Resend or Postmark to `app/api/contact/route.ts` where the `// TODO` is.
- The cursor and reveal animations are CSS + a tiny IntersectionObserver — no heavy animation library.

---

Built by CrudStudio · Independent product studio · GMT+5:30
