import { useState, useCallback } from 'react';
import { dogQuestions, catQuestions, translateQuizData } from '@/data/quiz-data';

export interface Question {
  question: string;
  characteristic: string;
  answers: Record<string, number> | string[];
}

export interface QuizState {
  petType: 'dog' | 'cat' | null;
  currentQuestion: number;
  totalQuestions: number;
  question: Question | null;
  answers: Array<{
    question: string;
    answer: string;
    answer_weight: string | number;
    characteristic: string;
  }>;
  isLoading: boolean;
  error: string | null;
  translatedQuestions: Question[];
}

const initialState: QuizState = {
  petType: null,
  currentQuestion: 0,
  totalQuestions: 0,
  question: null,
  answers: [],
  isLoading: false,
  error: null,
  translatedQuestions: [],
};

export function useQuiz(t?: (key: string) => string) {
  const [state, setState] = useState<QuizState>(initialState);

  const startQuiz = useCallback(async (petType: 'dog' | 'cat') => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const rawQuestions = petType === 'dog' ? dogQuestions : catQuestions;
      const questions = t ? translateQuizData(rawQuestions, t) : rawQuestions;
      
      if (!questions || questions.length === 0) {
        throw new Error(`No questions found for ${petType}`);
      }
      
      setState({
        petType,
        currentQuestion: 0,
        totalQuestions: questions.length,
        question: questions[0],
        answers: [],
        isLoading: false,
        error: null,
        translatedQuestions: questions,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to start quiz',
        translatedQuestions: [],
      }));
    }
  }, [t]);

  const loadQuestion = useCallback(async (questionIndex: number) => {
    const questions = state.translatedQuestions.length > 0 ? state.translatedQuestions : 
                     (state.petType === 'dog' ? dogQuestions : catQuestions);
    
    if (questionIndex >= 0 && questionIndex < questions.length) {
      setState(prev => ({
        ...prev,
        currentQuestion: questionIndex,
        question: questions[questionIndex],
      }));
    }
  }, [state.petType, state.translatedQuestions]);

  const submitAnswer = useCallback(async (
    answer: string,
    answerWeight: string | number
  ) => {
    if (!state.question) return { completed: false };

    const answerData = {
      question: state.question.question,
      answer,
      answer_weight: answerWeight,
      characteristic: state.question.characteristic,
    };

    const newAnswers = [...state.answers, answerData];
    const questions = state.petType === 'dog' ? dogQuestions : catQuestions;
    const nextQuestionIndex = state.currentQuestion + 1;

    setState(prev => ({
      ...prev,
      answers: newAnswers,
    }));

    if (nextQuestionIndex >= questions.length) {
      return { completed: true };
    } else {
      await loadQuestion(nextQuestionIndex);
      return { completed: false };
    }
  }, [state.question, state.answers, state.currentQuestion, state.petType, loadQuestion]);

  const resetQuiz = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    startQuiz,
    loadQuestion,
    submitAnswer,
    resetQuiz,
  };
}