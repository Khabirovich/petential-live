"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NutritionGuidePage() {
  const { t } = useLanguage();

  const formatListItems = (text: string) => {
    return text.split('\n').map((item, index) => (
      <div key={index} className="text-sm text-gray-700 mb-2">
        {item}
      </div>
    ));
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
              {t('nutritionGuide.title')}
            </h1>
            <p 
              style={{
                fontSize: "var(--font-size-body-large)",
                color: "var(--petential-haiti-70)",
                lineHeight: "var(--line-height-normal)",
                marginBottom: "1rem"
              }}
            >
              {t('nutritionGuide.subtitle')}
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
              {t('nutritionGuide.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Tabs for Dog/Cat */}
      <section className="section-modern" style={{ padding: "2rem 0" }}>
        <div className="container">
          <Tabs defaultValue="dog" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="dog" className="text-lg font-semibold">
                🐕 {t('nutritionGuide.dogTab')}
              </TabsTrigger>
              <TabsTrigger value="cat" className="text-lg font-semibold">
                🐱 {t('nutritionGuide.catTab')}
              </TabsTrigger>
            </TabsList>

            {/* Dog Nutrition Content */}
            <TabsContent value="dog" className="space-y-8">
              
              {/* Essential Nutrients for Dogs */}
              <div>
                <div className="text-center mb-6">
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "var(--font-size-h1)", 
                    color: "var(--petential-dark)",
                    marginBottom: "0.5rem"
                  }}>
                    {t('nutritionGuide.nutrients.title')}
                  </h2>
                  <p className="text-gray-600">{t('nutritionGuide.nutrients.description')}</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Protein */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-100 text-red-800">🥩</Badge>
                        {t('nutritionGuide.dogNutrients.protein.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.dogNutrients.protein.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Fats */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">🫒</Badge>
                        {t('nutritionGuide.dogNutrients.fats.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.dogNutrients.fats.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Carbohydrates */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-orange-100 text-orange-800">🌾</Badge>
                        {t('nutritionGuide.dogNutrients.carbs.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.dogNutrients.carbs.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Vitamins & Minerals */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800">💊</Badge>
                        {t('nutritionGuide.dogNutrients.vitamins.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.dogNutrients.vitamins.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Water */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">💧</Badge>
                        {t('nutritionGuide.dogNutrients.water.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.dogNutrients.water.content'))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Life Stage Feeding */}
              <div>
                <div className="text-center mb-6">
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "var(--font-size-h1)", 
                    color: "var(--petential-dark)",
                    marginBottom: "0.5rem"
                  }}>
                    {t('nutritionGuide.lifeStage.title')}
                  </h2>
                  <p className="text-gray-600">{t('nutritionGuide.lifeStage.description')}</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800">🐶</Badge>
                        {t('nutritionGuide.lifeStage.puppy.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.lifeStage.puppy.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">🐕</Badge>
                        {t('nutritionGuide.lifeStage.adult.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.lifeStage.adult.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-gray-100 text-gray-800">🦮</Badge>
                        {t('nutritionGuide.lifeStage.senior.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.lifeStage.senior.content'))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Feeding Guidelines */}
              <div>
                <div className="text-center mb-6">
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "var(--font-size-h1)", 
                    color: "var(--petential-dark)",
                    marginBottom: "0.5rem"
                  }}>
                    {t('nutritionGuide.guidelines.title')}
                  </h2>
                  <p className="text-gray-600">{t('nutritionGuide.guidelines.description')}</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-100 text-purple-800">⚖️</Badge>
                        {t('nutritionGuide.guidelines.portions.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.guidelines.portions.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-indigo-100 text-indigo-800">⏰</Badge>
                        {t('nutritionGuide.guidelines.schedule.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.guidelines.schedule.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-pink-100 text-pink-800">🍖</Badge>
                        {t('nutritionGuide.guidelines.treats.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.guidelines.treats.content'))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Food Selection Tips */}
              <div>
                <div className="text-center mb-6">
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "var(--font-size-h1)", 
                    color: "var(--petential-dark)",
                    marginBottom: "0.5rem"
                  }}>
                    {t('nutritionGuide.selection.title')}
                  </h2>
                  <p className="text-gray-600">{t('nutritionGuide.selection.description')}</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-teal-100 text-teal-800">🏷️</Badge>
                        {t('nutritionGuide.selection.labels.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.selection.labels.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-emerald-100 text-emerald-800">⭐</Badge>
                        {t('nutritionGuide.selection.quality.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.selection.quality.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-100 text-red-800">❌</Badge>
                        {t('nutritionGuide.selection.mistakes.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.selection.mistakes.content'))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Cat Nutrition Content */}
            <TabsContent value="cat" className="space-y-8">
              
              {/* Essential Nutrients for Cats */}
              <div>
                <div className="text-center mb-6">
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "var(--font-size-h1)", 
                    color: "var(--petential-dark)",
                    marginBottom: "0.5rem"
                  }}>
                    {t('nutritionGuide.nutrients.title')}
                  </h2>
                  <p className="text-gray-600">{t('nutritionGuide.nutrients.description')}</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Protein (Higher Needs) */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-100 text-red-800">🥩</Badge>
                        {t('nutritionGuide.catNutrients.protein.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.catNutrients.protein.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Taurine */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-100 text-purple-800">⚡</Badge>
                        {t('nutritionGuide.catNutrients.taurine.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.catNutrients.taurine.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Fats */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">🫒</Badge>
                        {t('nutritionGuide.catNutrients.fats.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.catNutrients.fats.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Vitamins & Minerals */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800">💊</Badge>
                        {t('nutritionGuide.catNutrients.vitamins.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.catNutrients.vitamins.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Water */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">💧</Badge>
                        {t('nutritionGuide.catNutrients.water.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.catNutrients.water.content'))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Life Stage Feeding - Same for Cats */}
              <div>
                <div className="text-center mb-6">
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "var(--font-size-h1)", 
                    color: "var(--petential-dark)",
                    marginBottom: "0.5rem"
                  }}>
                    {t('nutritionGuide.lifeStage.title')}
                  </h2>
                  <p className="text-gray-600">{t('nutritionGuide.lifeStage.description')}</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800">🐱</Badge>
                        {t('nutritionGuide.lifeStage.puppy.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.lifeStage.puppy.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">🐈</Badge>
                        {t('nutritionGuide.lifeStage.adult.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.lifeStage.adult.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-gray-100 text-gray-800">🐈‍⬛</Badge>
                        {t('nutritionGuide.lifeStage.senior.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.lifeStage.senior.content'))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Feeding Guidelines - Same for Cats */}
              <div>
                <div className="text-center mb-6">
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "var(--font-size-h1)", 
                    color: "var(--petential-dark)",
                    marginBottom: "0.5rem"
                  }}>
                    {t('nutritionGuide.guidelines.title')}
                  </h2>
                  <p className="text-gray-600">{t('nutritionGuide.guidelines.description')}</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-100 text-purple-800">⚖️</Badge>
                        {t('nutritionGuide.guidelines.portions.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.guidelines.portions.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-indigo-100 text-indigo-800">⏰</Badge>
                        {t('nutritionGuide.guidelines.schedule.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.guidelines.schedule.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-pink-100 text-pink-800">🐟</Badge>
                        {t('nutritionGuide.guidelines.treats.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.guidelines.treats.content'))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Food Selection Tips - Same for Cats */}
              <div>
                <div className="text-center mb-6">
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "var(--font-size-h1)", 
                    color: "var(--petential-dark)",
                    marginBottom: "0.5rem"
                  }}>
                    {t('nutritionGuide.selection.title')}
                  </h2>
                  <p className="text-gray-600">{t('nutritionGuide.selection.description')}</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-teal-100 text-teal-800">🏷️</Badge>
                        {t('nutritionGuide.selection.labels.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.selection.labels.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-emerald-100 text-emerald-800">⭐</Badge>
                        {t('nutritionGuide.selection.quality.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.selection.quality.content'))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-100 text-red-800">❌</Badge>
                        {t('nutritionGuide.selection.mistakes.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {formatListItems(t('nutritionGuide.selection.mistakes.content'))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Foods to Avoid Section */}
      <section className="section-modern" style={{ padding: "2rem 0" }}>
        <div className="container">
          <Card className="border-2 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="text-3xl">⚠️</div>
                <div style={{ color: "var(--petential-dark)", fontSize: "1.5rem", fontWeight: "600" }}>
                  {t('nutritionGuide.avoid.title')}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-200 text-red-900">
                      ☠️
                    </Badge>
                    {t('nutritionGuide.avoid.toxic')}
                  </h4>
                  <div className="space-y-1">
                    {formatListItems(t('nutritionGuide.avoid.toxicList'))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                    <Badge variant="outline" className="bg-orange-200 text-orange-900">
                      ⚠️
                    </Badge>
                    {t('nutritionGuide.avoid.problematic')}
                  </h4>
                  <div className="space-y-1">
                    {formatListItems(t('nutritionGuide.avoid.problematicList'))}
                  </div>
                </div>
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
                {t('nutritionGuide.cta.title')}
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
                {t('nutritionGuide.cta.subtitle')}
              </p>
              <Link href="/quiz" className="btn btn-primary btn-cta-large">
                {t('nutritionGuide.cta.button')}
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
} 