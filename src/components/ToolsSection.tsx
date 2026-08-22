import styled from 'styled-components';
import { theme } from '../styles/theme';
import content from '../data/content.json';

const Section = styled.section`
  background: ${theme.colors.white};
  color: ${theme.colors.black};
  padding: 80px 32px 96px;
  border-top: 1px solid ${theme.colors.line};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 56px 20px 72px;
  }
`;

const Inner = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-family: ${theme.fonts.serif};
  font-size: clamp(36px, 5vw, 56px);
  margin-bottom: 28px;
`;

const Tools = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 64px;
`;

const Chip = styled.span`
  border: 1px solid ${theme.colors.black};
  border-radius: 999px;
  padding: 10px 16px;
  font-size: 13px;
`;

const EduList = styled.div`
  display: flex;
  flex-direction: column;
`;

const EduItem = styled.div`
  padding: 18px 0;
  border-top: 1px solid ${theme.colors.line};

  &:last-child {
    border-bottom: 1px solid ${theme.colors.line};
  }
`;

const Degree = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const School = styled.p`
  font-size: 14px;
  font-style: italic;
  opacity: 0.7;
  margin-top: 4px;
`;

export const ToolsSection = () => {
  return (
    <Section id="tools">
      <Inner>
        <Heading>Tools & certifications</Heading>
        <Tools>
          {content.tools.map((tool) => (
            <Chip key={tool}>{tool}</Chip>
          ))}
        </Tools>
        <Heading>Education</Heading>
        <EduList>
          {content.education.map((item) => (
            <EduItem key={item.degree}>
              <Degree>{item.degree}</Degree>
              {(item.school !== '' || item.dates !== '') && (
                <School>
                  {item.school}
                  {item.school !== '' && item.dates !== '' ? ' · ' : ''}
                  {item.dates}
                </School>
              )}
            </EduItem>
          ))}
        </EduList>
      </Inner>
    </Section>
  );
};
