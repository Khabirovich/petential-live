// Translation mapping for quiz questions and answers
export const questionTranslationKeys: Record<string, string> = {
  "Are you a beginner or an experienced owner?": "question.beginnerOrExperienced",
  "Do you have a preference for the size of your pet?": "question.petSizePreference",
  "How actively are you willing to train your dog?": "question.willingToTrain",
  "Is it important to you that the dog has guarding qualities? ": "question.guardingQualities",
  "How much exercise and activity does your ideal dog need?": "question.exerciseNeeds",
  "How long can your dog be alone during the day?": "question.aloneTime",
  "How important is it that your dog gets along with kids?": "question.dogKidsImportant",
  "How important is it that your dog gets along with other dogs?": "question.dogWithDogsImportant",
  "How much drooling can you tolerate?": "question.droolingTolerance",
  "How much grooming are you willing to do?": "question.groomingWillingDog",
  "How much barking/howling can you tolerate?": "question.barkingTolerance",
  "Do you have allergies?": "question.allergies",
  // Cat questions
  "How active of a cat are you looking for?": "question.howActiveCat",
  "How active a cat do you want?": "question.howActiveCatWant",
  "How sociable your cat should be": "question.howSociableCat",
  "What do you think about 'talkative' cats?": "question.talkativeCats",
  "Which body type do you like cats the most?": "question.catBodyType",
  "How much time are you willing to devote to grooming your cat's coat?": "question.groomingTimeDevote",
  "Does anyone in your family have an allergy to cats?": "question.catAllergies",
  "What conditions will your cat live in?": "question.catLivingConditions",
  "Are you looking for a cat that gets along with children?": "question.catWithChildren"
};

export const answerTranslationKeys: Record<string, string> = {
  // Common answers
  "Not at all": "quizAnswer.notAtAll",
  "Slightly": "quizAnswer.slightly",
  "Moderately": "quizAnswer.moderately",
  "Very": "quizAnswer.very",
  "Extremely": "quizAnswer.extremely",
  "Minimal": "quizAnswer.minimal",
  "Some": "quizAnswer.some",
  "Average": "quizAnswer.average",
  "Significant": "quizAnswer.significant",
  "Extensive": "quizAnswer.extensive",
  "Beginner": "quizAnswer.beginner",
  "Some experience": "quizAnswer.someExperience",
  "Intermediate": "quizAnswer.intermediate",
  "Experienced": "quizAnswer.experienced",
  "Very experienced": "quizAnswer.veryExperienced",
  "Very Small": "quizAnswer.verySmall",
  "Small": "quizAnswer.small",
  "Medium": "quizAnswer.medium",
  "Large": "quizAnswer.large",
  "Very Large": "quizAnswer.veryLarge",
  "Not willing": "quizAnswer.notWilling",
  "Slightly willing": "quizAnswer.slightlyWilling",
  "Willing": "quizAnswer.willing",
  "Very willing": "quizAnswer.veryWilling",
  "Extremely willing": "quizAnswer.extremelyWilling",
  "Somewhat willing": "quizAnswer.somewhatWilling",
  "Not important": "quizAnswer.notImportant",
  "Slightly important": "quizAnswer.slightlyImportant",
  "Somewhat important": "quizAnswer.somewhatImportant",
  "Important": "quizAnswer.important",
  "Very important": "quizAnswer.veryImportant",
  "Low activity": "quizAnswer.lowActivity",
  "Slightly active": "quizAnswer.slightlyActive",
  "Medium activity": "quizAnswer.mediumActivity",
  "Active": "quizAnswer.active",
  "High activity": "quizAnswer.highActivity",
  "Little time": "quizAnswer.littleTime",
  "Some time": "quizAnswer.someTime",
  "Moderate time": "quizAnswer.moderateTime",
  "More time": "quizAnswer.moreTime",
  "A lot of time": "quizAnswer.alotOfTime",
  "Very low": "quizAnswer.veryLow",
  "Very short periods": "quizAnswer.veryShortPeriods",
  "Short periods": "quizAnswer.shortPeriods",
  "Moderate periods": "quizAnswer.moderatePeriods",
  "Long periods": "quizAnswer.longPeriods",
  "Very long periods": "quizAnswer.veryLongPeriods",
  "Yes": "answer.yes",
  "No": "answer.no",
  // Cat-specific answers
  "Very relaxed": "quizAnswer.veryRelaxed",
  "Somewhat relaxed": "quizAnswer.somewhatRelaxed",
  "Somewhat active": "quizAnswer.somewhatActive",
  "Very active": "quizAnswer.veryActive",
  "No matter": "quizAnswer.noMatter",
  "I like calm cats": "quizAnswer.likeCalmCats",
  "I want a playful and curious cat": "quizAnswer.playfulAndCurious",
  "I want an active and inquisitive cat": "quizAnswer.activeAndInquisitive",
  "Sociable and loyal": "quizAnswer.sociableAndLoyal",
  "Friendly yet independent": "quizAnswer.friendlyYetIndependent",
  "Independent": "quizAnswer.independent",
  "Low": "quizAnswer.low",
  "Slightly low": "quizAnswer.slightlyLow",
  "High": "quizAnswer.high",
  "Very high": "quizAnswer.veryHigh",
  "I want a quiet cat": "quizAnswer.quietCat",
  "I want a cat that loves to socialize": "quizAnswer.lovesToSocialize",
  "I want a cat that loves to communicate": "quizAnswer.lovesToCommunicate",
  "I prefer slender and elegant breeds": "quizAnswer.slenderElegant",
  "I prefer cats of medium build": "quizAnswer.mediumBuild",
  "I prefer large breeds": "quizAnswer.largeBreeds",
  "Daily": "quizAnswer.daily",
  "Once a week": "quizAnswer.onceAWeek",
  "Indoors only": "quizAnswer.indoorsOnly",
  "Limited access to the street": "quizAnswer.limitedStreetAccess",
  "Free access to the street": "quizAnswer.freeStreetAccess"
};

// Function to translate questions and answers
export function translateQuizData(questions: any[], t: (key: string) => string) {
  return questions.map(q => ({
    ...q,
    question: questionTranslationKeys[q.question] ? t(questionTranslationKeys[q.question]) : q.question,
    answers: translateAnswers(q.answers, t)
  }));
}

function translateAnswers(answers: Record<string, number> | string[], t: (key: string) => string) {
  if (Array.isArray(answers)) {
    return answers.map(answer => 
      answerTranslationKeys[answer] ? t(answerTranslationKeys[answer]) : answer
    );
  } else {
    const translatedAnswers: Record<string, number> = {};
    Object.entries(answers).forEach(([key, value]) => {
      const translatedKey = answerTranslationKeys[key] ? t(answerTranslationKeys[key]) : key;
      translatedAnswers[translatedKey] = value;
    });
    return translatedAnswers;
  }
}

// CLEANED QUESTIONS - NO DUPLICATES - MATCHES BACKEND
export const dogQuestions: Array<{
  question: string;
  characteristic: string;
  answers: Record<string, number> | string[];
}> = [
    {
      question: "Are you a beginner or an experienced owner?",
      answers: {
        "Beginner": 1,
        "Some experience": 2,
        "Intermediate": 3,
        "Experienced": 4,
        "Very experienced": 5
      },
      characteristic: "Owner Experience"
    },
    {
      question: "Do you have a preference for the size of your pet?",
      answers: {
        "Small": 1,
        "Slightly small": 2,
        "Medium": 3,
        "Large": 4,
        "Very Large": 5
      },
      characteristic: "Dog Size"
    },
    {
      question: "How actively are you willing to train your dog?",
      answers: {
        "Not willing": 1,
        "Slightly willing": 2,
        "Somewhat willing": 3,
        "Willing": 4,
        "Very willing": 5
      },
      characteristic: "Training Level"
    },
    {
      question: "Is it important to you that the dog has guarding qualities? ",
      answers: {
        "Not important": 1,
        "Slightly important": 2,
        "Somewhat important": 3,
        "Important": 4,
        "Very important": 5
      },
      characteristic: "Guarding Level"
    },
    {
      question: "How much exercise and activity does your ideal dog need?",
      answers: {
        "Very low": 1,
        "Low": 2,
        "Moderate": 3,
        "High": 4,
        "Very high": 5
      },
      characteristic: "Exercise Needs"
    },
    {
      question: "How long can your dog be alone during the day?",
      answers: {
        "Very short periods": 1,
        "Short periods": 2,
        "Moderate periods": 3,
        "Long periods": 4,
        "Very long periods": 5
      },
      characteristic: "Tolerates Being Alone"
    },
    {
      question: "How important is it that your dog gets along with kids?",
      answers: {
        "Not important": 1,
        "Slightly important": 2,
        "Somewhat important": 3,
        "Important": 4,
        "Very important": 5
      },
      characteristic: "Kid-Friendly"
    },
    {
      question: "How important is it that your dog gets along with other dogs?",
      answers: {
        "Not important": 1,
        "Slightly important": 2,
        "Somewhat important": 3,
        "Important": 4,
        "Very important": 5
      },
      characteristic: "Dog Friendly"
    },
    {
      question: "How much drooling can you tolerate?",
      answers: {
        "Low": 1,
        "Slightly low": 2,
        "Medium": 3,
        "High": 4,
        "Very high": 5
      },
      characteristic: "Drooling Level"
    },
    {
      question: "How much grooming are you willing to do?",
      answers: {
        "Low": 1,
        "Slightly low": 2,
        "Medium": 3,
        "High": 4,
        "Very high": 5
      },
      characteristic: "Grooming Level"
    },
    {
      question: "How much barking/howling can you tolerate?",
      answers: {
        "Low": 1,
        "Slightly low": 2,
        "Medium": 3,
        "High": 4,
        "Very high": 5
      },
      characteristic: "Tendency To Bark Or Howl"
    },
    {
      question: "Do you have allergies?",
      answers: {
        "No": 1,
        "Yes": 5
      },
      characteristic: "Hyperalergic (1 - no, 2 - yes)"
    }
  ];

export const catQuestions: Array<{
  question: string;
  characteristic: string;
  answers: Record<string, number> | string[];
}> = [
    {
      question: "How active of a cat are you looking for?",
      characteristic: "activity",
      answers: ["Very relaxed", "Somewhat relaxed", "Average", "Somewhat active", "Very active"]
    },
    {
      question: "How much grooming are you willing to do?",
      characteristic: "grooming",
      answers: ["Minimal", "Some", "Average", "Significant", "Extensive"]
    },
    {
      question: "How active a cat do you want?",
      answers: {
        "No matter": 2,
        "I like calm cats": 1,
        "I want a playful and curious cat": 3,
        "I want an active and inquisitive cat": 4
      },
      characteristic: "Activity"
    },
    {
      question: "How sociable your cat should be",
      answers: {
        "No matter": 2,
        "Sociable and loyal": 4,
        "Friendly yet independent": 3,
        "Independent": 1
      },
      characteristic: "Sociable"
    },
    {
      question: "What do you think about 'talkative' cats?",
      answers: {
        "No matter": 2,
        "I want a quiet cat": 1,
        "I want a cat that loves to socialize": 3,
        "I want a cat that loves to communicate": 4
      },
      characteristic: "Talkative"
    },
    {
      question: "Which body type do you like cats the most?",
      answers: {
        "No matter": 2,
        "I prefer slender and elegant breeds": 1,
        "I prefer cats of medium build": 3,
        "I prefer large breeds": 4
      },
      characteristic: "Size"
    },
    {
      question: "How much time are you willing to devote to grooming your cat's coat?",
      answers: {
        "No matter": 2,
        "Daily": 4,
        "Once a week": 3
      },
      characteristic: "Grooming"
    },
    {
      question: "Does anyone in your family have an allergy to cats?",
      answers: {
        "Yes": 1,
        "No": 4
      },
      characteristic: "Allergy"
    },
    {
      question: "What conditions will your cat live in?",
      answers: {
        "No matter": 2,
        "Indoors only": 4,
        "Limited access to the street": 3,
        "Free access to the street": 1
      },
      characteristic: "Home conditions"
    },
    {
      question: "Are you looking for a cat that gets along with children?",
      answers: {
        "No matter": 2,
        "Yes": 4,
        "No": 1
      },
      characteristic: "Good with children"
    }
  ];

// Import breed data
import dogBreedsData from './breeds.json';
import catBreedsData from './cats_breeds.json';

export const dogBreeds = dogBreedsData;
export const catBreeds = catBreedsData;

// Your REAL breed matching algorithm
export function calculateBreedScores(petType: 'dog' | 'cat', answers: any[]) {
  const breeds = petType === 'dog' ? dogBreeds : catBreeds;
  const breedKey = petType === 'dog' ? 'Dog Breeds' : 'Cat Breeds';

  // Initialize scores
  const scores: { [key: string]: number } = {};
  breeds.forEach((breed: any) => {
    scores[breed[breedKey]] = 0;
  });

  // Calculate compatibility for each answer using YOUR algorithm
  answers.forEach(answerData => {
    const { characteristic, answer_weight } = answerData;
    const weight = parseInt(String(answer_weight));

    breeds.forEach((breed: any) => {
      if (breed[characteristic] !== undefined) {
        const breedValue = breed[characteristic];
        // YOUR algorithm: Calculate compatibility (5 - absolute difference)
        const compatibility = 5 - Math.abs(breedValue - weight);
        scores[breed[breedKey]] += compatibility;
      }
    });
  });

  // Find the maximum score achieved by any breed
  const maxActualScore = Math.max(...Object.values(scores));

  // Normalize scores to percentages ensuring max is 100%
  const breedScores = Object.entries(scores).map(([name, score]) => ({
    name,
    score: maxActualScore > 0 ? Math.min(100, (score / maxActualScore) * 100) : 0,
    image: '' // Will be populated by the results page
  }));

  // Sort by score and return top breeds
  return breedScores.sort((a, b) => b.score - a.score);
}