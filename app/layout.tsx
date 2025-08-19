import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Roboto } from "next/font/google"
import "./globals.css"
import "./static/css/components/navigation.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/lib/i18n/context"
import { defaultSEO } from "@/lib/seo/config"
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
})

export const metadata: Metadata = {
  ...generateSEOMetadata(defaultSEO),
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5E6PKJZP8B"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5E6PKJZP8B');
            `,
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
      </head>
      <body className={`${dmSans.variable} ${roboto.variable} antialiased`}>
        {/* Background accents (brand greens, subtle on light) */}
        <div 
          className="fixed inset-0 pointer-events-none overflow-hidden"
          style={{
            zIndex: -1,
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            position: 'fixed'
          }}
        >
          <div 
            className="absolute rounded-full blur-3xl" 
            style={{
              top: '-8rem',
              left: '-6rem',
              width: '20rem',
              height: '20rem',
              background: 'linear-gradient(to top right, #d4fe77, #c1fd3a, #b3e834)',
              opacity: 0.5
            }}
          ></div>
          <div 
            className="absolute rounded-full blur-3xl" 
            style={{
              top: '50%',
              right: '-10rem',
              width: '28rem',
              height: '28rem',
              transform: 'translateY(-50%)',
              background: 'linear-gradient(to bottom right, #c1fd3a, #d4fe77, #b3e834)',
              opacity: 0.35
            }}
          ></div>
          <div 
            className="absolute rounded-full blur-3xl" 
            style={{
              bottom: '-6rem',
              left: '50%',
              width: '18rem',
              height: '18rem',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to top, #d4fe77, transparent)',
              opacity: 0.3
            }}
          ></div>
          <div 
            className="absolute inset-0" 
            style={{
              background: 'radial-gradient(1200px 600px at 50% -100px, rgba(193,253,58,0.08), rgba(255,255,255,0))',
              opacity: 1
            }}
          ></div>
        </div>
        
        <LanguageProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
