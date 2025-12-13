export const theme = {
  colors: {
    // Primary palette - Wine Plum Tones
    background: '#f8f4f6',
    backgroundAlt: '#efe8ec',
    surface: '#ffffff',
    
    // Text colors - Wine Plum palette
    text: '#5F214D',           // Wine Plum
    textSecondary: '#68546D',  // Grayish Plum
    textMuted: '#896E8F',      // Dusty Violet
    
    // Accent - Wine Plum palette
    accent: '#5F214D',         // Wine Plum (primary)
    accentLight: '#896E8F',    // Dusty Violet
    accentLighter: '#A08A9F',  // Silver Plum
    accentSoft: '#B49BA4',     // Soft Plum
    accentHover: '#4a1a3d',
    accentMuted: 'rgba(95, 33, 77, 0.1)',
    
    // Utility
    border: '#B49BA4',         // Soft Plum
    borderLight: '#d4c8cf',
    
    // Gradients - Wine Plum
    gradientPrimary: 'linear-gradient(135deg, #5F214D 0%, #896E8F 100%)',
    gradientLight: 'linear-gradient(135deg, #896E8F 0%, #A08A9F 100%)',
    gradientSubtle: 'linear-gradient(180deg, #f8f4f6 0%, #efe8ec 100%)',
    gradient3D: 'radial-gradient(circle at 30% 30%, #A08A9F 0%, #896E8F 20%, #68546D 40%, #5F214D 70%, #3d1530 100%)',
  },
  
  fonts: {
    heading: "'Robert Leuschke'",
    body: "'Lora'",
    name: "'Lora'",
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
    sm: '0 1px 2px rgba(95, 33, 77, 0.1)',
    md: '0 4px 6px rgba(95, 33, 77, 0.1)',
    lg: '0 10px 15px rgba(95, 33, 77, 0.1)',
    xl: '0 20px 25px rgba(95, 33, 77, 0.15)',
    glow: '0 0 40px rgba(137, 110, 143, 0.3)',
    sphere: '0 20px 60px rgba(95, 33, 77, 0.3), 0 0 80px rgba(95, 33, 77, 0.15)',
  },
};

export type Theme = typeof theme;
