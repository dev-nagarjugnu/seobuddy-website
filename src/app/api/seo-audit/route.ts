// src/app/api/seo-audit/route.ts

import { NextResponse } from 'next/server'

interface AuditPayload {
  name: string
  email: string
  website: string
}

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email)
}

function isValidUrl(url: string) {
  try {
    const u = new URL(url)
    return !!u.protocol && !!u.host
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<AuditPayload>
    const name = (body.name || '').trim()
    const email = (body.email || '').trim().toLowerCase()
    const website = (body.website || '').trim()

    if (!name || !email || !website) {
      return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ success: false, message: 'Please provide a valid email address.' }, { status: 400 })
    }
    if (!isValidUrl(website)) {
      return NextResponse.json({ success: false, message: 'Please provide a valid website URL.' }, { status: 400 })
    }

    // Log the request for now (plug your email/CRM here)
    console.log('New SEO Audit Request:', {
      name,
      email,
      website,
      receivedAt: new Date().toISOString()
    })

    return NextResponse.json({ success: true, message: 'Your audit request has been received.' })
  } catch (error) {
    console.error('SEO Audit API error:', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}


