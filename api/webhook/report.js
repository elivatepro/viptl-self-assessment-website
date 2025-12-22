import { supabaseAdmin } from '../_lib/supabase.js';
import { requireEnv } from '../_lib/env.js';
import { badRequest, methodNotAllowed, parseJsonBody, sendJson, unauthorized } from '../_lib/http.js';
import { uploadPdfFromBase64, uploadPdfFromUrl } from '../_lib/storage.js';

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

  const resolvePdfUpload = async ({ base64, url, prefix }) => {
    if (base64) {
      const result = await uploadPdfFromBase64(base64, prefix);
      if (!result.error) return result;
      if (!url) return result;
    }

    if (url) {
      return uploadPdfFromUrl(url, prefix);
    }

    return { url: null };
  };

  let resolvedClientUrl = null;
  let resolvedCoachUrl = null;

  if (clientPdfBase64 || clientPdfUrl) {
    const { url, error } = await resolvePdfUpload({
      base64: clientPdfBase64,
      url: clientPdfUrl,
      prefix: 'client',
    });
    if (error) {
      return badRequest(res, `Client PDF upload failed: ${error}`);
    }
    resolvedClientUrl = url;
  }

  if (coachPdfBase64 || coachPdfUrl) {
    const { url, error } = await resolvePdfUpload({
      base64: coachPdfBase64,
      url: coachPdfUrl,
      prefix: 'coach',
    });
    if (error) {
      return badRequest(res, `Coach PDF upload failed: ${error}`);
    }
    resolvedCoachUrl = url;
  }

  // Upsert behavior: if a record with this email exists, fill only missing fields; otherwise insert.
  const { data: existingRows, error: selectError } = await supabaseAdmin
    .from('assessments')
    .select('id,name,email,score,client_pdf_url,coach_pdf_url')
    .eq('email', email)
    .order('created_at', { ascending: false })
    .limit(1);

  if (selectError) {
    return sendJson(res, 500, { error: 'Failed to check existing records' });
  }

  const existing = existingRows && existingRows[0];
  const safeScore = Number.isNaN(parsedScore) ? null : parsedScore;

  if (existing) {
    const nextPayload = {
      name: existing.name || name,
      email,
      score: existing.score ?? safeScore,
      client_pdf_url: resolvedClientUrl || existing.client_pdf_url,
      coach_pdf_url: resolvedCoachUrl || existing.coach_pdf_url,
    };

    const { error: updateError } = await supabaseAdmin.from('assessments').update(nextPayload).eq('id', existing.id);
    if (updateError) {
      return sendJson(res, 500, { error: 'Failed to update record' });
    }
    return sendJson(res, 200, { ok: true, updated: true });
  }

  const { error } = await supabaseAdmin.from('assessments').insert({
    name,
    email,
    score: safeScore,
    client_pdf_url: resolvedClientUrl,
    coach_pdf_url: resolvedCoachUrl,
  });

  if (error) {
    return sendJson(res, 500, { error: 'Failed to store report' });
  }

  return sendJson(res, 200, { ok: true });
}
