import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';
import content from '../data/content.json';

/** Endila live-site hero fade: opacity only, ~1.851s, cubic-bezier(0.4, 0.8, 0.74, 1) */
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Hero = styled.section`
  position: relative;
  min-height: 100svh;
  background: ${theme.colors.white};
  overflow: clip;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  min-height: 100svh;
  gap: 0;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const Photo = styled.div<{ $src: string; $delay: number }>`
  min-height: 100svh;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center 20%;
  image-rendering: auto;
  opacity: 0;
  animation: ${fadeIn} 1.851s 0.1s cubic-bezier(0.4, 0.8, 0.74, 1) both;
  animation-delay: ${({ $delay }) => `${$delay}s`};

  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 100svh;

    &:not(:first-child) {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px;
  padding-top: max(96px, calc(env(safe-area-inset-top) + 72px));
  padding-bottom: 88px;
  pointer-events: none;
  opacity: 0;
  animation: ${fadeIn} 1.851s 0.1s cubic-bezier(0.4, 0.8, 0.74, 1) both;

  @media (max-width: ${theme.breakpoints.md}) {
    padding-inline: 16px;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const Name = styled.h1`
  font-family: ${theme.fonts.display};
  font-weight: 500;
  font-size: clamp(2rem, 11vw, 118px);
  letter-spacing: -0.055em;
  text-transform: uppercase;
  color: #e9e8e9;
  line-height: 0.92;
  max-width: 100%;
`;

const Headline = styled.p`
  margin-top: 12px;
  font-size: clamp(12px, 2.4vw, 28px);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${theme.colors.white};
  max-width: 42ch;
  line-height: 1.35;
  font-weight: 500;

  @media (max-width: ${theme.breakpoints.md}) {
    letter-spacing: 0.06em;
    font-size: clamp(12px, 3.4vw, 18px);
  }
`;

const Email = styled.a`
  position: absolute;
  bottom: max(20px, env(safe-area-inset-bottom));
  left: 50%;
  transform: translateX(-50%);
  font-family: ${theme.fonts.serif};
  font-size: clamp(14px, 1.6vw, 23px);
  color: ${theme.colors.white};
  pointer-events: auto;
  max-width: calc(100% - 32px);
  overflow-wrap: anywhere;
  text-align: center;
  opacity: 0;
  animation: ${fadeIn} 1.851s 0.1s cubic-bezier(0.4, 0.8, 0.74, 1) both;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 13px;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

export const HeroSection = () => {
  const { personal, hero } = content;
  const photos = hero.images.slice(0, 3);

  return (
    <Hero id="hero">
      <PhotoGrid>
        {photos.map((src, i) => (
          <Photo key={src} $src={src} $delay={0.1 + i * 0.05} />
        ))}
      </PhotoGrid>
      <Overlay>
        <Name>{personal.fullName}</Name>
        <Headline>{personal.headline}</Headline>
      </Overlay>
      <Email href={`mailto:${personal.email}`}>{personal.email}</Email>
    </Hero>
  );
};
