"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { englishCurriculum } from "@/data/english-curriculum";
import { useLearningProgress } from "@/hooks/use-learning-progress";

export default function ParentProgressPage() {
  const { completedCount, countByPrefix, resetProgress } = useLearningProgress();
  return (
    <main className="min-h-screen bg-midnight pt-28">
      <Container>
        <section className="rounded-[3rem] bg-gradient-to-br from-aqua/20 via-nebula/20 to-sunbeam/10 p-8 md:p-12">
          <p className="text-aqua">Parent view</p>
          <h1 className="mt-3 text-5xl font-black md:text-7xl">Local progress, no login.</h1>
          <p className="mt-5 max-w-3xl text-white/70">This page shows completed cards, stories, games, worksheets, and placement test activity saved in this browser only.</p>
          <button onClick={resetProgress} className="mt-6 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white">Reset this browser</button>
        </section>
        <section className="py-12">
          <Card className="p-6"><p className="text-sm uppercase tracking-[0.25em] text-aqua">Total progress</p><h2 className="mt-2 text-5xl font-black text-sunbeam">{completedCount} stars</h2><p className="mt-2 text-white/60">Stars mean the child tapped “complete” after an activity.</p></Card>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {englishCurriculum.map((grade) => {
              const stories = countByPrefix(`story:grade-${grade.grade}:`);
              const vocab = countByPrefix(`vocab:grade-${grade.grade}:`);
              const games = countByPrefix(`game:grade-${grade.grade}:`);
              const alphabet = countByPrefix(`alphabet:grade-${grade.grade}:`);
              return (
                <Card key={grade.grade} className="p-5">
                  <p className="text-sm text-aqua">Grade {grade.grade}</p>
                  <h3 className="mt-2 text-2xl font-black">{grade.level}</h3>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <p className="rounded-2xl bg-white/10 p-3">Stories: <b>{stories}</b></p>
                    <p className="rounded-2xl bg-white/10 p-3">Vocab: <b>{vocab}</b></p>
                    <p className="rounded-2xl bg-white/10 p-3">Games: <b>{games}</b></p>
                    <p className="rounded-2xl bg-white/10 p-3">ABC: <b>{alphabet}</b></p>
                  </div>
                  <Link href={`/learn/${grade.grade}`} className="mt-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/80">Open grade</Link>
                </Card>
              );
            })}
          </div>
        </section>
      </Container>
    </main>
  );
}
