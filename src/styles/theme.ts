export const theme = {
  colors: {
    black: '#111111',
    blackSoft: '#191919',
    white: '#ffffff',
    paper: '#F3F3F3',
    muted: '#A3A3A3',
    line: '#E5E5E5',
    lineDark: '#2A2A2A',
  },

  fonts: {
    display: "'Oswald', sans-serif",
    serif: "'Instrument Serif', serif",
    body: "'DM Sans', sans-serif",
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '2.75rem',
    '5xl': '4rem',
    '6xl': '5.5rem',
  },

  fontWeights: {
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

  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

export type Theme = typeof theme;
