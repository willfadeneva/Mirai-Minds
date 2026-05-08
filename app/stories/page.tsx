"use client";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SpeakButton } from "@/components/learning/audio-tools";
import { hadanoStories, seasonalLessons, lifeSkillEnglish } from "@/data/free-features";
import { useState } from "react";

export default function StoriesPage(){
  const [theme,setTheme]=useState("All");
  const themes=["All",...Array.from(new Set(hadanoStories.map(s=>s.theme)))];
  const stories=theme==="All"?hadanoStories:hadanoStories.filter(s=>s.theme===theme);
  return <main className="min-h-screen bg-midnight pt-28"><Container><section className="rounded-[3rem] bg-white/10 p-8"><p className="text-aqua">Local Japan content</p><h1 className="mt-3 text-5xl font-black">Hadano stories, seasonal lessons, and life-skill English</h1><p className="mt-4 max-w-3xl text-white/70">Extra reading paths make Mirai Minds feel local to Hadano and useful for real-life English.</p></section><section className="py-10"><h2 className="text-3xl font-black">Story difficulty and theme filters</h2><div className="mt-5 flex flex-wrap gap-2">{themes.map(t=><button key={t} onClick={()=>setTheme(t)} className={`rounded-full px-4 py-2 text-sm font-bold ${theme===t?"bg-white text-midnight":"bg-white/10"}`}>{t}</button>)}</div><div className="mt-6 grid gap-5 md:grid-cols-2">{stories.map(s=><Card key={s.title} className="p-6"><p className="text-sm text-aqua">{s.level} · {s.theme}</p><h3 className="mt-2 text-2xl font-black">{s.title}</h3><p className="mt-3 text-white/70">{s.text}</p><div className="mt-4"><SpeakButton text={s.text}/></div></Card>)}</div></section><section className="py-10"><h2 className="text-3xl font-black">Seasonal Japan lessons</h2><div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-5">{seasonalLessons.map(l=><Card key={l.season} className="p-5"><p className="text-aqua">{l.season}</p><h3 className="mt-2 text-xl font-black">{l.topic}</h3><p className="mt-3 text-sm text-white/65">Words: {l.words.join(", ")}</p><p className="mt-3 text-sm text-sunbeam">{l.task}</p></Card>)}</div></section><section className="py-10"><h2 className="text-3xl font-black">Life-skill English</h2><div className="mt-5 grid gap-5 md:grid-cols-3">{lifeSkillEnglish.map(l=><Card key={l.phrase} className="p-5"><p className="text-sm text-aqua">{l.place}</p><h3 className="mt-2 text-xl font-black">{l.phrase}</h3><p className="mt-2 text-white/60">{l.ja}</p><div className="mt-4"><SpeakButton text={l.phrase}/></div></Card>)}</div></section></Container></main>
}
