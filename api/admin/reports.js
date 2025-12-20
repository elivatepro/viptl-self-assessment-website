import { supabaseAdmin } from '../_lib/supabase.js';
import { getSessionFromRequest } from '../_lib/auth.js';
import { methodNotAllowed, sendJson, unauthorized } from '../_lib/http.js';

const buildDateRange = (value, isStart) => {
  if (!value) return null;
  const suffix = isStart ? 'T00:00:00Z' : 'T23:59:59Z';
  return `${value}${suffix}`;
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return methodNotAllowed(res, 'GET');
  }

  const session = getSessionFromRequest(req);
  if (!session) {
    return unauthorized(res);
  }

  const params = req.query || Object.fromEntries(new URL(req.url, 'http://localhost').searchParams);
  const search = params.q || params.search || '';
  const from = params.from || '';
  const to = params.to || '';

  let query = supabaseAdmin
    .from('assessments')
    .select('id,name,email,score,client_pdf_url,coach_pdf_url,created_at')
    .order('created_at', { ascending: false })
    .limit(200);

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }
  if (from) {
    const fromValue = buildDateRange(from, true);
    if (fromValue) {
      query = query.gte('created_at', fromValue);
    }
  }
  if (to) {
    const toValue = buildDateRange(to, false);
    if (toValue) {
      query = query.lte('created_at', toValue);
    }
  }

  const { data, error } = await query;
  if (error) {
    return sendJson(res, 500, { error: 'Failed to load reports' });
  }

  return sendJson(res, 200, { data: data || [] });
}
