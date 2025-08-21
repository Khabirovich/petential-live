"use client"

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div 
          className="min-h-screen"
          style={{ 
            background: "var(--bg-gradient-hero)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div 
            style={{
              background: "white",
              padding: "var(--spacing-xl)",
              borderRadius: "var(--radius-xl)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center",
              maxWidth: "500px",
              margin: "var(--spacing-lg)"
            }}
          >
            <h2 
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-h3)",
                color: "var(--petential-dark)",
                marginBottom: "var(--spacing-md)"
              }}
            >
              ⚠️ Something went wrong
            </h2>
            <p 
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--petential-haiti-60)",
                marginBottom: "var(--spacing-lg)"
              }}
            >
              The admin panel encountered an error. Please try refreshing the page.
            </p>
            <div style={{ display: "flex", gap: "var(--spacing-md)", justifyContent: "center" }}>
              <button 
                onClick={() => window.location.reload()}
                style={{
                  padding: "var(--spacing-md) var(--spacing-lg)",
                  backgroundColor: "var(--petential-teal)",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--radius-lg)",
                  cursor: "pointer",
                  fontSize: "var(--font-size-body)"
                }}
              >
                Refresh Page
              </button>
              <button 
                onClick={() => window.location.href = '/admin'}
                style={{
                  padding: "var(--spacing-md) var(--spacing-lg)",
                  backgroundColor: "var(--petential-sage)",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--radius-lg)",
                  cursor: "pointer",
                  fontSize: "var(--font-size-body)"
                }}
              >
                Back to Login
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ marginTop: "var(--spacing-lg)", textAlign: "left" }}>
                <summary style={{ cursor: "pointer", color: "var(--petential-sage)" }}>
                  Show Error Details
                </summary>
                <pre 
                  style={{
                    background: "#f5f5f5",
                    padding: "var(--spacing-md)",
                    borderRadius: "var(--radius-md)",
                    fontSize: "var(--font-size-small)",
                    overflow: "auto",
                    marginTop: "var(--spacing-sm)"
                  }}
                >
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
