import { verifyJwt } from './jwt.js';
import { getAuthTokenFromCookie } from './http.js';
import { requireEnv } from './env.js';

export const SESSION_COOKIE_NAME = 'vip_admin_session';

export const getSessionFromRequest = (req) => {
  const token = getAuthTokenFromCookie(req, SESSION_COOKIE_NAME);
  if (!token) {
    return null;
  }
  const payload = verifyJwt(token, requireEnv('JWT_SECRET'));
  if (!payload || !payload.sub) {
    return null;
  }
  return { email: payload.sub };
};
