"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogArticles, initializeBlogStorage } from "../../../lib/blog-storage"
import { BlogArticle } from "../../../data/blog-articles"
import { useLanguage } from "@/lib/i18n/context"

interface BlogArticlePageProps {
  params: {
    slug: string
  }
}

export default function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { t } = useLanguage()
  const [article, setArticle] = useState<BlogArticle | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadArticle = async () => {
      try {
        // Handle async params in Next.js 15
        const resolvedParams = await Promise.resolve(params)
        const slug = resolvedParams.slug

        // Small delay to ensure localStorage is ready
        setTimeout(() => {
          initializeBlogStorage()
          const articles = getBlogArticles()
          const foundArticle = articles.find(article => article.id === slug)

          if (!foundArticle) {
            setIsLoading(false)
            setArticle(null)
            return
          }

          setArticle(foundArticle)

          // Get related articles (excluding current article)
          const related = articles
            .filter(a => a.id !== foundArticle.id)
            .slice(0, 2)
          setRelatedArticles(related)
          setIsLoading(false)
        }, 100)
      } catch (error) {
        console.error('Error loading article:', error)
        setIsLoading(false)
        setArticle(null)
      }
    }

    loadArticle()
  }, [params])

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg-gradient-hero)" }}>
        <section className="section-modern">
          <div className="container">
            <div className="text-center">
              <p style={{ fontSize: "var(--font-size-body-large)" }}>{t('common.loadingArticle')}</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (!isLoading && !article) {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg-gradient-hero)" }}>
        <section className="section-modern">
          <div className="container">
            <div className="text-center">
              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-h1)",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--petential-dark)",
                  marginBottom: "var(--spacing-lg)"
                }}
              >
                {t('blogArticle.notFound.title')}
              </h1>
              <p
                style={{
                  fontSize: "var(--font-size-body-large)",
                  color: "var(--petential-haiti-60)",
                  marginBottom: "var(--spacing-xl)"
                }}
              >
                {t('blogArticle.notFound.description')}
              </p>
              <div style={{ display: "flex", gap: "var(--spacing-md)", justifyContent: "center" }}>
                <Link href="/blog" className="btn-primary">
                  ← {t('blogArticle.notFound.backToBlog')}
                </Link>
                <Link href="/admin" className="btn-secondary">
                  {t('blogArticle.notFound.adminPanel')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-gradient-hero)" }}>
      {/* Article Header */}
      <section className="section-modern">
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {/* Breadcrumb */}
            <nav
              style={{
                marginBottom: "var(--spacing-lg)",
                fontSize: "var(--font-size-small)",
                color: "var(--petential-haiti-60)"
              }}
            >
              <Link
                href="/blog"
                style={{
                  color: "var(--petential-primary)",
                  textDecoration: "none"
                }}
              >
                Blog
              </Link>
              <span style={{ margin: "0 var(--spacing-sm)" }}>→</span>
              <span>{article.title}</span>
            </nav>

            {/* Article Meta */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-md)",
                marginBottom: "var(--spacing-lg)",
                flexWrap: "wrap"
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
              <span
                style={{
                  fontSize: "var(--font-size-small)",
                  color: "var(--petential-haiti-60)"
                }}
              >
                {new Date(article.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            {/* Article Title */}
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-h1)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--petential-dark)",
                marginBottom: "var(--spacing-lg)",
                lineHeight: "var(--line-height-tight)"
              }}
            >
              {article.title}
            </h1>

            {/* Author Info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-md)",
                marginBottom: "var(--spacing-2xl)",
                paddingBottom: "var(--spacing-lg)",
                borderBottom: "1px solid rgba(8, 5, 22, 0.1)"
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "var(--petential-primary)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px"
                }}
              >
                👨‍⚕️
              </div>
              <div>
                <p
                  style={{
                    fontSize: "var(--font-size-body)",
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
                  Pet Care Expert
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-modern section-alabaster">
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div className="card-modern">
              {/* Article Image */}
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  backgroundColor: "var(--petential-alabaster)",
                  borderRadius: "var(--radius-lg)",
                  marginBottom: "var(--spacing-2xl)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden"
                }}
              >
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                    onError={(e) => {
                      console.error('Image failed to load:', article.image);
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "var(--petential-primary)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "40px"
                    }}
                  >
                    {article.category === "Dog Care" ? "🐕" :
                      article.category === "Cat Care" ? "🐱" :
                        article.category === "Pet Health" ? "🏥" : "📝"}
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div
                style={{
                  fontSize: "var(--font-size-body)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--petential-dark)"
                }}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              <div
                style={{
                  marginTop: "var(--spacing-2xl)",
                  paddingTop: "var(--spacing-lg)",
                  borderTop: "1px solid var(--petential-alabaster)"
                }}
              >
                <h3
                  style={{
                    fontSize: "var(--font-size-body)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--petential-dark)",
                    marginBottom: "var(--spacing-md)"
                  }}
                >
                  Tags:
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "var(--spacing-sm)",
                    flexWrap: "wrap"
                  }}
                >
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "var(--font-size-small)",
                        color: "var(--petential-haiti-60)",
                        backgroundColor: "var(--petential-alabaster)",
                        padding: "var(--spacing-xs) var(--spacing-sm)",
                        borderRadius: "var(--radius-sm)"
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "var(--spacing-2xl)",
                gap: "var(--spacing-lg)"
              }}
            >
              <Link href="/blog" className="btn-secondary">
                ← Back to Blog
              </Link>
              <Link href="/quiz" className="btn-primary">
                Take Pet Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="section-modern">
          <div className="container">
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-h2)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--petential-dark)",
                  marginBottom: "var(--spacing-xl)",
                  textAlign: "center"
                }}
              >
                Related Articles
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "var(--spacing-xl)"
                }}
              >
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/blog/${relatedArticle.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className="card-modern blog-related-card"
                      style={{
                        height: "100%",
                        transition: "all var(--transition-normal)",
                        cursor: "pointer"
                      }}
                    >
                      <span
                        style={{
                          fontSize: "var(--font-size-small)",
                          fontWeight: "var(--font-weight-medium)",
                          color: "var(--petential-primary)",
                          backgroundColor: "rgba(193, 253, 58, 0.1)",
                          padding: "var(--spacing-xs) var(--spacing-sm)",
                          borderRadius: "var(--radius-sm)",
                          marginBottom: "var(--spacing-md)",
                          display: "inline-block"
                        }}
                      >
                        {relatedArticle.category}
                      </span>
                      <h3
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "var(--font-size-h4)",
                          fontWeight: "var(--font-weight-semibold)",
                          color: "var(--petential-dark)",
                          marginBottom: "var(--spacing-sm)",
                          lineHeight: "var(--line-height-tight)"
                        }}
                      >
                        {relatedArticle.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "var(--font-size-small)",
                          color: "var(--petential-haiti-60)",
                          margin: 0
                        }}
                      >
                        {relatedArticle.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}