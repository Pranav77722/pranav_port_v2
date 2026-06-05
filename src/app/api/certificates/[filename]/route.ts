import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const filename = (await params).filename
    // Path to the CERTIFICATE directory at the root of the project
    const filePath = path.join(process.cwd(), 'CERTIFICATE', filename)

    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 })
    }

    const fileBuffer = fs.readFileSync(filePath)
    
    // Determine content type based on extension
    const ext = path.extname(filename).toLowerCase()
    let contentType = 'application/octet-stream'
    
    if (ext === '.pdf') {
      contentType = 'application/pdf'
    } else if (ext === '.png') {
      contentType = 'image/png'
    } else if (ext === '.jpg' || ext === '.jpeg') {
      contentType = 'image/jpeg'
    }

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error serving certificate:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
