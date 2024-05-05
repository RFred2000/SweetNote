import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {

  // Proxy for the backend
  if (req.nextUrl.pathname.startsWith('/api/')) {

    const url = new URL(req.url)
    url.host = String(process.env.BACKEND_HOST)

    const method = req.method
    let headers = new Headers(req.headers)
    let body = req.body;

    const response = await fetch(url.toString(), {
      method: method,
      headers: headers,
      body: body
    })

    return new NextResponse(response.body, response)

  }
}

export const config = {
  matcher: '/:path*',
}