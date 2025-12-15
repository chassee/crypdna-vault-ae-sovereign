import { REGION_MAP } from '@/config/regions';

export function resolveRegion() {
  if (typeof window === 'undefined') {
    return REGION_MAP.us;
  }

  const host = window.location.hostname.toLowerCase();

  // Extract subdomain (ae, us, br, jp, etc)
  const subdomain = host.split('.')[0];

  // Match against REGION_MAP keys
  if (REGION_MAP[subdomain]) {
    return REGION_MAP[subdomain];
  }

  // Fallback = USA master vault
  return REGION_MAP.us;
}
