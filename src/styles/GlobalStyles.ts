import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;

    @media (max-width: ${theme.breakpoints.md}) {
      font-size: 15px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
  }

  body {
    font-family: ${theme.fonts.body};
    font-weight: ${theme.fontWeights.regular};
    background: ${theme.colors.black};
    color: ${theme.colors.white};
    line-height: 1.55;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4 {
    font-family: ${theme.fonts.serif};
    font-weight: ${theme.fontWeights.regular};
    line-height: 0.95;
    letter-spacing: -0.03em;
  }

  p {
    font-size: ${theme.fontSizes.lg};
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: ${theme.fonts.body};
    cursor: pointer;
    border: none;
    outline: none;
    background: transparent;
  }

  ul, ol { list-style: none; }

  img, video {
    max-width: 100%;
    display: block;
  }

  ::selection {
    background: ${theme.colors.white};
    color: ${theme.colors.black};
  }

  :focus-visible {
    outline: 2px solid ${theme.colors.white};
    outline-offset: 3px;
  }

  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: ${theme.colors.black}; }
  ::-webkit-scrollbar-thumb { background: #444; }
`;
