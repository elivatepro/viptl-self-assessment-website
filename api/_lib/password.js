import { scryptSync, timingSafeEqual } from 'crypto';

// ADMIN_PASSWORD_HASH format: saltBase64:hashBase64
export const verifyPassword = (password, storedHash) => {
  if (!storedHash || typeof storedHash !== 'string' || !storedHash.includes(':')) {
    return false;
  }
  const [saltB64, hashB64] = storedHash.split(':');
  if (!saltB64 || !hashB64) {
    return false;
  }

  const salt = Buffer.from(saltB64, 'base64');
  const expected = Buffer.from(hashB64, 'base64');
  if (!salt.length || !expected.length) {
    return false;
  }

  const derived = scryptSync(password, salt, expected.length);
  return derived.length === expected.length && timingSafeEqual(derived, expected);
};
