import styled from 'styled-components';
import { theme } from '../styles/theme';
import content from '../data/content.json';

const Hero = styled.section`
  position: relative;
  min-height: 100vh;
  background: ${theme.colors.black};
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  min-height: 100vh;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const Photo = styled.div<{ $src: string }>`
  min-height: 100vh;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center 20%;
  filter: grayscale(1) contrast(1.05);

  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 70vh;

    &:nth-child(2), &:nth-child(3) {
      display: none;
    }
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
  background: linear-gradient(
    to bottom,
    rgba(17,17,17,0.15) 0%,
    rgba(17,17,17,0.25) 40%,
    rgba(17,17,17,0.45) 100%
  );
  pointer-events: none;
`;

const Name = styled.h1`
  font-family: ${theme.fonts.display};
  font-weight: 500;
  font-size: clamp(42px, 8.4vw, 118px);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #E9E8E9;
  line-height: 0.92;
`;

const Headline = styled.p`
  margin-top: 16px;
  font-size: clamp(13px, 1.5vw, 18px);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.white};
`;

const Email = styled.a`
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 15px;
  color: ${theme.colors.white};
  pointer-events: auto;

  @media (max-width: ${theme.breakpoints.md}) {
    bottom: 20px;
    font-size: 13px;
  }
`;

export const HeroSection = () => {
  const { personal, hero } = content;

  return (
    <Hero id="hero">
      <PhotoGrid>
        {hero.images.map((src) => (
          <Photo key={src} $src={src} />
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
