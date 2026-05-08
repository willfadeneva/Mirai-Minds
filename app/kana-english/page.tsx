import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SpeakButton } from "@/components/learning/audio-tools";
import { kanaBridge } from "@/data/free-features";

export default function KanaEnglishPage(){return <main className="min-h-screen bg-midnight pt-28"><Container><section className="rounded-[3rem] bg-white/10 p-8"><p className="text-aqua">For Japanese zero-start learners</p><h1 className="mt-3 text-5xl font-black">Kana-to-English sound bridge</h1><p className="mt-4 max-w-3xl text-white/70">Use familiar Japanese sounds as a gentle bridge, while still teaching that English sounds are not always the same as kana.</p></section><section className="grid gap-5 py-10 md:grid-cols-3">{kanaBridge.map((k)=><Card key={k.kana} className="p-6"><div className="text-6xl font-black">{k.kana}</div><p className="mt-2 text-aqua">{k.romaji} → {k.english}</p><p className="mt-2 text-white/70">{k.ja}</p><p className="mt-3 text-sm text-white/60">{k.hint}</p><div className="mt-4"><SpeakButton text={k.english}/></div></Card>)}</section></Container></main>}
