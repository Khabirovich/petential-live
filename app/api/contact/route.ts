import { NextRequest, NextResponse } from 'next/server'
import { ContactService } from '../../../lib/database/contact-service'

// POST - Submit contact form
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
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { status: 'error', message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }
    
    // Create contact submission
    const submission = await ContactService.createContactSubmission({
      name: name || undefined,
      email,
      subject: subject || undefined,
      message
    })
    
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

// GET - Get all contact submissions (admin only)
export async function GET() {
  try {
    const submissions = await ContactService.getAllContactSubmissions()
    
    return NextResponse.json({
      status: 'success',
      submissions: submissions
    })
    
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch contact submissions' },
      { status: 500 }
    )
  }
}

// DELETE - Delete contact submission (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { status: 'error', message: 'Submission ID is required' },
        { status: 400 }
      )
    }
    
    await ContactService.deleteContactSubmission(id)
    
    return NextResponse.json({
      status: 'success',
      message: 'Contact submission deleted successfully'
    })
    
  } catch (error) {
    console.error('Error deleting contact submission:', error)
    return NextResponse.json(
      { status: 'error', message: 'Failed to delete contact submission' },
      { status: 500 }
    )
  }
}
