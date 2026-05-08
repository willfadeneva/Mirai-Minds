"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const tips = [
  "Start with Start Here or the placement test, then choose your recommended grade path.",
  "Tap Listen on cards and repeat out loud three times.",
  "Try the Daily 15-minute mission when you do not know what to study.",
  "Use Kana Bridge if Japanese sounds help you begin from zero.",
  "Use Review Mode every few days so new words stick.",
  "Print worksheets for handwriting, reading, and offline practice.",
  "Open the Reward Galaxy to see what your stars unlocked.",
];

const names: Record<string, string> = { "🦉": "Mimi the Mirai Owl", "🦊": "Koko the Fox", "🐼": "Panda Pals", "🤖": "Robo Sensei", "🐱": "Neko Guide", "🐉": "Mirai Dragon" };

export function MascotGuide() {
  const [open, setOpen] = useState(true);
  const [tip, setTip] = useState(0);
  const [avatar, setAvatar] = useState("🦉");
  useEffect(() => {
    const saved = localStorage.getItem("mirai-minds-avatar-v1");
    if (saved) setAvatar(saved);
    const handler = (event: Event) => setAvatar((event as CustomEvent<string>).detail);
    window.addEventListener("mirai-avatar", handler as EventListener);
    return () => window.removeEventListener("mirai-avatar", handler as EventListener);
  }, []);
  if (!open) {
    return <button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-40 grid h-16 w-16 place-items-center rounded-full bg-aqua text-3xl text-midnight shadow-glow" aria-label="Open mascot guide">{avatar}</button>;
  }
  return (
    <aside className="fixed bottom-5 right-5 z-40 w-[min(360px,calc(100vw-24px))] rounded-[2rem] border border-white/10 bg-midnight/90 p-4 shadow-2xl backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-aqua/20 text-3xl">{avatar}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-black">{names[avatar] ?? "Mirai Guide"}</p>
            <button onClick={() => setOpen(false)} aria-label="Close mascot guide" className="rounded-full bg-white/10 p-1 hover:bg-white/20"><X className="h-4 w-4" /></button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{tips[tip]}</p>
          <button onClick={() => setTip((tip + 1) % tips.length)} className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white/80 hover:bg-white/20">
            <MessageCircle className="h-4 w-4" /> New tip
          </button>
        </div>
      </div>
    </aside>
  );
}
