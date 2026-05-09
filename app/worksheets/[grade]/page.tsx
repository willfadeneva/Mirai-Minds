import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { englishCurriculum, getGradeCurriculum } from "@/data/english-curriculum";
import { getGradeLearningExtras } from "@/data/learning-extras";
import { PrintButton } from "@/components/learning/print-button";
import { CompleteButton } from "@/components/learning/progress-badges";
import { makeProgressId } from "@/lib/progress";

export function generateStaticParams() {
  return englishCurriculum.map((grade) => ({ grade: String(grade.grade) }));
}

export default async function WorksheetsPage({ params }: { params: Promise<{ grade: string }> }) {
  const { grade: gradeParam } = await params;
  const grade = getGradeCurriculum(Number(gradeParam));
  const extras = getGradeLearningExtras(Number(gradeParam));
  if (!grade || !extras) notFound();
  const vocab = extras.vocabFlipCards.slice(0, 12);
  const stories = extras.storyBank.slice(0, 3);
  return (
    <main className="min-h-screen bg-midnight pt-28 print:bg-white print:pt-0 print:text-black">
      <Container>
        <section className="rounded-[3rem] bg-gradient-to-br from-aqua/20 via-nebula/20 to-sunbeam/10 p-8 md:p-12 print:hidden">
          <p className="text-aqua">Grade {grade.grade} Worksheets</p>
          <h1 className="mt-3 text-5xl font-black md:text-7xl">Printable practice pack.</h1>
          <p className="mt-5 max-w-3xl text-white/70">Tracing, vocabulary, and reading worksheets. Use your browser print button or Save as PDF.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <PrintButton />
            <CompleteButton id={makeProgressId("worksheet", grade.grade, "print-pack")} label="Worksheet done" />
            <Link href={`/learn/${grade.grade}`} className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white">Back to Grade {grade.grade}</Link>
          </div>
        </section>

        <section className="py-10 print:py-0">
          <div className="mb-8 hidden print:block"><h1>Mirai Minds Grade {grade.grade} English Worksheets</h1><p>{grade.level} · {grade.theme}</p></div>
          {grade.grade === 1 && extras.alphabetCards && (
            <Card className="mb-8 p-6 print:border print:border-black print:bg-white print:text-black">
              <h2 className="text-3xl font-black">Alphabet tracing</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2 print:grid-cols-2">
                {extras.alphabetCards.slice(0, 12).map((card) => (
                  <div key={card.letter} className="rounded-2xl border border-white/10 bg-white/5 p-4 print:border-black print:bg-white">
                    <p className="text-5xl font-black">{card.letter} {card.letter.toLowerCase()}</p>
                    <p>{card.word} / {card.ja}</p>
                    <div className="mt-3 space-y-2 text-2xl tracking-[0.5em] text-white/40 print:text-gray-500">___ ___ ___</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card className="mb-8 p-6 print:border print:border-black print:bg-white print:text-black">
            <h2 className="text-3xl font-black">Vocabulary practice</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2 print:grid-cols-2">
              {vocab.map((card) => (
                <div key={card.word} className="rounded-2xl border border-white/10 bg-white/5 p-4 print:border-black print:bg-white">
                  <p className="text-3xl">{card.picture}</p>
                  <p className="text-xl font-black">{card.word}</p>
                  <p className="text-sm">Japanese: {card.ja}</p>
                  <p className="mt-2">Write a sentence: ____________________________</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 print:border print:border-black print:bg-white print:text-black">
            <h2 className="text-3xl font-black">Reading practice</h2>
            <div className="mt-5 space-y-6">
              {stories.map((story) => (
                <div key={story.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 print:border-black print:bg-white">
                  <h3 className="text-2xl font-black">{story.title}</h3>
                  {story.text.map((line) => <p key={line} className="mt-2">{line}</p>)}
                  <ol className="mt-4 list-inside list-decimal">
                    {story.comprehension.map((q) => <li key={q.question}>{q.question} __________________</li>)}
                  </ol>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </Container>
    </main>
  );
}
