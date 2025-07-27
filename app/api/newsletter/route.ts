import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
}

interface NewsletterSubscription {
  id: string
  email: string
  timestamp: string
}

interface FeedbackSubmission {
  id: string
  name: string
  email: string
  feedback_type: string
  rating: string
  features_used: string[]
  message: string
  suggestions: string
  allow_follow_up: boolean
  newsletter_signup: boolean
  timestamp: string
}

interface UserData {
  contacts: ContactSubmission[]
  newsletters: NewsletterSubscription[]
  feedback: FeedbackSubmission[]
}

const USER_DATA_FILE = path.join(process.cwd(), 'data', 'user-data.json')

function ensureDataDirectory() {
  const dataDir = path.dirname(USER_DATA_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body
    
    // Validate email
    if (!email) {
      return NextResponse.json(
        { status: 'error', message: 'Email is required' },
        { status: 400 }
      )
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { status: 'error', message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }
    
    // Ensure data directory exists
    ensureDataDirectory()
    
    // Read existing data
    let userData: UserData = { contacts: [], newsletters: [], feedback: [] }
    try {
      if (fs.existsSync(USER_DATA_FILE)) {
        const data = fs.readFileSync(USER_DATA_FILE, 'utf-8')
        userData = JSON.parse(data)
      }
    } catch (error) {
      console.error('Error reading user data:', error)
    }
    
    // Check if email already exists
    const existingSubscription = userData.newsletters.find(sub => sub.email === email)
    if (existingSubscription) {
      return NextResponse.json({
        status: 'success',
        message: 'You are already subscribed to our newsletter.',
        id: existingSubscription.id
      })
    }
    
    // Create new newsletter subscription
    const subscription = {
      id: generateId(),
      email,
      timestamp: new Date().toISOString()
    }
    
    // Add to newsletters array
    userData.newsletters.unshift(subscription)
    
    // Save back to file
    fs.writeFileSync(USER_DATA_FILE, JSON.stringify(userData, null, 2))
    
    return NextResponse.json({
      status: 'success',
      message: 'Thank you for subscribing! You will receive our latest updates.',
      id: subscription.id
    })
    
  } catch (error) {
    console.error('Error saving newsletter subscription:', error)
    return NextResponse.json(
      { status: 'error', message: 'Sorry, there was an error with your subscription. Please try again.' },
      { status: 500 }
    )
  }
} 