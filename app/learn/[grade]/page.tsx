import { notFound } from "next/navigation";
import { GradeDetail } from "@/components/learning/grade-detail";
import { englishCurriculum, getGradeCurriculum } from "@/data/english-curriculum";

export function generateStaticParams() {
  return englishCurriculum.map((grade) => ({ grade: String(grade.grade) }));
}

export default async function GradePage({ params }: { params: Promise<{ grade: string }> }) {
  const { grade: gradeParam } = await params;
  const grade = getGradeCurriculum(Number(gradeParam));
  if (!grade) notFound();
  return <GradeDetail grade={grade} />;
}
