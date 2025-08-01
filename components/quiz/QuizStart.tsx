'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { useLanguage } from "@/lib/i18n/context";

interface QuizStartProps {
  isLoading?: boolean;
}

export default function QuizStart({ isLoading = false }: QuizStartProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const handleStartQuiz = (petType: 'dog' | 'cat') => {
    // Force a clean navigation
    router.push(`/quiz/${petType}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('quizStart.title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('quizStart.description')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer group h-full flex flex-col"
          onClick={() => handleStartQuiz('dog')}
        >
          <CardHeader className="text-center flex-grow">
            <div className="text-6xl mb-4">🐕</div>
            <CardTitle className="text-2xl mb-3">{t('quizStart.dogQuizTitle')}</CardTitle>
            <CardDescription className="text-base leading-relaxed min-h-[3rem] flex items-center justify-center">
              {t('quizStart.dogQuizDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleStartQuiz('dog');
              }}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? t('quizStart.starting') : t('quizStart.startDogQuiz')}
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer group h-full flex flex-col"
          onClick={() => handleStartQuiz('cat')}
        >
          <CardHeader className="text-center flex-grow">
            <div className="text-6xl mb-4">🐱</div>
            <CardTitle className="text-2xl mb-3">{t('quizStart.catQuizTitle')}</CardTitle>
            <CardDescription className="text-base leading-relaxed min-h-[3rem] flex items-center justify-center">
              {t('quizStart.catQuizDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleStartQuiz('cat');
              }}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? t('quizStart.starting') : t('quizStart.startCatQuiz')}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">{t('quizStart.howItWorksTitle')}</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <h3 className="font-semibold mb-2">{t('quizStart.step1Title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('quizStart.step1Description')}
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <h3 className="font-semibold mb-2">{t('quizStart.step2Title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('quizStart.step2Description')}
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">3</span>
            </div>
            <h3 className="font-semibold mb-2">{t('quizStart.step3Title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('quizStart.step3Description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}