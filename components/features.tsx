"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"

export default function Features() {
  const { t } = useLanguage()
  return (
    <section className="section-modern">
      <div className="container">
        <div
          className="features-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--spacing-4xl)",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-2xl)",
            }}
          >
            {/* Feature 1 */}
            <div>
              <div style={{ marginBottom: "var(--spacing-md)" }}>
                <span
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--font-size-small)",
                    fontWeight: "var(--font-weight-regular)",
                    color: "var(--petential-haiti-60)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {t('features.feature1.title').toUpperCase()}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-h1)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--petential-dark)",
                  marginBottom: "var(--spacing-md)",
                  lineHeight: "var(--line-height-tight)",
                }}
              >
                {t('features.feature1.title')}
              </h3>
              <p
                style={{
                  fontSize: "var(--font-size-body-large)",
                  color: "var(--petential-dark)",
                  lineHeight: "var(--line-height-normal)",
                  marginBottom: "var(--spacing-lg)",
                }}
              >
                {t('features.feature1.description')}
              </p>
              <Link href="/breeds" className="btn btn-secondary">
                {t('nav.breeds')}
              </Link>
            </div>

            {/* Feature 2 */}
            <div>
              <div style={{ marginBottom: "var(--spacing-md)" }}>
                <span
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--font-size-small)",
                    fontWeight: "var(--font-weight-regular)",
                    color: "var(--petential-haiti-60)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {t('quiz.title').toUpperCase()}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-h1)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--petential-dark)",
                  marginBottom: "var(--spacing-md)",
                  lineHeight: "var(--line-height-tight)",
                }}
              >
                {t('about.howItWorks.step2.title')}
              </h3>
              <p
                style={{
                  fontSize: "var(--font-size-body-large)",
                  color: "var(--petential-dark)",
                  lineHeight: "var(--line-height-normal)",
                  marginBottom: "var(--spacing-lg)",
                }}
              >
                {t('features.feature2.description')}
              </p>
              <Link href="/quiz" className="btn btn-secondary">
                {t('hero.takeQuiz')}
              </Link>
            </div>

            {/* Feature 3 */}
            <div>
              <div style={{ marginBottom: "var(--spacing-md)" }}>
                <span
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--font-size-small)",
                    fontWeight: "var(--font-weight-regular)",
                    color: "var(--petential-haiti-60)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {t('features.feature3.title').toUpperCase()}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-h1)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--petential-dark)",
                  marginBottom: "var(--spacing-md)",
                  lineHeight: "var(--line-height-tight)",
                }}
              >
                {t('features.feature3.title')}
              </h3>
              <p
                style={{
                  fontSize: "var(--font-size-body-large)",
                  color: "var(--petential-dark)",
                  lineHeight: "var(--line-height-normal)",
                  marginBottom: "var(--spacing-lg)",
                }}
              >
                {t('features.feature3.description')}
              </p>
              <Link href="#" className="btn btn-secondary">
                {t('common.soon')}
              </Link>
            </div>
          </div>

          <div
            className="features-image-container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="features-image"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "600px",
                backgroundImage: "url('/images/figmaAssets/pet_image.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-card)",
              }}
            />
            {/* Mobile fallback image */}
            <img
              src="/images/figmaAssets/pet_image.png"
              alt="Pet care illustration"
              className="features-image-mobile"
              style={{
                display: "none",
                width: "350px",
                height: "300px",
                objectFit: "cover",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-card)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
