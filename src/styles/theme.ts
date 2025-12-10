export const theme = {
  colors: {
    // Primary palette - Elegant dark with warm accents
    background: '#0a0a0a',
    backgroundAlt: '#111111',
    surface: '#1a1a1a',
    
    // Text colors
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    textMuted: '#666666',
    
    // Accent - Warm gold/champagne
    accent: '#c9a962',
    accentHover: '#dfc07a',
    accentMuted: 'rgba(201, 169, 98, 0.15)',
    
    // Utility
    border: '#2a2a2a',
    borderLight: '#333333',
    
    // Gradients
    gradientPrimary: 'linear-gradient(135deg, #c9a962 0%, #8b7355 100%)',
    gradientDark: 'linear-gradient(180deg, #0a0a0a 0%, #111111 100%)',
  },
  
  fonts: {
    heading: "'Cormorant Garamond', Georgia, serif",
    body: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '2.5rem',
    '5xl': '3.5rem',
    '6xl': '4.5rem',
    '7xl': '6rem',
  },
  
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
    smooth: '0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.4)',
    glow: '0 0 40px rgba(201, 169, 98, 0.15)',
  },
};

export type Theme = typeof theme;

