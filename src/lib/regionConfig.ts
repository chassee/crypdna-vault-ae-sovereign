/**
 * CrypDNA Vault Regional Configuration System
 * Detects region from subdomain and loads regional UI config
 */

import designGenome from '../../core/design_genome/design_genome.json';

export interface RegionalConfig {
  region: string;
  language: string;
  currency: string;
  currencySymbol: string;
  creditAdapterRef: string;
  aesthetic: {
    palette: string;
    texture: string;
    typography: string | null;
  };
  accentColor: string;
}

export interface RegionalTheme {
  accentColor: string;
  accentOverlay: string;
  neuralGlow: string;
  primaryGradient: string;
  billionaireGold: string;
}

/**
 * Detect region from hostname subdomain
 * Examples:
 * - co.crypdawgs.com → CO
 * - ae.crypdawgs.com → AE
 * - jp.crypdawgs.com → JP
 * - vault.crypdawgs.com → US
 * - localhost → US (default)
 */
export function detectRegion(): string {
  if (typeof window === 'undefined') return 'us';
  
  const hostname = window.location.hostname;
  
  // Extract subdomain
  const parts = hostname.split('.');
  
  // Handle localhost and development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'us';
  }
  
  // Handle vault.crypdawgs.com (main US vault)
  if (parts[0] === 'vault') {
    return 'us';
  }
  
  // Handle regional subdomains (e.g., co.crypdawgs.com)
  if (parts.length >= 3) {
    const subdomain = parts[0].toLowerCase();
    // Validate it's a 2-letter country code
    if (subdomain.length === 2) {
      return subdomain;
    }
  }
  
  // Default to US
  return 'us';
}

/**
 * Load regional configuration from vault config
 */
export async function loadRegionalConfig(region: string): Promise<RegionalConfig | null> {
  try {
    const response = await fetch(`/vaults/${region}/config.json`);
    if (!response.ok) {
      console.warn(`Failed to load config for region ${region}, using default`);
      return null;
    }
    
    const config = await response.json();
    const accentColor = getAccentColor(region);
    
    return {
      region: config.region || region.toUpperCase(),
      language: config.language || 'en',
      currency: config.currency || 'USD',
      currencySymbol: config.currency_symbol || '$',
      creditAdapterRef: config.credit_adapter_ref || 'D&B',
      aesthetic: {
        palette: config.aesthetic?.palette || 'Core CrypDNA',
        texture: config.aesthetic?.texture || 'Carbon glass',
        typography: config.aesthetic?.typography || null,
      },
      accentColor,
    };
  } catch (error) {
    console.error(`Error loading regional config for ${region}:`, error);
    return null;
  }
}

/**
 * Get accent color from design genome
 */
export function getAccentColor(region: string): string {
  const adaptiveTones = designGenome.palette.adaptiveTones as Record<string, string>;
  return adaptiveTones[region.toLowerCase()] || adaptiveTones['us'] || '#C7E2FF';
}

/**
 * Generate regional theme based on accent color
 */
export function generateRegionalTheme(accentColor: string): RegionalTheme {
  // Convert hex to HSL for CSS variables
  const hsl = hexToHSL(accentColor);
  
  return {
    accentColor,
    accentOverlay: `${hsl.h} ${hsl.s}% ${hsl.l}%`,
    neuralGlow: `${hsl.h} ${hsl.s}% ${Math.min(hsl.l + 10, 90)}%`,
    primaryGradient: `linear-gradient(135deg, hsl(262, 90%, 60%), hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%), hsl(45, 100%, 60%))`,
    billionaireGold: '45 100% 60%',
  };
}

/**
 * Apply regional theme to CSS variables
 */
export function applyRegionalTheme(theme: RegionalTheme): void {
  const root = document.documentElement;
  
  root.style.setProperty('--accent-overlay', theme.accentOverlay);
  root.style.setProperty('--neural-glow', theme.neuralGlow);
  root.style.setProperty('--gradient-regional', theme.primaryGradient);
  root.style.setProperty('--billionaire-gold', theme.billionaireGold);
  root.style.setProperty('--region-accent', theme.accentColor);
}

/**
 * Convert hex color to HSL
 */
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Initialize regional configuration
 */
export async function initializeRegionalConfig(): Promise<RegionalConfig | null> {
  const region = detectRegion();
  console.log(`🌍 Detected region: ${region.toUpperCase()}`);
  
  const config = await loadRegionalConfig(region);
  
  if (config) {
    const theme = generateRegionalTheme(config.accentColor);
    applyRegionalTheme(theme);
    console.log(`🎨 Applied ${config.region} regional theme:`, theme);
  }
  
  return config;
}
