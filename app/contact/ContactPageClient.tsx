"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"

export default function ContactPageClient() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Submit to Next.js API (which saves to Supabase)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.status === 'success') {
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        })
        setSubmitStatus("success")
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-modern-first">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "var(--spacing-3xl)" }}>
            <h1 
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-hero)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--petential-dark)",
                marginBottom: "var(--spacing-lg)",
                lineHeight: "var(--line-height-tight)"
              }}
            >
              {t('contact.title')}
            </h1>
            <p 
              style={{
                fontSize: "var(--font-size-body-large)",
                color: "var(--petential-haiti-70)",
                lineHeight: "var(--line-height-normal)",
                margin: 0
              }}
            >
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-modern section-alabaster">
        <div className="container">
          <div 
            style={{
              maxWidth: "600px",
              margin: "0 auto"
            }}
          >
            <div className="card-modern">
              <form onSubmit={handleSubmit}>
                <div 
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--spacing-lg)"
                  }}
                >
                  {/* Name Field */}
                  <div>
                    <label 
                      htmlFor="name"
                      style={{
                        display: "block",
                        fontSize: "var(--font-size-body)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-sm)"
                      }}
                    >
                      {t('contact.name')} {t('common.required')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "100%",
                        padding: "var(--spacing-md)",
                        border: "2px solid var(--petential-alabaster)",
                        borderRadius: "var(--radius-lg)",
                        fontSize: "var(--font-size-body)",
                        transition: "all var(--transition-normal)",
                        background: "white"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--petential-primary)"
                        e.target.style.boxShadow = "0 0 0 3px rgba(193, 253, 58, 0.1)"
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--petential-alabaster)"
                        e.target.style.boxShadow = "none"
                      }}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label 
                      htmlFor="email"
                      style={{
                        display: "block",
                        fontSize: "var(--font-size-body)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-sm)"
                      }}
                    >
                      {t('contact.email')} {t('common.required')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "100%",
                        padding: "var(--spacing-md)",
                        border: "2px solid var(--petential-alabaster)",
                        borderRadius: "var(--radius-lg)",
                        fontSize: "var(--font-size-body)",
                        transition: "all var(--transition-normal)",
                        background: "white"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--petential-primary)"
                        e.target.style.boxShadow = "0 0 0 3px rgba(193, 253, 58, 0.1)"
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--petential-alabaster)"
                        e.target.style.boxShadow = "none"
                      }}
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label 
                      htmlFor="subject"
                      style={{
                        display: "block",
                        fontSize: "var(--font-size-body)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-sm)"
                      }}
                    >
                      {t('contact.subject')} {t('common.required')}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "100%",
                        padding: "var(--spacing-md)",
                        border: "2px solid var(--petential-alabaster)",
                        borderRadius: "var(--radius-lg)",
                        fontSize: "var(--font-size-body)",
                        transition: "all var(--transition-normal)",
                        background: "white"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--petential-primary)"
                        e.target.style.boxShadow = "0 0 0 3px rgba(193, 253, 58, 0.1)"
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--petential-alabaster)"
                        e.target.style.boxShadow = "none"
                      }}
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label 
                      htmlFor="message"
                      style={{
                        display: "block",
                        fontSize: "var(--font-size-body)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-sm)"
                      }}
                    >
                      {t('contact.message')} {t('common.required')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      style={{
                        width: "100%",
                        padding: "var(--spacing-md)",
                        border: "2px solid var(--petential-alabaster)",
                        borderRadius: "var(--radius-lg)",
                        fontSize: "var(--font-size-body)",
                        transition: "all var(--transition-normal)",
                        background: "white",
                        resize: "vertical",
                        minHeight: "120px"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--petential-primary)"
                        e.target.style.boxShadow = "0 0 0 3px rgba(193, 253, 58, 0.1)"
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--petential-alabaster)"
                        e.target.style.boxShadow = "none"
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <div style={{ textAlign: "center", marginTop: "var(--spacing-lg)" }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                      style={{
                        minWidth: "200px",
                        opacity: isSubmitting ? 0.7 : 1,
                        cursor: isSubmitting ? "not-allowed" : "pointer"
                      }}
                    >
                      {isSubmitting ? t('contact.sending') : t('contact.send')}
                    </button>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div 
                      style={{
                        padding: "var(--spacing-md)",
                        background: "#d4edda",
                        color: "#155724",
                        borderRadius: "var(--radius-lg)",
                        textAlign: "center",
                        fontSize: "var(--font-size-body)"
                      }}
                    >
                      {t('contact.success')}
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div 
                      style={{
                        padding: "var(--spacing-md)",
                        background: "#f8d7da",
                        color: "#721c24",
                        borderRadius: "var(--radius-lg)",
                        textAlign: "center",
                        fontSize: "var(--font-size-body)"
                      }}
                    >
                      {t('contact.error')}
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Back to Home Link */}
            <div style={{ textAlign: "center", marginTop: "var(--spacing-2xl)" }}>
              <Link href="/" className="btn-secondary">
                {t('contact.backToHome')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}