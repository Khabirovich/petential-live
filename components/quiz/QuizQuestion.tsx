import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question } from '@/hooks/useQuiz';
import { useLanguage } from "@/lib/i18n/context";

interface QuizQuestionProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  petType: 'dog' | 'cat';
  onSubmitAnswer: (answer: string, weight: string | number) => Promise<{ completed: boolean }>;
  onPrevious?: () => void;
  onSkip?: () => void;
  isLoading: boolean;
}

export default function QuizQuestion({
  question,
  currentQuestion,
  totalQuestions,
  petType,
  onSubmitAnswer,
  onPrevious,
  onSkip,
  isLoading
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [selectedWeight, setSelectedWeight] = useState<string | number>('');
  const { t } = useLanguage();

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    
    // Handle different answer formats
    if (typeof question.answers === 'object' && !Array.isArray(question.answers)) {
      // Object format: { "Answer": weight }
      setSelectedWeight(question.answers[answer]);
    } else if (Array.isArray(question.answers)) {
      // Array format: ["Answer1", "Answer2"] - weight is index + 1
      setSelectedWeight(question.answers.indexOf(answer) + 1);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) return;
    
    const result = await onSubmitAnswer(selectedAnswer, selectedWeight);
    
    // Reset selection for next question
    if (!result.completed) {
      setSelectedAnswer('');
      setSelectedWeight('');
    }
  };

  const renderAnswers = () => {
    let answers: Array<{ text: string; value: string; weight: string | number }> = [];

    if (typeof question.answers === 'object' && !Array.isArray(question.answers)) {
      // Object format: { "Answer": weight }
      answers = Object.entries(question.answers).map(([text, weight]) => ({
        text,
        value: text,
        weight
      }));
    } else if (Array.isArray(question.answers)) {
      // Array format: ["Answer1", "Answer2"]
      answers = question.answers.map((text, index) => ({
        text,
        value: text,
        weight: index + 1
      }));
    }

    return (
      <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
        <div className="space-y-3">
          {answers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <RadioGroupItem value={answer.value} id={`answer-${index}`} />
              <Label 
                htmlFor={`answer-${index}`} 
                className="flex-1 cursor-pointer text-sm font-medium"
              >
                {answer.text}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 pt-24">
      {/* Progress Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            {t('common.question')} {currentQuestion + 1} {t('common.of')} {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(progress)}% {t('common.complete')}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center text-lg">
            {petType.charAt(0).toUpperCase() + petType.slice(1)} {t('quiz.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-6 text-center">
            {question.question}
          </h2>
          
          {renderAnswers()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestion === 0 || isLoading}
        >
          ← {t('quiz.previous')}
        </Button>

        <Button
          variant="ghost"
          onClick={onSkip}
          disabled={isLoading}
        >
          {t('quiz.skip')}
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={!selectedAnswer || isLoading}
        >
          {isLoading ? t('common.loading') : t('quiz.next')} →
        </Button>
      </div>
    </div>
  );
}