import { requireEnv } from '../_lib/env.js';
import { verifyPassword } from '../_lib/password.js';
import { signJwt } from '../_lib/jwt.js';
import { badRequest, methodNotAllowed, sendJson, setAuthCookie, unauthorized, parseJsonBody } from '../_lib/http.js';
import { SESSION_COOKIE_NAME } from '../_lib/auth.js';

const adminEmail = requireEnv('ADMIN_EMAIL').toLowerCase();
const adminPasswordHash = requireEnv('ADMIN_PASSWORD_HASH');
const jwtSecret = requireEnv('JWT_SECRET');
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res, 'POST');
  }

  let body;
  try {
    body = await parseJsonBody(req);
  } catch (error) {
    return badRequest(res, 'Invalid JSON body');
  }

  const { email, password } = body || {};
  if (!email || !password) {
    return badRequest(res, 'Email and password are required');
  }

  const normalizedEmail = String(email).toLowerCase();
  const isValid = normalizedEmail === adminEmail && verifyPassword(String(password), adminPasswordHash);
  if (!isValid) {
    return unauthorized(res);
  }

  const token = signJwt({ sub: adminEmail }, jwtSecret, SESSION_TTL_SECONDS);
  setAuthCookie(res, SESSION_COOKIE_NAME, token, SESSION_TTL_SECONDS);
  return sendJson(res, 200, { ok: true });
}
