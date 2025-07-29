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
  themeColor: "#667eea",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
