const DEFAULT_API_URL = 'https://areca-nut-grade-apps.onrender.com';

function resolveApiBaseUrl(): string {
  const url = import.meta.env.VITE_API_URL || DEFAULT_API_URL;
  if (
    typeof window !== 'undefined' &&
    window.location.protocol === 'https:' &&
    url.startsWith('http://')
  ) {
    return url.replace(/^http:\/\//i, 'https://');
  }
  return url;
}

export const API_BASE_URL = resolveApiBaseUrl();
export const APP_NAME = 'Arecanut Grade Admin';
