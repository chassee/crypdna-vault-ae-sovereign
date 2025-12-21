/**
 * Regional Accent Styles
 * Dynamically injects regional accent colors into CSS
 */

import { useEffect } from 'react';
import { useRegionalConfig } from '@/contexts/RegionalContext';

export function RegionalAccentStyles() {
  const { config } = useRegionalConfig();

  useEffect(() => {
    if (!config) return;

    // Create style element for regional accents
    const styleId = 'regional-accent-styles';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    // Generate regional CSS with accent color overlays
    const css = `
      /* Regional Accent: ${config.region} - ${config.aesthetic.palette} */
      :root {
        --region-accent: ${config.accentColor};
        --region-accent-rgb: ${hexToRgb(config.accentColor)};
      }

      /* Apply regional accent to gradients */
      .regional-accent-gradient {
        background: linear-gradient(
          135deg,
          hsl(var(--luxury-purple)) 0%,
          ${config.accentColor} 50%,
          hsl(var(--luxury-gold)) 100%
        );
      }

      /* Regional glow effects */
      .regional-glow {
        box-shadow: 0 0 40px ${config.accentColor}40;
      }

      .regional-glow:hover {
        box-shadow: 0 0 60px ${config.accentColor}60;
      }

      /* Regional border accent */
      .regional-border {
        border-color: ${config.accentColor}40;
      }

      /* Regional text accent */
      .regional-text-accent {
        color: ${config.accentColor};
      }

      /* Regional background tint */
      .regional-bg-tint {
        background: linear-gradient(
          135deg,
          ${config.accentColor}05,
          transparent
        );
      }

      /* Enhanced tab active state with regional color */
      [data-state="active"] {
        background: linear-gradient(
          135deg,
          hsl(var(--luxury-purple)),
          ${config.accentColor}
        ) !important;
      }

      /* Regional card hover effect */
      .luxury-card:hover {
        border-color: ${config.accentColor}30;
        box-shadow: 
          0 25px 50px -12px hsl(var(--luxury-purple) / 0.5),
          0 0 40px ${config.accentColor}20;
      }

      /* Regional loading screen accent */
      .regional-loading-accent {
        background: radial-gradient(
          circle at center,
          ${config.accentColor}20,
          transparent 70%
        );
      }
    `;

    styleEl.textContent = css;

    return () => {
      // Cleanup on unmount
      styleEl?.remove();
    };
  }, [config]);

  return null;
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 255, 255';
}
