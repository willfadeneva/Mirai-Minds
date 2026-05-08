import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SpeakButton } from "@/components/learning/audio-tools";
import { VoiceRecorder } from "@/components/learning/client-learning-tools";

const phrases = ["apple", "I like apples.", "This is my book.", "Can you say that again?", "I want to practice English every day."];
export default function SpeakingPracticePage(){return <main className="min-h-screen bg-midnight pt-28"><Container><section className="rounded-[3rem] bg-gradient-to-br from-aqua/20 to-nebula/20 p-8"><p className="text-aqua">Local-only speaking practice</p><h1 className="mt-3 text-5xl font-black">Listen and repeat</h1><p className="mt-4 max-w-3xl text-white/70">Hear a model phrase, record yourself locally, and play it back. No upload, no login.</p></section><section className="grid gap-6 py-10 lg:grid-cols-2"><Card className="p-6"><h2 className="text-3xl font-black">Practice phrases</h2><div className="mt-5 space-y-3">{phrases.map((p)=><div key={p} className="flex items-center justify-between rounded-2xl bg-white/10 p-3"><span>{p}</span><SpeakButton text={p}/></div>)}</div></Card><VoiceRecorder/></section></Container></main>}
