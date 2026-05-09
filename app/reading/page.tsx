import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { englishCurriculum } from "@/data/english-curriculum";

export default function ReadingIndexPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 pt-28 text-slate-800">
      <Container>
        <section className="rounded-[3rem] bg-white/85 p-8 shadow-[0_18px_45px_rgba(14,165,233,0.12)] md:p-12">
          <p className="font-bold text-sky-600">Reading Library / 読書ライブラリー</p>
          <h1 className="mt-3 text-5xl font-black md:text-7xl">Choose your grade.</h1>
          <p className="mt-5 max-w-3xl text-slate-600">
            Each grade has 30 longer stories with slow read-aloud, vocabulary, comprehension, and activities.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-slate-500">
            各学年に30話の読み物があります。音声、語彙、読解問題、アクティビティ付きです。
          </p>
        </section>

        <section className="grid gap-5 py-10 md:grid-cols-2 lg:grid-cols-3">
          {englishCurriculum.map((grade) => (
            <Link key={grade.grade} href={`/reading/${grade.grade}`}>
              <Card className="h-full transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(14,165,233,0.2)]">
                <p className="font-bold text-sky-600">Grade {grade.grade}</p>
                <h2 className="mt-2 text-2xl font-black">{grade.level}</h2>
                <p className="mt-3 text-sm text-slate-600">30 longer stories · read-aloud · comprehension</p>
              </Card>
            </Link>
          ))}
        </section>
      </Container>
    </main>
  );
}
