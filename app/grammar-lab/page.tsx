import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SpeakButton } from "@/components/learning/audio-tools";
import { grammarLab } from "@/data/free-features";

export default function GrammarLabPage(){return <main className="min-h-screen bg-midnight pt-28"><Container><section className="rounded-[3rem] bg-gradient-to-br from-nebula/25 to-aqua/10 p-8"><p className="text-aqua">Visual grammar, not boring grammar</p><h1 className="mt-3 text-5xl font-black">Mini Grammar Lab</h1><p className="mt-4 max-w-3xl text-white/70">Simple sentence patterns from Grade 1 to Grade 12, with examples kids can hear and copy.</p></section><section className="grid gap-5 py-10 md:grid-cols-2">{grammarLab.map(g=><Card key={g.pattern} className="p-6"><p className="text-sm text-aqua">{g.level}</p><h3 className="mt-2 text-3xl font-black">{g.pattern}</h3><p className="mt-3 text-xl text-sunbeam">{g.example}</p><p className="mt-3 text-white/65">{g.use}</p><div className="mt-4"><SpeakButton text={g.example}/></div></Card>)}</section></Container></main>}
