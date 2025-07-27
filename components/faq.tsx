"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n/context"



export default function FAQ() {
  const { t } = useLanguage()
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqs = [
    {
      question: t('faq.question1'),
      answer: t('faq.answer1')
    },
    {
      question: t('faq.question2'),
      answer: t('faq.answer2')
    },
    {
      question: t('faq.question3'),
      answer: t('faq.answer3')
    },
    {
      question: t('faq.question4'),
      answer: t('faq.answer4')
    }
  ]

  return (
    <section className="faq-section">
      <div className="faq-container">
        {/* SECTION HEADER */}
        <div className="faq-header">
          <div className="faq-badge">{t('faq.title').toUpperCase()}</div>
          <h2 className="faq-title">{t('faq.subtitle')}</h2>
          <p className="faq-subtitle">
            {t('faq.description')}
          </p>
        </div>

        {/* FAQ ACCORDION CONTAINER */}
        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                aria-expanded={openItems.includes(index)}
                onClick={() => toggleItem(index)}
              >
                <h3 className="faq-question-text">{faq.question}</h3>
                <div className="faq-expand-icon" aria-hidden="true"></div>
              </button>
              <div className={`faq-answer ${openItems.includes(index) ? "open" : ""}`}>
                <p className="faq-answer-text">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
