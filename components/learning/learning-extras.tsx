"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { AudioButton } from "@/components/learning/audio-tools";
import { CompleteButton } from "@/components/learning/progress-badges";
import { getGradeLearningExtras, type ExpandedStory, type VocabFlipCard } from "@/data/learning-extras";
import { makeProgressId } from "@/hooks/use-learning-progress";

function DifficultyPill({ difficulty }: { difficulty: VocabFlipCard["difficulty"] }) {
  return <span className="rounded-full bg-white/10 px-2 py-1 text-xs capitalize text-white/70">{difficulty}</span>;
}

function FlipCard({ front, back, accent }: { front: React.ReactNode; back: React.ReactNode; accent?: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((x) => !x)}
      className="group min-h-[210px] w-full rounded-[2rem] border border-white/10 bg-white/5 p-1 text-left transition hover:-translate-y-1 hover:bg-white/10"
      aria-label="Flip learning card"
    >
      <div className="relative h-full min-h-[200px] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-white/10 to-white/5 p-5">
        <div className="absolute right-4 top-4 text-xs text-white/40">tap to flip</div>
        <div className={flipped ? "hidden" : "block"}>{front}</div>
        <div className={flipped ? "block" : "hidden"}>{back}</div>
        <div className={`absolute -bottom-10 -right-10 h-28 w-28 rounded-full blur-2xl ${accent ?? "bg-aqua/20"}`} />
      </div>
    </button>
  );
}

function AlphabetFlipCards({ grade }: { grade: number }) {
  const extras = getGradeLearningExtras(grade);
  if (!extras?.alphabetCards?.length) return null;

  return (
    <section className="py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-aqua">Grade 1 foundation</p>
          <h2 className="mt-2 text-3xl font-black">Alphabet flipcards A–Z</h2>
          <p className="mt-2 max-w-3xl text-white/65">Tap each card to reveal Japanese meaning, sound clue, and a tiny practice mission for zero-start learners.</p>
        </div>
        <span className="rounded-full bg-sunbeam/20 px-4 py-2 text-sm text-sunbeam">26 cards</span>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {extras.alphabetCards.map((card) => (
          <FlipCard
            key={card.letter}
            accent="bg-sunbeam/20"
            front={
              <div>
                <div className="text-6xl">{card.picture}</div>
                <div className="mt-4 text-6xl font-black text-white">{card.letter}</div>
                <p className="mt-2 text-2xl font-black text-aqua">{card.word}</p>
                <div className="mt-4 flex flex-wrap gap-2"><AudioButton text={`${card.letter}. ${card.word}`} /><CompleteButton id={makeProgressId("alphabet", grade, card.letter)} /></div>
              </div>
            }
            back={
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-sunbeam">Sound</p>
                <h3 className="mt-2 text-2xl font-black">{card.sound}</h3>
                <p className="mt-4 text-white/70">Japanese: {card.ja}</p>
                <p className="mt-4 rounded-2xl bg-white/10 p-3 text-sm text-white/70">{card.practice}</p>
                <div className="mt-4"><AudioButton text={`${card.letter}. ${card.word}. ${card.sound}`} label="Hear sound" /></div>
              </div>
            }
          />
        ))}
      </div>
    </section>
  );
}

function VocabularyFlipCards({ grade }: { grade: number }) {
  const extras = getGradeLearningExtras(grade);
  if (!extras?.vocabFlipCards?.length) return null;

  return (
    <section className="py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-aqua">Picture vocabulary</p>
          <h2 className="mt-2 text-3xl font-black">Vocabulary flipcards by difficulty</h2>
          <p className="mt-2 max-w-3xl text-white/65">Each level has picture-supported words matched to the grade difficulty. Tap to see meaning, example, and practice.</p>
        </div>
        <span className="rounded-full bg-aqua/20 px-4 py-2 text-sm text-aqua">{extras.vocabFlipCards.length} cards</span>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {extras.vocabFlipCards.map((card) => (
          <FlipCard
            key={card.word}
            front={
              <div>
                <div className="text-6xl">{card.picture}</div>
                <div className="mt-4 flex items-center gap-2"><DifficultyPill difficulty={card.difficulty} /></div>
                <h3 className="mt-4 text-3xl font-black text-white">{card.word}</h3>
                <p className="mt-2 text-sm text-white/50">Picture clue + English word</p>
                <div className="mt-4 flex flex-wrap gap-2"><AudioButton text={card.word} /><CompleteButton id={makeProgressId("vocab", grade, card.word)} /></div>
              </div>
            }
            back={
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-aqua">Meaning</p>
                <h3 className="mt-2 text-2xl font-black">{card.ja}</h3>
                <p className="mt-4 text-white/70">{card.example}</p>
                <p className="mt-4 rounded-2xl bg-white/10 p-3 text-sm text-white/70">{card.practice}</p>
                <div className="mt-4"><AudioButton text={`${card.word}. ${card.example}`} label="Hear example" /></div>
              </div>
            }
          />
        ))}
      </div>
    </section>
  );
}

function StoryReader({ grade }: { grade: number }) {
  const extras = getGradeLearningExtras(grade);
  const [selectedId, setSelectedId] = useState(extras?.storyBank?.[0]?.id ?? "");
  const selected = useMemo<ExpandedStory | undefined>(() => extras?.storyBank.find((story) => story.id === selectedId), [extras, selectedId]);
  if (!extras?.storyBank?.length) return null;

  return (
    <section className="py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-aqua">Expanded reading</p>
          <h2 className="mt-2 text-3xl font-black">20 reading stories for this level</h2>
          <p className="mt-2 max-w-3xl text-white/65">A bigger graded reader bank for repeated practice: stories, dialogues, comprehension, focus words, and classroom tasks.</p>
        </div>
        <span className="rounded-full bg-nebula/30 px-4 py-2 text-sm text-white">20 stories</span>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="max-h-[620px] space-y-2 overflow-auto rounded-[2rem] border border-white/10 bg-white/5 p-3">
          {extras.storyBank.map((story) => (
            <button
              key={story.id}
              type="button"
              onClick={() => setSelectedId(story.id)}
              className={`w-full rounded-2xl p-3 text-left transition ${selectedId === story.id ? "bg-aqua/20 text-white" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-aqua">{story.type} · {story.level}</p>
              <p className="mt-1 font-bold">{story.title}</p>
            </button>
          ))}
        </div>
        {selected && (
          <Card className="p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-aqua">{selected.type} · {selected.level}</p>
            <h3 className="mt-3 text-3xl font-black">{selected.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <AudioButton text={selected.text.join(" ")} label="Read aloud" />
              <CompleteButton id={makeProgressId("story", grade, selected.id)} label="Story done" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {selected.focusWords.map((word) => <span key={word} className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70">{word}</span>)}
            </div>
            <div className="mt-6 space-y-3 rounded-[2rem] bg-white/10 p-5 text-lg leading-relaxed text-white/80">
              {selected.text.map((line) => <p key={line}>{line}</p>)}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {selected.comprehension.map((q) => (
                <div key={q.question} className="rounded-2xl bg-white/5 p-4">
                  <p className="font-bold">{q.question}</p>
                  <div className="mt-3 space-y-2 text-sm text-white/65">
                    {q.choices.map((choice) => <p key={choice}>• {choice}</p>)}
                  </div>
                  <p className="mt-3 text-sm text-sunbeam">Answer: {q.answer}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-2xl bg-sunbeam/10 p-4 text-sm text-sunbeam">Activity: {selected.activity}</p>
          </Card>
        )}
      </div>
    </section>
  );
}

export function LearningExtras({ grade }: { grade: number }) {
  return (
    <>
      <section className="py-8">
        <div className="grid gap-3 md:grid-cols-3">
          <Link href={`/games/${grade}`} className="rounded-[2rem] border border-white/10 bg-white/10 p-5 font-black transition hover:-translate-y-1 hover:bg-white/15">🎮 Play mini games</Link>
          <Link href={`/review/${grade}`} className="rounded-[2rem] border border-white/10 bg-white/10 p-5 font-black transition hover:-translate-y-1 hover:bg-white/15">🧠 Review vocabulary</Link>
          <Link href={`/worksheets/${grade}`} className="rounded-[2rem] border border-white/10 bg-white/10 p-5 font-black transition hover:-translate-y-1 hover:bg-white/15">🖨️ Print worksheets</Link>
        </div>
      </section>
      <AlphabetFlipCards grade={grade} />
      <VocabularyFlipCards grade={grade} />
      <StoryReader grade={grade} />
    </>
  );
}
