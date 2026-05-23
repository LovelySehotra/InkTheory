/**
 * ============================================================
 * Ink Theory — Global App Configuration
 * ============================================================
 * Single source of truth for all environment-driven variables.
 * All values are read from NEXT_PUBLIC_* env vars so they are
 * safely available in both server and client components.
 *
 * To override for local dev:  edit frontend/.env.local
 * To override for production: set env vars in your host (Vercel, etc.)
 * ============================================================
 */

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

/** Base URL of the NestJS backend — no trailing slash */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5001';

/** Pre-built endpoint strings (keeps call-sites clean) */
export const API_ENDPOINTS = {
  // Artists
  artists: `${API_BASE_URL}/artists`,

  // Gallery
  gallery: `${API_BASE_URL}/gallery`,

  // Bookings
  bookings: `${API_BASE_URL}/bookings`,
  bookingStatus: (id: string) => `${API_BASE_URL}/bookings/${id}/status`,

  // File upload
  upload: `${API_BASE_URL}/upload`,

  // Contact / Inquiries
  contact: `${API_BASE_URL}/contact`,

  // Chatbot
  chatbot: `${API_BASE_URL}/chatbot/message`,
} as const;

// ---------------------------------------------------------------------------
// Studio / Branding
// ---------------------------------------------------------------------------

/** Human-readable studio name shown in UI and metadata */
export const STUDIO_NAME =
  process.env.NEXT_PUBLIC_STUDIO_NAME ?? 'Ink Theory';

/** Public contact email */
export const STUDIO_EMAIL =
  process.env.NEXT_PUBLIC_STUDIO_EMAIL ?? 'hello@inktheory.studio';

/** Public contact phone */
export const STUDIO_PHONE =
  process.env.NEXT_PUBLIC_STUDIO_PHONE ?? '+1 (555) 019-2831';

/** Instagram profile URL */
export const STUDIO_INSTAGRAM =
  process.env.NEXT_PUBLIC_STUDIO_INSTAGRAM ?? 'https://instagram.com/inktheory';

// ---------------------------------------------------------------------------
// Uploads / Media
// ---------------------------------------------------------------------------

/**
 * Fallback image URL used when the file upload endpoint is unreachable.
 * Points to a royalty-free tattoo photo on Unsplash by default.
 */
export const UPLOAD_FALLBACK_IMAGE =
  process.env.NEXT_PUBLIC_UPLOAD_FALLBACK_IMAGE ??
  'https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=600';
