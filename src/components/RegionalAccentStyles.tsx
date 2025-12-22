/**
 * Regional Visual DNA System
 * Injects distinct luxury visual identities per region
 * US vault remains untouched - only non-US regions get visual divergence
 */

import { useEffect } from 'react';
import { useRegionalConfig } from '@/contexts/RegionalContext';

/**
 * REGIONAL VISUAL DNA MAP
 * Each non-US region gets a completely distinct luxury identity
 */
const REGIONAL_VISUAL_DNA: Record<string, {
  base: string;
  accent: string;
  glow: string;
  gradient: string;
  border: string;
  shadow: string;
  text: string;
}> = {
  // UAE - Obsidian Black + Molten Gold
  ae: {
    base: '0 0% 5%',
    accent: '45 100% 50%',
    glow: '45 100% 60%',
    gradient: 'linear-gradient(135deg, hsl(0, 0%, 8%) 0%, hsl(45, 100%, 40%) 50%, hsl(0, 0%, 3%) 100%)',
    border: 'hsl(45, 100%, 45%)',
    shadow: '0 0 60px hsla(45, 100%, 50%, 0.4)',
    text: 'hsl(45, 100%, 55%)',
  },
  // Colombia - Emerald Jungle
  co: {
    base: '150 40% 8%',
    accent: '145 80% 40%',
    glow: '145 90% 50%',
    gradient: 'linear-gradient(135deg, hsl(150, 50%, 12%) 0%, hsl(145, 80%, 35%) 50%, hsl(140, 60%, 20%) 100%)',
    border: 'hsl(145, 70%, 40%)',
    shadow: '0 0 50px hsla(145, 80%, 45%, 0.35)',
    text: 'hsl(145, 85%, 50%)',
  },
  // Japan - Crimson + Neon Minimal
  jp: {
    base: '0 0% 4%',
    accent: '0 90% 55%',
    glow: '350 100% 60%',
    gradient: 'linear-gradient(135deg, hsl(0, 0%, 6%) 0%, hsl(0, 85%, 50%) 50%, hsl(0, 0%, 3%) 100%)',
    border: 'hsl(0, 80%, 50%)',
    shadow: '0 0 40px hsla(0, 90%, 55%, 0.45)',
    text: 'hsl(0, 95%, 60%)',
  },
  // France - Indigo + Marble White
  fr: {
    base: '240 30% 10%',
    accent: '240 70% 60%',
    glow: '245 80% 70%',
    gradient: 'linear-gradient(135deg, hsl(240, 25%, 15%) 0%, hsl(240, 65%, 55%) 40%, hsl(0, 0%, 95%) 100%)',
    border: 'hsl(240, 60%, 55%)',
    shadow: '0 0 45px hsla(240, 70%, 60%, 0.3)',
    text: 'hsl(240, 75%, 70%)',
  },
  // Germany - Graphite + Steel
  de: {
    base: '220 15% 8%',
    accent: '220 20% 50%',
    glow: '215 25% 60%',
    gradient: 'linear-gradient(135deg, hsl(220, 10%, 12%) 0%, hsl(220, 20%, 45%) 50%, hsl(220, 15%, 25%) 100%)',
    border: 'hsl(220, 25%, 45%)',
    shadow: '0 0 35px hsla(220, 20%, 50%, 0.35)',
    text: 'hsl(220, 30%, 65%)',
  },
  // Italy - Deep Wine + Marble Cream
  it: {
    base: '350 40% 10%',
    accent: '350 60% 45%',
    glow: '355 70% 55%',
    gradient: 'linear-gradient(135deg, hsl(350, 35%, 15%) 0%, hsl(350, 55%, 40%) 50%, hsl(40, 30%, 90%) 100%)',
    border: 'hsl(350, 55%, 45%)',
    shadow: '0 0 50px hsla(350, 60%, 45%, 0.35)',
    text: 'hsl(350, 65%, 55%)',
  },
  // Spain - Warm Crimson + Sun Gold
  es: {
    base: '15 50% 8%',
    accent: '5 85% 55%',
    glow: '45 100% 55%',
    gradient: 'linear-gradient(135deg, hsl(5, 80%, 45%) 0%, hsl(35, 100%, 50%) 50%, hsl(5, 70%, 35%) 100%)',
    border: 'hsl(5, 80%, 50%)',
    shadow: '0 0 55px hsla(5, 85%, 55%, 0.4)',
    text: 'hsl(45, 100%, 60%)',
  },
  // Brazil - Jade + Rainforest Green
  br: {
    base: '160 45% 8%',
    accent: '155 75% 45%',
    glow: '150 85% 55%',
    gradient: 'linear-gradient(135deg, hsl(160, 40%, 12%) 0%, hsl(155, 70%, 40%) 50%, hsl(145, 60%, 30%) 100%)',
    border: 'hsl(155, 70%, 42%)',
    shadow: '0 0 50px hsla(155, 75%, 50%, 0.4)',
    text: 'hsl(155, 80%, 55%)',
  },
  // Mexico - Obsidian + Copper Fire
  mx: {
    base: '0 0% 4%',
    accent: '25 90% 50%',
    glow: '20 100% 55%',
    gradient: 'linear-gradient(135deg, hsl(0, 0%, 6%) 0%, hsl(25, 85%, 45%) 50%, hsl(0, 0%, 8%) 100%)',
    border: 'hsl(25, 85%, 48%)',
    shadow: '0 0 55px hsla(25, 90%, 50%, 0.45)',
    text: 'hsl(25, 95%, 58%)',
  },
  // Canada - Ice Blue + Silver Frost
  ca: {
    base: '210 35% 10%',
    accent: '200 80% 60%',
    glow: '195 90% 70%',
    gradient: 'linear-gradient(135deg, hsl(210, 30%, 15%) 0%, hsl(200, 75%, 55%) 50%, hsl(0, 0%, 90%) 100%)',
    border: 'hsl(200, 75%, 58%)',
    shadow: '0 0 45px hsla(200, 80%, 65%, 0.35)',
    text: 'hsl(200, 85%, 70%)',
  },
  // UK - Royal Blue + Gold Trim
  uk: {
    base: '225 45% 10%',
    accent: '225 85% 50%',
    glow: '45 100% 55%',
    gradient: 'linear-gradient(135deg, hsl(225, 40%, 15%) 0%, hsl(225, 80%, 45%) 50%, hsl(45, 100%, 50%) 100%)',
    border: 'hsl(225, 80%, 48%)',
    shadow: '0 0 50px hsla(225, 85%, 55%, 0.4)',
    text: 'hsl(45, 100%, 55%)',
  },
  // GB alias for UK
  gb: {
    base: '225 45% 10%',
    accent: '225 85% 50%',
    glow: '45 100% 55%',
    gradient: 'linear-gradient(135deg, hsl(225, 40%, 15%) 0%, hsl(225, 80%, 45%) 50%, hsl(45, 100%, 50%) 100%)',
    border: 'hsl(225, 80%, 48%)',
    shadow: '0 0 50px hsla(225, 85%, 55%, 0.4)',
    text: 'hsl(45, 100%, 55%)',
  },
  // Australia - Desert Sand + Sun Bronze
  au: {
    base: '35 40% 10%',
    accent: '35 80% 55%',
    glow: '30 90% 60%',
    gradient: 'linear-gradient(135deg, hsl(35, 35%, 15%) 0%, hsl(35, 75%, 50%) 50%, hsl(25, 85%, 45%) 100%)',
    border: 'hsl(35, 75%, 52%)',
    shadow: '0 0 50px hsla(35, 80%, 55%, 0.4)',
    text: 'hsl(35, 85%, 60%)',
  },
  // Singapore - Neon Jade + Carbon Black
  sg: {
    base: '0 0% 3%',
    accent: '160 100% 50%',
    glow: '155 100% 60%',
    gradient: 'linear-gradient(135deg, hsl(0, 0%, 5%) 0%, hsl(160, 100%, 45%) 50%, hsl(0, 0%, 3%) 100%)',
    border: 'hsl(160, 100%, 48%)',
    shadow: '0 0 60px hsla(160, 100%, 55%, 0.5)',
    text: 'hsl(160, 100%, 55%)',
  },
  // Korea - Carbon Black + Electric Violet
  kr: {
    base: '0 0% 4%',
    accent: '280 100% 60%',
    glow: '275 100% 70%',
    gradient: 'linear-gradient(135deg, hsl(0, 0%, 6%) 0%, hsl(280, 95%, 55%) 50%, hsl(0, 0%, 3%) 100%)',
    border: 'hsl(280, 95%, 58%)',
    shadow: '0 0 55px hsla(280, 100%, 60%, 0.5)',
    text: 'hsl(280, 100%, 70%)',
  },
  // India - Saffron + Royal Indigo
  in: {
    base: '260 40% 10%',
    accent: '30 100% 55%',
    glow: '35 100% 60%',
    gradient: 'linear-gradient(135deg, hsl(260, 35%, 15%) 0%, hsl(30, 95%, 50%) 50%, hsl(260, 70%, 40%) 100%)',
    border: 'hsl(30, 95%, 52%)',
    shadow: '0 0 55px hsla(30, 100%, 55%, 0.45)',
    text: 'hsl(30, 100%, 60%)',
  },
  // Saudi Arabia - Emerald Black + Gold Leaf
  sa: {
    base: '150 30% 5%',
    accent: '45 100% 50%',
    glow: '145 80% 45%',
    gradient: 'linear-gradient(135deg, hsl(150, 25%, 8%) 0%, hsl(145, 75%, 35%) 40%, hsl(45, 100%, 50%) 100%)',
    border: 'hsl(45, 100%, 48%)',
    shadow: '0 0 60px hsla(45, 100%, 50%, 0.45)',
    text: 'hsl(45, 100%, 55%)',
  },
  // South Africa - Onyx + Mineral Gold
  za: {
    base: '0 0% 4%',
    accent: '50 80% 50%',
    glow: '45 90% 55%',
    gradient: 'linear-gradient(135deg, hsl(0, 0%, 6%) 0%, hsl(50, 75%, 45%) 50%, hsl(0, 0%, 8%) 100%)',
    border: 'hsl(50, 75%, 48%)',
    shadow: '0 0 50px hsla(50, 80%, 50%, 0.4)',
    text: 'hsl(50, 85%, 55%)',
  },
  // Nigeria - Emerald + Bronze Heat
  ng: {
    base: '145 35% 8%',
    accent: '30 85% 50%',
    glow: '145 70% 45%',
    gradient: 'linear-gradient(135deg, hsl(145, 30%, 12%) 0%, hsl(145, 65%, 35%) 40%, hsl(30, 80%, 45%) 100%)',
    border: 'hsl(30, 80%, 48%)',
    shadow: '0 0 50px hsla(145, 70%, 45%, 0.4)',
    text: 'hsl(30, 90%, 55%)',
  },
  // Egypt - Sandstone + Solar Gold
  eg: {
    base: '40 35% 10%',
    accent: '45 100% 55%',
    glow: '40 100% 60%',
    gradient: 'linear-gradient(135deg, hsl(40, 30%, 15%) 0%, hsl(45, 95%, 50%) 50%, hsl(35, 50%, 25%) 100%)',
    border: 'hsl(45, 95%, 52%)',
    shadow: '0 0 55px hsla(45, 100%, 55%, 0.45)',
    text: 'hsl(45, 100%, 60%)',
  },
  // Turkey - Ottoman Crimson + Antique Gold
  tr: {
    base: '350 35% 10%',
    accent: '0 75% 50%',
    glow: '45 90% 55%',
    gradient: 'linear-gradient(135deg, hsl(350, 30%, 15%) 0%, hsl(0, 70%, 45%) 50%, hsl(45, 85%, 50%) 100%)',
    border: 'hsl(0, 70%, 48%)',
    shadow: '0 0 50px hsla(0, 75%, 50%, 0.4)',
    text: 'hsl(45, 95%, 58%)',
  },
  // Russia - Frost Blue + Platinum
  ru: {
    base: '215 30% 10%',
    accent: '205 70% 65%',
    glow: '200 80% 75%',
    gradient: 'linear-gradient(135deg, hsl(215, 25%, 15%) 0%, hsl(205, 65%, 60%) 50%, hsl(0, 0%, 85%) 100%)',
    border: 'hsl(205, 65%, 62%)',
    shadow: '0 0 45px hsla(205, 70%, 65%, 0.35)',
    text: 'hsl(205, 75%, 70%)',
  },
  // China - Imperial Red + Gold
  cn: {
    base: '0 60% 8%',
    accent: '0 85% 50%',
    glow: '45 100% 55%',
    gradient: 'linear-gradient(135deg, hsl(0, 55%, 12%) 0%, hsl(0, 80%, 45%) 50%, hsl(45, 100%, 50%) 100%)',
    border: 'hsl(0, 80%, 48%)',
    shadow: '0 0 55px hsla(0, 85%, 50%, 0.45)',
    text: 'hsl(45, 100%, 58%)',
  },
  // Hong Kong - Neon Blue + Carbon
  hk: {
    base: '0 0% 3%',
    accent: '210 100% 55%',
    glow: '205 100% 65%',
    gradient: 'linear-gradient(135deg, hsl(0, 0%, 5%) 0%, hsl(210, 100%, 50%) 50%, hsl(0, 0%, 3%) 100%)',
    border: 'hsl(210, 100%, 52%)',
    shadow: '0 0 60px hsla(210, 100%, 55%, 0.5)',
    text: 'hsl(210, 100%, 65%)',
  },
  // Taiwan - Jade Light + Pearl
  tw: {
    base: '155 25% 12%',
    accent: '160 60% 55%',
    glow: '155 70% 65%',
    gradient: 'linear-gradient(135deg, hsl(155, 20%, 15%) 0%, hsl(160, 55%, 50%) 50%, hsl(0, 0%, 92%) 100%)',
    border: 'hsl(160, 55%, 52%)',
    shadow: '0 0 45px hsla(160, 60%, 55%, 0.35)',
    text: 'hsl(160, 65%, 60%)',
  },
  // Thailand - Gold Silk + Warm Ivory
  th: {
    base: '45 35% 10%',
    accent: '45 90% 55%',
    glow: '40 95% 60%',
    gradient: 'linear-gradient(135deg, hsl(45, 30%, 15%) 0%, hsl(45, 85%, 50%) 50%, hsl(40, 25%, 90%) 100%)',
    border: 'hsl(45, 85%, 52%)',
    shadow: '0 0 50px hsla(45, 90%, 55%, 0.4)',
    text: 'hsl(45, 95%, 60%)',
  },
  // Indonesia - Volcanic Black + Ember Red
  id: {
    base: '0 0% 4%',
    accent: '10 90% 50%',
    glow: '5 100% 55%',
    gradient: 'linear-gradient(135deg, hsl(0, 0%, 6%) 0%, hsl(10, 85%, 45%) 50%, hsl(0, 0%, 3%) 100%)',
    border: 'hsl(10, 85%, 48%)',
    shadow: '0 0 55px hsla(10, 90%, 50%, 0.45)',
    text: 'hsl(10, 95%, 58%)',
  },
};

export function RegionalAccentStyles() {
  const { region } = useRegionalConfig();

  useEffect(() => {
    // US region and global remain untouched
    if (!region || region === 'us' || region === 'global') {
      // Remove any regional styles if switching back to US
      const styleEl = document.getElementById('regional-visual-dna');
      if (styleEl) styleEl.remove();
      return;
    }

    const dna = REGIONAL_VISUAL_DNA[region.toLowerCase()];
    if (!dna) return;

    // Create or update style element
    const styleId = 'regional-visual-dna';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    // Generate comprehensive regional CSS
    const css = `
      /* ================================================
         REGIONAL VISUAL DNA: ${region.toUpperCase()}
         Distinct Luxury Identity System
      ================================================ */
      
      :root {
        /* Regional Base Colors */
        --region-base: ${dna.base};
        --region-accent: ${dna.accent};
        --region-glow: ${dna.glow};
        --region-gradient: ${dna.gradient};
        --region-border: ${dna.border};
        --region-shadow: ${dna.shadow};
        --region-text: ${dna.text};
      }

      /* Override Background */
      .bg-background {
        background: linear-gradient(
          180deg,
          hsl(${dna.base}) 0%,
          hsl(${dna.base} / 0.95) 100%
        ) !important;
      }

      /* Regional Primary Gradient Override */
      .bg-gradient-to-r.from-luxury-purple.to-luxury-gold,
      .luxury-gradient,
      [class*="luxury-gradient"] {
        background: ${dna.gradient} !important;
        -webkit-background-clip: text !important;
        background-clip: text !important;
      }

      /* Regional Card Styling */
      .luxury-card {
        background: linear-gradient(
          135deg,
          hsl(${dna.base}) 0%,
          hsl(${dna.base} / 0.8) 100%
        ) !important;
        border-color: ${dna.border}30 !important;
        box-shadow: 
          ${dna.shadow},
          inset 0 1px 0 hsl(${dna.accent} / 0.1) !important;
      }

      .luxury-card:hover {
        border-color: ${dna.border}50 !important;
        box-shadow: 
          ${dna.shadow.replace('0.4', '0.6').replace('0.35', '0.5').replace('0.45', '0.6').replace('0.5', '0.7')},
          inset 0 1px 0 hsl(${dna.accent} / 0.2) !important;
      }

      /* Regional Button Glow */
      .luxury-button,
      button[class*="luxury"] {
        box-shadow: ${dna.shadow.replace('60px', '30px')} !important;
      }

      .luxury-button:hover,
      button[class*="luxury"]:hover {
        box-shadow: ${dna.shadow.replace('60px', '45px')} !important;
      }

      /* Tab Active State */
      [data-state="active"] {
        background: ${dna.gradient} !important;
        box-shadow: ${dna.shadow.replace('60px', '25px')} !important;
      }

      /* Regional Text Accents */
      .text-luxury-gold,
      .text-luxury-purple,
      [class*="text-luxury"] {
        color: ${dna.text} !important;
      }

      /* Regional Border Accents */
      .border-luxury-gold,
      .border-luxury-purple,
      [class*="border-luxury"] {
        border-color: ${dna.border}40 !important;
      }

      /* Ambient Glow Effect */
      .min-h-screen::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
          ellipse 80% 50% at 50% -20%,
          hsl(${dna.glow} / 0.15),
          transparent 70%
        );
        pointer-events: none;
        z-index: 0;
      }

      /* Regional Badge/Tier Styling */
      .luxury-tier-badge,
      [class*="tier-badge"] {
        background: linear-gradient(
          135deg,
          hsl(${dna.accent}) 0%,
          hsl(${dna.glow}) 100%
        ) !important;
        box-shadow: ${dna.shadow.replace('60px', '20px')} !important;
      }

      /* Progress/Loading Elements */
      .luxury-progress,
      [class*="progress"] {
        background: linear-gradient(
          90deg,
          hsl(${dna.accent}) 0%,
          hsl(${dna.glow}) 100%
        ) !important;
      }

      /* Debit Card Regional Accent */
      .luxury-debit-card,
      [class*="debit-card"] {
        background: ${dna.gradient} !important;
        box-shadow: ${dna.shadow} !important;
      }

      /* Input Focus States */
      input:focus,
      textarea:focus,
      select:focus {
        border-color: ${dna.border} !important;
        box-shadow: 0 0 0 2px hsl(${dna.accent} / 0.2) !important;
      }

      /* Scrollbar Regional Theming */
      ::-webkit-scrollbar-thumb {
        background: hsl(${dna.accent} / 0.3) !important;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: hsl(${dna.accent} / 0.5) !important;
      }

      /* Navigation Active State */
      nav [aria-current="page"],
      nav .active {
        background: hsl(${dna.accent} / 0.15) !important;
        border-color: ${dna.border} !important;
      }

      /* Tooltip Regional Accent */
      [role="tooltip"] {
        background: hsl(${dna.base}) !important;
        border-color: ${dna.border}30 !important;
      }

      /* Dialog/Modal Regional Accent */
      [role="dialog"] {
        background: linear-gradient(
          135deg,
          hsl(${dna.base}) 0%,
          hsl(${dna.base} / 0.95) 100%
        ) !important;
        border-color: ${dna.border}30 !important;
        box-shadow: ${dna.shadow} !important;
      }

      /* Regional Floating Nav */
      .mobile-floating-nav,
      [class*="floating-nav"] {
        background: hsl(${dna.base} / 0.9) !important;
        border-color: ${dna.border}30 !important;
        box-shadow: ${dna.shadow} !important;
      }

      /* Ensure relative positioning for ambient glow */
      .min-h-screen {
        position: relative;
      }

      .min-h-screen > * {
        position: relative;
        z-index: 1;
      }
    `;

    styleEl.textContent = css;

    return () => {
      styleEl?.remove();
    };
  }, [region]);

  return null;
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 255, 255';
}
