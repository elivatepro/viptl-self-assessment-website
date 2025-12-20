import { clearAuthCookie, methodNotAllowed, sendJson } from '../_lib/http.js';
import { SESSION_COOKIE_NAME } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res, 'POST');
  }
  clearAuthCookie(res, SESSION_COOKIE_NAME);
  return sendJson(res, 200, { ok: true });
}
