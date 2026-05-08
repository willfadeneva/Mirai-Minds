import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

const features = [
  ["🎯", "Start Here", "Choose the best path from zero English.", "/start-here"],
  ["⏱️", "Daily Mission", "A 15-minute self-study routine.", "/daily-mission"],
  ["🌌", "Reward Map", "Unlock planets with local stars.", "/reward-map"],
  ["あ", "Kana Bridge", "Japanese-to-English beginner support.", "/kana-english"],
  ["📖", "Hadano Stories", "Local and seasonal reading lessons.", "/stories"],
  ["🎙️", "Speaking Practice", "Local-only listen and repeat recorder.", "/speaking-practice"],
  ["🧩", "Extra Games", "Maze, rhymes, story order, picture choice.", "/extra-games"],
  ["🛡️", "Safety Promise", "No login, no ads, no tracking.", "/privacy"],
];

export function StandaloneFeaturesSection(){return <section className="bg-midnight py-20"><Container><p className="text-aqua">Free standalone platform</p><h2 className="mt-3 text-4xl font-black md:text-6xl">More than a landing page — a self-study learning world.</h2><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{features.map(([icon,title,desc,href])=><Link key={href} href={href}><Card className="h-full p-5 transition hover:-translate-y-1 hover:bg-white/10"><div className="text-4xl">{icon}</div><h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-2 text-sm text-white/65">{desc}</p></Card></Link>)}</div></Container></section>}
