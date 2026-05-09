import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { InteractivePuzzles, StoryQuiz } from "@/components/learning/interactive-puzzles";
import { LearningExtras } from "@/components/learning/learning-extras";
import { ProgressBadges } from "@/components/learning/progress-badges";
import type { GradeCurriculum } from "@/data/english-curriculum";

function Pill({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/75">{children}</span>;
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="p-5">
      <h3 className="text-xl font-black">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-white/70">
        {items.map((item) => (
          <li key={item}>✦ {item}</li>
        ))}
      </ul>
    </Card>
  );
}

export function GradeDetail({ grade }: { grade: GradeCurriculum }) {
  return (
    <main className="min-h-screen bg-midnight pt-28">
      <Container>
        <section className="rounded-[3rem] bg-gradient-to-br from-aqua/20 via-nebula/20 to-sunbeam/10 p-8 md:p-12">
          <div className="flex flex-wrap gap-3">
            <Pill>Grade {grade.grade}</Pill>
            <Pill>{grade.level}</Pill>
            <Pill>{grade.badge}</Pill>
            {grade.zeroStart && <Pill>Zero-start friendly</Pill>}
          </div>
          <h1 className="mt-5 text-4xl font-black md:text-6xl">{grade.theme}</h1>
          <p className="mt-5 max-w-4xl text-white/75">{grade.outcome}</p>
          <p className="mt-4 max-w-4xl text-aqua">Essential question: {grade.essentialQuestion}</p>
        </section>

        <section className="py-8">
          <ProgressBadges grade={grade.grade} />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Link
              href={`/reading/${grade.grade}`}
              className="rounded-[2rem] bg-white/90 p-6 text-slate-800 shadow-[0_18px_45px_rgba(14,165,233,0.12)] transition hover:-translate-y-1"
            >
              <p className="font-bold text-sky-600">New reading library</p>
              <h3 className="mt-2 text-2xl font-black">30 longer stories</h3>
              <p className="mt-2 text-sm text-slate-600">Popular classic-style readings, slow audio, vocabulary, and comprehension.</p>
            </Link>
            <Link
              href={`/worksheets/${grade.grade}`}
              className="rounded-[2rem] bg-white/90 p-6 text-slate-800 shadow-[0_18px_45px_rgba(14,165,233,0.12)] transition hover:-translate-y-1"
            >
              <p className="font-bold text-amber-600">Printable</p>
              <h3 className="mt-2 text-2xl font-black">Worksheets</h3>
              <p className="mt-2 text-sm text-slate-600">Tracing, vocabulary, and reading practice sheets.</p>
            </Link>
            <Link
              href={`/games/${grade.grade}`}
              className="rounded-[2rem] bg-white/90 p-6 text-slate-800 shadow-[0_18px_45px_rgba(14,165,233,0.12)] transition hover:-translate-y-1"
            >
              <p className="font-bold text-purple-600">Practice</p>
              <h3 className="mt-2 text-2xl font-black">Mini games</h3>
              <p className="mt-2 text-sm text-slate-600">Word matching, memory cards, sentence builder, and spelling.</p>
            </Link>
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-black">Weekly rhythm</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-5">
            {grade.weeklyPlan.map((x, i) => (
              <Card key={x} className="p-4">
                <p className="text-2xl font-black text-sunbeam">{i + 1}</p>
                <p className="mt-2 text-sm text-white/70">{x}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-10">
          <h2 className="text-3xl font-black">6-week starter scope</h2>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {grade.scopeSequence.map((unit) => (
              <Card key={unit.title} className="p-5">
                <p className="text-sm text-aqua">Week {unit.week}</p>
                <h3 className="mt-2 text-2xl font-black">{unit.title}</h3>
                <p className="mt-2 text-white/70">{unit.focus}</p>
                <p className="mt-3 text-sm text-sunbeam">Teacher goal: {unit.teacherGoal}</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="font-bold">Student can</p>
                    <ul className="mt-2 space-y-1 text-sm text-white/65">
                      {unit.studentCan.map((x) => <li key={x}>• {x}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold">Activities</p>
                    <ul className="mt-2 space-y-1 text-sm text-white/65">
                      {unit.activities.map((x) => <li key={x}>• {x}</li>)}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-10">
          <h2 className="text-3xl font-black">Lesson modules</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {grade.modules.map((m) => (
              <Card key={m.title} className="p-5">
                <h3 className="text-2xl font-black">{m.title}</h3>
                <p className="mt-2 text-white/65">{m.focus}</p>
                <p className="mt-4 text-sm text-sunbeam">Mini lesson: {m.miniLesson}</p>
                <div className="mt-4 flex flex-wrap gap-2">{m.skills.map((s) => <Pill key={s}>{s}</Pill>)}</div>
                <p className="mt-5 text-aqua">Vocabulary</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {m.vocabulary.map((v) => (
                    <div key={v.en} className="rounded-2xl bg-white/10 p-3 text-sm">
                      <b>{v.en}</b> / {v.ja}
                      <p className="mt-1 text-white/50">{v.example}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-aqua">Grammar / sentence frames</p>
                <ul className="mt-2 list-inside list-disc text-sm text-white/65">
                  {m.grammar.map((g) => <li key={g}>{g}</li>)}
                </ul>
                <p className="mt-5 text-aqua">Class activities</p>
                <ul className="mt-2 list-inside list-disc text-sm text-white/65">
                  {m.activities.map((a) => <li key={a}>{a}</li>)}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <LearningExtras grade={grade.grade} />

        <section className="py-10">
          <h2 className="mb-5 text-3xl font-black">Interactive puzzles</h2>
          <InteractivePuzzles grade={grade} />
        </section>

        <section className="py-10">
          <StoryQuiz grade={grade} />
        </section>

        <section className="py-10">
          <h2 className="text-3xl font-black">Reading library</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {grade.readingLibrary.map((item) => (
              <Card key={item.title} className="p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-aqua">{item.type}</p>
                <h3 className="mt-2 text-2xl font-black">{item.title}</h3>
                <p className="mt-3 text-white/70">{item.summary}</p>
                <ul className="mt-4 space-y-1 text-sm text-white/60">
                  {item.tasks.map((task) => <li key={task}>• {task}</li>)}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-5 py-10 md:grid-cols-2">
          <ListBlock title="Speaking missions" items={grade.speakingMissions} />
          <ListBlock title="Writing prompts" items={grade.writingPrompts} />
        </section>

        <section className="py-10">
          <h2 className="text-3xl font-black">Games and puzzle formats</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {grade.games.map((game) => (
              <Card key={game.title} className="p-5">
                <p className="text-sm text-aqua">{game.kind}</p>
                <h3 className="mt-2 text-xl font-black">{game.title}</h3>
                <p className="mt-3 text-sm text-white/70">{game.howToPlay}</p>
                <div className="mt-4 flex flex-wrap gap-2">{game.content.map((x) => <Pill key={x}>{x}</Pill>)}</div>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-5 py-12 md:grid-cols-3">
          <Card className="p-6 md:col-span-2">
            <h2 className="text-3xl font-black">Creative project</h2>
            <p className="mt-3 text-white/70">{grade.project}</p>
            <h3 className="mt-6 text-xl font-black">Assessment</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {grade.assessment.canDo.map((x) => <li key={x}>✦ {x}</li>)}
            </ul>
            <p className="mt-4 text-sm text-aqua">{grade.assessment.reviewCycle}</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-black">Parent guide</h2>
            <p className="mt-3 text-white/70">{grade.parentGuide}</p>
          </Card>
        </section>
      </Container>
    </main>
  );
}
