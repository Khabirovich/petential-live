"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PetCareGuidePage() {
  const { t } = useLanguage();

  const formatListItems = (text: string) => {
    return text.split('\n').map((item, index) => (
      <div key={index} className="text-sm text-gray-700 mb-2">
        {item}
      </div>
    ));
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-gradient-hero)" }}>
      {/* Hero Section */}
      <section className="section-modern" style={{ padding: "3rem 0 2rem 0" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "2rem" }}>
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
              {t('petCareGuide.title')}
            </h1>
            <p 
              style={{
                fontSize: "var(--font-size-body-large)",
                color: "var(--petential-haiti-70)",
                lineHeight: "var(--line-height-normal)",
                marginBottom: "1rem"
              }}
            >
              {t('petCareGuide.subtitle')}
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
              {t('petCareGuide.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - 4 Core Sections */}
      <section className="section-modern" style={{ padding: "2rem 0" }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* First Days with Your Pet */}
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-4xl">🏠</div>
                  <CardTitle style={{ color: "var(--petential-dark)", fontSize: "1.5rem" }}>
                    {t('petCareGuide.firstDays.title')}
                  </CardTitle>
                </div>
                <p className="text-sm text-gray-600">
                  {t('petCareGuide.firstDays.description')}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      📋
                    </Badge>
                    {t('petCareGuide.firstDays.essentialItems')}
                  </h4>
                  <div className="space-y-1">
                    {formatListItems(t('petCareGuide.firstDays.items'))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      ✅
                    </Badge>
                    {t('petCareGuide.firstDays.preparation')}
                  </h4>
                  <div className="space-y-1">
                    {formatListItems(t('petCareGuide.firstDays.checklist'))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Care Essentials */}
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-4xl">🗓️</div>
                  <CardTitle style={{ color: "var(--petential-dark)", fontSize: "1.5rem" }}>
                    {t('petCareGuide.dailyCare.title')}
                  </CardTitle>
                </div>
                <p className="text-sm text-gray-600">
                  {t('petCareGuide.dailyCare.description')}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Badge variant="outline" className="bg-orange-100 text-orange-800">
                      🍽️
                    </Badge>
                    {t('petCareGuide.dailyCare.feeding')}
                  </h4>
                  <div className="space-y-1">
                    {formatListItems(t('petCareGuide.dailyCare.feedingInfo'))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Badge variant="outline" className="bg-purple-100 text-purple-800">
                      🏃
                    </Badge>
                    {t('petCareGuide.dailyCare.exercise')}
                  </h4>
                  <div className="space-y-1">
                    {formatListItems(t('petCareGuide.dailyCare.exerciseInfo'))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Badge variant="outline" className="bg-pink-100 text-pink-800">
                      ✨
                    </Badge>
                    {t('petCareGuide.dailyCare.grooming')}
                  </h4>
                  <div className="space-y-1">
                    {formatListItems(t('petCareGuide.dailyCare.groomingInfo'))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Basics */}
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-4xl">🏥</div>
                  <CardTitle style={{ color: "var(--petential-dark)", fontSize: "1.5rem" }}>
                    {t('petCareGuide.health.title')}
                  </CardTitle>
                </div>
                <p className="text-sm text-gray-600">
                  {t('petCareGuide.health.description')}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-100 text-red-800">
                      ⚠️
                    </Badge>
                    {t('petCareGuide.health.warning')}
                  </h4>
                  <div className="space-y-1">
                    {formatListItems(t('petCareGuide.health.signs'))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      🩺
                    </Badge>
                    {t('petCareGuide.health.vetVisit')}
                  </h4>
                  <div className="space-y-1">
                    {formatListItems(t('petCareGuide.health.emergencies'))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Training & Socialization */}
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-4xl">🎓</div>
                  <CardTitle style={{ color: "var(--petential-dark)", fontSize: "1.5rem" }}>
                    {t('petCareGuide.training.title')}
                  </CardTitle>
                </div>
                <p className="text-sm text-gray-600">
                  {t('petCareGuide.training.description')}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      📖
                    </Badge>
                    {t('petCareGuide.training.commands')}
                  </h4>
                  <div className="space-y-1">
                    {formatListItems(t('petCareGuide.training.basicCommands'))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Badge variant="outline" className="bg-teal-100 text-teal-800">
                      🤝
                    </Badge>
                    {t('petCareGuide.training.socialization')}
                  </h4>
                  <div className="space-y-1">
                    {formatListItems(t('petCareGuide.training.socializationTips'))}
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
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
                {t('petCareGuide.cta.title')}
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
                {t('petCareGuide.cta.subtitle')}
              </p>
              <Link href="/quiz" className="btn btn-primary btn-cta-large">
                {t('petCareGuide.cta.button')}
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
} 