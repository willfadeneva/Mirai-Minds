import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

const guide=[
  ["Start small", "1日15分から始めましょう。完璧より継続が大切です。"],
  ["Use the placement test", "まずレベルチェックでおすすめの学年を確認できます。"],
  ["Listen first", "最初は読むより、聞く・まねる・絵で理解することが大切です。"],
  ["Praise effort", "正解だけでなく、声に出したこと・挑戦したことをほめましょう。"],
  ["No login needed", "アカウント登録なしで使えます。進捗はこの端末だけに保存されます。"],
];
export default function ParentGuidePage(){return <main className="min-h-screen bg-midnight pt-28"><Container><section className="kid-hero rounded-[3rem] p-8"><p className="text-aqua">For families in Japan</p><h1 className="mt-3 text-5xl font-black">Parent guide / 保護者ガイド</h1><p className="mt-4 max-w-3xl text-white/70">Simple bilingual guidance for parents who want to support English learning at home.</p></section><section className="grid gap-5 py-10 md:grid-cols-2">{guide.map(([en,ja])=><Card key={en} className="p-6"><h3 className="text-2xl font-black">{en}</h3><p className="mt-3 text-white/70">{ja}</p></Card>)}</section></Container></main>}
