"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/context"



export default function Testimonials() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState(0)

  const testimonials = [
    {
      id: 0,
      quote: t('testimonials.testimonial1.quote'),
      name: t('testimonials.testimonial1.author'),
      description: t('testimonials.testimonial1.description'),
      image: "/images/figmaAssets/test_1.png",
      alt: "Diverse group of people with various dogs and cats in cozy indoor setting",
    },
    {
      id: 1,
      quote: t('testimonials.testimonial2.quote'),
      name: t('testimonials.testimonial2.author'),
      description: t('testimonials.testimonial2.description'),
      image: "/images/figmaAssets/test_2.png",
      alt: "Professional office environment with team members and animal welfare banners",
    },
    {
      id: 2,
      quote: t('testimonials.testimonial3.quote'),
      name: t('testimonials.testimonial3.author'),
      description: t('testimonials.testimonial3.description'),
      image: "/images/figmaAssets/test_3.png",
      alt: "Consultation scene with veterinarian showing information to clients with dogs",
    },
    {
      id: 3,
      quote: t('testimonials.testimonial4.quote'),
      name: t('testimonials.testimonial4.author'),
      description: t('testimonials.testimonial4.description'),
      image: "/images/figmaAssets/test_4.png",
      alt: "Animal shelter interior with organized cat housing and modern facility",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* SECTION TITLE */}
        <h2 className="testimonials-title">{t('testimonials.title')}</h2>

        {/* TAB NAVIGATION */}
        <div className="testimonials-nav" role="tablist" aria-label="Customer testimonials">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonial-tab-indicator ${activeTab === index ? "active" : ""}`}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`testimonial-panel-${index}`}
              tabIndex={activeTab === index ? 0 : -1}
              onClick={() => setActiveTab(index)}
            />
          ))}
        </div>

        {/* TAB CONTENT AREA */}
        <div className="testimonials-content">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              id={`testimonial-panel-${index}`}
              className={`testimonial-panel ${activeTab === index ? "active" : ""}`}
              role="tabpanel"
              aria-labelledby={`testimonial-tab-${index}`}
              aria-hidden={activeTab !== index}
            >
              {/* LEFT CONTENT AREA */}
              <div className="testimonial-left-content">
                <blockquote className="testimonial-quote">{testimonial.quote}</blockquote>
                <h3 className="testimonial-customer-name">{testimonial.name}</h3>
                <p className="testimonial-customer-description">{testimonial.description}</p>
              </div>

              {/* RIGHT IMAGE AREA */}
              <div className="testimonial-right-content">
                <div className="testimonial-image-container">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.alt}
                    className="testimonial-image"
                    width={600}
                    height={400}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
