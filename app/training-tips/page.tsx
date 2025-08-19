"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TrainingTipsPage() {
  const { t } = useLanguage();
  const [quizResult, setQuizResult] = useState<any>(null);

  useEffect(() => {
    // Check for quiz results in localStorage
    const stored = localStorage.getItem('quiz-results');
    if (stored) {
      try {
        const results = JSON.parse(stored);
        if (results && results.length > 0) {
          setQuizResult(results[0]); // Get the most recent result
        }
      } catch (error) {
        console.error('Error parsing quiz results:', error);
      }
    }
  }, []);

  const formatListItems = (text: string) => {
    return (
      <ul className="space-y-2 list-none">
        {text.split('\n').map((item, index) => (
          <li key={index} className="text-sm text-gray-700 pl-0">
            {item}
          </li>
        ))}
      </ul>
    );
  };

  const CardTitleWithBadge = ({ badge, title, badgeColor }: { badge: string; title: string; badgeColor: string }) => (
    <>
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="outline" className={badgeColor}>{badge}</Badge>
      </div>
      <CardTitle>{title}</CardTitle>
    </>
  );

  const getBreedSpecificAdvice = (breed: string, petType: string) => {
    // Simple breed-specific advice - in a real app, this would come from a database
    const advice = {
      dog: {
        "Border Collie": "Border Collies are highly intelligent and need mental stimulation. Use puzzle toys and teach complex tricks. They excel at agility training and respond well to positive reinforcement.",
        "Golden Retriever": "Golden Retrievers are eager to please and food-motivated. Use treats for training and focus on recall commands as they love to explore. They're naturally gentle and great with children.",
        "German Shepherd": "German Shepherds are working dogs that need structure. Establish yourself as the leader through consistent training. They excel at protection training and need early socialization.",
        default: "This breed benefits from consistent, positive reinforcement training. Start early with basic commands and socialization."
      } as Record<string, string>,
      cat: {
        "Siamese": "Siamese cats are vocal and intelligent. They can learn to walk on a leash and respond well to clicker training. Use their social nature for training sessions.",
        "Persian": "Persian cats are calm and gentle. Keep training sessions short and gentle. Focus on positive experiences and use soft voices for commands.",
        "Maine Coon": "Maine Coons are intelligent and dog-like. They can learn fetch and come when called. Use their food motivation for training success.",
        default: "This breed responds well to patience and positive reinforcement. Keep sessions short and reward-based."
      } as Record<string, string>
    };

    const petAdvice = advice[petType as keyof typeof advice];
    return petAdvice?.[breed] || petAdvice?.default || "This breed responds well to positive reinforcement training methods.";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-modern-first">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "var(--spacing-xl)" }}>
            <h1 
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-hero)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--petential-dark)",
                marginBottom: "1rem",
                lineHeight: "var(--line-height-tight)"
              }}
            >
              {t('trainingTips.title')}
            </h1>
            <p 
              style={{
                fontSize: "var(--font-size-body-large)",
                color: "var(--petential-haiti-70)",
                lineHeight: "var(--line-height-normal)",
                marginBottom: "1rem"
              }}
            >
              {t('trainingTips.subtitle')}
            </p>
            <p 
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--petential-haiti-70)",
                lineHeight: "var(--line-height-normal)",
                maxWidth: "800px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              {t('trainingTips.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Personalized Section */}
      {quizResult && (
        <section className="section-modern" style={{ padding: "1rem 0" }}>
          <div className="container">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🎯</div>
                  <div>
                    <CardTitle style={{ color: "var(--petential-dark)", fontSize: "1.5rem", marginBottom: "0.5rem", fontWeight: "600" }}>
                      {t('trainingTips.personalized.title')}
                    </CardTitle>
                    <p className="text-sm font-normal text-gray-600">
                      Based on your quiz result: <strong>{quizResult.breedName}</strong>
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {getBreedSpecificAdvice(quizResult.breedName, quizResult.petType)}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Main Content - Tabs for Dog/Cat */}
      <section className="section-modern" style={{ padding: "2rem 0" }}>
        <div className="container">
          <Tabs defaultValue="dog" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="dog" className="text-lg font-semibold">
                🐕 {t('trainingTips.dogTab')}
              </TabsTrigger>
              <TabsTrigger value="cat" className="text-lg font-semibold">
                🐱 {t('trainingTips.catTab')}
              </TabsTrigger>
            </TabsList>

            {/* Dog Training Content */}
            <TabsContent value="dog" className="space-y-8">
              {/* Basic Commands for Dogs */}
              <div>
                <div className="text-center mb-6">
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "var(--font-size-h1)", 
                    color: "var(--petential-dark)",
                    marginBottom: "0.5rem"
                  }}>
                    {t('trainingTips.basicCommands.title')}
                  </h2>
                  <p className="text-gray-600">{t('trainingTips.basicCommands.description')}</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Sit Command */}
                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="📚" title={t('trainingTips.dogCommands.sit.title')} badgeColor="bg-blue-100 text-blue-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.dogCommands.sit.steps'))}
                    </CardContent>
                  </Card>

                  {/* Stay Command */}
                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="✋" title={t('trainingTips.dogCommands.stay.title')} badgeColor="bg-green-100 text-green-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.dogCommands.stay.steps'))}
                    </CardContent>
                  </Card>

                  {/* Come Command */}
                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="🏃" title={t('trainingTips.dogCommands.come.title')} badgeColor="bg-yellow-100 text-yellow-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.dogCommands.come.steps'))}
                    </CardContent>
                  </Card>

                  {/* Down Command */}
                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="⬇️" title={t('trainingTips.dogCommands.down.title')} badgeColor="bg-purple-100 text-purple-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.dogCommands.down.steps'))}
                    </CardContent>
                  </Card>

                  {/* No Command */}
                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="🚫" title={t('trainingTips.dogCommands.no.title')} badgeColor="bg-red-100 text-red-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.dogCommands.no.steps'))}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Socialization for Dogs */}
              <div>
                <div className="text-center mb-6">
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "var(--font-size-h1)", 
                    color: "var(--petential-dark)",
                    marginBottom: "0.5rem"
                  }}>
                    {t('trainingTips.socialization.title')}
                  </h2>
                  <p className="text-gray-600">{t('trainingTips.socialization.description')}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="👥" title={t('trainingTips.socialization.people.title')} badgeColor="bg-blue-100 text-blue-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.socialization.people.content'))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="🐕" title={t('trainingTips.socialization.animals.title')} badgeColor="bg-green-100 text-green-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.socialization.animals.content'))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="🌍" title={t('trainingTips.socialization.environment.title')} badgeColor="bg-purple-100 text-purple-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.socialization.environment.content'))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="🎂" title={t('trainingTips.socialization.age.title')} badgeColor="bg-orange-100 text-orange-800" />
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">Puppies:</h4>
                        <p className="text-sm text-gray-700">{t('trainingTips.socialization.age.puppy')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">Adults:</h4>
                        <p className="text-sm text-gray-700">{t('trainingTips.socialization.age.adult')}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Problem Solving for Dogs */}
              <div>
                <div className="text-center mb-6">
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "var(--font-size-h1)", 
                    color: "var(--petential-dark)",
                    marginBottom: "0.5rem"
                  }}>
                    {t('trainingTips.problemSolving.title')}
                  </h2>
                  <p className="text-gray-600">{t('trainingTips.problemSolving.description')}</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="🔊" title={t('trainingTips.problems.barking.title')} badgeColor="bg-red-100 text-red-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.problems.barking.solution'))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="🦴" title={t('trainingTips.problems.chewing.title')} badgeColor="bg-orange-100 text-orange-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.problems.chewing.solution'))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="🤸" title={t('trainingTips.problems.jumping.title')} badgeColor="bg-blue-100 text-blue-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.problems.jumping.solution'))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Cat Training Content */}
            <TabsContent value="cat" className="space-y-8">
              {/* Basic Training for Cats */}
              <div>
                <div className="text-center mb-6">
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "var(--font-size-h1)", 
                    color: "var(--petential-dark)",
                    marginBottom: "0.5rem"
                  }}>
                    {t('trainingTips.basicCommands.title')}
                  </h2>
                  <p className="text-gray-600">{t('trainingTips.basicCommands.description')}</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Litter Training */}
                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="📦" title={t('trainingTips.catTraining.litter.title')} badgeColor="bg-blue-100 text-blue-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.catTraining.litter.steps'))}
                    </CardContent>
                  </Card>

                  {/* Scratching Post */}
                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="🪵" title={t('trainingTips.catTraining.scratching.title')} badgeColor="bg-green-100 text-green-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.catTraining.scratching.steps'))}
                    </CardContent>
                  </Card>

                  {/* Carrier Training */}
                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="👜" title={t('trainingTips.catTraining.carrier.title')} badgeColor="bg-purple-100 text-purple-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.catTraining.carrier.steps'))}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Socialization for Cats */}
              <div>
                <div className="text-center mb-6">
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "var(--font-size-h1)", 
                    color: "var(--petential-dark)",
                    marginBottom: "0.5rem"
                  }}>
                    {t('trainingTips.socialization.title')}
                  </h2>
                  <p className="text-gray-600">{t('trainingTips.socialization.description')}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="👥" title={t('trainingTips.socialization.people.title')} badgeColor="bg-blue-100 text-blue-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.socialization.people.content'))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="🐱" title={t('trainingTips.socialization.animals.title')} badgeColor="bg-green-100 text-green-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.socialization.animals.content'))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="🌍" title={t('trainingTips.socialization.environment.title')} badgeColor="bg-purple-100 text-purple-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.socialization.environment.content'))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="🎂" title={t('trainingTips.socialization.age.title')} badgeColor="bg-orange-100 text-orange-800" />
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">Kittens:</h4>
                        <p className="text-sm text-gray-700">{t('trainingTips.socialization.age.kitten')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">Adults:</h4>
                        <p className="text-sm text-gray-700">{t('trainingTips.socialization.age.adult')}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Problem Solving for Cats */}
              <div>
                <div className="text-center mb-6">
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "var(--font-size-h1)", 
                    color: "var(--petential-dark)",
                    marginBottom: "0.5rem"
                  }}>
                    {t('trainingTips.problemSolving.title')}
                  </h2>
                  <p className="text-gray-600">{t('trainingTips.problemSolving.description')}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="📦" title={t('trainingTips.problems.catLitter.title')} badgeColor="bg-blue-100 text-blue-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.problems.catLitter.solution'))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitleWithBadge badge="😾" title={t('trainingTips.problems.catAggression.title')} badgeColor="bg-orange-100 text-orange-800" />
                    </CardHeader>
                    <CardContent>
                      {formatListItems(t('trainingTips.problems.catAggression.solution'))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Professional Help Section */}
      <section className="section-modern" style={{ padding: "2rem 0" }}>
        <div className="container">
          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="text-3xl">👨‍⚕️</div>
                <CardTitle style={{ color: "var(--petential-dark)", fontSize: "1.5rem" }}>
                  {t('trainingTips.professional.title')}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Signs you should seek professional help:</h4>
                {formatListItems(t('trainingTips.professional.signs'))}
              </div>
              <div className="p-4 bg-white rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Remember:</strong> {t('trainingTips.professional.benefits')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-modern" style={{ padding: "2rem 0" }}>
        <div className="container">
          <Card style={{ background: "var(--bg-gradient-secondary)" }} className="text-center">
            <CardContent className="py-12">
              <h2 
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-h1)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--petential-dark)",
                  marginBottom: "1rem"
                }}
              >
                {t('trainingTips.cta.title')}
              </h2>
              <p 
                style={{
                  fontSize: "var(--font-size-body-large)",
                  color: "var(--petential-haiti-70)",
                  marginBottom: "2rem",
                  maxWidth: "600px",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                {t('trainingTips.cta.subtitle')}
              </p>
              <Link href="/quiz" className="btn btn-primary btn-cta-large">
                {t('trainingTips.cta.button')}
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
} 