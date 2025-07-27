"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Insurance data
const insuranceData = [
  {
    company: "Liberty Seguros",
    minCost: 40,
    civilLiability: "300,000",
    veterinaryCare: "insurance.liberty.coverage",
    additionalServices: "insurance.liberty.additional",
    targetAnimals: "insurance.dogsAndCats",
    website: "https://www.libertyseguros.es"
  },
  {
    company: "Mapfre",
    minCost: 93,
    civilLiability: "150,000",
    veterinaryCare: "insurance.mapfre.coverage",
    additionalServices: "insurance.mapfre.additional",
    targetAnimals: "insurance.dogsAndCats",
    website: "https://www.mapfre.es"
  },
  {
    company: "AXA",
    minCost: 26,
    civilLiability: "60,000 - 1,200,000",
    veterinaryCare: "insurance.axa.coverage",
    additionalServices: "insurance.axa.additional",
    targetAnimals: "insurance.dogsMandatory",
    website: "https://www.axa.es"
  },
  {
    company: "Línea Directa",
    minCost: 59.90,
    civilLiability: "200,000",
    veterinaryCare: "insurance.linea.coverage",
    additionalServices: "insurance.linea.additional",
    targetAnimals: "insurance.dogsAndCats",
    website: "https://www.lineadirecta.com"
  },
  {
    company: "Asisa Seguros",
    minCost: 50,
    civilLiability: "250,000",
    veterinaryCare: "insurance.asisa.coverage",
    additionalServices: "insurance.asisa.additional",
    targetAnimals: "insurance.dogsAndCats",
    website: "https://www.asisa.es"
  },
  {
    company: "Caser Seguros",
    minCost: 46.80,
    civilLiability: "350,000",
    veterinaryCare: "insurance.caser.coverage",
    additionalServices: "insurance.caser.additional",
    targetAnimals: "insurance.dogsAndCats",
    website: "https://www.caser.es"
  },
  {
    company: "Catalana Occidente",
    minCost: 30,
    civilLiability: "150,000",
    veterinaryCare: "insurance.catalana.coverage",
    additionalServices: "insurance.catalana.additional",
    targetAnimals: "insurance.dogsAndCats",
    website: "https://www.catalanaoccidente.com"
  },
  {
    company: "SegurCaixa Adeslas",
    minCost: 55,
    civilLiability: "200,000",
    veterinaryCare: "insurance.segur.coverage",
    additionalServices: "insurance.segur.additional",
    targetAnimals: "insurance.dogsAndCats",
    website: "https://www.segurcaixaadeslas.es"
  }
];

export default function InsurancePage() {
  const { t } = useLanguage();

  const formatCost = (cost: number) => {
    return cost % 1 === 0 ? cost.toString() : cost.toFixed(2);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-gradient-hero)" }}>
      {/* Hero Section */}
      <section className="section-modern">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "var(--spacing-4xl)" }}>
            <h1 
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-hero)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--petential-dark)",
                marginBottom: "var(--spacing-lg)",
                lineHeight: "var(--line-height-tight)"
              }}
            >
              {t('insurance.title')}
            </h1>
            <p 
              style={{
                fontSize: "var(--font-size-body-large)",
                color: "var(--petential-haiti-70)",
                lineHeight: "var(--line-height-normal)",
                marginBottom: "var(--spacing-lg)"
              }}
            >
              {t('insurance.subtitle')}
            </p>
            <p 
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--petential-haiti-60)",
                lineHeight: "var(--line-height-normal)",
                maxWidth: "800px",
                margin: "0 auto"
              }}
            >
              {t('insurance.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="section-modern">
        <div className="container">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Desktop Table */}
              <div className="hidden lg:block">
                <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
                  <thead style={{ backgroundColor: "var(--petential-primary)" }}>
                    <tr>
                      <th className="px-6 py-4 text-left text-black font-semibold">{t('insurance.company')}</th>
                      <th className="px-6 py-4 text-left text-black font-semibold">{t('insurance.minAnnualCost')}</th>
                      <th className="px-6 py-4 text-left text-black font-semibold">{t('insurance.civilLiabilityCoverage')}</th>
                      <th className="px-6 py-4 text-left text-black font-semibold">{t('insurance.veterinaryCare')}</th>
                      <th className="px-6 py-4 text-left text-black font-semibold">{t('insurance.additionalServices')}</th>
                      <th className="px-6 py-4 text-left text-black font-semibold">{t('insurance.targetAnimals')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {insuranceData.map((insurance, index) => (
                      <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{insurance.company}</div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {t('insurance.fromEuro')}{formatCost(insurance.minCost)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">{t('insurance.upToEuro')}{insurance.civilLiability}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">{t(insurance.veterinaryCare)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">{t(insurance.additionalServices)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">{t(insurance.targetAnimals)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-4">
                {insuranceData.map((insurance, index) => (
                  <Card key={index} className="w-full">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{insurance.company}</span>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          {t('insurance.fromEuro')}{formatCost(insurance.minCost)}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="font-semibold text-sm text-gray-600">{t('insurance.civilLiabilityCoverage')}: </span>
                        <span className="text-sm">{t('insurance.upToEuro')}{insurance.civilLiability}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-gray-600">{t('insurance.veterinaryCare')}: </span>
                        <span className="text-sm">{t(insurance.veterinaryCare)}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-gray-600">{t('insurance.additionalServices')}: </span>
                        <span className="text-sm">{t(insurance.additionalServices)}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-gray-600">{t('insurance.targetAnimals')}: </span>
                        <span className="text-sm">{t(insurance.targetAnimals)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Sections */}
      <section className="section-modern">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Why Important */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "black" }}>
                  {t('insurance.whyImportant')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p style={{ 
                  color: "var(--color-text-secondary)", 
                  lineHeight: "1.7",
                  fontSize: "var(--font-size-body)"
                }}>
                  {t('insurance.importanceText')}
                </p>
              </CardContent>
            </Card>

            {/* How to Choose */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "black" }}>
                  {t('insurance.howToChoose')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">1. {t('insurance.chooseStep1')}</h4>
                  <p className="text-sm text-gray-700">{t('insurance.chooseStep1Text')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">2. {t('insurance.chooseStep2')}</h4>
                  <p className="text-sm text-gray-700">{t('insurance.chooseStep2Text')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">3. {t('insurance.chooseStep3')}</h4>
                  <p className="text-sm text-gray-700">{t('insurance.chooseStep3Text')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">4. {t('insurance.chooseStep4')}</h4>
                  <p className="text-sm text-gray-700">{t('insurance.chooseStep4Text')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-modern">
        <div className="container">
          <Card style={{ background: "var(--bg-gradient-secondary)" }} className="text-center">
            <CardContent className="py-12">
              <h2 
                style={{
                  fontSize: "var(--font-size-heading-2)",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--petential-dark)",
                  marginBottom: "var(--spacing-md)"
                }}
              >
                {t('insurance.cta.title')}
              </h2>
              <p 
                style={{
                  fontSize: "var(--font-size-body-large)",
                  color: "var(--petential-haiti-70)",
                  marginBottom: "var(--spacing-lg)",
                  maxWidth: "600px",
                  margin: "0 auto var(--spacing-lg) auto"
                }}
              >
                {t('insurance.cta.subtitle')}
              </p>
              <Link href="/quiz" className="btn btn-primary btn-cta-large">
                {t('insurance.cta.button')}
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
} 