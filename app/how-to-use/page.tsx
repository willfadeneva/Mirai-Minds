import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { japaneseGuidance } from "@/data/japanese-guidance";

export default function HowToUsePage(){
  return <main className="min-h-screen bg-midnight pt-28">
    <Container>
      <section className="kid-hero rounded-[3rem] p-8 md:p-12">
        <p className="text-aqua font-bold">How to use / 使い方</p>
        <h1 className="mt-3 text-5xl font-black md:text-7xl">Learn English step by step.</h1>
        <p className="mt-5 max-w-3xl text-slate-600">Mirai Minds is a free no-login English practice site for kids. Start small, listen slowly, read stories, play games, and collect stars.</p>
        <p className="mt-3 max-w-3xl rounded-3xl bg-white/70 p-4 text-slate-700">Mirai Mindsは、ログイン不要で使える子ども向け英語学習サイトです。少しずつ、楽しく、毎日続けることを大切にしています。</p>
      </section>
      <section className="grid gap-5 py-10 md:grid-cols-2">
        {japaneseGuidance.howToUse.map((item,i)=><Card key={item.en} className="p-6">
          <p className="text-4xl">{["🌱","🧭","⏰","🔊","⭐","👨‍👩‍👧"][i]}</p>
          <h2 className="mt-4 text-2xl font-black">{item.en}</h2>
          <p className="mt-3 text-slate-600">{item.ja}</p>
        </Card>)}
      </section>
      <Card className="mb-12 p-6">
        <h2 className="text-3xl font-black">Recommended path / おすすめの進め方</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link className="rounded-full bg-aqua px-5 py-3 font-bold text-midnight" href="/start-here">Start Here</Link>
          <Link className="rounded-full bg-sunbeam px-5 py-3 font-bold text-midnight" href="/placement-test">Placement Test</Link>
          <Link className="rounded-full bg-white px-5 py-3 font-bold text-midnight" href="/daily-mission">Daily Mission</Link>
        </div>
      </Card>
    </Container>
  </main>
}
