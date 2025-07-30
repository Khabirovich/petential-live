"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/context"

export default function Hero() {
  const { t } = useLanguage()
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(() => {
    const animatedWords = t('hero.animatedWords')
    if (Array.isArray(animatedWords)) {
      return animatedWords
    }
    // Fallback to English if translation fails
    return ["friend", "companion", "partner", "love"]
  }, [t])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <section className="hero-section leading-[]">
      <div className="hero-container">
        {/* LEFT CONTENT AREA */}
        <div className="hero-content">
          {/* MAIN HEADING */}
          <h1 className="hero-heading">
            {t('hero.titlePrefix')}{" "}
            <span 
              className="relative inline-block"
              style={{ 
                minWidth: "280px", 
                height: "1.2em", 
                display: "inline-block",
                verticalAlign: "baseline"
              }}
            >
              {titles.map((title, index) => (
                <span
                  key={index}
                  className={`absolute top-0 left-0 whitespace-nowrap transition-all duration-500 ${
                    titleNumber === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  {title}
                </span>
              ))}
            </span>
          </h1>

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
