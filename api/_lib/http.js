export const sendJson = (res, status, body) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
};

export const badRequest = (res, message = 'Bad Request') => sendJson(res, 400, { error: message });
export const unauthorized = (res) => sendJson(res, 401, { error: 'Unauthorized' });
export const methodNotAllowed = (res, allow = '') => {
  if (allow) {
    res.setHeader('Allow', allow);
  }
  return sendJson(res, 405, { error: 'Method not allowed' });
};

export const parseJsonBody = async (req) => {
  if (req.body) {
    if (typeof req.body === 'string') {
      return JSON.parse(req.body || '{}');
    }
    return req.body;
  }

  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
};

const parseCookies = (req) => {
  const header = req.headers?.cookie;
  if (!header) return {};
  return header.split(';').reduce((acc, part) => {
    const [key, ...rest] = part.trim().split('=');
    if (!key) return acc;
    acc[key] = decodeURIComponent(rest.join('='));
    return acc;
  }, {});
};

export const getAuthTokenFromCookie = (req, cookieName) => {
  const cookies = parseCookies(req);
  return cookies[cookieName];
};

export const setAuthCookie = (res, name, token, maxAgeSeconds) => {
  const secure = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
  const cookie = `${name}=${token}; Path=/; HttpOnly; SameSite=Lax; ${secure}Max-Age=${maxAgeSeconds}`;
  res.setHeader('Set-Cookie', cookie);
};

export const clearAuthCookie = (res, name) => {
  const secure = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
  res.setHeader('Set-Cookie', `${name}=; Path=/; HttpOnly; SameSite=Lax; ${secure}Max-Age=0`);
};
