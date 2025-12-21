import { supabaseAdmin } from '../_lib/supabase.js';
import { requireEnv } from '../_lib/env.js';
import { badRequest, methodNotAllowed, parseJsonBody, sendJson, unauthorized } from '../_lib/http.js';
import { uploadPdfFromBase64 } from '../_lib/storage.js';

const webhookSecret = requireEnv('WEBHOOK_SECRET');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res, 'POST');
  }

  const authHeader = req.headers?.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : '';
  if (!token || token !== webhookSecret) {
    return unauthorized(res);
  }

  let body;
  try {
    body = await parseJsonBody(req);
  } catch (error) {
    return badRequest(res, 'Invalid JSON body');
  }

  const {
    name,
    email,
    score,
    clientPdfUrl,
    coachPdfUrl,
    clientPdfBase64,
    coachPdfBase64,
  } = body || {};
  if (!name || !email) {
    return badRequest(res, 'Name and email are required');
  }

  const parsedScore = typeof score === 'number' ? score : score ? Number(score) : null;

  let resolvedClientUrl = clientPdfUrl || null;
  let resolvedCoachUrl = coachPdfUrl || null;

  // Prefer explicit URLs; fall back to base64 uploads when provided.
  if (!resolvedClientUrl && clientPdfBase64) {
    const { url, error } = await uploadPdfFromBase64(clientPdfBase64, 'client');
    if (error) {
      return badRequest(res, `Client PDF upload failed: ${error}`);
    }
    resolvedClientUrl = url;
  }

  if (!resolvedCoachUrl && coachPdfBase64) {
    const { url, error } = await uploadPdfFromBase64(coachPdfBase64, 'coach');
    if (error) {
      return badRequest(res, `Coach PDF upload failed: ${error}`);
    }
    resolvedCoachUrl = url;
  }

  const { error } = await supabaseAdmin.from('assessments').insert({
    name,
    email,
    score: Number.isNaN(parsedScore) ? null : parsedScore,
    client_pdf_url: resolvedClientUrl,
    coach_pdf_url: resolvedCoachUrl,
  });

  if (error) {
    return sendJson(res, 500, { error: 'Failed to store report' });
  }

  return sendJson(res, 200, { ok: true });
}
