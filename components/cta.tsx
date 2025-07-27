"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"

export default function CTA() {
  const { t } = useLanguage()
  return (
    <section className="section-modern section-alabaster">
      <div className="container text-center">
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--font-size-h1)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--petential-dark)",
            marginBottom: "var(--spacing-lg)",
          }}
        >
          {t('cta.title')}
        </h2>
        <p
          style={{
            fontSize: "var(--font-size-body-large)",
            color: "var(--petential-haiti-70)",
            marginBottom: "var(--spacing-2xl)",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {t('cta.subtitle')}
        </p>

        <div className="btn-group">
          <Link href="/quiz/dog" className="btn btn-primary btn-cta-large">
            🐕 {t('cta.findDog')}
          </Link>
          <Link href="/quiz/cat" className="btn btn-primary btn-cta-large">
            🐱 {t('cta.findCat')}
          </Link>
        </div>
      </div>
    </section>
  )
}
