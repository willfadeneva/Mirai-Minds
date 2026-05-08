"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { AudioButton } from "@/components/learning/audio-tools";
import { getGradeLearningExtras } from "@/data/learning-extras";
import { useSpacedReview } from "@/hooks/use-learning-progress";

export default function ReviewPage({ params }: { params: { grade: string } }) {
  const grade = Number(params.grade);
  const extras = getGradeLearningExtras(grade);
  const { rate, getItem, isDue } = useSpacedReview();
  const dueCards = useMemo(() => extras?.vocabFlipCards.filter((card) => isDue(`vocab-${grade}-${card.word}`)) ?? [], [extras, grade, isDue]);
  const cards = dueCards.length ? dueCards : extras?.vocabFlipCards ?? [];
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const card = cards[index % Math.max(cards.length, 1)];
  if (!extras || !card) {
    return <main className="min-h-screen bg-midnight pt-28"><Container><p>No review cards found.</p></Container></main>;
  }
  const id = `vocab-${grade}-${card.word}`;
  const info = getItem(id);
  function answer(rating: "again" | "good" | "easy") {
    rate(id, rating);
    setShow(false);
    setIndex((i) => i + 1);
  }
  return (
    <main className="min-h-screen bg-midnight pt-28">
      <Container>
        <section className="rounded-[3rem] bg-gradient-to-br from-aqua/20 via-nebula/20 to-sunbeam/10 p-8 md:p-12">
          <p className="text-aqua">Grade {grade} Spaced Review</p>
          <h1 className="mt-3 text-5xl font-black md:text-7xl">Remember words longer.</h1>
          <p className="mt-5 max-w-3xl text-white/70">Review cards are scheduled in this browser using localStorage. No account, no server, no paid service.</p>
          <Link href={`/learn/${grade}`} className="mt-6 inline-block rounded-full bg-white px-5 py-3 text-sm font-bold text-midnight">Back to Grade {grade}</Link>
        </section>
        <section className="mx-auto max-w-3xl py-12">
          <Card className="p-8 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-aqua">Card {index + 1}</p>
            <div className="mt-5 text-8xl">{card.picture}</div>
            <h2 className="mt-5 text-5xl font-black">{show ? card.word : "What is this word?"}</h2>
            {show && <><p className="mt-3 text-2xl text-sunbeam">{card.ja}</p><p className="mt-3 text-white/70">{card.example}</p></>}
            <div className="mt-6 flex flex-wrap justify-center gap-3"><AudioButton text={card.word}/><button onClick={() => setShow((s) => !s)} className="rounded-full bg-white px-5 py-3 text-sm font-bold text-midnight">{show ? "Hide" : "Show answer"}</button></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <button onClick={() => answer("again")} className="rounded-2xl bg-white/10 p-4 font-bold hover:bg-white/20">Again</button>
              <button onClick={() => answer("good")} className="rounded-2xl bg-aqua/20 p-4 font-bold text-aqua hover:bg-aqua/30">Good</button>
              <button onClick={() => answer("easy")} className="rounded-2xl bg-sunbeam/20 p-4 font-bold text-sunbeam hover:bg-sunbeam/30">Easy</button>
            </div>
            <p className="mt-5 text-sm text-white/50">Review box: {info?.box ?? 0} · Reviews: {info?.reviews ?? 0}</p>
          </Card>
        </section>
      </Container>
    </main>
  );
}
