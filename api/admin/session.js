import { methodNotAllowed, sendJson, unauthorized } from '../_lib/http.js';
import { getSessionFromRequest } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return methodNotAllowed(res, 'GET');
  }

  const session = getSessionFromRequest(req);
  if (!session) {
    return unauthorized(res);
  }

  return sendJson(res, 200, { email: session.email });
}
