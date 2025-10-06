import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })

    const ext = path.extname(file.name) || '.png'
    const base = path.basename(file.name, ext).replace(/[^a-zA-Z0-9-_]/g, '') || 'image'
    const unique = `${base}-${Date.now()}${ext}`
    const filePath = path.join(uploadsDir, unique)

    await writeFile(filePath, buffer)

    const url = `/uploads/${unique}`
    return NextResponse.json({ success: true, url })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 })
  }
}


