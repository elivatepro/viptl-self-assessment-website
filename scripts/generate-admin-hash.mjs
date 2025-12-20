import { randomBytes, scryptSync } from 'crypto';

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/generate-admin-hash.mjs "<password>"');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);

console.log(`${salt.toString('base64')}:${hash.toString('base64')}`);
