import { Container } from "@/components/ui/container";
import { RewardGalaxy } from "@/components/learning/client-learning-tools";

export default function RewardMapPage(){return <main className="min-h-screen bg-midnight pt-28"><Container><section className="rounded-[3rem] bg-gradient-to-br from-aqua/20 via-nebula/20 to-sunbeam/10 p-8"><p className="text-aqua">Local progress galaxy</p><h1 className="mt-3 text-5xl font-black">Reward galaxy map</h1><p className="mt-4 max-w-3xl text-white/70">Kids unlock planets as they complete stories, cards, games, worksheets, and reviews. Everything stays on this device.</p></section><section className="py-10"><RewardGalaxy/></section></Container></main>}
