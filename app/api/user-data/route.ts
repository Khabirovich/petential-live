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

function readUserData(): UserData {
  try {
    ensureDataDirectory()
    if (fs.existsSync(USER_DATA_FILE)) {
      const data = fs.readFileSync(USER_DATA_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading user data:', error)
  }
  
  return {
    contacts: [],
    newsletters: [],
    feedback: []
  }
}

function writeUserData(data: UserData): void {
  try {
    ensureDataDirectory()
    fs.writeFileSync(USER_DATA_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing user data:', error)
  }
}

// GET - Retrieve all user data
export async function GET() {
  try {
    const userData = readUserData()
    return NextResponse.json(userData)
  } catch (error) {
    console.error('Error getting user data:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve user data' },
      { status: 500 }
    )
  }
}

// DELETE - Delete specific item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'contacts', 'newsletters', or 'feedback'
    const id = searchParams.get('id')

    if (!type || !id) {
      return NextResponse.json(
        { error: 'Type and ID are required' },
        { status: 400 }
      )
    }

    const userData = readUserData()
    let found = false

    if (type === 'contacts') {
      const initialLength = userData.contacts.length
      userData.contacts = userData.contacts.filter(item => item.id !== id)
      found = userData.contacts.length < initialLength
    } else if (type === 'newsletters') {
      const initialLength = userData.newsletters.length
      userData.newsletters = userData.newsletters.filter(item => item.id !== id)
      found = userData.newsletters.length < initialLength
    } else if (type === 'feedback') {
      const initialLength = userData.feedback.length
      userData.feedback = userData.feedback.filter(item => item.id !== id)
      found = userData.feedback.length < initialLength
    }

    if (found) {
      writeUserData(userData)
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Error deleting user data:', error)
    return NextResponse.json(
      { error: 'Failed to delete user data' },
      { status: 500 }
    )
  }
} 