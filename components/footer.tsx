"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        {/* FOOTER MAIN CONTENT */}
        <div className="footer-main">
          {/* FOOTER BRAND SECTION */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <div className="footer-logo-icon" aria-hidden="true"></div>
              <span className="footer-logo-text">PETential</span>
            </Link>
            <p className="footer-description">
              {t('footer.description')}
            </p>

          </div>

          {/* DISCOVER COLUMN */}
          <div className="footer-column">
            <h3 className="footer-column-title">{t('footer.discover')}</h3>
            <ul className="footer-links">
              <li>
                <Link href="/quiz/dog" className="footer-link">
                  {t('footer.dogQuiz')}
                </Link>
              </li>
              <li>
                <Link href="/quiz/cat" className="footer-link">
                  {t('footer.catQuiz')}
                </Link>
              </li>
              <li>
                <Link href="/breeds" className="footer-link">
                  {t('footer.allBreeds')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link">
                  {t('footer.howItWorks')}
                </Link>
              </li>
            </ul>
          </div>

          {/* RESOURCES COLUMN */}
          <div className="footer-column">
            <h3 className="footer-column-title">{t('footer.resources')}</h3>
            <ul className="footer-links">
              <li>
                <Link href="/pet-care-guide" className="footer-link">
                  {t('footer.petCareGuide')}
                </Link>
              </li>
              <li>
                <Link href="/training-tips" className="footer-link">
                  {t('footer.trainingTips')}
                </Link>
              </li>
              <li>
                <Link href="/how-to-choose-pet" className="footer-link">
                  {t('footer.nutritionGuide')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="footer-link">
                  {t('footer.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT COLUMN */}
          <div className="footer-column">
            <h3 className="footer-column-title">{t('footer.support')}</h3>
            <ul className="footer-links">
              <li>
                <Link href="/contact" className="footer-link">
                  {t('footer.contactUs')}
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="footer-link">
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER COLUMN */}
          <div className="footer-column">
            <h3 className="footer-column-title">{t('footer.stayUpdated')}</h3>
            <p style={{ fontSize: "14px", color: "#9CA3AF", marginBottom: "16px", lineHeight: "1.5" }}>
              {t('footer.newsletterDescription')}
            </p>
            <form className="footer-newsletter" onSubmit={async (e) => {
              e.preventDefault()
              const form = e.target as HTMLFormElement
              const formData = new FormData(form)
              const email = formData.get('email') as string
              
              try {
                const response = await fetch('https://petential-live-production.up.railway.app/api/newsletter', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email })
                })
                
                const result = await response.json()
                if (result.status === 'success') {
                  form.reset()
                  alert(result.message)
                } else {
                  alert(result.message || 'Error subscribing to newsletter')
                }
              } catch (error) {
                alert('Error subscribing to newsletter. Please try again.')
              }
            }}>
              <input type="email" name="email" className="footer-newsletter-input" placeholder={t('footer.emailPlaceholder')} required />
              <button type="submit" className="footer-newsletter-btn">
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">
          <p className="footer-copyright">{t('footer.copyright')}</p>
          <ul className="footer-legal">
            <li>
              <Link href="/privacy" className="footer-legal-link">
                {t('footer.privacyPolicy')}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="footer-legal-link">
                {t('footer.termsOfService')}
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="footer-legal-link">
                {t('footer.cookiePolicy')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
