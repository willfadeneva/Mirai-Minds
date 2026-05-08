"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { AudioButton } from "@/components/learning/audio-tools";
import { makeProgressId, useLearningProgress } from "@/hooks/use-learning-progress";
import { japaneseGuidance } from "@/data/japanese-guidance";

const questions = [
  { level: 1, q: "Choose the English word for ねこ", choices: ["cat", "sun", "book"], answer: "cat" },
  { level: 1, q: "Which letter starts apple?", choices: ["A", "M", "S"], answer: "A" },
  { level: 2, q: "Complete: I ___ a dog.", choices: ["am", "have", "is"], answer: "have" },
  { level: 3, q: "Choose the place: You read books here.", choices: ["library", "kitchen", "shoe"], answer: "library" },
  { level: 4, q: "Past tense: Yesterday I ___ soccer.", choices: ["play", "played", "playing"], answer: "played" },
  { level: 5, q: "Choose the sequence word.", choices: ["first", "blue", "dog"], answer: "first" },
  { level: 6, q: "Complete: I agree ___ it is helpful.", choices: ["because", "under", "apple"], answer: "because" },
  { level: 7, q: "Which sentence gives a reason?", choices: ["I like English because it is useful.", "Dog table blue.", "Run!"], answer: "I like English because it is useful." },
  { level: 8, q: "A summary should include...", choices: ["main ideas", "only emojis", "random words"], answer: "main ideas" },
  { level: 9, q: "Evidence means...", choices: ["supporting information", "a color", "a game"], answer: "supporting information" },
  { level: 10, q: "A balanced argument includes...", choices: ["different viewpoints", "only one word", "no reason"], answer: "different viewpoints" },
  { level: 11, q: "A counterargument is...", choices: ["an opposing idea", "a spelling mistake", "a greeting"], answer: "an opposing idea" },
  { level: 12, q: "Portfolio writing should be...", choices: ["clear and revised", "secret and empty", "only copied"], answer: "clear and revised" },
];

function recommendedGrade(score: number) {
  if (score <= 2) return 1;
  if (score <= 3) return 2;
  if (score <= 4) return 3;
  if (score <= 5) return 4;
  if (score <= 6) return 5;
  if (score <= 7) return 6;
  if (score <= 8) return 7;
  if (score <= 9) return 8;
  if (score <= 10) return 9;
  if (score <= 11) return 10;
  if (score <= 12) return 11;
  return 12;
}

export default function PlacementTestPage() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { markDone } = useLearningProgress();
  const score = useMemo(() => questions.filter((q, i) => answers[i] === q.answer).length, [answers]);
  const done = Object.keys(answers).length === questions.length;
  const grade = recommendedGrade(score);
  useEffect(() => {
    if (done) markDone(makeProgressId("placement", "all", "first-test"));
  }, [done]);
  return (
    <main className="min-h-screen bg-midnight pt-28">
      <Container>
        <section className="kid-hero rounded-[3rem] p-8 md:p-12">
          <p className="text-aqua">No-login placement</p>
          <h1 className="mt-3 text-5xl font-black md:text-7xl">Find the best starting level.</h1>
          <p className="mt-5 max-w-3xl text-white/70">A simple self-check for kids starting English. It is not a serious exam; it helps choose a comfortable path.</p><p className="mt-4 max-w-3xl rounded-3xl bg-white/70 p-4 text-slate-700">{japaneseGuidance.placement}</p>
        </section>
        <section className="py-12">
          {done && (
            <Card className="mb-6 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-aqua">Result</p>
              <h2 className="mt-2 text-4xl font-black">Start around Grade {grade}</h2>
              <p className="mt-3 text-white/70">Score: {score}/{questions.length}. If it feels too hard, go one grade lower. If it feels easy, go one grade higher.</p>
              <Link href={`/learn/${grade}`} className="mt-5 inline-block rounded-full bg-white px-5 py-3 text-sm font-bold text-midnight">Open Grade {grade}</Link>
            </Card>
          )}
          <div className="grid gap-4">
            {questions.map((question, index) => (
              <Card key={question.q} className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-3"><p className="font-black">{index + 1}. {question.q}</p><AudioButton text={question.q} /></div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {question.choices.map((choice) => (
                    <button key={choice} onClick={() => setAnswers((a) => ({ ...a, [index]: choice }))} className={`rounded-full px-4 py-2 text-sm font-bold ${answers[index] === choice ? "bg-aqua text-midnight" : "bg-white/10 text-white/75 hover:bg-white/20"}`}>{choice}</button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
