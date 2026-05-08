import { Container } from "@/components/ui/container";
import { AccessibilityPanel } from "@/components/learning/client-learning-tools";

export default function AccessibilityPage(){return <main className="min-h-screen bg-midnight pt-28"><Container><section className="rounded-[3rem] bg-gradient-to-br from-nebula/25 to-aqua/10 p-8"><p className="text-aqua">Reading comfort</p><h1 className="mt-3 text-5xl font-black">Dyslexia-friendly and calm mode</h1><p className="mt-4 max-w-3xl text-white/70">Give children more comfortable reading controls without requiring accounts or paid tools.</p></section><section className="py-10"><AccessibilityPanel/></section></Container></main>}
