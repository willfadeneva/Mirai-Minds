# Mirai Minds

A free, modern, interactive English-learning MVP for children in Hadano, Kanagawa, Japan.

## What is included

- Next.js App Router + TypeScript
- Tailwind CSS design system
- Framer Motion-ready structure
- shadcn-style reusable UI components
- Responsive pages: Home, About, Programs, Contact, Trial Lesson, Learn, Grade 1–12 detail pages
- Full local English curriculum content in `data/english-curriculum.ts`
- Static instant preview in `preview/index.html`

## English Learning Galaxy content

Every grade from 1 to 12 now includes:

- CEFR-style level and grade badge
- Grade theme and learning outcome
- Zero-start support where appropriate
- Weekly learning rhythm
- 6-week starter scope and sequence
- Lesson modules
- Vocabulary with Japanese meanings
- Grammar / sentence frames
- Original graded story
- Reading comprehension quiz
- Reading library items
- Speaking missions
- Writing prompts
- Interactive puzzle data
- Games and review formats
- Assessment can-do list
- Parent guide
- Creative project

Main editable file:

```txt
/data/english-curriculum.ts
```

## Run the full Next.js app

```bash
cd mirai-minds
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Run the instant static preview

```bash
cd mirai-minds/preview
python3 -m http.server 3000
```

Open:

```txt
http://localhost:3000
```

## Future-ready but not overbuilt

The content is local and data-driven, so you can later connect Supabase, dashboards, progress tracking, AI tutor features, achievements, and parent accounts without changing the content model too much.


## Latest content expansion

Added a larger English-learning content layer for kids starting from zero:

- Grade 1 alphabet flipcards A–Z with emoji picture clues, Japanese meanings, sound clues, and practice missions.
- Vocabulary picture flipcards for every grade level, matched by difficulty from beginner words to B2 academic/professional language.
- 20 reading stories per grade/level, 240 total reading items across Grade 1–12.
- Each expanded story includes a type, level, theme, focus words, text, comprehension questions, answer keys, and a classroom activity.
- New reusable interactive component: `components/learning/learning-extras.tsx`.
- New data file: `data/learning-extras.ts`.

The pictures are currently lightweight emoji placeholders so the MVP stays free and fast. Later, replace them with open-source SVGs or original mascot illustrations.

## Expansion 3: Standalone Free Self-Study Features

Added no-login features for kids learning independently:

- Audio pronunciation for alphabet and vocabulary cards
- Story read-aloud using browser text-to-speech
- Progress stars and badges using localStorage
- Printable worksheets for tracing, vocabulary, and reading
- Placement test to recommend a starting grade
- Parent progress page with local browser progress
- Floating mascot guide: Mimi the Mirai Owl
- Spaced repetition vocabulary review
- Mini games: word matching, memory cards, sentence builder, spelling race

New routes:

```txt
/placement-test
/parent-progress
/games/1 ... /games/12
/review/1 ... /review/12
/worksheets/1 ... /worksheets/12
```

No accounts are required. Progress is stored only in the current browser.

## Expansion 4: standalone free learning platform features

Added the full no-login self-study layer:

- Start Here onboarding
- Daily 15-minute mission
- PWA/offline foundation
- Child-safe privacy page
- Dyslexia-friendly/accessibility mode
- Reward galaxy map
- Kana-to-English beginner support
- Local-only listen-and-repeat voice recorder
- Hadano stories, seasonal Japan lessons, and life-skill English
- Extra games: word maze, story order, rhyming pairs, picture sentence choice
- Parent monthly printable checklist
- Bilingual parent guide
- Mini Grammar Lab
- Local learner profile selector
- Mascot/avatar customization
- Celebration animations

No login, no ads, no tracking, no paid services.

## Latest kid-friendly + Japanese update

This version adds Japanese how-to-use guidance and changes the visual direction to a brighter child-friendly style with pastel backgrounds, colorful cards, and a free SVG learning background. It keeps the site standalone: no login, no ads, no tracking, and local-only progress.

New/updated areas:

- `/how-to-use` bilingual usage guide
- `/start-here` Japanese beginner support
- `/daily-mission` Japanese explanation
- `/placement-test` Japanese explanation
- `/privacy` bilingual safety promises
- Light colorful kid-friendly theme
- `public/assets/kid-learning-bg.svg`

