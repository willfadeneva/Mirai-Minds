import { Container } from "@/components/ui/container";
import { DailyMissionBoard, LocalProfileSelector, CelebrationButton } from "@/components/learning/client-learning-tools";
import { japaneseGuidance } from "@/data/japanese-guidance";

export default function DailyMissionPage() {
  return <main className="min-h-screen bg-midnight pt-28"><Container><section className="kid-hero rounded-[3rem] p-8"><p className="text-aqua">No-login self-study routine</p><h1 className="mt-3 text-5xl font-black">Daily 15-minute mission</h1><p className="mt-4 max-w-3xl text-white/70">A simple daily path for kids: listen, flip cards, read, play, and speak. Progress is saved only on this device.</p><p className="mt-4 max-w-3xl rounded-3xl bg-white/70 p-4 text-slate-700">{japaneseGuidance.dailyMission}</p></section><section className="grid gap-6 py-10 lg:grid-cols-[1fr_360px]"><DailyMissionBoard/><div className="space-y-5"><LocalProfileSelector/><div className="rounded-3xl bg-white/10 p-6"><h3 className="text-2xl font-black">Finish reward</h3><p className="mt-2 text-white/65">Celebrate when today’s mission is complete.</p><div className="mt-4"><CelebrationButton label="Unlock today’s sparkle"/></div></div></div></section></Container></main>;
}
