import styled from 'styled-components';
import { theme } from '../styles/theme';
import content from '../data/content.json';

const Band = styled.section<{ $dark: boolean }>`
  background: ${({ $dark }) => ($dark ? theme.colors.blackSoft : theme.colors.paper)};
  color: ${({ $dark }) => ($dark ? theme.colors.white : theme.colors.black)};
  padding: 88px 32px;
  border-top: 1px solid ${({ $dark }) => ($dark ? theme.colors.lineDark : theme.colors.line)};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 64px 20px;
  }
`;

const Inner = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: center;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

const Kicker = styled.p`
  font-family: ${theme.fonts.serif};
  font-size: clamp(22px, 2.4vw, 32px);
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-family: ${theme.fonts.display};
  font-size: clamp(36px, 5vw, 64px);
  text-transform: uppercase;
  letter-spacing: 0.01em;
  margin-bottom: 8px;
`;

const Dates = styled.p`
  font-size: 14px;
  opacity: 0.7;
  margin-bottom: 32px;
`;

const Points = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Point = styled.div`
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 14px;
`;

const Num = styled.span`
  font-size: 22px;
  letter-spacing: 0.04em;
`;

const PointTitle = styled.h4`
  font-family: ${theme.fonts.serif};
  font-size: 18px;
  letter-spacing: 0;
  margin-bottom: 6px;
`;

const PointBody = styled.p`
  font-size: 15.5px;
  line-height: 1.55;
  opacity: 0.88;
`;

const Visual = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const LogoFrame = styled.div<{ $tile: string }>`
  width: min(280px, 70%);
  aspect-ratio: 1.35 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $tile }) => $tile};
  padding: 16px;
`;

const Logo = styled.img<{ $fit: string }>`
  width: 100%;
  height: 100%;
  object-fit: ${({ $fit }) => $fit};
`;

const Phones = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Phone = styled.div`
  width: 132px;
  aspect-ratio: 9 / 19;
  border-radius: 22px;
  border: 8px solid #0b0b0b;
  overflow: hidden;
  background: #0b0b0b;
  box-shadow: 0 18px 40px rgba(0,0,0,0.28);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 110px;
  }
`;

export const ProjectsSection = () => {
  return (
    <div id="projects">
      {content.projects.map((project) => {
        const dark = project.theme === 'dark';
        return (
          <Band key={project.id} $dark={dark}>
            <Inner>
              <div>
                <Kicker>{project.kicker}</Kicker>
                <Title>{project.title}</Title>
                <Dates>{project.dates}</Dates>
                <Points>
                  {project.points.map((point) => (
                    <Point key={point.num}>
                      <Num>{point.num}</Num>
                      <div>
                        <PointTitle>{point.title}</PointTitle>
                        <PointBody>{point.body}</PointBody>
                      </div>
                    </Point>
                  ))}
                </Points>
              </div>
              <Visual>
                {project.logo !== '' && (
                  <LogoFrame $tile={project.logoTile}>
                    <Logo src={project.logo} alt={project.title} $fit={project.logoFit} />
                  </LogoFrame>
                )}
                {project.phones.length > 0 && (
                  <Phones>
                    {project.phones.map((src) => (
                      <Phone key={src}>
                        <img src={src} alt="" />
                      </Phone>
                    ))}
                  </Phones>
                )}
              </Visual>
            </Inner>
          </Band>
        );
      })}
    </div>
  );
};
