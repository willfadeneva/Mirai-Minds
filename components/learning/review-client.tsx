"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { AudioButton } from "@/components/learning/audio-tools";
import { getGradeLearningExtras } from "@/data/learning-extras";
import { useSpacedReview } from "@/hooks/use-learning-progress";

export function ReviewClient({ grade }: { grade: number }) {
  const extras = getGradeLearningExtras(grade);
  const { rate, getItem, isDue } = useSpacedReview();

  const allCards = extras?.vocabFlipCards ?? [];

  const dueCards = useMemo(() => {
    return allCards.filter((card) => isDue(`vocab-${grade}-${card.word}`));
  }, [allCards, grade, isDue]);

  const cards = dueCards.length ? dueCards : allCards;

  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

  const card = cards[index % Math.max(cards.length, 1)];

  if (!extras || !card) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 pt-28">
        <Container>
          <p>No review cards found.</p>
        </Container>
      </main>
    );
  }

  const id = `vocab-${grade}-${card.word}`;
  const info = getItem(id);

  function answer(rating: "again" | "good" | "easy") {
    rate(id, rating);
    setShow(false);
    setIndex((currentIndex) => currentIndex + 1);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 pt-28 text-slate-800">
      <Container>
        <section className="rounded-[3rem] bg-white/85 p-8 shadow-[0_18px_45px_rgba(14,165,233,0.12)] md:p-12">
          <p className="font-bold text-sky-600">Grade {grade} Spaced Review</p>

          <h1 className="mt-3 text-5xl font-black md:text-7xl">
            Remember words longer.
          </h1>

          <p className="mt-5 max-w-3xl text-slate-600">
            Review cards are scheduled in this browser using localStorage. No
            account, no server, no paid service.
          </p>

          <Link
            href={`/learn/${grade}`}
            className="mt-6 inline-block rounded-full bg-sky-500 px-5 py-3 text-sm font-bold text-white"
          >
            Back to Grade {grade}
          </Link>
        </section>

        <section className="mx-auto max-w-3xl py-12">
          <Card className="p-8 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-sky-600">
              Card {index + 1}
            </p>

            <div className="mt-5 text-8xl">{card.picture}</div>

            <h2 className="mt-5 text-5xl font-black">
              {show ? card.word : "What is this word?"}
            </h2>

            {show && (
              <>
                <p className="mt-3 text-2xl text-amber-500">{card.ja}</p>
                <p className="mt-3 text-slate-600">{card.example}</p>
              </>
            )}

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <AudioButton text={card.word} />

              <button
                type="button"
                onClick={() => setShow((current) => !current)}
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white"
              >
                {show ? "Hide" : "Show answer"}
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => answer("again")}
                className="rounded-2xl bg-rose-100 p-4 font-bold text-rose-700 hover:bg-rose-200"
              >
                Again
              </button>

              <button
                type="button"
                onClick={() => answer("good")}
                className="rounded-2xl bg-sky-100 p-4 font-bold text-sky-700 hover:bg-sky-200"
              >
                Good
              </button>

              <button
                type="button"
                onClick={() => answer("easy")}
                className="rounded-2xl bg-amber-100 p-4 font-bold text-amber-700 hover:bg-amber-200"
              >
                Easy
              </button>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Review box: {info?.box ?? 0} · Reviews: {info?.reviews ?? 0}
            </p>
          </Card>
        </section>
      </Container>
    </main>
  );
}
