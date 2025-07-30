"use client"

import { useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/context"

const insights = [
  {
    image:
      "/images/figmaAssets/ins_1.png",
    alt: "Vibrant photo of people with six dogs in indoor studio",
    title: "Find your perfect breed match",
    description:
      "Take our quiz to discover which dog or cat fits your lifestyle best. Start your journey to a lifelong companion.",
  },
  {
    image:
      "/images/figmaAssets/ins_2.png",
    alt: "Modern orange shelving wall with cats relaxing in individual beds",
    title: "Settle in with your new pet",
    description:
      "Get friendly tips on nutrition, training, and daily care to help your furry friend feel right at home.",
  },
  {
    image: "/images/figmaAssets/ins_3.png",
    alt: "Tablet dashboard on red backdrop with leaves shadows",
    title: "Real advice from real pet owners",
    description:
      "Hear stories and practical answers from our community and pet-care experts—you're not alone on this journey.",
  },
  {
    image: "/images/figmaAssets/ins_4.png",
    alt: "Close-up pastel parakeet on solid orange background",
    title: "Heartfelt stories, happy matches",
    description:
      "Be inspired by uplifting tales and helpful advice from people who've found their perfect four-legged friends.",
  },
]

export default function Insights() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const insights = [
    {
      image: "/images/figmaAssets/ins_1.png",
      alt: "Vibrant photo of people with six dogs in indoor studio",
      title: t('insights.insight1.title'),
      description: t('insights.insight1.description'),
    },
    {
      image: "/images/figmaAssets/ins_2.png",
      alt: "Modern orange shelving wall with cats relaxing in individual beds",
      title: t('insights.insight2.title'),
      description: t('insights.insight2.description'),
    },
    {
      image: "/images/figmaAssets/ins_3.png",
      alt: "Tablet dashboard on red backdrop with leaves shadows",
      title: t('insights.insight3.title'),
      description: t('insights.insight3.description'),
    },
    {
      image: "/images/figmaAssets/ins_4.png",
      alt: "Close-up pastel parakeet on solid orange background",
      title: t('insights.insight4.title'),
      description: t('insights.insight4.description'),
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % insights.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length)
  }

  return (
    <section className="insights-section">
      <div className="insights-container" style={{ maxWidth: "1200px", padding: "0 2rem" }}>
        {/* HEADER ROW */}
        <div className="insights-header">
          <h2 className="insights-title">{t('insights.title')}</h2>

          {/* SLIDER CONTROLS */}
        </div>

        {/* GRID LAYOUT - 2x2 Matrix with Bigger Cards */}
        <div
          className="insights-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: "3rem",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {insights.slice(0, 4).map((insight, index) => (
            <article
              key={index}
              className="insights-card"
              tabIndex={0}
              role="article"
              style={{
                minHeight: "400px",
                width: "100%",
              }}
            >
              <Image
                src={insight.image || "/placeholder.svg"}
                alt={insight.alt}
                className="insights-card-image"
                loading="lazy"
                width={600}
                height={320}
                style={{
                  width: "100%",
                  height: "320px",
                  objectFit: "cover",
                }}
              />
              <h3 className="insights-card-title" style={{ fontSize: "1.5rem", padding: "0 2rem" }}>
                {insight.title}
              </h3>
              <p className="insights-card-description" style={{ fontSize: "1rem", padding: "0 2rem" }}>
                {insight.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
