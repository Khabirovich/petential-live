"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/context"

export default function Hero() {
  const { t } = useLanguage()
  return (
    <section className="hero-section leading-[]">
      <div className="hero-container">
        {/* LEFT CONTENT AREA */}
        <div className="hero-content">
          {/* MAIN HEADING */}
          <h1 className="hero-heading">{t('hero.title')}</h1>

          {/* DESCRIPTION TEXT */}
          <p className="hero-description">
            {t('hero.description')}
          </p>

          {/* BUTTONS CONTAINER */}
          <div className="hero-buttons">
            {/* PRIMARY BUTTON (Take quiz) */}
            <Link
              href="/quiz"
              className="hero-btn-primary"
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {t('hero.takeQuiz')}
            </Link>

            {/* SECONDARY BUTTON (Learn more) */}
            <Link href="/about" className="hero-btn-secondary">
              {t('hero.learnMore')}
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE AREA */}
        <div className="hero-image-container">
          <Image
            src="/images/figmaAssets/main_image.png"
            alt="Diverse group of people with various pets"
            className="hero-image"
            width={600}
            height={400}
            priority
          />
        </div>
      </div>
    </section>
  )
}
