// API service for communicating with Flask backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

console.log('🔗 API Base URL:', API_BASE_URL);

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      credentials: 'include', // Include cookies for session management
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request<{ status: string; message: string }>('/health');
  }

  // Quiz endpoints
  async startQuiz(petType: 'dog' | 'cat') {
    return this.request<{
      pet_type: string;
      total_questions: number;
      first_question: any;
    }>(`/quiz/start/${petType}`, {
      method: 'POST',
    });
  }

  async getQuestion(questionIndex: number) {
    return this.request<{
      question: any;
      current_question: number;
      total_questions: number;
    }>(`/question/${questionIndex}`);
  }

  async submitAnswer(answerData: {
    question: string;
    answer: string;
    answer_weight: string | number;
    characteristic: string;
  }) {
    return this.request<{
      status: 'complete' | 'next';
      next_question?: number;
    }>('/submit_answer', {
      method: 'POST',
      body: JSON.stringify(answerData),
    });
  }

  async getResults() {
    return this.request<{
      pet_type: string;
      breeds: Array<{ name: string; score: number; image: string }>;
      high_match: Array<{ name: string; score: number; image: string }>;
      medium_match: Array<{ name: string; score: number; image: string }>;
      low_match: Array<{ name: string; score: number; image: string }>;
    }>('/results');
  }

  // Breed details
  async getBreedDetails(petType: 'dog' | 'cat', breedName: string, language: string = 'en') {
    return this.request<{
      pet_type: string;
      breed_name: string;
      breed_data: any;
      images: string[];
      description: string;
      language: string;
    }>(`/breed/${petType}/${encodeURIComponent(breedName)}?lang=${language}`);
  }

  // Feedback
  async submitFeedback(feedbackData: {
    name: string;
    email: string;
    feedback_type: string;
    rating: string;
    features_used: string[];
    message: string;
    suggestions: string;
    allow_follow_up: boolean;
    newsletter_signup: boolean;
  }) {
    return this.request<{
      status: 'success' | 'error';
      message: string;
    }>('/feedback', {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    });
  }
}

export const apiService = new ApiService();
export default apiService;