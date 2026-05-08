"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { AudioButton } from "@/components/learning/audio-tools";
import { CompleteButton } from "@/components/learning/progress-badges";
import { getGradeLearningExtras } from "@/data/learning-extras";
import { makeProgressId } from "@/hooks/use-learning-progress";

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function WordMatchingGame({ grade }: { grade: number }) {
  const extras = getGradeLearningExtras(grade);
  const cards = extras?.vocabFlipCards.slice(0, 8) ?? [];
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const meanings = useMemo(() => shuffle(cards.map((c) => c.ja)), [grade]);
  if (!cards.length) return null;
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3"><div><p className="text-sm text-aqua">Mini game</p><h3 className="text-2xl font-black">Word matching</h3><p className="mt-2 text-sm text-white/65">Choose an English word, then tap the Japanese meaning.</p></div><CompleteButton id={makeProgressId("game", grade, "word-matching")} /></div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="grid gap-2">
          {cards.map((card) => <button key={card.word} onClick={() => setSelected(card.word)} className={`rounded-2xl p-3 text-left font-bold ${selected === card.word ? "bg-aqua/25" : matched.includes(card.word) ? "bg-sunbeam/20 text-sunbeam" : "bg-white/10 hover:bg-white/15"}`}>{card.picture} {card.word}</button>)}
        </div>
        <div className="grid gap-2">
          {meanings.map((ja) => {
            const correct = cards.find((c) => c.word === selected)?.ja === ja;
            return <button key={ja} onClick={() => { if (selected && correct) setMatched((m) => Array.from(new Set([...m, selected]))); }} className="rounded-2xl bg-white/10 p-3 text-left hover:bg-white/15">{ja}</button>;
          })}
        </div>
      </div>
      <p className="mt-4 text-sm text-white/60">Matched: {matched.length}/{cards.length}</p>
    </Card>
  );
}

export function MemoryCardsGame({ grade }: { grade: number }) {
  const extras = getGradeLearningExtras(grade);
  const source = extras?.vocabFlipCards.slice(0, 6) ?? [];
  const deck = useMemo(() => shuffle(source.flatMap((c) => [{ key: `${c.word}-word`, pair: c.word, label: c.word }, { key: `${c.word}-ja`, pair: c.word, label: c.ja }])), [grade]);
  const [open, setOpen] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  if (!source.length) return null;
  function pick(key: string, pair: string) {
    if (open.includes(key) || matched.includes(pair)) return;
    const next = [...open, key].slice(-2);
    setOpen(next);
    if (next.length === 2) {
      const picked = deck.filter((card) => next.includes(card.key));
      if (picked[0]?.pair === picked[1]?.pair) setMatched((m) => Array.from(new Set([...m, pair])));
      setTimeout(() => setOpen([]), 700);
    }
  }
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3"><div><p className="text-sm text-aqua">Mini game</p><h3 className="text-2xl font-black">Memory cards</h3><p className="mt-2 text-sm text-white/65">Find matching English/Japanese pairs.</p></div><CompleteButton id={makeProgressId("game", grade, "memory-cards")} /></div>
      <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {deck.map((card) => {
          const visible = open.includes(card.key) || matched.includes(card.pair);
          return <button key={card.key} onClick={() => pick(card.key, card.pair)} className={`min-h-20 rounded-2xl p-3 text-center font-bold ${visible ? "bg-sunbeam/20 text-sunbeam" : "bg-white/10 text-white/50 hover:bg-white/15"}`}>{visible ? card.label : "?"}</button>;
        })}
      </div>
    </Card>
  );
}

export function SentenceBuilderGame({ grade }: { grade: number }) {
  const extras = getGradeLearningExtras(grade);
  const first = extras?.vocabFlipCards[0]?.word ?? "book";
  const sentence = grade <= 2 ? ["I", "see", "a", first] : grade <= 6 ? ["I", "can", "describe", first, "clearly"] : ["I", "can", "explain", "my", "opinion", "about", first];
  const [picked, setPicked] = useState<string[]>([]);
  const words = useMemo(() => shuffle(sentence), [grade]);
  const correct = picked.join(" ") === sentence.join(" ");
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3"><div><p className="text-sm text-aqua">Mini game</p><h3 className="text-2xl font-black">Sentence builder</h3><p className="mt-2 text-sm text-white/65">Tap words in the correct order.</p></div><CompleteButton id={makeProgressId("game", grade, "sentence-builder")} /></div>
      <div className="mt-5 rounded-2xl bg-white/10 p-4 text-xl font-black">{picked.length ? picked.join(" ") : "Build here..."}</div>
      <div className="mt-4 flex flex-wrap gap-2">{words.map((word, index) => <button key={`${word}-${index}`} onClick={() => setPicked((p) => [...p, word])} className="rounded-full bg-white/10 px-4 py-2 font-bold hover:bg-white/20">{word}</button>)}</div>
      <div className="mt-4 flex gap-2"><button onClick={() => setPicked([])} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">Reset</button><AudioButton text={sentence.join(" ")} /></div>
      {correct && <p className="mt-4 rounded-2xl bg-sunbeam/20 p-3 text-sm font-bold text-sunbeam">Great! Correct sentence.</p>}
    </Card>
  );
}

export function SpellingRaceGame({ grade }: { grade: number }) {
  const extras = getGradeLearningExtras(grade);
  const word = extras?.vocabFlipCards[0]?.word ?? "apple";
  const [answer, setAnswer] = useState("");
  const correct = answer.trim().toLowerCase() === word.toLowerCase();
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3"><div><p className="text-sm text-aqua">Mini game</p><h3 className="text-2xl font-black">Spelling race</h3><p className="mt-2 text-sm text-white/65">Listen, type the word, and check spelling.</p></div><CompleteButton id={makeProgressId("game", grade, "spelling-race")} /></div>
      <div className="mt-5 flex items-center gap-3"><AudioButton text={word} label="Hear word" /><span className="text-4xl">{extras?.vocabFlipCards[0]?.picture}</span></div>
      <input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type the word" className="mt-5 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/35" />
      {answer && <p className={`mt-3 text-sm font-bold ${correct ? "text-sunbeam" : "text-white/55"}`}>{correct ? "Correct!" : "Keep trying."}</p>}
    </Card>
  );
}

export function MiniGamesGrid({ grade }: { grade: number }) {
  return <div className="grid gap-5 lg:grid-cols-2"><WordMatchingGame grade={grade}/><MemoryCardsGame grade={grade}/><SentenceBuilderGame grade={grade}/><SpellingRaceGame grade={grade}/></div>;
}
