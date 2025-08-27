"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { isAuthenticated } from '../../../../lib/auth'
import { getBlogArticleById, updateBlogArticle } from '../../../../lib/blog-storage'
import { BlogArticle } from '../../../../data/blog-articles'

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => <div>Loading editor...</div>
})

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

interface EditArticlePageProps {
  params: {
    id: string
  }
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Pet Care',
    readTime: '5 min read',
    tags: ''
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [currentImage, setCurrentImage] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [articleId, setArticleId] = useState('')
  const router = useRouter()

  // Markdown Editor configuration
  const [markdownContent, setMarkdownContent] = useState('')

  // Function to convert markdown to HTML (simple conversion for basic formatting)
  const markdownToHtml = (markdown: string): string => {
    return markdown
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/~~(.*)~~/gim, '<del>$1</del>')
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      .replace(/\n/g, '<br>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
  }

  // Function to convert HTML back to markdown for editing
  const htmlToMarkdown = (html: string): string => {
    return html
      .replace(/<h3>(.*?)<\/h3>/gi, '### $1')
      .replace(/<h2>(.*?)<\/h2>/gi, '## $1')
      .replace(/<h1>(.*?)<\/h1>/gi, '# $1')
      .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<em>(.*?)<\/em>/gi, '*$1*')
      .replace(/<del>(.*?)<\/del>/gi, '~~$1~~')
      .replace(/<code>(.*?)<\/code>/gi, '`$1`')
      .replace(/<br>/gi, '\n')
      .replace(/<ul>(.*?)<\/ul>/gi, '$1')
      .replace(/<li>(.*?)<\/li>/gi, '- $1')
      .replace(/<blockquote>(.*?)<\/blockquote>/gi, '> $1')
  }

  useEffect(() => {
    const loadArticle = async () => {
      if (!isAuthenticated()) {
        router.push('/admin')
        return
      }

      const resolvedParams = await Promise.resolve(params)
      const id = resolvedParams.id
      setArticleId(id)

      const article = await getBlogArticleById(id)
      if (!article) {
        router.push('/admin/dashboard')
        return
      }

      // Convert HTML back to markdown for editing
      const markdownFromHtml = htmlToMarkdown(article.content)

      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content, // Keep HTML content for storage
        author: article.author,
        category: article.category,
        readTime: article.readTime,
        tags: article.tags.join(', ')
      })
      setMarkdownContent(markdownFromHtml) // Set markdown for editor
      setCurrentImage(article.image)
      setIsLoading(false)
    }

    // Small delay to prevent hydration mismatch
    setTimeout(loadArticle, 100)
  }, [params, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleContentChange = (value?: string) => {
    const content = value || ''
    setMarkdownContent(content)
    // Convert markdown to HTML for storage
    const htmlContent = markdownToHtml(content)
    setFormData(prev => ({
      ...prev,
      content: htmlContent
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (10MB = 10,000,000 bytes)
      if (file.size > 10000000) {
        alert('⚠️ Image Too Large\n\nPlease select an image smaller than 10MB.\n\nCurrent size: ' + Math.round(file.size / 1024 / 1024 * 10) / 10 + 'MB')
        e.target.value = '' // Clear the input
        return
      }
      
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        // Double-check base64 size (15MB base64 limit)
        if (result && result.length > 15000000) {
          alert('⚠️ Image Still Too Large\n\nThe processed image is still too large. Please use a smaller image.')
          setSelectedImage(null)
          setImagePreview('')
          return
        }
        setImagePreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let imageUrl = currentImage
      
      // If user uploaded a new image, use it
      if (selectedImage && imagePreview) {
        imageUrl = imagePreview // Use the base64 data URL
      }

      const updatedArticle: BlogArticle = {
        id: articleId,
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content || '', // ReactQuill content is already HTML
        author: formData.author,
        publishDate: new Date().toISOString().split('T')[0],
        readTime: formData.readTime,
        category: formData.category,
        image: imageUrl,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }

      await updateBlogArticle(articleId, updatedArticle)
      router.push('/admin/dashboard')
    } catch (error) {
      console.error('Error updating article:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      
      if (errorMessage.includes('Image is too large')) {
        alert('❌ Image Too Large\n\nPlease use an image smaller than 10MB. You can:\n• Resize your image\n• Use a different image\n• Or save without changing the image')
      } else if (errorMessage.includes('Network')) {
        alert('❌ Network Error\n\nPlease check your internet connection and try again.')
      } else if (errorMessage.includes('Failed to save')) {
        alert('❌ Save Error\n\n' + errorMessage + '\n\nPlease try again or contact support if the problem persists.')
      } else {
        alert('❌ Error Updating Article\n\n' + errorMessage + '\n\nPlease try again with a smaller image if you uploaded one.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg-gradient-hero)" }}>
        <section className="section-modern">
          <div className="container">
            <div className="text-center">
              <p style={{ fontSize: "var(--font-size-body-large)" }}>Loading article...</p>
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
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
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
                Edit Article
              </h1>
              <Link href="/admin/dashboard" className="btn-secondary">
                ← Back to Dashboard
              </Link>
            </div>

            {/* Form */}
            <div className="card-modern">
              <form onSubmit={handleSubmit}>
                <div 
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--spacing-lg)"
                  }}
                >
                  {/* Title */}
                  <div>
                    <label 
                      htmlFor="title"
                      style={{
                        display: "block",
                        fontSize: "var(--font-size-body)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-sm)"
                      }}
                    >
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "100%",
                        padding: "var(--spacing-md)",
                        border: "2px solid var(--petential-alabaster)",
                        borderRadius: "var(--radius-lg)",
                        fontSize: "var(--font-size-body)"
                      }}
                    />
                  </div>

                  {/* Category and Read Time */}
                  <div 
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "var(--spacing-md)"
                    }}
                  >
                    <div>
                      <label 
                        htmlFor="category"
                        style={{
                          display: "block",
                          fontSize: "var(--font-size-body)",
                          fontWeight: "var(--font-weight-medium)",
                          color: "var(--petential-dark)",
                          marginBottom: "var(--spacing-sm)"
                        }}
                      >
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: "100%",
                          padding: "var(--spacing-md)",
                          border: "2px solid var(--petential-alabaster)",
                          borderRadius: "var(--radius-lg)",
                          fontSize: "var(--font-size-body)"
                        }}
                      >
                        <option value="Pet Care">Pet Care</option>
                        <option value="Dog Care">Dog Care</option>
                        <option value="Cat Care">Cat Care</option>
                        <option value="Pet Health">Pet Health</option>
                        <option value="Training">Training</option>
                        <option value="Nutrition">Nutrition</option>
                      </select>
                    </div>

                    <div>
                      <label 
                        htmlFor="readTime"
                        style={{
                          display: "block",
                          fontSize: "var(--font-size-body)",
                          fontWeight: "var(--font-weight-medium)",
                          color: "var(--petential-dark)",
                          marginBottom: "var(--spacing-sm)"
                        }}
                      >
                        Read Time *
                      </label>
                      <input
                        type="text"
                        id="readTime"
                        name="readTime"
                        value={formData.readTime}
                        onChange={handleInputChange}
                        placeholder="5 min read"
                        required
                        style={{
                          width: "100%",
                          padding: "var(--spacing-md)",
                          border: "2px solid var(--petential-alabaster)",
                          borderRadius: "var(--radius-lg)",
                          fontSize: "var(--font-size-body)"
                        }}
                      />
                    </div>
                  </div>

                  {/* Author */}
                  <div>
                    <label 
                      htmlFor="author"
                      style={{
                        display: "block",
                        fontSize: "var(--font-size-body)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-sm)"
                      }}
                    >
                      Author *
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "100%",
                        padding: "var(--spacing-md)",
                        border: "2px solid var(--petential-alabaster)",
                        borderRadius: "var(--radius-lg)",
                        fontSize: "var(--font-size-body)"
                      }}
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label 
                      htmlFor="excerpt"
                      style={{
                        display: "block",
                        fontSize: "var(--font-size-body)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-sm)"
                      }}
                    >
                      Excerpt *
                    </label>
                    <textarea
                      id="excerpt"
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="Brief description that appears on the blog cards..."
                      style={{
                        width: "100%",
                        padding: "var(--spacing-md)",
                        border: "2px solid var(--petential-alabaster)",
                        borderRadius: "var(--radius-lg)",
                        fontSize: "var(--font-size-body)",
                        resize: "vertical"
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "var(--font-size-body)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-sm)"
                      }}
                    >
                      Content *
                    </label>
                    <div data-color-mode="light">
                      <MDEditor
                        value={markdownContent}
                        onChange={handleContentChange}
                        preview="edit"
                        hideToolbar={false}
                        visibleDragBar={false}
                        textareaProps={{
                          placeholder: 'Write your article content here. Use Markdown syntax for formatting:\n\n**bold** *italic* ~~strikethrough~~\n# Header 1\n## Header 2\n- Bullet list\n1. Numbered list\n\n> Blockquote\n\n`inline code`'
                        }}
                        height={400}
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label 
                      htmlFor="image"
                      style={{
                        display: "block",
                        fontSize: "var(--font-size-body)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-sm)"
                      }}
                    >
                      Article Image
                    </label>
                    
                    {/* Current Image */}
                    {currentImage && !imagePreview && (
                      <div style={{ marginBottom: "var(--spacing-md)" }}>
                        <p style={{ fontSize: "var(--font-size-small)", color: "var(--petential-haiti-60)", marginBottom: "var(--spacing-sm)" }}>
                          Current Image:
                        </p>
                        {currentImage.startsWith('data:') ? (
                          <img
                            src={currentImage}
                            alt="Current article image"
                            style={{
                              maxWidth: "200px",
                              maxHeight: "150px",
                              borderRadius: "var(--radius-lg)",
                              objectFit: "cover"
                            }}
                          />
                        ) : (
                          <div 
                            style={{
                              width: "200px",
                              height: "150px",
                              backgroundColor: "var(--petential-alabaster)",
                              borderRadius: "var(--radius-lg)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "var(--font-size-small)",
                              color: "var(--petential-haiti-60)"
                            }}
                          >
                            No image uploaded
                          </div>
                        )}
                      </div>
                    )}

                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{
                        width: "100%",
                        padding: "var(--spacing-md)",
                        border: "2px solid var(--petential-alabaster)",
                        borderRadius: "var(--radius-lg)",
                        fontSize: "var(--font-size-body)"
                      }}
                    />
                    
                    {/* New Image Preview */}
                    {imagePreview && (
                      <div style={{ marginTop: "var(--spacing-md)" }}>
                        <p style={{ fontSize: "var(--font-size-small)", color: "var(--petential-haiti-60)", marginBottom: "var(--spacing-sm)" }}>
                          New Image Preview:
                        </p>
                        <img
                          src={imagePreview}
                          alt="New image preview"
                          style={{
                            maxWidth: "200px",
                            maxHeight: "150px",
                            borderRadius: "var(--radius-lg)",
                            objectFit: "cover"
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div>
                    <label 
                      htmlFor="tags"
                      style={{
                        display: "block",
                        fontSize: "var(--font-size-body)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-sm)"
                      }}
                    >
                      Tags
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="pet care, dogs, training (comma separated)"
                      style={{
                        width: "100%",
                        padding: "var(--spacing-md)",
                        border: "2px solid var(--petential-alabaster)",
                        borderRadius: "var(--radius-lg)",
                        fontSize: "var(--font-size-body)"
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
                      {isSubmitting ? "Updating..." : "Update Article"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}