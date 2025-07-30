"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { isAuthenticated, logout } from '../../../lib/auth'

interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
}

interface NewsletterSubscription {
  id: string
  email: string
  timestamp: string
}

interface FeedbackSubmission {
  id: string
  name: string
  email: string
  feedback_type: string
  rating: string
  features_used: string[]
  message: string
  suggestions: string
  allow_follow_up: boolean
  newsletter_signup: boolean
  timestamp: string
}

interface UserData {
  contacts: ContactSubmission[]
  newsletters: NewsletterSubscription[]
  feedback: FeedbackSubmission[]
}

export default function AdminUsersPage() {
  const [userData, setUserData] = useState<UserData>({ contacts: [], newsletters: [], feedback: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'contacts' | 'newsletters' | 'feedback'>('contacts')
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/admin')
      return
    }

    // Load user data
    loadUserData()
  }, [router])

  const loadUserData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/user-data')
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      } else {
        console.error('Failed to load user data')
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (type: 'contacts' | 'newsletters' | 'feedback', id: string) => {
    const itemType = type === 'contacts' ? 'contact submission' : type === 'newsletters' ? 'newsletter subscription' : 'feedback submission'
    
    if (confirm(`Are you sure you want to delete this ${itemType}?`)) {
      try {
        const response = await fetch(`/api/user-data?type=${type}&id=${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          loadUserData() // Reload data
        } else {
          alert('Failed to delete item')
        }
      } catch (error) {
        console.error('Error deleting item:', error)
        alert('Error deleting item')
      }
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/admin')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg-gradient-hero)" }}>
        <section className="section-modern">
          <div className="container">
            <div className="text-center">
              <p style={{ fontSize: "var(--font-size-body-large)" }}>Loading...</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const tabButtonStyle = (isActive: boolean) => ({
    padding: "var(--spacing-sm) var(--spacing-lg)",
    backgroundColor: isActive ? "var(--petential-primary)" : "white",
    color: isActive ? "var(--petential-dark)" : "var(--petential-haiti-60)",
    border: "2px solid var(--petential-alabaster)",
    borderRadius: "var(--radius-lg)",
    cursor: "pointer",
    fontSize: "var(--font-size-body)",
    fontWeight: "var(--font-weight-medium)",
    transition: "all var(--transition-normal)"
  })

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-gradient-hero)" }}>
      <section className="section-modern">
        <div className="container">
          {/* Header */}
          <div 
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "var(--spacing-2xl)"
            }}
          >
            <h1 
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-h1)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--petential-dark)",
                margin: 0
              }}
            >
              User Data Management
            </h1>
            <div style={{ display: "flex", gap: "var(--spacing-md)", flexWrap: "wrap" }}>
              <Link href="/admin/dashboard" className="btn-secondary">
                Back to Dashboard
              </Link>
              <button onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div 
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "var(--spacing-lg)",
              marginBottom: "var(--spacing-2xl)"
            }}
          >
            <div className="card-modern text-center">
              <h3 style={{ fontSize: "var(--font-size-h2)", fontWeight: "var(--font-weight-bold)", color: "var(--petential-primary)", margin: 0 }}>
                {userData.contacts.length}
              </h3>
              <p style={{ fontSize: "var(--font-size-body)", color: "var(--petential-haiti-60)", margin: "var(--spacing-sm) 0 0 0" }}>
                Contact Messages
              </p>
            </div>
            <div className="card-modern text-center">
              <h3 style={{ fontSize: "var(--font-size-h2)", fontWeight: "var(--font-weight-bold)", color: "var(--petential-primary)", margin: 0 }}>
                {userData.newsletters.length}
              </h3>
              <p style={{ fontSize: "var(--font-size-body)", color: "var(--petential-haiti-60)", margin: "var(--spacing-sm) 0 0 0" }}>
                Newsletter Subscribers
              </p>
            </div>
            <div className="card-modern text-center">
              <h3 style={{ fontSize: "var(--font-size-h2)", fontWeight: "var(--font-weight-bold)", color: "var(--petential-primary)", margin: 0 }}>
                {userData.feedback.length}
              </h3>
              <p style={{ fontSize: "var(--font-size-body)", color: "var(--petential-haiti-60)", margin: "var(--spacing-sm) 0 0 0" }}>
                Feedback Submissions
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div 
            style={{
              display: "flex",
              gap: "var(--spacing-md)",
              marginBottom: "var(--spacing-xl)",
              flexWrap: "wrap"
            }}
          >
            <button 
              onClick={() => setActiveTab('contacts')} 
              style={tabButtonStyle(activeTab === 'contacts')}
            >
              Contact Messages ({userData.contacts.length})
            </button>
            <button 
              onClick={() => setActiveTab('newsletters')} 
              style={tabButtonStyle(activeTab === 'newsletters')}
            >
              Newsletter Subscribers ({userData.newsletters.length})
            </button>
            <button 
              onClick={() => setActiveTab('feedback')} 
              style={tabButtonStyle(activeTab === 'feedback')}
            >
              Feedback ({userData.feedback.length})
            </button>
          </div>

          {/* Content */}
          <div className="section-alabaster" style={{ padding: "var(--spacing-xl)", borderRadius: "var(--radius-xl)" }}>
            
            {/* Contact Messages Tab */}
            {activeTab === 'contacts' && (
              <div>
                <h2 style={{ fontSize: "var(--font-size-h3)", fontWeight: "var(--font-weight-semibold)", marginBottom: "var(--spacing-lg)" }}>
                  Contact Messages
                </h2>
                {userData.contacts.length === 0 ? (
                  <p style={{ textAlign: "center", color: "var(--petential-haiti-60)" }}>No contact messages yet.</p>
                ) : (
                  <div style={{ display: "grid", gap: "var(--spacing-lg)" }}>
                    {userData.contacts.map((contact) => (
                      <div key={contact.id} className="card-modern">
                        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "var(--spacing-lg)", alignItems: "start" }}>
                          <div>
                            <div style={{ marginBottom: "var(--spacing-sm)" }}>
                              <span style={{ fontSize: "var(--font-size-small)", color: "var(--petential-haiti-60)" }}>
                                {new Date(contact.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <h4 style={{ fontSize: "var(--font-size-h4)", fontWeight: "var(--font-weight-semibold)", marginBottom: "var(--spacing-sm)" }}>
                              {contact.subject || 'No Subject'}
                            </h4>
                            <p style={{ fontSize: "var(--font-size-body)", color: "var(--petential-haiti-60)", marginBottom: "var(--spacing-sm)" }}>
                              <strong>From:</strong> {contact.name || 'Anonymous'} ({contact.email})
                            </p>
                            <p style={{ fontSize: "var(--font-size-body)", color: "var(--petential-dark)" }}>
                              {contact.message}
                            </p>
                          </div>
                          <button 
                            onClick={() => handleDelete('contacts', contact.id)}
                            style={{
                              padding: "var(--spacing-sm)",
                              backgroundColor: "#dc3545",
                              color: "white",
                              border: "none",
                              borderRadius: "var(--radius-lg)",
                              cursor: "pointer",
                              fontSize: "var(--font-size-small)"
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Newsletter Subscribers Tab */}
            {activeTab === 'newsletters' && (
              <div>
                <h2 style={{ fontSize: "var(--font-size-h3)", fontWeight: "var(--font-weight-semibold)", marginBottom: "var(--spacing-lg)" }}>
                  Newsletter Subscribers
                </h2>
                {userData.newsletters.length === 0 ? (
                  <p style={{ textAlign: "center", color: "var(--petential-haiti-60)" }}>No newsletter subscribers yet.</p>
                ) : (
                  <div style={{ display: "grid", gap: "var(--spacing-md)" }}>
                    {userData.newsletters.map((newsletter) => (
                      <div key={newsletter.id} className="card-modern">
                        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "var(--spacing-lg)", alignItems: "center" }}>
                          <div>
                            <p style={{ fontSize: "var(--font-size-body)", fontWeight: "var(--font-weight-medium)", marginBottom: "var(--spacing-xs)" }}>
                              {newsletter.email}
                            </p>
                            <p style={{ fontSize: "var(--font-size-small)", color: "var(--petential-haiti-60)" }}>
                              Subscribed: {new Date(newsletter.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <button 
                            onClick={() => handleDelete('newsletters', newsletter.id)}
                            style={{
                              padding: "var(--spacing-sm)",
                              backgroundColor: "#dc3545",
                              color: "white",
                              border: "none",
                              borderRadius: "var(--radius-lg)",
                              cursor: "pointer",
                              fontSize: "var(--font-size-small)"
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Feedback Tab */}
            {activeTab === 'feedback' && (
              <div>
                <h2 style={{ fontSize: "var(--font-size-h3)", fontWeight: "var(--font-weight-semibold)", marginBottom: "var(--spacing-lg)" }}>
                  Feedback Submissions
                </h2>
                {userData.feedback.length === 0 ? (
                  <p style={{ textAlign: "center", color: "var(--petential-haiti-60)" }}>No feedback submissions yet.</p>
                ) : (
                  <div style={{ display: "grid", gap: "var(--spacing-lg)" }}>
                    {userData.feedback.map((feedback) => (
                      <div key={feedback.id} className="card-modern">
                        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "var(--spacing-lg)", alignItems: "start" }}>
                          <div>
                            <div style={{ display: "flex", gap: "var(--spacing-md)", marginBottom: "var(--spacing-sm)", flexWrap: "wrap" }}>
                              <span style={{
                                fontSize: "var(--font-size-small)",
                                fontWeight: "var(--font-weight-medium)",
                                color: "var(--petential-primary)",
                                backgroundColor: "rgba(193, 253, 58, 0.1)",
                                padding: "var(--spacing-xs) var(--spacing-sm)",
                                borderRadius: "var(--radius-sm)"
                              }}>
                                {feedback.feedback_type}
                              </span>
                              {feedback.rating && (
                                <span style={{
                                  fontSize: "var(--font-size-small)",
                                  color: "var(--petential-haiti-60)",
                                  backgroundColor: "var(--petential-alabaster)",
                                  padding: "var(--spacing-xs) var(--spacing-sm)",
                                  borderRadius: "var(--radius-sm)"
                                }}>
                                  Rating: {feedback.rating}/5
                                </span>
                              )}
                              <span style={{ fontSize: "var(--font-size-small)", color: "var(--petential-haiti-60)" }}>
                                {new Date(feedback.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p style={{ fontSize: "var(--font-size-body)", color: "var(--petential-haiti-60)", marginBottom: "var(--spacing-sm)" }}>
                              <strong>From:</strong> {feedback.name || 'Anonymous'} {feedback.email && `(${feedback.email})`}
                            </p>
                            {feedback.message && (
                              <p style={{ fontSize: "var(--font-size-body)", color: "var(--petential-dark)", marginBottom: "var(--spacing-sm)" }}>
                                <strong>Message:</strong> {feedback.message}
                              </p>
                            )}
                            {feedback.suggestions && (
                              <p style={{ fontSize: "var(--font-size-body)", color: "var(--petential-dark)", marginBottom: "var(--spacing-sm)" }}>
                                <strong>Suggestions:</strong> {feedback.suggestions}
                              </p>
                            )}
                            {feedback.features_used?.length > 0 && (
                              <p style={{ fontSize: "var(--font-size-small)", color: "var(--petential-haiti-60)" }}>
                                <strong>Features used:</strong> {feedback.features_used.join(', ')}
                              </p>
                            )}
                          </div>
                          <button 
                            onClick={() => handleDelete('feedback', feedback.id)}
                            style={{
                              padding: "var(--spacing-sm)",
                              backgroundColor: "#dc3545",
                              color: "white",
                              border: "none",
                              borderRadius: "var(--radius-lg)",
                              cursor: "pointer",
                              fontSize: "var(--font-size-small)"
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
} 