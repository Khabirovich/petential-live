"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { getBlogArticles, initializeBlogStorage } from "../../lib/blog-storage"
import { BlogArticle } from "../../data/blog-articles"
import { useLanguage } from "@/lib/i18n/context"

export default function BlogPage() {
  const { t } = useLanguage()
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 6

  useEffect(() => {
    const loadArticles = async () => {
      try {
        await initializeBlogStorage()
        const loadedArticles = await getBlogArticles()
        // Only load first 6 articles initially for better performance
        const initialArticles = loadedArticles.slice(0, 6)
        setArticles(initialArticles)

        // Preload remaining articles in the background
        if (loadedArticles.length > 6) {
          setTimeout(() => {
            setArticles(loadedArticles)
          }, 100)
        }
      } catch (error) {
        console.error('Error loading articles:', error)
        // Fallback to empty array if loading fails
        setArticles([])
      } finally {
        setIsLoading(false)
      }
    }

    loadArticles()
  }, [])

  // Calculate pagination
  const totalPages = Math.ceil(articles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const endIndex = startIndex + articlesPerPage
  const currentArticles = articles.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of articles section
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <section className="section-modern">
          <div className="container">
            <div className="text-center">
              <p style={{ fontSize: "var(--font-size-body-large)" }}>{t('common.loadingArticles')}</p>
            </div>
          </div>
        </section>
      </div>
    )
  }
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-modern-first">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "var(--spacing-xl)" }}>
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
              {t('blog.title')}
            </h1>
            <p 
              style={{
                fontSize: "var(--font-size-body-large)",
                color: "var(--petential-haiti-70)",
                lineHeight: "var(--line-height-normal)",
                margin: 0
              }}
            >
              {t('blog.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-modern section-alabaster">
        <div className="container">
          <div 
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "var(--spacing-2xl)"
            }}
          >
            {currentArticles.map((article) => (
              <Link 
                key={article.id} 
                href={`/blog/${article.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <article 
                  className="card-modern blog-article-card"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  {/* Article Image */}
                  <div 
                    style={{
                      width: "100%",
                      height: "200px",
                      backgroundColor: "var(--petential-alabaster)",
                      borderRadius: "var(--radius-lg)",
                      marginBottom: "var(--spacing-lg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden"
                    }}
                  >
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={350}
                        height={200}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "var(--radius-lg)"
                        }}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        onError={(e) => {
                          console.error('Image failed to load:', article.image);
                          console.error('Article title:', article.title);
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', article.image);
                        }}
                      />
                    ) : (
                      <div 
                        style={{
                          width: "64px",
                          height: "64px",
                          backgroundColor: "var(--petential-primary)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "32px"
                        }}
                      >
                        {article.category === "Dog Care" ? "🐕" : 
                         article.category === "Cat Care" ? "🐱" : 
                         article.category === "Pet Health" ? "🏥" : "📝"}
                      </div>
                    )}
                  </div>

                  {/* Article Content */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Category and Read Time */}
                    <div 
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "var(--spacing-sm)"
                      }}
                    >
                      <span
                        style={{
                          fontSize: "var(--font-size-small)",
                          fontWeight: "var(--font-weight-medium)",
                          color: "var(--petential-haiti-60)",
                          backgroundColor: "var(--petential-alabaster)",
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

                    {/* Article Title */}
                    <h2 
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--font-size-h3)",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-md)",
                        lineHeight: "var(--line-height-tight)"
                      }}
                    >
                      {article.title}
                    </h2>

                    {/* Article Excerpt */}
                    <p 
                      style={{
                        fontSize: "var(--font-size-body)",
                        color: "var(--petential-haiti-60)",
                        lineHeight: "var(--line-height-normal)",
                        marginBottom: "var(--spacing-lg)",
                        flex: 1
                      }}
                    >
                      {article.excerpt}
                    </p>

                    {/* Article Meta */}
                    <div 
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "var(--spacing-md)",
                        borderTop: "1px solid var(--petential-alabaster)"
                      }}
                    >
                      <div>
                        <p 
                          style={{
                            fontSize: "var(--font-size-small)",
                            fontWeight: "var(--font-weight-medium)",
                            color: "var(--petential-dark)",
                            margin: 0
                          }}
                        >
                          {article.author}
                        </p>
                        <p 
                          style={{
                            fontSize: "var(--font-size-small)",
                            color: "var(--petential-haiti-60)",
                            margin: 0
                          }}
                        >
                          {new Date(article.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div
                        style={{
                          fontSize: "var(--font-size-body)",
                          color: "var(--petential-haiti-60)",
                          fontWeight: "var(--font-weight-medium)"
                        }}
                      >
                        {t('blog.readMore')} →
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div 
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "var(--spacing-md)",
                marginTop: "var(--spacing-3xl)",
                marginBottom: "var(--spacing-2xl)"
              }}
            >
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: "var(--spacing-sm) var(--spacing-md)",
                  backgroundColor: currentPage === 1 ? "var(--petential-alabaster)" : "white",
                  color: currentPage === 1 ? "var(--petential-haiti-60)" : "var(--petential-dark)",
                  border: "2px solid var(--petential-alabaster)",
                  borderRadius: "var(--radius-lg)",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  fontSize: "var(--font-size-body)",
                  fontWeight: "var(--font-weight-medium)",
                  transition: "all var(--transition-normal)"
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 1) {
                    e.currentTarget.style.backgroundColor = "var(--petential-primary)"
                    e.currentTarget.style.borderColor = "var(--petential-primary)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 1) {
                    e.currentTarget.style.backgroundColor = "white"
                    e.currentTarget.style.borderColor = "var(--petential-alabaster)"
                  }
                }}
              >
                ← {t('blog.pagination.previous')}
              </button>

              {/* Page Numbers */}
              <div style={{ display: "flex", gap: "var(--spacing-xs)" }}>
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1
                  const isActive = page === currentPage
                  
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: isActive ? "var(--petential-primary)" : "white",
                        color: isActive ? "var(--petential-dark)" : "var(--petential-haiti-60)",
                        border: `2px solid ${isActive ? "var(--petential-primary)" : "var(--petential-alabaster)"}`,
                        borderRadius: "var(--radius-lg)",
                        cursor: "pointer",
                        fontSize: "var(--font-size-body)",
                        fontWeight: isActive ? "var(--font-weight-bold)" : "var(--font-weight-medium)",
                        transition: "all var(--transition-normal)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "var(--petential-alabaster)"
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "white"
                        }
                      }}
                    >
                      {page}
                    </button>
                  )
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: "var(--spacing-sm) var(--spacing-md)",
                  backgroundColor: currentPage === totalPages ? "var(--petential-alabaster)" : "white",
                  color: currentPage === totalPages ? "var(--petential-haiti-60)" : "var(--petential-dark)",
                  border: "2px solid var(--petential-alabaster)",
                  borderRadius: "var(--radius-lg)",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  fontSize: "var(--font-size-body)",
                  fontWeight: "var(--font-weight-medium)",
                  transition: "all var(--transition-normal)"
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== totalPages) {
                    e.currentTarget.style.backgroundColor = "var(--petential-primary)"
                    e.currentTarget.style.borderColor = "var(--petential-primary)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== totalPages) {
                    e.currentTarget.style.backgroundColor = "white"
                    e.currentTarget.style.borderColor = "var(--petential-alabaster)"
                  }
                }}
              >
                {t('blog.pagination.next')} →
              </button>
            </div>
          )}

          {/* Page Info */}
          {totalPages > 1 && (
            <div 
              style={{
                textAlign: "center",
                marginBottom: "var(--spacing-2xl)",
                fontSize: "var(--font-size-small)",
                color: "var(--petential-haiti-60)"
              }}
            >
              {t('blog.pagination.showing')} {startIndex + 1}-{Math.min(endIndex, articles.length)} {t('blog.pagination.of')} {articles.length} {t('blog.pagination.articles')}
            </div>
          )}

          {/* Call to Action */}
          <div 
            style={{
              textAlign: "center",
              marginTop: "var(--spacing-4xl)",
              padding: "var(--spacing-2xl)",
              backgroundColor: "white",
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-card)"
            }}
          >
            <h2 
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-h2)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--petential-dark)",
                marginBottom: "var(--spacing-lg)"
              }}
            >
              {t('blog.cta.title')}
            </h2>
            <p 
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--petential-haiti-60)",
                marginBottom: "var(--spacing-xl)",
                margin: "0 0 var(--spacing-xl) 0"
              }}
            >
              {t('blog.cta.subtitle')}
            </p>
            <Link href="/quiz" className="btn-primary">
              {t('blog.cta.takeQuiz')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}