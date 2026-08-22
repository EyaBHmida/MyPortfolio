import styled from 'styled-components';
import { theme } from '../styles/theme';
import content from '../data/content.json';

const Section = styled.section`
  background: ${theme.colors.black};
  color: ${theme.colors.white};
`;

const Copy = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 96px 32px 72px;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 64px 20px 48px;
  }
`;

const Heading = styled.h2`
  font-family: ${theme.fonts.serif};
  font-style: italic;
  font-size: clamp(36px, 10vw, 86px);
  letter-spacing: -0.03em;
  margin-bottom: 36px;
`;

const Lead = styled.p`
  font-size: clamp(20px, 2.3vw, 28px);
  line-height: 1.45;
  max-width: 920px;
  margin-bottom: 22px;

  strong {
    font-weight: 700;
  }
`;

const Body = styled.p`
  font-size: clamp(16px, 1.5vw, 20px);
  line-height: 1.6;
  max-width: 860px;
  color: #d8d8d8;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Cell = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: ${theme.colors.blackSoft};
`;

const MediaImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MediaVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Play = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  span {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 2px solid ${theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.25);
  }

  span::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 16px solid ${theme.colors.white};
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    margin-left: 4px;
  }
`;

export const AboutSection = () => {
  const { about } = content;

  return (
    <Section id="about">
      <Copy>
        <Heading>{about.heading}</Heading>
        <Lead>{about.lead}</Lead>
        <Body>{about.body}</Body>
      </Copy>
      <Grid>
        {about.grid.map((item) => (
          <Cell key={item.src}>
            {item.type === 'video' ? (
              <>
                <MediaVideo src={item.src} muted loop playsInline autoPlay />
                <Play><span /></Play>
              </>
            ) : (
              <MediaImg src={item.src} alt="" />
            )}
          </Cell>
        ))}
      </Grid>
    </Section>
  );
};
