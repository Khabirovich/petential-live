import { NextRequest, NextResponse } from 'next/server'
import { NewsletterService } from '../../../lib/database/contact-service'

// POST - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body
    
    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { status: 'error', message: 'Email is required' },
        { status: 400 }
      )
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { status: 'error', message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }
    
    // Subscribe to newsletter
    const subscription = await NewsletterService.subscribeToNewsletter(email.trim())
    
    return NextResponse.json({
      status: 'success',
      message: 'Thank you for subscribing! You will receive our latest updates.',
      id: subscription.id
    })
    
  } catch (error) {
    console.error('Error processing newsletter subscription:', error)
    
    // Handle specific error cases
    if (error instanceof Error && error.message.includes('already subscribed')) {
      return NextResponse.json({
        status: 'success',
        message: 'You are already subscribed to our newsletter.'
      })
    }
    
    return NextResponse.json(
      { status: 'error', message: 'Sorry, there was an error with your subscription. Please try again.' },
      { status: 500 }
    )
  }
}

// GET - Get all newsletter subscriptions (admin only)
export async function GET() {
  try {
    const subscriptions = await NewsletterService.getAllSubscriptions()
    
    return NextResponse.json({
      status: 'success',
      subscriptions: subscriptions
    })
    
  } catch (error) {
    console.error('Error fetching newsletter subscriptions:', error)
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch newsletter subscriptions' },
      { status: 500 }
    )
  }
}

// DELETE - Unsubscribe from newsletter
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json(
        { status: 'error', message: 'Email is required' },
        { status: 400 }
      )
    }
    
    await NewsletterService.unsubscribeFromNewsletter(email)
    
    return NextResponse.json({
      status: 'success',
      message: 'Successfully unsubscribed from newsletter'
    })
    
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error)
    return NextResponse.json(
      { status: 'error', message: 'Failed to unsubscribe from newsletter' },
      { status: 500 }
    )
  }
}