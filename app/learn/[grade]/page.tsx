import { notFound } from "next/navigation";import { GradeDetail } from "@/components/learning/grade-detail";import { englishCurriculum,getGradeCurriculum } from "@/data/english-curriculum";
export function generateStaticParams(){return englishCurriculum.map(g=>({grade:String(g.grade)}))}
export default function GradePage({params}:{params:{grade:string}}){const grade=getGradeCurriculum(Number(params.grade));if(!grade)notFound();return <GradeDetail grade={grade}/>}
