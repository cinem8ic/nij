/**
 * Universal Asset URL Resolver
 * 
 * Ensures public assets (images, videos, logos) resolve cleanly across:
 * - Vercel (root domain '/')
 * - GitHub Pages (repository subpath '/<repo-name>/' or user domain '/')
 * - Local development & static previews ('./')
 */
export function assetUrl(path: string): string {
  if (!path) return '';
  
  // Return external links, data URLs, and blobs as-is
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Strip leading slash or ./ for clean joining
  const cleanPath = path.replace(/^\.?\//, '');
  const base = import.meta.env.BASE_URL || '/';

  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}
