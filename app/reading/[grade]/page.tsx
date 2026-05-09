import { notFound } from "next/navigation";
import { ReadingLibraryClient } from "@/components/learning/reading-library-client";
import {
  englishCurriculum,
  getGradeCurriculum,
} from "@/data/english-curriculum";
import { getReadingStoriesForGrade } from "@/data/reading-library";

export function generateStaticParams() {
  return englishCurriculum.map((grade) => ({
    grade: String(grade.grade),
  }));
}

export default async function GradeReadingPage({
  params,
}: {
  params: Promise<{ grade: string }>;
}) {
  const { grade: gradeParam } = await params;
  const gradeNumber = Number(gradeParam);

  if (!Number.isInteger(gradeNumber)) notFound();

  const grade = getGradeCurriculum(gradeNumber);
  if (!grade) notFound();

  const stories = getReadingStoriesForGrade(gradeNumber);
  if (!stories.length) notFound();

  return <ReadingLibraryClient grade={gradeNumber} stories={stories} />;
}
