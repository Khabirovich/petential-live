"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"

export default function AboutPageClient() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-gradient-hero)" }}>
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
                marginBottom: "var(--spacing-lg)",
                lineHeight: "var(--line-height-tight)"
              }}
            >
              {t('about.title')}
            </h1>
            <p 
              style={{
                fontSize: "var(--font-size-body-large)",
                color: "var(--petential-haiti-70)",
                lineHeight: "var(--line-height-normal)",
                margin: 0
              }}
            >
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-modern section-alabaster">
        <div className="container">
          <div 
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--spacing-3xl)",
              alignItems: "center",
              marginBottom: "var(--spacing-4xl)"
            }}
          >
            <div>
              <h2 
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-h1)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--petential-dark)",
                  marginBottom: "var(--spacing-lg)"
                }}
              >
                {t('about.mission.title')}
              </h2>
              <p 
                style={{
                  fontSize: "var(--font-size-body)",
                  color: "var(--petential-haiti-60)",
                  lineHeight: "var(--line-height-normal)",
                  marginBottom: "var(--spacing-md)"
                }}
              >
                {t('about.mission.text1')}
              </p>
              <p 
                style={{
                  fontSize: "var(--font-size-body)",
                  color: "var(--petential-haiti-60)",
                  lineHeight: "var(--line-height-normal)",
                  margin: 0
                }}
              >
                {t('about.mission.text2')}
              </p>
            </div>
            <div className="card-modern">
              <div className="text-center">
                <div 
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "var(--petential-primary)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto var(--spacing-md) auto"
                  }}
                >
                  <span style={{ fontSize: "32px" }}>🐾</span>
                </div>
                <h3 
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-h3)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--petential-dark)",
                    marginBottom: "var(--spacing-sm)"
                  }}
                >
                  {t('about.smartMatching.title')}
                </h3>
                <p 
                  style={{
                    fontSize: "var(--font-size-body)",
                    color: "var(--petential-haiti-60)",
                    margin: 0
                  }}
                >
                  {t('about.smartMatching.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div 
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--spacing-xl)",
              marginBottom: "var(--spacing-4xl)"
            }}
          >
            <div className="card-modern">
              <div 
                style={{
                  width: "48px",
                  height: "48px",
                  background: "var(--petential-primary)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "var(--spacing-md)"
                }}
              >
                <span style={{ fontSize: "24px" }}>🎯</span>
              </div>
              <h3 
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-h4)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--petential-dark)",
                  marginBottom: "var(--spacing-sm)"
                }}
              >
                {t('about.personalizedResults.title')}
              </h3>
              <p 
                style={{
                  fontSize: "var(--font-size-small)",
                  color: "var(--petential-haiti-60)",
                  margin: 0
                }}
              >
                {t('about.personalizedResults.description')}
              </p>
            </div>

            <div className="card-modern">
              <div 
                style={{
                  width: "48px",
                  height: "48px",
                  background: "var(--petential-primary)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "var(--spacing-md)"
                }}
              >
                <span style={{ fontSize: "24px" }}>📚</span>
              </div>
              <h3 
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-h4)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--petential-dark)",
                  marginBottom: "var(--spacing-sm)"
                }}
              >
                {t('about.comprehensiveDatabase.title')}
              </h3>
              <p 
                style={{
                  fontSize: "var(--font-size-small)",
                  color: "var(--petential-haiti-60)",
                  margin: 0
                }}
              >
                {t('about.comprehensiveDatabase.description')}
              </p>
            </div>

            <div className="card-modern">
              <div 
                style={{
                  width: "48px",
                  height: "48px",
                  background: "var(--petential-primary)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "var(--spacing-md)"
                }}
              >
                <span style={{ fontSize: "24px" }}>🤖</span>
              </div>
              <h3 
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-h4)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--petential-dark)",
                  marginBottom: "var(--spacing-sm)"
                }}
              >
                {t('about.aiPoweredInsights.title')}
              </h3>
              <p 
                style={{
                  fontSize: "var(--font-size-small)",
                  color: "var(--petential-haiti-60)",
                  margin: 0
                }}
              >
                {t('about.aiPoweredInsights.description')}
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="card-modern" style={{ marginBottom: "var(--spacing-4xl)" }}>
            <h2 
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-h1)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--petential-dark)",
                marginBottom: "var(--spacing-2xl)",
                textAlign: "center"
              }}
            >
              {t('about.howItWorks.title')}
            </h2>
            <div 
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "var(--spacing-xl)"
              }}
            >
              <div className="text-center">
                <div 
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "var(--petential-dark)",
                    color: "var(--petential-white)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto var(--spacing-md) auto",
                    fontSize: "var(--font-size-body-large)",
                    fontWeight: "var(--font-weight-bold)"
                  }}
                >
                  1
                </div>
                <h3 
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-h4)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--petential-dark)",
                    marginBottom: "var(--spacing-sm)"
                  }}
                >
                  {t('about.howItWorks.step1.title')}
                </h3>
                <p 
                  style={{
                    fontSize: "var(--font-size-small)",
                    color: "var(--petential-haiti-60)",
                    margin: 0
                  }}
                >
                  {t('about.howItWorks.step1.description')}
                </p>
              </div>

              <div className="text-center">
                <div 
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "var(--petential-dark)",
                    color: "var(--petential-white)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto var(--spacing-md) auto",
                    fontSize: "var(--font-size-body-large)",
                    fontWeight: "var(--font-weight-bold)"
                  }}
                >
                  2
                </div>
                <h3 
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-h4)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--petential-dark)",
                    marginBottom: "var(--spacing-sm)"
                  }}
                >
                  {t('about.howItWorks.step2.title')}
                </h3>
                <p 
                  style={{
                    fontSize: "var(--font-size-small)",
                    color: "var(--petential-haiti-60)",
                    margin: 0
                  }}
                >
                  {t('about.howItWorks.step2.description')}
                </p>
              </div>

              <div className="text-center">
                <div 
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "var(--petential-dark)",
                    color: "var(--petential-white)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto var(--spacing-md) auto",
                    fontSize: "var(--font-size-body-large)",
                    fontWeight: "var(--font-weight-bold)"
                  }}
                >
                  3
                </div>
                <h3 
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-h4)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--petential-dark)",
                    marginBottom: "var(--spacing-sm)"
                  }}
                >
                  {t('about.howItWorks.step3.title')}
                </h3>
                <p 
                  style={{
                    fontSize: "var(--font-size-small)",
                    color: "var(--petential-haiti-60)",
                    margin: 0
                  }}
                >
                  {t('about.howItWorks.step3.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-h1)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--petential-dark)",
                marginBottom: "var(--spacing-lg)"
              }}
            >
              {t('about.cta.title')}
            </h2>
            <p 
              style={{
                fontSize: "var(--font-size-body-large)",
                color: "var(--petential-haiti-60)",
                marginBottom: "var(--spacing-2xl)",
                margin: "0 0 var(--spacing-2xl) 0"
              }}
            >
              {t('about.cta.subtitle')}
            </p>
            <div className="btn-group">
              <Link 
                href="/quiz" 
                className="btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center"
                }}
              >
                {t('about.cta.takeQuiz')}
              </Link>
              <Link 
                href="/breeds" 
                className="btn-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center"
                }}
              >
                {t('about.cta.browsBreeds')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}