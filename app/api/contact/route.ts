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
    const { name, email, subject, message } = body
    
    // Validate required fields
    if (!email || !message) {
      return NextResponse.json(
        { status: 'error', message: 'Email and message are required' },
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
    
    // Create new contact submission
    const submission = {
      id: generateId(),
      name: name || '',
      email,
      subject: subject || '',
      message,
      timestamp: new Date().toISOString()
    }
    
    // Add to contacts array
    userData.contacts.unshift(submission)
    
    // Save back to file
    fs.writeFileSync(USER_DATA_FILE, JSON.stringify(userData, null, 2))
    
    return NextResponse.json({
      status: 'success',
      message: 'Thank you for your message! We will get back to you soon.',
      id: submission.id
    })
    
  } catch (error) {
    console.error('Error saving contact submission:', error)
    return NextResponse.json(
      { status: 'error', message: 'Sorry, there was an error sending your message. Please try again.' },
      { status: 500 }
    )
  }
} 