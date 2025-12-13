import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  /* Import Google Fonts - Robert Leuschke for titles, Lora for content */
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Robert+Leuschke&display=swap');

  /* CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: 14px;
    }
  }

  body {
    font-family: 'Lora';
    font-weight: ${theme.fontWeights.regular};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Robert Leuschke';
    font-weight: ${theme.fontWeights.regular};
    line-height: 1.2;
    letter-spacing: 0.02em;
    color: ${theme.colors.accent};
  }

  h1 {
    font-size: ${theme.fontSizes['6xl']};
    
    @media (max-width: ${theme.breakpoints.lg}) {
      font-size: ${theme.fontSizes['5xl']};
    }
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['4xl']};
    }
  }

  h2 {
    font-size: ${theme.fontSizes['4xl']};
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['3xl']};
    }
  }

  h3 {
    font-size: ${theme.fontSizes['2xl']};
  }

  p {
    font-size: ${theme.fontSizes.lg};
    color: ${theme.colors.textSecondary};
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes.md};
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.accentLight};
    }
  }

  button {
    font-family: 'Lora';
    cursor: pointer;
    border: none;
    outline: none;
    background: transparent;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Selection */
  ::selection {
    background-color: ${theme.colors.accentLight};
    color: ${theme.colors.surface};
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.full};
    
    &:hover {
      background: ${theme.colors.accentLight};
    }
  }

  /* Focus styles */
  :focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
  }

  /* Utility classes */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.xl};
    
    @media (max-width: ${theme.breakpoints.md}) {
      padding: 0 ${theme.spacing.lg};
    }
  }

  .section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: ${theme.spacing['4xl']} 0;
    
    @media (max-width: ${theme.breakpoints.md}) {
      padding: ${theme.spacing['3xl']} 0;
      min-height: auto;
    }
  }
`;
