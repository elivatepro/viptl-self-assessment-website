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
    // eslint-disable-next-line no-console
    console.error('[storage] Upload failed:', uploadError);
    return { error: `Upload failed: ${uploadError.message || uploadError}` };
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
  if (!data?.publicUrl) {
    // eslint-disable-next-line no-console
    console.error('[storage] Could not get public URL for path:', path);
    return { error: 'Could not get public URL' };
  }

  // eslint-disable-next-line no-console
  console.log('[storage] Upload successful. Path:', path, 'Size:', buffer.length, 'bytes. Public URL:', data.publicUrl);
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

  // eslint-disable-next-line no-console
  console.log('[storage] Downloading PDF from URL:', url);

  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[storage] Download error:', error);
    return { error: `Could not download file: ${error.message}` };
  }

  if (!response?.ok) {
    // eslint-disable-next-line no-console
    console.error('[storage] Download failed with status:', response?.status);
    return { error: `Download failed (${response?.status || 'unknown status'})` };
  }

  const contentType = response.headers?.get('content-type') || '';
  // eslint-disable-next-line no-console
  console.log('[storage] Downloaded file content-type:', contentType);

  if (contentType && !contentType.toLowerCase().includes('pdf') && contentType !== 'application/octet-stream') {
    // eslint-disable-next-line no-console
    console.error('[storage] Invalid content type. Expected PDF, got:', contentType);
    return { error: 'Downloaded file is not a PDF' };
  }

  let buffer;
  try {
    const arrayBuffer = await response.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
    // eslint-disable-next-line no-console
    console.log('[storage] Downloaded buffer size:', buffer.length, 'bytes');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[storage] Failed to read arrayBuffer:', error);
    return { error: 'Failed to read downloaded file' };
  }

  return uploadPdfBuffer(buffer, prefix);
};
