"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"

export default function About() {
  const { t } = useLanguage()
  return (
    <section className="section-modern section-alabaster" id="about">
      <div className="container">
        <div className="text-center" style={{ marginBottom: "var(--spacing-3xl)" }}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--font-size-h1)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--petential-dark)",
              marginBottom: "var(--spacing-lg)",
            }}
          >
            {t('about.howItWorks.title')}
          </h2>
        </div>

        {/* Tab Content */}
        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--spacing-2xl)",
            alignItems: "center",
          }}
        >
          <div className="card-modern">
            {/* Step 1 */}
            <div style={{ marginBottom: "var(--spacing-lg)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)", marginBottom: "var(--spacing-sm)" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "var(--petential-primary)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--font-size-body)",
                    fontWeight: "var(--font-weight-bold)",
                    color: "var(--petential-dark)",
                  }}
                >
                  1
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-h4)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--petential-dark)",
                    margin: 0,
                  }}
                >
                  {t('about.howItWorks.step1.title')}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "var(--font-size-small)",
                  color: "var(--petential-haiti-60)",
                  lineHeight: "var(--line-height-normal)",
                  margin: 0,
                }}
              >
                {t('about.howItWorks.step1.description')}
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ marginBottom: "var(--spacing-lg)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)", marginBottom: "var(--spacing-sm)" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "var(--petential-primary)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--font-size-body)",
                    fontWeight: "var(--font-weight-bold)",
                    color: "var(--petential-dark)",
                  }}
                >
                  2
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-h4)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--petential-dark)",
                    margin: 0,
                  }}
                >
                  {t('about.howItWorks.step2.title')}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "var(--font-size-small)",
                  color: "var(--petential-haiti-60)",
                  lineHeight: "var(--line-height-normal)",
                  margin: 0,
                }}
              >
                {t('about.howItWorks.step2.description')}
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ marginBottom: "var(--spacing-xl)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)", marginBottom: "var(--spacing-sm)" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "var(--petential-primary)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--font-size-body)",
                    fontWeight: "var(--font-weight-bold)",
                    color: "var(--petential-dark)",
                  }}
                >
                  3
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-h4)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--petential-dark)",
                    margin: 0,
                  }}
                >
                  {t('about.howItWorks.step3.title')}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "var(--font-size-small)",
                  color: "var(--petential-haiti-60)",
                  lineHeight: "var(--line-height-normal)",
                  margin: 0,
                }}
              >
                {t('about.howItWorks.step3.description')}
              </p>
            </div>

            <Link
              href="/quiz"
              className="btn-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--spacing-sm)",
                fontSize: "var(--font-size-body)",
                color: "var(--petential-dark)",
              }}
            >
              {t('nav.getStarted')}
              <span style={{ fontSize: "16px" }}>→</span>
            </Link>
          </div>

          <div className="about-image-container">
            <div
              className="about-image"
              style={{
                backgroundImage: 'url("/images/figmaAssets/second_image.png")',
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                borderRadius: "var(--radius-xl)",
                minHeight: "460px",
                boxShadow: "var(--shadow-card)",
              }}
            ></div>
            {/* Mobile fallback image */}
            <img
              src="/images/figmaAssets/second_image.png"
              alt="Pet matching illustration"
              className="about-image-mobile"
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
