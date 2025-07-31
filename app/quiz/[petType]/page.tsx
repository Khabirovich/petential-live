'use client';

import { useQuiz } from '@/hooks/useQuiz';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { calculateBreedScores } from '@/data/quiz-data';
import { useLanguage } from '@/lib/i18n/context';

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const petType = params.petType as 'dog' | 'cat';
  const { t } = useLanguage();

  const {
    currentQuestion,
    totalQuestions,
    question,
    answers,
    isLoading,
    error,
    startQuiz,
    loadQuestion,
    submitAnswer,
    resetQuiz
  } = useQuiz(t);

  // Start quiz automatically when page loads
  useEffect(() => {
    if (petType && (petType === 'dog' || petType === 'cat')) {
      // Reset quiz first, then start new one
      resetQuiz();
      setTimeout(() => {
        startQuiz(petType);
      }, 100);
    } else {
      router.push('/');
    }
  }, [petType, startQuiz, resetQuiz, router]);

  const handleSubmitAnswer = async (answer: string, weight: string | number) => {
    const result = await submitAnswer(answer, weight);

    if (result.completed) {
      // Get the final answers including this last one
      const finalAnswers = [...answers, {
        question: question?.question || '',
        answer,
        answer_weight: weight,
        characteristic: question?.characteristic || '',
      }];

      try {
        // Call backend API directly with all answers for breed scoring
        const response = await fetch('http://localhost:5001/api/calculate-scores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pet_type: petType,
            answers: finalAnswers
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get results from backend');
        }

        const results = await response.json();

        localStorage.setItem('quizResults', JSON.stringify(results));
        router.push('/results');
      } catch (error) {
        console.error('Error getting results:', error);
        // Fallback to local calculation
        const breedScores = calculateBreedScores(petType!, finalAnswers);
        const topBreeds = breedScores.slice(0, 9);

        const results = {
          pet_type: petType,
          breeds: topBreeds,
          high_match: topBreeds.slice(0, 3),
          medium_match: topBreeds.slice(3, 6),
          low_match: topBreeds.slice(6, 9)
        };

        localStorage.setItem('quizResults', JSON.stringify(results));
        router.push('/results');
      }
    }

    return result;
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      loadQuestion(currentQuestion - 1);
    }
  };

  const handleSkip = () => {
    if (currentQuestion < totalQuestions - 1) {
      loadQuestion(currentQuestion + 1);
    } else {
      // Last question, go to results
      router.push('/results');
    }
  };

  // Show error if any
  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4 text-center">
          <button
            onClick={resetQuiz}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {t('quiz.startOver')}
          </button>
        </div>
      </div>
    );
  }

  // Show loading spinner
  if (isLoading || !question) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{t('quiz.loading')} {petType} {t('common.quiz')}...</span>
      </div>
    );
  }

  // Show quiz question
  return (
    <QuizQuestion
      question={question}
      currentQuestion={currentQuestion}
      totalQuestions={totalQuestions}
      petType={petType}
      onSubmitAnswer={handleSubmitAnswer}
      onPrevious={currentQuestion > 0 ? handlePrevious : undefined}
      onSkip={handleSkip}
      isLoading={isLoading}
    />
  );
}