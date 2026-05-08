# Mirai Minds Feature Expansion 4

Added the full no-login standalone feature set for a free self-study English platform.

## New pages

- `/start-here` — beginner onboarding for zero English, ABC learners, story readers, and older students.
- `/daily-mission` — daily 15-minute self-study mission with local completion stars.
- `/privacy` — child-safe privacy promise: no login, no ads, no tracking, no public profiles.
- `/accessibility` — dyslexia-friendly reading controls: larger text, high contrast, reduced motion, extra spacing.
- `/reward-map` — reward galaxy map unlocked by local progress stars.
- `/kana-english` — kana-to-English beginner sound bridge for Japanese learners.
- `/speaking-practice` — listen-and-repeat phrases plus local-only voice recorder.
- `/stories` — Hadano-themed stories, seasonal Japan lessons, and life-skill English.
- `/extra-games` — word maze, story order, rhyming pairs, and picture sentence choice.
- `/parent-checklist` — printable monthly parent checklist.
- `/parent-guide` — bilingual English/Japanese parent guide.
- `/grammar-lab` — visual grammar patterns from Grade 1 to Grade 12.

## New components

- `components/learning/client-learning-tools.tsx`
  - Local profile selector
  - Avatar / mascot picker
  - Accessibility panel
  - Daily mission board
  - Reward galaxy
  - Celebration button
  - Local-only voice recorder
- `components/learning/register-pwa.tsx`
  - Registers the service worker for offline/PWA support
- `components/sections/standalone-features.tsx`
  - Homepage section linking to the new standalone learning tools

## New data

- `data/free-features.ts`
  - Daily mission steps
  - Reward planets
  - Kana bridge cards
  - Hadano stories
  - Seasonal Japan lessons
  - Life-skill English phrases
  - Mini grammar lab
  - Extra game content

## PWA / offline support

- `public/manifest.webmanifest`
- `public/sw.js`
- `public/icon.svg`

The service worker caches core pages and assets. This is a simple free PWA foundation, not an overengineered offline database.

## Privacy model

The project remains standalone and no-login. Progress, avatar, accessibility settings, daily mission state, and review progress use browser localStorage only.

## Voice update

- Browser text-to-speech now prefers female-sounding English voices when the browser/device provides them.
- Default speaking speed is slower for children starting from zero English.
- Default button label changed to “Slow listen”.
- Voice settings are centralized in `components/learning/audio-tools.tsx` for easy tuning.
