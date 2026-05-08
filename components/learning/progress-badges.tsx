"use client";

import Link from "next/link";
import { Award, RotateCcw, Star, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLearningProgress } from "@/hooks/use-learning-progress";

const badgeMilestones = [5, 15, 30, 60, 100, 150, 240];

export function ProgressBadges({ grade }: { grade?: number }) {
  const { completedCount, countByPrefix, resetProgress } = useLearningProgress();
  const gradePrefix = grade ? `story:grade-${grade}:` : "";
  const gradeStories = grade ? countByPrefix(gradePrefix) : 0;
  const unlocked = badgeMilestones.filter((n) => completedCount >= n);

  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-aqua">Local progress</p>
          <h3 className="mt-2 text-2xl font-black">Stars and badges</h3>
          <p className="mt-2 text-sm text-white/65">No login. Progress is saved only in this browser with free localStorage.</p>
        </div>
        <div className="grid h-20 w-20 place-items-center rounded-3xl bg-sunbeam/20 text-sunbeam">
          <Trophy className="h-9 w-9" />
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-black text-sunbeam">{completedCount}</p><p className="text-sm text-white/60">total stars</p></div>
        <div className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-black text-aqua">{unlocked.length}</p><p className="text-sm text-white/60">badges unlocked</p></div>
        <div className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-black text-white">{grade ? gradeStories : "∞"}</p><p className="text-sm text-white/60">grade stories done</p></div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {badgeMilestones.map((n) => (
          <span key={n} className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ${completedCount >= n ? "bg-sunbeam/20 text-sunbeam" : "bg-white/10 text-white/40"}`}>
            {completedCount >= n ? <Award className="h-4 w-4" /> : <Star className="h-4 w-4" />} {n} stars
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/parent-progress" className="rounded-full bg-white px-4 py-2 text-sm font-bold text-midnight">Parent progress page</Link>
        <button type="button" onClick={resetProgress} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white/80 hover:bg-white/20"><RotateCcw className="h-4 w-4" /> Reset local progress</button>
      </div>
    </Card>
  );
}

export function CompleteButton({ id, label = "Mark complete" }: { id: string; label?: string }) {
  const { isDone, toggleDone } = useLearningProgress();
  const done = isDone(id);
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        toggleDone(id);
      }}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold transition ${done ? "bg-sunbeam text-midnight" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
    >
      <Star className="h-4 w-4" /> {done ? "Completed" : label}
    </button>
  );
}
