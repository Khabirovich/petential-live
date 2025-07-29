"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/lib/i18n/context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar") as HTMLElement
      if (navbar) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        if (scrollTop > 10) {
          navbar.style.boxShadow = "0 4px 20px rgba(102, 126, 234, 0.25)"
        } else {
          navbar.style.boxShadow = "0 2px 12px rgba(102, 126, 234, 0.15)"
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (!isMobileMenuOpen) {
      // Prevent background scrolling but allow menu scrolling
      document.body.style.position = "fixed"
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.width = "100%"
    } else {
      // Restore background scrolling
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          {/* LOGO COMPONENT */}
          <Link href="/" className="nav-logo" aria-label="PETential - Go to homepage">
            <div className="nav-logo-icon" aria-hidden="true"></div>
            <span className="nav-logo-text">PETential</span>
          </Link>

          {/* NAVIGATION MENU */}
          <ul className="nav-menu" role="menubar" aria-label="Main menu">
            <li role="none">
              <Link href="/breeds" className="nav-link" role="menuitem">
                {t('nav.breeds')}
              </Link>
            </li>
            <li role="none">
              <Link href="/about" className="nav-link" role="menuitem">
                {t('nav.about')}
              </Link>
            </li>
            <li role="none">
              <Link href="/blog" className="nav-link" role="menuitem">
                {t('nav.blog')}
              </Link>
            </li>
            <li role="none">
              <Link href="/insurance" className="nav-link" role="menuitem">
                {t('nav.insurance')}
              </Link>
            </li>

            {/* Guides Dropdown */}
            <li role="none">
              <DropdownMenu>
                <DropdownMenuTrigger 
                  className="nav-link focus:outline-none"
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                    }
                  }}
                  style={{
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontSize: "16px",
                    fontWeight: "400",
                    color: "#374151",
                    textDecoration: "none",
                    position: "relative",
                    transition: "color 0.2s ease",
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  {t('nav.guides')}
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="z-50 min-w-[220px] rounded-lg border border-gray-200 p-1"
                  align="center"
                  sideOffset={8}
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.07)",
                    animation: "fadeIn 0.15s ease-out"
                  }}
                >
                  <DropdownMenuItem asChild>
                    <Link 
                      href="/pet-care-guide" 
                      className="w-full flex items-center rounded-md transition-colors duration-200"
                      style={{
                        padding: "12px 16px",
                        fontSize: "14px",
                        color: "#374151",
                        textDecoration: "none",
                        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                        e.currentTarget.style.color = "#000000";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#374151";
                      }}
                    >
                      {t('nav.guides.petCareGuide')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      href="/training-tips" 
                      className="w-full flex items-center rounded-md transition-colors duration-200"
                      style={{
                        padding: "12px 16px",
                        fontSize: "14px",
                        color: "#374151",
                        textDecoration: "none",
                        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                        e.currentTarget.style.color = "#000000";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#374151";
                      }}
                    >
                      {t('nav.guides.trainingTips')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      href="/nutrition-guide" 
                      className="w-full flex items-center rounded-md transition-colors duration-200"
                      style={{
                        padding: "12px 16px",
                        fontSize: "14px",
                        color: "#374151",
                        textDecoration: "none",
                        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                        e.currentTarget.style.color = "#000000";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#374151";
                      }}
                    >
                      {t('nav.guides.nutritionGuide')}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>

            {/* Language Switcher */}
            <li role="none">
              <div 
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-xs)",
                  padding: "var(--spacing-sm) var(--spacing-md)",
                  borderRadius: "var(--radius-md)"
                }}
              >
                <button
                  onClick={() => setLanguage('en')}
                  style={{
                    padding: "var(--spacing-xs) var(--spacing-sm)",
                    backgroundColor: language === 'en' ? "var(--petential-primary)" : "transparent",
                    color: language === 'en' ? "var(--petential-dark)" : "var(--petential-haiti-60)",
                    border: "1px solid var(--petential-alabaster)",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                    fontSize: "var(--font-size-small)",
                    fontWeight: "var(--font-weight-medium)",
                    transition: "all var(--transition-normal)"
                  }}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('es')}
                  style={{
                    padding: "var(--spacing-xs) var(--spacing-sm)",
                    backgroundColor: language === 'es' ? "var(--petential-primary)" : "transparent",
                    color: language === 'es' ? "var(--petential-dark)" : "var(--petential-haiti-60)",
                    border: "1px solid var(--petential-alabaster)",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                    fontSize: "var(--font-size-small)",
                    fontWeight: "var(--font-weight-medium)",
                    transition: "all var(--transition-normal)"
                  }}
                >
                  ES
                </button>
              </div>
            </li>

            <li role="none">
              <Link href="/quiz" className="nav-cta" role="menuitem">
                {t('nav.getStarted')}
              </Link>
            </li>
          </ul>

          {/* Mobile Hamburger Menu */}
          <button
            className={`nav-hamburger ${isMobileMenuOpen ? "active" : ""}`}
            type="button"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="hamburger-line" aria-hidden="true"></span>
            <span className="hamburger-line" aria-hidden="true"></span>
            <span className="hamburger-line" aria-hidden="true"></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`nav-mobile-menu ${isMobileMenuOpen ? "active" : ""}`}
          role="menu"
          aria-label="Mobile navigation menu"
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="nav-mobile-content">
            <Link href="/breeds" className="nav-mobile-link" role="menuitem" onClick={toggleMobileMenu}>
              {t('nav.breeds')}
            </Link>
            <Link href="/about" className="nav-mobile-link" role="menuitem" onClick={toggleMobileMenu}>
              {t('nav.about')}
            </Link>
            <Link href="/blog" className="nav-mobile-link" role="menuitem" onClick={toggleMobileMenu}>
              {t('nav.blog')}
            </Link>
            <Link href="/insurance" className="nav-mobile-link" role="menuitem" onClick={toggleMobileMenu}>
              {t('nav.insurance')}
            </Link>
            
            {/* Mobile Guides Links */}
            <div 
              className="border-l-2 ml-4 pl-4 my-4"
              style={{
                borderColor: "#c1fd3a"
              }}
            >
              <div 
                className="text-xs font-medium uppercase tracking-wider mb-3 px-2"
                style={{
                  color: "#374151",
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontWeight: "600"
                }}
              >
                {t('nav.guides')}
              </div>
              <Link 
                href="/pet-care-guide" 
                className="nav-mobile-link block py-2 px-2 text-sm rounded-md transition-colors duration-200" 
                role="menuitem" 
                onClick={toggleMobileMenu}
                style={{
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  color: "#374151"
                }}
              >
                {t('nav.guides.petCareGuide')}
              </Link>
              <Link 
                href="/training-tips" 
                className="nav-mobile-link block py-2 px-2 text-sm rounded-md transition-colors duration-200" 
                role="menuitem" 
                onClick={toggleMobileMenu}
                style={{
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  color: "#374151"
                }}
              >
                {t('nav.guides.trainingTips')}
              </Link>
              <Link 
                href="/nutrition-guide" 
                className="nav-mobile-link block py-2 px-2 text-sm rounded-md transition-colors duration-200" 
                role="menuitem" 
                onClick={toggleMobileMenu}
                style={{
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  color: "#374151"
                }}
              >
                {t('nav.guides.nutritionGuide')}
              </Link>
            </div>
            
            {/* Mobile Language Switcher */}
            <div 
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "var(--spacing-sm)",
                padding: "var(--spacing-lg)",
                borderTop: "1px solid var(--petential-alabaster)",
                borderBottom: "1px solid var(--petential-alabaster)",
                margin: "var(--spacing-md) 0"
              }}
            >
              <button
                onClick={() => {setLanguage('en'); toggleMobileMenu()}}
                style={{
                  padding: "var(--spacing-sm) var(--spacing-lg)",
                  backgroundColor: language === 'en' ? "var(--petential-primary)" : "transparent",
                  color: language === 'en' ? "var(--petential-dark)" : "var(--petential-haiti-60)",
                  border: "2px solid var(--petential-alabaster)",
                  borderRadius: "var(--radius-lg)",
                  cursor: "pointer",
                  fontSize: "var(--font-size-body)",
                  fontWeight: "var(--font-weight-medium)",
                  transition: "all var(--transition-normal)",
                  flex: 1
                }}
              >
                English
              </button>
              <button
                onClick={() => {setLanguage('es'); toggleMobileMenu()}}
                style={{
                  padding: "var(--spacing-sm) var(--spacing-lg)",
                  backgroundColor: language === 'es' ? "var(--petential-primary)" : "transparent",
                  color: language === 'es' ? "var(--petential-dark)" : "var(--petential-haiti-60)",
                  border: "2px solid var(--petential-alabaster)",
                  borderRadius: "var(--radius-lg)",
                  cursor: "pointer",
                  fontSize: "var(--font-size-body)",
                  fontWeight: "var(--font-weight-medium)",
                  transition: "all var(--transition-normal)",
                  flex: 1
                }}
              >
                Español
              </button>
            </div>
            
            <Link
              href="/#quiz-section"
              className="nav-mobile-link nav-mobile-cta"
              role="menuitem"
              onClick={toggleMobileMenu}
            >
              {t('nav.getStarted')}
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
