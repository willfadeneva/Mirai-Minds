import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { MiniGamesGrid } from "@/components/learning/mini-games";
import { englishCurriculum, getGradeCurriculum } from "@/data/english-curriculum";

export function generateStaticParams() {
  return englishCurriculum.map((grade) => ({ grade: String(grade.grade) }));
}

export default function GamesPage({ params }: { params: { grade: string } }) {
  const grade = getGradeCurriculum(Number(params.grade));
  if (!grade) notFound();
  return (
    <main className="min-h-screen bg-midnight pt-28">
      <Container>
        <section className="rounded-[3rem] bg-gradient-to-br from-aqua/20 via-nebula/20 to-sunbeam/10 p-8 md:p-12">
          <p className="text-aqua">Grade {grade.grade} Games</p>
          <h1 className="mt-3 text-5xl font-black md:text-7xl">Practice English by playing.</h1>
          <p className="mt-5 max-w-3xl text-white/70">Word matching, memory cards, sentence builder, and spelling race. Progress is saved locally without login.</p>
          <Link href={`/learn/${grade.grade}`} className="mt-6 inline-block rounded-full bg-white px-5 py-3 text-sm font-bold text-midnight">Back to Grade {grade.grade}</Link>
        </section>
        <section className="py-12"><MiniGamesGrid grade={grade.grade} /></section>
      </Container>
    </main>
  );
}
