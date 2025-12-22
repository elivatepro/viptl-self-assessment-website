import { randomBytes } from 'crypto';
import { supabaseAdmin } from './supabase.js';
import { getEnv } from './env.js';

const DEFAULT_BUCKET = 'reports';
const MAX_PDF_BYTES = 7 * 1024 * 1024; // 7MB safety cap

const generatePath = (prefix) => {
  const rand = randomBytes(6).toString('hex');
  return `${prefix || 'report'}-${Date.now()}-${rand}.pdf`;
};

const uploadPdfBuffer = async (buffer, prefix = 'report') => {
  if (!buffer || buffer.length === 0) {
    return { error: 'Empty file' };
  }

  if (buffer.length > MAX_PDF_BYTES) {
    return { error: 'File too large' };
  }

  const bucket = getEnv('SUPABASE_STORAGE_BUCKET', DEFAULT_BUCKET);
  const path = generatePath(prefix);

  const { error: uploadError } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, buffer, {
      contentType: 'application/pdf',
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    return { error: 'Upload failed' };
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
  if (!data?.publicUrl) {
    return { error: 'Could not get public URL' };
  }

  return { url: data.publicUrl };
};

export const uploadPdfFromBase64 = async (base64String, prefix = 'report') => {
  if (!base64String || typeof base64String !== 'string') {
    return { error: 'Missing base64 data' };
  }

  let buffer;
  try {
    const normalized = base64String.startsWith('data:') && base64String.includes(',')
      ? base64String.substring(base64String.indexOf(',') + 1)
      : base64String.trim();
    buffer = Buffer.from(normalized, 'base64');
  } catch (error) {
    return { error: 'Invalid base64 encoding' };
  }

  return uploadPdfBuffer(buffer, prefix);
};

export const uploadPdfFromUrl = async (url, prefix = 'report') => {
  if (!url || typeof url !== 'string') {
    return { error: 'Missing URL' };
  }

  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    return { error: 'Could not download file' };
  }

  if (!response?.ok) {
    return { error: `Download failed (${response?.status || 'unknown status'})` };
  }

  const contentType = response.headers?.get('content-type') || '';
  if (contentType && !contentType.toLowerCase().includes('pdf') && contentType !== 'application/octet-stream') {
    return { error: 'Downloaded file is not a PDF' };
  }

  let buffer;
  try {
    const arrayBuffer = await response.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
  } catch (error) {
    return { error: 'Failed to read downloaded file' };
  }

  return uploadPdfBuffer(buffer, prefix);
};
