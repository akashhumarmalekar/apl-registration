# 🏏 Anand Premier League — Registration PWA

A mobile-first registration app for the Anand Premier League cricket tournament. Players scan a QR code, fill in a short form, and are saved instantly to a database. You get a password-protected admin dashboard with live updates, search, sorting, deletion, and one-click Excel export.

**Event:** 14 September 2026 · 4:30 PM onwards · 9 Star Turf

**Stack note:** the backend is **Supabase** (a hosted Postgres database), chosen specifically because its free tier never asks for a credit card — unlike Firebase, which now requires a linked billing account to create a Firestore database even while staying within the free quota.

---

## What's inside

```
src/
  components/        HeroSection, RegistrationForm, SuccessModal, LoadingSpinner,
                      InstallPrompt, AdminLogin, AdminDashboard, RegistrationTable,
                      QRCodeDisplay
  pages/              Home.jsx (public form)  ·  Admin.jsx (/admin)
  services/           registrationService.js (Supabase CRUD + Realtime)
                      exportService.js (Excel export)
                      qrService.js (QR code generation)
  utils/              validation.js
  supabase/           config.js (Supabase client, reads env vars)
  styles/             tokens.css + per-feature CSS files
public/
  manifest.json, sw.js, offline.html, icons/   → PWA assets
vercel.json, schema.sql, .env.example
```

## 1. Create a free Supabase project (no card required)

1. Go to [supabase.com](https://supabase.com) → **Start your project** → sign in with GitHub or email.
2. Click **New project**. Pick any name and a region close to you, set a database password (you won't need it for this app — Supabase generates it for direct Postgres access only), and click **Create new project**. Takes about 1–2 minutes to spin up.
3. Once it's ready, open **SQL Editor** (left sidebar) → **New query**, paste in the entire contents of `schema.sql` from this project, and click **Run**. This creates the `registrations` table, its validation rules, and turns on Realtime.
4. Go to **Project Settings → API**. You'll need two values from this page in the next step:
   - **Project URL**
   - **anon / public** key (NOT the `service_role` key — never put that one in client code)

## 2. Configure environment variables

Copy `.env.example` to `.env` and fill in:

- `VITE_SUPABASE_URL` — your Project URL from step 1.
- `VITE_SUPABASE_ANON_KEY` — your anon/public key from step 1.
- `VITE_APP_URL` — leave blank for now; you'll set it after your first deploy (it's only used to build the QR code).
- `VITE_ADMIN_PASSWORD` — pick a password for the `/admin` dashboard.

## 3. Run locally

```bash
npm install
npm run dev
```

Open the printed local URL, fill in the form, and confirm a row appears in Supabase → **Table Editor → registrations**.

## 4. Deploy to Vercel

```bash
npm install -g vercel    # if you don't have it
vercel
```

Or connect the repo in the Vercel dashboard. Either way, **add the same variables from your `.env` as Environment Variables** in the Vercel project settings (Settings → Environment Variables), then redeploy.

Once you have your live URL (e.g. `https://anand-premier-league.vercel.app`), set `VITE_APP_URL` to that value in Vercel's environment variables and redeploy once more — this is what the QR code on `/admin` will point to.

## 5. Get your QR code

1. Visit `https://your-app-url.vercel.app/admin` on your phone.
2. Log in with your `VITE_ADMIN_PASSWORD`.
3. Scroll to **Scan to register** and tap **Download QR**, or just display it on your screen for players to scan.

## Using the app

- **Players**: scan the QR (or visit the URL), fill in first name, last name, playing role, and 10-digit contact number, and tap **Register Me**. Duplicate contact numbers are rejected (enforced at the database level via a unique constraint, so it's safe even if two people submit the same number at the same instant). A success popup confirms registration and clears the form.
- **You (organizer)**: visit `/admin`, enter the password, and you'll see live registration counts by role, a searchable/sortable table, delete (with confirmation), and **Export to Excel**.

## PWA install

On a supported mobile browser, visiting the site shows an **Install APL Registration** banner (or use the browser's "Add to Home Screen" menu). The app then opens full-screen like a native app and keeps working offline for previously-visited pages.

## Staying on the free tier

Supabase's free tier needs no card and includes 500MB database storage and unlimited API requests — vastly more than a single tournament's registrations will ever use. The one thing to know: **a free project pauses itself after 7 days with no database activity**, and you just click **Resume** in the Supabase dashboard to bring it back — nothing is lost. If your event is more than a week away, it's worth opening the app once a week (or just remember to un-pause it the morning of the tournament).

## Notes on the admin password

`VITE_ADMIN_PASSWORD` is bundled into the client JavaScript at build time, so it's a friendly gate rather than a cryptographic guarantee — fine for keeping casual visitors off the tournament desk view of a single weekend event. If you reuse this for an ongoing, multi-organizer system, swap it for Supabase Auth and tighten the Row Level Security policies in `schema.sql` accordingly (the file has a comment showing exactly where to change).

## Tech stack

React 18 + Vite · Supabase (Postgres + Realtime) · `qrcode` · `xlsx` (SheetJS) · React Router · hand-written service worker (no build plugin) for full control over caching and the offline page.
