name: Deploy to GitHub Pages

# Builds the Vite app and publishes the compiled dist/ folder to GitHub Pages.
# GitHub Pages only serves static files as-is — it does not run a build step —
# so pushing the raw src/ folder (as this repo currently does) results in a
# blank page. This workflow does the `npm run build` for you on every push.
#
# One-time setup required:
#   1. Repo Settings → Pages → Source → select "GitHub Actions".
#   2. Repo Settings → Secrets and variables → Actions → add these repository
#      secrets (same values as your local .env):
#        VITE_SUPABASE_URL
#        VITE_SUPABASE_ANON_KEY
#        VITE_APP_URL       (e.g. https://<username>.github.io/apl-registration/)
#        VITE_ADMIN_PASSWORD
#   3. Push to main — the workflow below builds and deploys automatically.

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_APP_URL: ${{ secrets.VITE_APP_URL }}
          VITE_ADMIN_PASSWORD: ${{ secrets.VITE_ADMIN_PASSWORD }}

      # GitHub Pages has no server-side rewrites like vercel.json provides,
      # so a direct visit/refresh on /admin would 404. Copying index.html to
      # 404.html is the standard SPA-on-GitHub-Pages fallback: GitHub serves
      # this for any unknown path, and React Router then renders the right
      # screen client-side.
      - run: cp dist/index.html dist/404.html

      - uses: actions/configure-pages@v5

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
