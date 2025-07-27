"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, authenticate, logout } from '../../lib/auth'
import { useLanguage } from "@/lib/i18n/context"

export default function AdminLoginPage() {
  const { t } = useLanguage()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    if (isAuthenticated()) {
      router.push('/admin/dashboard')
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500))

    if (authenticate(password)) {
      router.push('/admin/dashboard')
    } else {
      setError('Invalid password')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-gradient-hero)" }}>
      <section className="section-modern">
        <div className="container">
          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <div className="card-modern">
              <div className="text-center" style={{ marginBottom: "var(--spacing-xl)" }}>
                <h1 
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-h2)",
                    fontWeight: "var(--font-weight-bold)",
                    color: "var(--petential-dark)",
                    marginBottom: "var(--spacing-sm)"
                  }}
                >
                  {t('admin.login.title')}
                </h1>
                <p 
                  style={{
                    fontSize: "var(--font-size-body)",
                    color: "var(--petential-haiti-60)",
                    margin: 0
                  }}
                >
                  {t('admin.login.subtitle')}
                </p>
              </div>

              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: "var(--spacing-lg)" }}>
                  <label 
                    htmlFor="password"
                    style={{
                      display: "block",
                      fontSize: "var(--font-size-body)",
                      fontWeight: "var(--font-weight-medium)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-sm)"
                    }}
                  >
                    {t('admin.login.password')}
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                {error && (
                  <div 
                    style={{
                      padding: "var(--spacing-md)",
                      background: "#f8d7da",
                      color: "#721c24",
                      borderRadius: "var(--radius-lg)",
                      marginBottom: "var(--spacing-lg)",
                      fontSize: "var(--font-size-body)"
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary"
                  style={{
                    width: "100%",
                    opacity: isLoading ? 0.7 : 1,
                    cursor: isLoading ? "not-allowed" : "pointer"
                  }}
                >
                  {isLoading ? t('admin.login.loggingIn') : t('admin.login.login')}
                </button>
              </form>

              <div 
                style={{
                  textAlign: "center",
                  marginTop: "var(--spacing-lg)",
                  paddingTop: "var(--spacing-lg)",
                  borderTop: "1px solid var(--petential-alabaster)"
                }}
              >
                <a 
                  href="/"
                  style={{
                    fontSize: "var(--font-size-small)",
                    color: "var(--petential-haiti-60)",
                    textDecoration: "none"
                  }}
                >
                  ← Back to Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}