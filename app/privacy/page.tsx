"use client"

import { useLanguage } from "@/lib/i18n/context"

export default function PrivacyPolicyPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-gradient-hero)" }}>
      <section className="section-modern-first">
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h1 
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-hero)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--petential-dark)",
                marginBottom: "var(--spacing-lg)",
                lineHeight: "var(--line-height-tight)",
                textAlign: "center"
              }}
            >
              {t('legal.privacy.title')}
            </h1>
            <p 
              style={{
                fontSize: "var(--font-size-body-large)",
                color: "var(--petential-haiti-70)",
                lineHeight: "var(--line-height-normal)",
                textAlign: "center",
                marginBottom: "var(--spacing-2xl)"
              }}
            >
              {t('legal.privacy.lastUpdated')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-modern section-alabaster">
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div className="card-modern">
              <div 
                style={{
                  fontSize: "var(--font-size-body)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--petential-dark)"
                }}
                dangerouslySetInnerHTML={{ __html: t('legal.privacy.content') }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}