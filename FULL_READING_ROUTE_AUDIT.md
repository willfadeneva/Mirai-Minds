# Mirai Minds Reading Library + Route Fix Audit

## Added

- New `/reading` index page.
- New `/reading/[grade]` route for Grade 1 through Grade 12.
- Added 30 longer reading stories per grade.
- Total reading stories added: 360.
- Added read-aloud support for each longer story.
- Added vocabulary chips, comprehension checks, and after-reading activities.
- Added Japanese guidance text on the reading pages.
- Added links from each grade page to the new reading library.
- Added `Reading` to the main navigation.

## Story style

The reading library uses public-domain adapted / classic-inspired titles and original learning rewrites. These are not copied verbatim from copyrighted books. They are simplified or expanded for English learning.

## Fixed previous error

Moved `makeProgressId()` into `lib/progress.ts` so server components can safely import it.

Updated:

- `lib/progress.ts`
- `hooks/use-learning-progress.ts`
- `app/worksheets/[grade]/page.tsx`
- `app/review/[grade]/page.tsx`
- `components/learning/review-client.tsx`

Expected:

- `/worksheets/1` works.
- `/review/1` works.
- `/review/abc` returns 404.

## New files

- `data/reading-library.ts`
- `components/learning/reading-library-client.tsx`
- `app/reading/page.tsx`
- `app/reading/[grade]/page.tsx`
- `lib/progress.ts`

## Updated files

- `data/site.ts`
- `components/learning/grade-detail.tsx`
- `hooks/use-learning-progress.ts`
- `app/worksheets/[grade]/page.tsx`
- `app/review/[grade]/page.tsx`

## Checks run

- `npm install --ignore-scripts --no-audit --no-fund` completed.
- `./node_modules/.bin/tsc --noEmit` passed with no TypeScript errors.
- `npm run build` compiled successfully and TypeScript passed, but the sandbox command timed out during Next page-data collection. No code error was shown before timeout.

## Recommended local check

Run locally:

```bash
cd /home/cj/mirai-minds
rm -rf .next
npm install
npm run dev
```

Then test:

```txt
http://localhost:3001/reading
http://localhost:3001/reading/1
http://localhost:3001/reading/12
http://localhost:3001/reading/abc
http://localhost:3001/worksheets/1
http://localhost:3001/review/1
http://localhost:3001/review/abc
```

Expected:

```txt
/reading → 200
/reading/1 → 200
/reading/12 → 200
/reading/abc → 404
/worksheets/1 → 200
/review/1 → 200
/review/abc → 404
```

## Dev server route audit actually run in sandbox

The dev server was started with `npm run dev` and the following URLs were checked using curl:

```txt
200 /
200 /start-here
200 /learn
200 /reading
200 /reading/1
200 /reading/12
404 /reading/abc
200 /worksheets/1
200 /review/1
404 /review/abc
200 /games/1
200 /how-to-use
200 /privacy
200 /parent-progress
200 /placement-test
```

This confirms the specific reported worksheet issue is fixed and the new reading routes work in development.
