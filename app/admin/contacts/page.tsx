"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { isAuthenticated } from '../../../lib/auth'
import { ContactSubmission, NewsletterSubscription, FeedbackSubmission } from '../../../lib/supabase'

interface UserData {
  contacts: ContactSubmission[]
  newsletters: NewsletterSubscription[]
  feedback: FeedbackSubmission[]
}

export default function ContactsPage() {
  const [data, setData] = useState<UserData>({ contacts: [], newsletters: [], feedback: [] })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'contacts' | 'newsletters' | 'feedback'>('contacts')
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        router.push('/admin')
      }
    }
    setTimeout(checkAuth, 100)
  }, [router])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch contact submissions
      const contactResponse = await fetch('/api/contact')
      const contactData = await contactResponse.json()
      
      // Fetch newsletter subscriptions
      const newsletterResponse = await fetch('/api/newsletter')
      const newsletterData = await newsletterResponse.json()
      
      // Fetch feedback (if you have this endpoint)
      // const feedbackResponse = await fetch('/api/feedback')
      // const feedbackData = await feedbackResponse.json()
      
      setData({
        contacts: contactData.status === 'success' ? contactData.submissions : [],
        newsletters: newsletterData.status === 'success' ? newsletterData.subscriptions : [],
        feedback: [] // feedbackData.status === 'success' ? feedbackData.submissions : []
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const deleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) return
    
    try {
      const response = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' })
      if (response.ok) {
        fetchData() // Refresh data
      }
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  const unsubscribeNewsletter = async (email: string) => {
    if (!confirm(`Are you sure you want to unsubscribe ${email} from the newsletter?`)) return
    
    try {
      const response = await fetch(`/api/newsletter?email=${encodeURIComponent(email)}`, { method: 'DELETE' })
      if (response.ok) {
        fetchData() // Refresh data
      }
    } catch (error) {
      console.error('Error unsubscribing:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg-gradient-hero)" }}>
        <section className="section-modern">
          <div className="container">
            <div className="text-center">
              <h1>Loading...</h1>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-gradient-hero)" }}>
      <section className="section-modern">
        <div className="container">
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
              <Link href="/admin/dashboard" className="btn-secondary">
                ← Back to Dashboard
              </Link>
            </div>

            {/* Tabs */}
            <div className="card-modern" style={{ marginBottom: "var(--spacing-xl)" }}>
              <div style={{ display: "flex", gap: "var(--spacing-md)", borderBottom: "1px solid var(--petential-alabaster)" }}>
                <button
                  onClick={() => setActiveTab('contacts')}
                  style={{
                    padding: "var(--spacing-md)",
                    background: activeTab === 'contacts' ? 'var(--petential-primary)' : 'transparent',
                    color: activeTab === 'contacts' ? 'black' : 'var(--petential-dark)',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  Contacts ({data.contacts.length})
                </button>
                <button
                  onClick={() => setActiveTab('newsletters')}
                  style={{
                    padding: "var(--spacing-md)",
                    background: activeTab === 'newsletters' ? 'var(--petential-primary)' : 'transparent',
                    color: activeTab === 'newsletters' ? 'black' : 'var(--petential-dark)',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  Newsletter ({data.newsletters.length})
                </button>
                <button
                  onClick={() => setActiveTab('feedback')}
                  style={{
                    padding: "var(--spacing-md)",
                    background: activeTab === 'feedback' ? 'var(--petential-primary)' : 'transparent',
                    color: activeTab === 'feedback' ? 'black' : 'var(--petential-dark)',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  Feedback ({data.feedback.length})
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="card-modern">
              {activeTab === 'contacts' && (
                <div>
                  <h2 style={{ marginBottom: "var(--spacing-lg)" }}>Contact Submissions</h2>
                  {data.contacts.length === 0 ? (
                    <p>No contact submissions yet.</p>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--petential-alabaster)' }}>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Date</th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Subject</th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Message</th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.contacts.map((contact) => (
                            <tr key={contact.id} style={{ borderBottom: '1px solid var(--petential-alabaster)' }}>
                              <td style={{ padding: 'var(--spacing-md)' }}>
                                {formatDate(contact.created_at)}
                              </td>
                              <td style={{ padding: 'var(--spacing-md)' }}>
                                {contact.name || 'N/A'}
                              </td>
                              <td style={{ padding: 'var(--spacing-md)' }}>
                                <a href={`mailto:${contact.email}`} style={{ color: 'var(--petential-primary)' }}>
                                  {contact.email}
                                </a>
                              </td>
                              <td style={{ padding: 'var(--spacing-md)' }}>
                                {contact.subject || 'No subject'}
                              </td>
                              <td style={{ padding: 'var(--spacing-md)', maxWidth: '300px' }}>
                                <div style={{ 
                                  maxHeight: '100px', 
                                  overflow: 'auto',
                                  wordBreak: 'break-word'
                                }}>
                                  {contact.message}
                                </div>
                              </td>
                              <td style={{ padding: 'var(--spacing-md)' }}>
                                <button
                                  onClick={() => deleteContact(contact.id)}
                                  className="btn-secondary"
                                  style={{ fontSize: 'var(--font-size-sm)' }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'newsletters' && (
                <div>
                  <h2 style={{ marginBottom: "var(--spacing-lg)" }}>Newsletter Subscriptions</h2>
                  {data.newsletters.length === 0 ? (
                    <p>No newsletter subscriptions yet.</p>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--petential-alabaster)' }}>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Date</th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.newsletters.map((newsletter) => (
                            <tr key={newsletter.id} style={{ borderBottom: '1px solid var(--petential-alabaster)' }}>
                              <td style={{ padding: 'var(--spacing-md)' }}>
                                {formatDate(newsletter.created_at)}
                              </td>
                              <td style={{ padding: 'var(--spacing-md)' }}>
                                <a href={`mailto:${newsletter.email}`} style={{ color: 'var(--petential-primary)' }}>
                                  {newsletter.email}
                                </a>
                              </td>
                              <td style={{ padding: 'var(--spacing-md)' }}>
                                <button
                                  onClick={() => unsubscribeNewsletter(newsletter.email)}
                                  className="btn-secondary"
                                  style={{ fontSize: 'var(--font-size-sm)' }}
                                >
                                  Unsubscribe
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'feedback' && (
                <div>
                  <h2 style={{ marginBottom: "var(--spacing-lg)" }}>Feedback Submissions</h2>
                  <p>Feedback management will be available once the feedback API is implemented.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
