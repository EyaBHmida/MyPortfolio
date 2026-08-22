import styled from 'styled-components';
import { theme } from '../styles/theme';
import content from '../data/content.json';

const Section = styled.section`
  background: ${theme.colors.paper};
  color: ${theme.colors.black};
  padding: 96px 32px;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 72px 20px;
  }
`;

const Inner = styled.div`
  max-width: 980px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const Heading = styled.h2`
  font-family: ${theme.fonts.serif};
  font-size: clamp(40px, 12vw, 88px);
  letter-spacing: -0.04em;
  line-height: 0.9;

  span {
    display: block;
  }
`;

const Intro = styled.p`
  font-size: 17px;
  line-height: 1.55;
  max-width: 420px;
  margin-bottom: 28px;
`;

const Pills = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 420px;
  padding: 14px 20px;
  border: 1px solid ${theme.colors.black};
  border-radius: 999px;
  font-size: 14px;
  text-align: center;
`;

export const ServicesSection = () => {
  const { services } = content;

  return (
    <Section id="do">
      <Inner>
        <div>
          <Heading>
            <span>{services.headingLeft}</span>
            <span>{services.headingRight}</span>
          </Heading>
        </div>
        <div>
          <Intro>{services.intro}</Intro>
          <Pills>
            {services.items.map((item) => (
              <Pill key={item}>{item}</Pill>
            ))}
          </Pills>
        </div>
      </Inner>
    </Section>
  );
};
