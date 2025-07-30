// Quick test to verify all questions are loaded
const { dogQuestions, catQuestions } = require('./data/quiz-data.ts');

console.log('🐕 DOG QUESTIONS:', dogQuestions.length);
dogQuestions.forEach((q, i) => {
  console.log(`${i + 1}. ${q.question}`);
});

console.log('\n🐱 CAT QUESTIONS:', catQuestions.length);
catQuestions.forEach((q, i) => {
  console.log(`${i + 1}. ${q.question}`);
});

console.log(`\n✅ Total: ${dogQuestions.length} dog questions, ${catQuestions.length} cat questions`);