import { badRequest, methodNotAllowed } from '../_lib/http.js';

// Simple proxy to force inline Content-Disposition for PDF preview.
// Caution: Only allows https URLs and limits to PDF responses.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return methodNotAllowed(res, 'GET');
  }

  const { searchParams } = new URL(req.url, 'http://localhost');
  const targetUrl = searchParams.get('url');

  if (!targetUrl || !targetUrl.startsWith('https://')) {
    return badRequest(res, 'Invalid or missing url');
  }

  try {
    const upstream = await fetch(targetUrl);
    if (!upstream.ok) {
      res.statusCode = upstream.status;
      return res.end('Failed to fetch file');
    }

    const contentType = upstream.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('pdf')) {
      res.setHeader('Content-Type', contentType || 'application/octet-stream');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
    }
    // Force inline preview where possible
    res.setHeader('Content-Disposition', 'inline');

    upstream.body?.pipe(res);
  } catch (error) {
    res.statusCode = 500;
    res.end('Proxy error');
  }
}
