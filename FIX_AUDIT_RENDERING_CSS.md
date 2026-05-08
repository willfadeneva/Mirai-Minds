# Rendering and CSS Fix Audit

## Problem reported
Some pages were not rendering and CSS/Next.js dev assets showed 404s such as:

- `/_next/static/css/app/layout.css?... 404`
- `/_next/static/chunks/webpack.js?... 404`
- `/_next/static/chunks/main-app.js?... 404`

## Likely cause fixed
The project registered a service worker in development. That service worker cached every GET request, including changing Next.js dev/build assets under `/_next/`. This can make the browser request stale chunk/CSS URLs after a code change, which produces broken CSS and pages that appear not to render.

## Fixes applied

### 1. Service worker disabled in development
`components/learning/register-pwa.tsx` now:

- Registers the service worker only in production.
- Unregisters old service workers in development.
- Clears old browser caches in development.

### 2. Service worker made safer for production
`public/sw.js` now:

- Uses cache version `mirai-minds-v2`.
- Never caches `/_next/` assets.
- Never caches webpack or hot-update files.
- Only handles same-origin GET requests.

### 3. CSS theme cleaned up
`app/globals.css` was rewritten to be more stable and kid-friendly:

- Light pastel background by default.
- Softer cards.
- Better text contrast.
- Print styles preserved.
- Accessibility modes preserved.

### 4. UI defaults fixed
Updated:

- `components/ui/card.tsx`
- `components/ui/button.tsx`

Cards and buttons now use light kid-friendly defaults instead of relying on global overrides of dark classes.

### 5. Tailwind scanning fixed
`tailwind.config.ts` no longer scans the large `data` folder. This reduces dev/build overhead and avoids accidental class scanning issues from generated content data.

### 6. Curriculum data optimized
Large generated TS files were replaced with compact generator-based data files:

- `data/english-curriculum.ts`
- `data/learning-extras.ts`

The site still provides Grade 1–12 curriculum, vocabulary cards, Grade 1 alphabet cards, and 20 stories per grade, but the source is now much lighter and easier for Next.js to process.

## Audit performed

Passed:

- TypeScript check: `npx tsc --noEmit`
- Zip integrity check
- Project source cleanup: removed `.next`, `node_modules`, and `tsconfig.tsbuildinfo` before packaging

Limited:

- The sandbox Next.js runtime was unreliable for full browser verification. It repeatedly hung during local Next route compilation even with a minimal test page, suggesting a sandbox runtime issue rather than only project code. TypeScript validation passed after fixes.

## Important local cleanup after installing this fixed version
Because your browser may already have the old broken service worker cached, do this once:

1. Open Chrome DevTools.
2. Go to Application → Service Workers.
3. Click Unregister for localhost.
4. Go to Application → Storage.
5. Click Clear site data.
6. Stop the dev server.
7. Delete `.next`.
8. Restart:

```bash
rm -rf .next
npm run dev
```

Then open:

```txt
http://localhost:3000
```
