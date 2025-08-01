import { Metadata } from 'next';
import QuizStart from '@/components/quiz/QuizStart';
import { pageSEO } from "@/lib/seo/config"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = generateSEOMetadata(pageSEO.quiz.en);

export default function QuizPage() {
  return <QuizStart />;
}