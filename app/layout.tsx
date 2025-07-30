import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Roboto } from "next/font/google"
import "./globals.css"
import "./static/css/components/navigation.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/lib/i18n/context"

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
  title: "PETential - Find Your Perfect Pet Match",
  description: "Find your perfect pet match with PETential's personalized quiz system for dogs and cats",
  generator: 'v0.dev',
  metadataBase: new URL('https://petential.es'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PETential - Find Your Perfect Pet Match',
    description: 'Find your perfect pet match with PETential\'s personalized quiz system for dogs and cats',
    url: 'https://petential.es',
    siteName: 'PETential',
    images: [
      {
        url: '/images/social/og-image.png',
        width: 576,
        height: 576,
        alt: 'PETential - Pet Breed Matching Platform with volunteers and animals',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PETential - Find Your Perfect Pet Match',
    description: 'Find your perfect pet match with PETential\'s personalized quiz system for dogs and cats',
    images: ['/images/social/og-image.png'],
    creator: '@petential',
    site: '@petential',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
      </head>
      <body className={`${dmSans.variable} ${roboto.variable} antialiased`}>
        <LanguageProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
