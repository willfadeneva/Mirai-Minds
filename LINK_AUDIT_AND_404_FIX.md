# Mirai Minds Link Audit + 404 Fix

## What was wrong

After upgrading to Next.js 16 / React 19, dynamic route params are delivered as a Promise.

The old dynamic pages used this older style:

```tsx
export default function Page({ params }: { params: { grade: string } }) {
  const grade = params.grade;
}
```

In Next.js 16 this can make `params.grade` undefined on routes such as:

- `/learn/1`
- `/games/1`
- `/review/1`
- `/worksheets/1`

When the grade value becomes undefined, the app can call `notFound()` and show a 404 even though the page file exists.

## Fixed dynamic routes

Updated these pages to use Next.js 16-safe params:

- `app/learn/[grade]/page.tsx`
- `app/games/[grade]/page.tsx`
- `app/worksheets/[grade]/page.tsx`
- `app/review/[grade]/page.tsx`

Server route pages now await params:

```tsx
export default async function Page({ params }: { params: Promise<{ grade: string }> }) {
  const { grade } = await params;
}
```

The client review page now unwraps params with React `use()`.

## Other cleanup

- Added `data-scroll-behavior="smooth"` to the `<html>` tag to remove the Next.js smooth-scroll warning.
- Added `turbopack.root` in `next.config.mjs` so Next.js uses the project folder as the root and stops getting confused by lockfiles outside the project.

## Route inventory checked

Static pages:

- `/`
- `/about`
- `/accessibility`
- `/contact`
- `/daily-mission`
- `/extra-games`
- `/grammar-lab`
- `/how-to-use`
- `/kana-english`
- `/learn`
- `/parent-checklist`
- `/parent-guide`
- `/parent-progress`
- `/placement-test`
- `/privacy`
- `/programs`
- `/reward-map`
- `/speaking-practice`
- `/start-here`
- `/stories`
- `/trial-lesson`

Dynamic grade pages:

- `/learn/1` through `/learn/12`
- `/games/1` through `/games/12`
- `/review/1` through `/review/12`
- `/worksheets/1` through `/worksheets/12`

Key links from `/start-here` checked:

- `/learn/1`
- `/learn/2`
- `/learn/3`
- `/learn/5`
- `/placement-test`

## Local reset commands after replacing files

Run this after extracting the fixed zip:

```bash
cd /home/cj/mirai-minds
rm -rf .next
npm install
npm run dev
```

If you previously had service-worker caching issues, also clear site data once in Chrome DevTools:

Application → Storage → Clear site data

