"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { dailyMissionSteps, rewardPlanets } from "@/data/free-features";
import { useLearningProgress, makeProgressId } from "@/hooks/use-learning-progress";

const PROFILE_KEY = "mirai-minds-active-profile-v1";
const AVATAR_KEY = "mirai-minds-avatar-v1";
const A11Y_KEY = "mirai-minds-a11y-v1";

export function LocalProfileSelector() {
  const [profile, setProfile] = useState("Guest Explorer");
  useEffect(() => {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) setProfile(saved);
  }, []);
  function save(next: string) {
    setProfile(next);
    localStorage.setItem(PROFILE_KEY, next);
  }
  return (
    <Card className="p-5">
      <h3 className="text-xl font-black">Local learner profile</h3>
      <p className="mt-2 text-sm text-white/65">No account. This only changes progress labels on this device.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {["Guest Explorer", "Kid 1", "Kid 2", "Family Mode"].map((name) => (
          <button key={name} onClick={() => save(name)} className={`rounded-full px-4 py-2 text-sm font-bold ${profile === name ? "bg-white text-midnight" : "bg-white/10 text-white"}`}>{name}</button>
        ))}
      </div>
      <p className="mt-4 text-aqua">Active: {profile}</p>
    </Card>
  );
}

export function AvatarCustomizer() {
  const avatars = ["🦉", "🦊", "🐼", "🤖", "🐱", "🐉"];
  const [avatar, setAvatar] = useState("🦉");
  useEffect(() => {
    const saved = localStorage.getItem(AVATAR_KEY);
    if (saved) setAvatar(saved);
  }, []);
  function choose(a: string) {
    setAvatar(a);
    localStorage.setItem(AVATAR_KEY, a);
    window.dispatchEvent(new CustomEvent("mirai-avatar", { detail: a }));
  }
  return (
    <Card className="p-5">
      <h3 className="text-xl font-black">Choose your guide</h3>
      <p className="mt-2 text-sm text-white/65">Pick a local mascot. It stays on this browser only.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {avatars.map((a) => <button key={a} onClick={() => choose(a)} className={`grid h-14 w-14 place-items-center rounded-2xl text-3xl ${avatar === a ? "bg-sunbeam text-midnight" : "bg-white/10"}`}>{a}</button>)}
      </div>
    </Card>
  );
}

export function AccessibilityPanel() {
  const [settings, setSettings] = useState({ largeText: false, highContrast: false, reducedMotion: false, spacing: false });
  useEffect(() => {
    const raw = localStorage.getItem(A11Y_KEY);
    if (raw) setSettings(JSON.parse(raw));
  }, []);
  useEffect(() => {
    localStorage.setItem(A11Y_KEY, JSON.stringify(settings));
    document.documentElement.classList.toggle("a11y-large", settings.largeText);
    document.documentElement.classList.toggle("a11y-contrast", settings.highContrast);
    document.documentElement.classList.toggle("a11y-reduce-motion", settings.reducedMotion);
    document.documentElement.classList.toggle("a11y-spacing", settings.spacing);
  }, [settings]);
  const items = [
    ["largeText", "Bigger text"],
    ["highContrast", "High contrast"],
    ["reducedMotion", "Reduced motion"],
    ["spacing", "Extra reading spacing"],
  ] as const;
  return (
    <Card className="p-6">
      <h2 className="text-3xl font-black">Reading comfort mode</h2>
      <p className="mt-3 text-white/65">Useful for younger readers, dyslexia-friendly reading, and calmer screens.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map(([key, label]) => (
          <button key={key} onClick={() => setSettings((s) => ({ ...s, [key]: !s[key] }))} className={`rounded-2xl p-4 text-left font-bold ${settings[key] ? "bg-aqua text-midnight" : "bg-white/10"}`}>{settings[key] ? "✓ " : ""}{label}</button>
        ))}
      </div>
    </Card>
  );
}

export function DailyMissionBoard() {
  const { isDone, toggleDone } = useLearningProgress();
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="grid gap-4">
      {dailyMissionSteps.map((step, index) => {
        const id = makeProgressId("game", "daily", `${today}-${step.id}`);
        return (
          <Card key={step.id} className="p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-aqua">Step {index + 1} · {step.minutes} min</p>
                <h3 className="mt-1 text-2xl font-black">{step.icon} {step.title}</h3>
                <p className="mt-2 text-white/65">{step.task}</p>
              </div>
              <Button onClick={() => toggleDone(id)}>{isDone(id) ? "⭐ Done" : "Mark done"}</Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export function RewardGalaxy() {
  const { completedCount } = useLearningProgress();
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {rewardPlanets.map((planet) => {
        const unlocked = completedCount >= planet.stars;
        return (
          <Card key={planet.planet} className={`p-5 ${unlocked ? "ring-2 ring-aqua/60" : "opacity-55"}`}>
            <div className="text-5xl">{planet.icon}</div>
            <p className="mt-4 text-sm text-aqua">{planet.stars} stars</p>
            <h3 className="mt-1 text-xl font-black">{planet.planet}</h3>
            <p className="mt-2 text-sm text-white/65">Unlocks: {planet.skill}</p>
            <p className="mt-4 text-sm font-bold">{unlocked ? "Unlocked ⭐" : `${Math.max(0, planet.stars - completedCount)} stars to go`}</p>
          </Card>
        );
      })}
    </div>
  );
}

export function CelebrationButton({ label = "Celebrate" }: { label?: string }) {
  const [burst, setBurst] = useState(false);
  return (
    <div className="relative inline-block">
      <Button onClick={() => { setBurst(true); setTimeout(() => setBurst(false), 900); }}>{label}</Button>
      {burst && <div className="pointer-events-none absolute -inset-8 animate-ping rounded-full bg-sunbeam/30" />}
      {burst && <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-3xl">✨⭐🎉</div>}
    </div>
  );
}

export function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  useEffect(() => { setSupported(typeof navigator !== "undefined" && Boolean(navigator.mediaDevices)); }, []);
  async function start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks: Blob[] = [];
      const r = new MediaRecorder(stream);
      r.ondataavailable = (e) => chunks.push(e.data);
      r.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      r.start(); setRecorder(r); setRecording(true);
    } catch { setSupported(false); }
  }
  function stop() { recorder?.stop(); setRecording(false); }
  if (!supported) return <Card className="p-5"><p>Your browser blocked or does not support local recording.</p></Card>;
  return <Card className="p-6"><h3 className="text-2xl font-black">Listen-and-repeat recorder</h3><p className="mt-2 text-white/65">Records locally in the browser. Nothing uploads.</p><div className="mt-4 flex gap-3"><Button onClick={recording ? stop : start}>{recording ? "Stop" : "Record my voice"}</Button></div>{url && <audio className="mt-5 w-full" controls src={url} />}</Card>;
}

export function useFilteredStories(stories: { title: string; level: string; theme: string; text: string }[]) {
  const [filter, setFilter] = useState("All");
  const options = useMemo(() => ["All", ...Array.from(new Set(stories.map((s) => s.theme)))], [stories]);
  const visible = filter === "All" ? stories : stories.filter((s) => s.theme === filter);
  return { filter, setFilter, options, visible };
}
