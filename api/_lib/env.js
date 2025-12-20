export const requireEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const getEnv = (key, fallback = undefined) => {
  const value = process.env[key];
  if (typeof value === 'undefined' || value === null) {
    return fallback;
  }
  return value;
};
