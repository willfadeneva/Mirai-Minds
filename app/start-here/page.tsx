import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { japaneseGuidance } from "@/data/japanese-guidance";

const paths=[
  {title:'I know zero English', grade:'Grade 1', href:'/learn/1', detail:'Start with sounds, pictures, alphabet, and tiny words.'},
  {title:'I know ABC', grade:'Grade 2', href:'/learn/2', detail:'Practice phonics, family, weather, food, and short sentences.'},
  {title:'I can read small words', grade:'Grade 3', href:'/learn/3', detail:'Build routines, school phrases, time, and town vocabulary.'},
  {title:'I can read short stories', grade:'Grade 5', href:'/learn/5', detail:'Move into A2 stories, opinions, and community themes.'},
  {title:'I want stronger school English', grade:'Grade 8+', href:'/placement-test', detail:'Take the placement test for the best middle/high school start.'},
];
export default function StartHerePage(){return <main className="min-h-screen bg-midnight pt-28"><Container><section className="kid-hero rounded-[3rem] p-8"><p className="text-aqua">First step</p><h1 className="mt-3 text-5xl font-black">Start here</h1><p className="mt-4 max-w-3xl text-white/70">Choose the closest level. No account needed, and kids can move up or down any time.</p><p className="mt-4 max-w-3xl rounded-3xl bg-white/70 p-4 text-slate-700">{japaneseGuidance.startHere}</p></section><section className="grid gap-5 py-10 md:grid-cols-2 lg:grid-cols-3">{paths.map(p=><Link key={p.title} href={p.href}><Card className="h-full p-6 transition hover:-translate-y-1 hover:bg-white/10"><p className="text-aqua">{p.grade}</p><h3 className="mt-2 text-2xl font-black">{p.title}</h3><p className="mt-3 text-white/65">{p.detail}</p></Card></Link>)}</section></Container></main>}
