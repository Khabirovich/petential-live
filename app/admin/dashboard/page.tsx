"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { isAuthenticated, logout } from '../../../lib/auth'
import { getBlogArticles, deleteBlogArticle, initializeBlogStorage, refreshBlogArticles } from '../../../lib/blog-storage'
import { BlogArticle } from '../../../data/blog-articles'
import ErrorBoundary from '../../../components/ErrorBoundary'

function AdminDashboardContent() {
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Add a small delay to ensure client-side hydration is complete
    const checkAuth = async () => {
      // Check authentication
      if (!isAuthenticated()) {
        router.push('/admin')
        return
      }

      // Initialize blog storage and load articles
      await loadArticles()
    }
    
    // Small delay to prevent hydration mismatch
    setTimeout(checkAuth, 100)
  }, [router])

  const loadArticles = async () => {
    setIsLoading(true)
    try {
      await initializeBlogStorage()
      const loadedArticles = await getBlogArticles()
      setArticles(loadedArticles)
    } catch (error) {
      console.error('Error loading articles:', error)
      alert('Failed to load articles. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteBlogArticle(id)
        await loadArticles()
      } catch (error) {
        console.error('Error deleting article:', error)
        alert('Failed to delete article. Please try again.')
      }
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/admin')
  }

  const handleRefreshArticles = async () => {
    if (confirm('This will refresh articles from the backend. Continue?')) {
      try {
        await refreshBlogArticles()
        await loadArticles()
      } catch (error) {
        console.error('Error refreshing articles:', error)
        alert('Failed to refresh articles. Please try again.')
      }
    }
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
              Blog Management
            </h1>
            <div style={{ display: "flex", gap: "var(--spacing-md)", flexWrap: "wrap" }}>
              <Link href="/admin/create" className="btn-primary">
                Create New Article
              </Link>
              <Link href="/admin/contacts" className="btn-secondary">
                Contact Management
              </Link>
              <button 
                onClick={handleRefreshArticles}
                style={{
                  padding: "var(--spacing-sm) var(--spacing-md)",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--radius-lg)",
                  cursor: "pointer",
                  fontSize: "var(--font-size-small)"
                }}
              >
                Refresh Articles
              </button>
              <button onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </div>
          </div>

          {/* Articles List */}
          <div className="section-alabaster" style={{ padding: "var(--spacing-xl)", borderRadius: "var(--radius-xl)" }}>
            {articles.length === 0 ? (
              <div className="text-center">
                <p 
                  style={{
                    fontSize: "var(--font-size-body-large)",
                    color: "var(--petential-haiti-60)",
                    marginBottom: "var(--spacing-lg)"
                  }}
                >
                  No articles found. Create your first article!
                </p>
                <Link href="/admin/create" className="btn-primary">
                  Create Article
                </Link>
              </div>
            ) : (
              <div 
                style={{
                  display: "grid",
                  gap: "var(--spacing-lg)"
                }}
              >
                {articles.map((article) => (
                  <div key={article.id} className="card-modern">
                    <div 
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        gap: "var(--spacing-lg)",
                        alignItems: "start"
                      }}
                    >
                      <div>
                        <div 
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--spacing-md)",
                            marginBottom: "var(--spacing-sm)"
                          }}
                        >
                          <span 
                            style={{
                              fontSize: "var(--font-size-small)",
                              fontWeight: "var(--font-weight-medium)",
                              color: "var(--petential-primary)",
                              backgroundColor: "rgba(193, 253, 58, 0.1)",
                              padding: "var(--spacing-xs) var(--spacing-sm)",
                              borderRadius: "var(--radius-sm)"
                            }}
                          >
                            {article.category}
                          </span>
                          <span 
                            style={{
                              fontSize: "var(--font-size-small)",
                              color: "var(--petential-haiti-60)"
                            }}
                          >
                            {article.readTime}
                          </span>
                        </div>
                        
                        <h3 
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "var(--font-size-h3)",
                            fontWeight: "var(--font-weight-semibold)",
                            color: "var(--petential-dark)",
                            marginBottom: "var(--spacing-sm)",
                            lineHeight: "var(--line-height-tight)"
                          }}
                        >
                          {article.title}
                        </h3>
                        
                        <p 
                          style={{
                            fontSize: "var(--font-size-body)",
                            color: "var(--petential-haiti-60)",
                            marginBottom: "var(--spacing-sm)",
                            lineHeight: "var(--line-height-normal)"
                          }}
                        >
                          {article.excerpt}
                        </p>
                        
                        <div 
                          style={{
                            fontSize: "var(--font-size-small)",
                            color: "var(--petential-haiti-60)"
                          }}
                        >
                          By {article.author} • {new Date(article.publishDate).toLocaleDateString()}
                        </div>
                      </div>

                      <div 
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "var(--spacing-sm)"
                        }}
                      >
                        <Link 
                          href={`/blog/${article.id}`}
                          target="_blank"
                          className="btn-secondary"
                          style={{ fontSize: "var(--font-size-small)", padding: "var(--spacing-sm) var(--spacing-md)" }}
                        >
                          View
                        </Link>
                        <Link 
                          href={`/admin/edit/${article.id}`}
                          className="btn-primary"
                          style={{ fontSize: "var(--font-size-small)", padding: "var(--spacing-sm) var(--spacing-md)" }}
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(article.id)}
                          style={{
                            fontSize: "var(--font-size-small)",
                            padding: "var(--spacing-sm) var(--spacing-md)",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "var(--radius-lg)",
                            cursor: "pointer",
                            transition: "all var(--transition-normal)"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#c82333"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#dc3545"
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div 
            style={{
              marginTop: "var(--spacing-2xl)",
              textAlign: "center"
            }}
          >
            <div 
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "var(--spacing-lg)",
                flexWrap: "wrap"
              }}
            >
              <Link href="/" className="btn-secondary">
                View Website
              </Link>
              <Link href="/blog" className="btn-secondary">
                View Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <ErrorBoundary>
      <AdminDashboardContent />
    </ErrorBoundary>
  )
}