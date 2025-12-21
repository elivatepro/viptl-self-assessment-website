import { supabaseAdmin } from '../_lib/supabase.js';
import { methodNotAllowed, parseJsonBody, sendJson, unauthorized, badRequest } from '../_lib/http.js';
import { getSessionFromRequest } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return methodNotAllowed(res, 'POST, DELETE');
  }

  const session = getSessionFromRequest(req);
  if (!session) {
    return unauthorized(res);
  }

  let body;
  try {
    body = await parseJsonBody(req);
  } catch (error) {
    return badRequest(res, 'Invalid JSON body');
  }

  const { id } = body || {};
  if (!id) {
    return badRequest(res, 'Record id is required');
  }

  const { error } = await supabaseAdmin.from('assessments').delete().eq('id', id);
  if (error) {
    return sendJson(res, 500, { error: 'Failed to delete record' });
  }

  return sendJson(res, 200, { ok: true });
}
