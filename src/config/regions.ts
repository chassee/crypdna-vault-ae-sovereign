export interface RegionConfig {
  code: string;
  name: string;
  locale: string;
  currency: string;
  currencySymbol: string;
  supabaseUrl: string;
  supabaseKey: string;
  theme: {
    primaryGradient: string;
    accentOverlay: string;
    neuralGlow: string;
    billionaireGold: string;
  };
  rtl?: boolean;
}

export const REGION_MAP: Record<string, RegionConfig> = {
  // USA (Default / Master Vault)
  us: {
    code: 'us',
    name: 'United States',
    locale: 'en-US',
    currency: 'USD',
    currencySymbol: '$',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #D4AF37 50%, #0A0A0C 100%)',
      accentOverlay: '#C7E2FF',
      neuralGlow: '#2FAAFF',
      billionaireGold: '#D4AF37',
    },
  },

  // UAE (Dubai)
  ae: {
    code: 'ae',
    name: 'United Arab Emirates',
    locale: 'ar-AE',
    currency: 'AED',
    currencySymbol: 'د.إ',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #F5C46B 50%, #0A0A0C 100%)',
      accentOverlay: '#F5C46B',
      neuralGlow: '#FFD700',
      billionaireGold: '#F5C46B',
    },
    rtl: true,
  },

  // Argentina
  ar: {
    code: 'ar',
    name: 'Argentina',
    locale: 'es-AR',
    currency: 'ARS',
    currencySymbol: '$',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #75AADB 50%, #0A0A0C 100%)',
      accentOverlay: '#75AADB',
      neuralGlow: '#87CEEB',
      billionaireGold: '#D4AF37',
    },
  },

  // Australia
  au: {
    code: 'au',
    name: 'Australia',
    locale: 'en-AU',
    currency: 'AUD',
    currencySymbol: 'A$',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #00CED1 50%, #0A0A0C 100%)',
      accentOverlay: '#00CED1',
      neuralGlow: '#40E0D0',
      billionaireGold: '#D4AF37',
    },
  },

  // Brazil
  br: {
    code: 'br',
    name: 'Brazil',
    locale: 'pt-BR',
    currency: 'BRL',
    currencySymbol: 'R$',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #1BE6A8 50%, #0A0A0C 100%)',
      accentOverlay: '#FFD380',
      neuralGlow: '#1BE6A8',
      billionaireGold: '#FFD380',
    },
  },

  // Canada
  ca: {
    code: 'ca',
    name: 'Canada',
    locale: 'en-CA',
    currency: 'CAD',
    currencySymbol: 'C$',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #FF0000 50%, #0A0A0C 100%)',
      accentOverlay: '#FF0000',
      neuralGlow: '#FF4444',
      billionaireGold: '#D4AF37',
    },
  },

  // Colombia
  co: {
    code: 'co',
    name: 'Colombia',
    locale: 'es-CO',
    currency: 'COP',
    currencySymbol: '$',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #FFD700 50%, #0A0A0C 100%)',
      accentOverlay: '#FFD700',
      neuralGlow: '#FFC700',
      billionaireGold: '#FFD700',
    },
  },

  // Germany
  de: {
    code: 'de',
    name: 'Germany',
    locale: 'de-DE',
    currency: 'EUR',
    currencySymbol: '€',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #BFC5CC 50%, #0A0A0C 100%)',
      accentOverlay: '#00FF00',
      neuralGlow: '#00FF88',
      billionaireGold: '#BFC5CC',
    },
  },

  // Denmark
  dk: {
    code: 'dk',
    name: 'Denmark',
    locale: 'da-DK',
    currency: 'DKK',
    currencySymbol: 'kr',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #FFFFFF 50%, #0A0A0C 100%)',
      accentOverlay: '#00BFFF',
      neuralGlow: '#1E90FF',
      billionaireGold: '#D4AF37',
    },
  },

  // Spain
  es: {
    code: 'es',
    name: 'Spain',
    locale: 'es-ES',
    currency: 'EUR',
    currencySymbol: '€',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #FFD700 50%, #0A0A0C 100%)',
      accentOverlay: '#FFD700',
      neuralGlow: '#FFA500',
      billionaireGold: '#FFD700',
    },
  },

  // France
  fr: {
    code: 'fr',
    name: 'France',
    locale: 'fr-FR',
    currency: 'EUR',
    currencySymbol: '€',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #D7BFFF 50%, #0A0A0C 100%)',
      accentOverlay: '#D7BFFF',
      neuralGlow: '#E6D5FF',
      billionaireGold: '#D4AF37',
    },
  },

  // Hong Kong
  hk: {
    code: 'hk',
    name: 'Hong Kong',
    locale: 'zh-HK',
    currency: 'HKD',
    currencySymbol: 'HK$',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #F55B5B 50%, #0A0A0C 100%)',
      accentOverlay: '#F55B5B',
      neuralGlow: '#FF6B6B',
      billionaireGold: '#D4AF37',
    },
  },

  // India
  in: {
    code: 'in',
    name: 'India',
    locale: 'en-IN',
    currency: 'INR',
    currencySymbol: '₹',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #FF9933 50%, #0A0A0C 100%)',
      accentOverlay: '#FF9933',
      neuralGlow: '#FFA500',
      billionaireGold: '#FFD700',
    },
  },

  // Italy
  it: {
    code: 'it',
    name: 'Italy',
    locale: 'it-IT',
    currency: 'EUR',
    currencySymbol: '€',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #C0C0C0 50%, #0A0A0C 100%)',
      accentOverlay: '#FFB6C1',
      neuralGlow: '#FFC0CB',
      billionaireGold: '#FFD700',
    },
  },

  // Japan
  jp: {
    code: 'jp',
    name: 'Japan',
    locale: 'ja-JP',
    currency: 'JPY',
    currencySymbol: '¥',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #2FAAFF 50%, #0A0A0C 100%)',
      accentOverlay: '#2FAAFF',
      neuralGlow: '#00BFFF',
      billionaireGold: '#D4AF37',
    },
  },

  // Kenya
  ke: {
    code: 'ke',
    name: 'Kenya',
    locale: 'en-KE',
    currency: 'KES',
    currencySymbol: 'KSh',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #1BE6A8 50%, #0A0A0C 100%)',
      accentOverlay: '#1BE6A8',
      neuralGlow: '#00FF7F',
      billionaireGold: '#D4AF37',
    },
  },

  // South Korea
  kr: {
    code: 'kr',
    name: 'South Korea',
    locale: 'ko-KR',
    currency: 'KRW',
    currencySymbol: '₩',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #FFFFFF 50%, #0A0A0C 100%)',
      accentOverlay: '#00BFFF',
      neuralGlow: '#1E90FF',
      billionaireGold: '#D4AF37',
    },
  },

  // Mexico
  mx: {
    code: 'mx',
    name: 'Mexico',
    locale: 'es-MX',
    currency: 'MXN',
    currencySymbol: '$',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #FF0000 50%, #0A0A0C 100%)',
      accentOverlay: '#00CED1',
      neuralGlow: '#40E0D0',
      billionaireGold: '#D4AF37',
    },
  },

  // Nigeria
  ng: {
    code: 'ng',
    name: 'Nigeria',
    locale: 'en-NG',
    currency: 'NGN',
    currencySymbol: '₦',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #1BE6A8 50%, #0A0A0C 100%)',
      accentOverlay: '#1BE6A8',
      neuralGlow: '#00FF7F',
      billionaireGold: '#D4AF37',
    },
  },

  // Netherlands
  nl: {
    code: 'nl',
    name: 'Netherlands',
    locale: 'nl-NL',
    currency: 'EUR',
    currencySymbol: '€',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #FFA500 50%, #0A0A0C 100%)',
      accentOverlay: '#FFA500',
      neuralGlow: '#FFB347',
      billionaireGold: '#D4AF37',
    },
  },

  // New Zealand
  nz: {
    code: 'nz',
    name: 'New Zealand',
    locale: 'en-NZ',
    currency: 'NZD',
    currencySymbol: 'NZ$',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #000000 50%, #0A0A0C 100%)',
      accentOverlay: '#FFFFFF',
      neuralGlow: '#C0C0C0',
      billionaireGold: '#D4AF37',
    },
  },

  // Philippines
  ph: {
    code: 'ph',
    name: 'Philippines',
    locale: 'en-PH',
    currency: 'PHP',
    currencySymbol: '₱',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #FFD700 50%, #0A0A0C 100%)',
      accentOverlay: '#FFD700',
      neuralGlow: '#FFC700',
      billionaireGold: '#FFD700',
    },
  },

  // Qatar
  qa: {
    code: 'qa',
    name: 'Qatar',
    locale: 'ar-QA',
    currency: 'QAR',
    currencySymbol: 'ر.ق',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #8B0000 50%, #0A0A0C 100%)',
      accentOverlay: '#8B0000',
      neuralGlow: '#A52A2A',
      billionaireGold: '#D4AF37',
    },
    rtl: true,
  },

  // Singapore
  sg: {
    code: 'sg',
    name: 'Singapore',
    locale: 'en-SG',
    currency: 'SGD',
    currencySymbol: 'S$',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #FFFFFF 50%, #0A0A0C 100%)',
      accentOverlay: '#0000FF',
      neuralGlow: '#4169E1',
      billionaireGold: '#D4AF37',
    },
  },

  // South Africa
  za: {
    code: 'za',
    name: 'South Africa',
    locale: 'en-ZA',
    currency: 'ZAR',
    currencySymbol: 'R',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #FFD700 50%, #0A0A0C 100%)',
      accentOverlay: '#1BE6A8',
      neuralGlow: '#00FF7F',
      billionaireGold: '#FFD700',
    },
  },

  // United Kingdom
  uk: {
    code: 'uk',
    name: 'United Kingdom',
    locale: 'en-GB',
    currency: 'GBP',
    currencySymbol: '£',
    supabaseUrl: 'https://jkrwyotrdlucyynnotpd.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprcnd5b3RyZGx1Y3l5bm5vdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMjM0NzUsImV4cCI6MjA2Njg5OTQ3NX0.NaGZ56xkvIIHj7XjeZbPTg6wHtkvihycvNa4Kzb51FQ',
    theme: {
      primaryGradient: 'linear-gradient(135deg, #6B46C1 0%, #9966FF 50%, #0A0A0C 100%)',
      accentOverlay: '#9966FF',
      neuralGlow: '#A78BFA',
      billionaireGold: '#D4AF37',
    },
  },
};

/**
 * Detects region from window.location.hostname at runtime
 * Returns region code or 'us' as default
 */
export function detectRegion(): string {
  if (typeof window === 'undefined') return 'us';
  
  const hostname = window.location.hostname;
  
  // Extract subdomain (e.g., "ae" from "ae.crypdawgs.com")
  const parts = hostname.split('.');
  
  // If subdomain exists and matches a region code
  if (parts.length >= 3) {
    const subdomain = parts[0];
    if (REGION_MAP[subdomain]) {
      return subdomain;
    }
  }
  
  // Check for vault.crypdawgs.com or crypdawgs.com -> US
  if (hostname.includes('vault.crypdawgs.com') || hostname === 'crypdawgs.com') {
    return 'us';
  }
  
  // Default to US for localhost and unknown domains
  return 'us';
}

/**
 * Gets the full region configuration based on detected or specified region
 */
export function getRegionConfig(regionCode?: string): RegionConfig {
  const code = regionCode || detectRegion();
  return REGION_MAP[code] || REGION_MAP.us;
      }
