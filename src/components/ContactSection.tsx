import styled from 'styled-components';
import { theme } from '../styles/theme';
import content from '../data/content.json';

const Footer = styled.footer`
  background: ${theme.colors.black};
  color: ${theme.colors.white};
  padding: 88px 32px 40px;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 64px 20px 32px;
  }
`;

const Inner = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 48px;
  align-items: start;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Heading = styled.h2`
  font-family: ${theme.fonts.serif};
  font-size: clamp(40px, 6vw, 68px);
  letter-spacing: -0.03em;
  margin-bottom: 28px;
  max-width: 520px;
`;

const Cta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.colors.white};
  border-radius: 999px;
  padding: 14px 28px;
  font-size: 16px;
  text-decoration: underline;
  text-underline-offset: 4px;

  &:hover {
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    text-decoration: none;
  }
`;

const Meta = styled.div`
  font-size: 16px;
  line-height: 1.7;
  padding-top: 8px;
`;

const MetaLink = styled.a`
  display: block;

  &:hover { text-decoration: underline; }
`;

const Socials = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 28px;
`;

const Social = styled.a`
  width: 42px;
  height: 42px;
  border: 1px solid #3a3a3a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  letter-spacing: 0.04em;
`;

const Bottom = styled.div`
  max-width: 1180px;
  margin: 48px auto 0;
  padding-top: 22px;
  border-top: 1px solid ${theme.colors.lineDark};
  font-size: 12px;
  color: ${theme.colors.muted};
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ContactSection = () => {
  const { personal, contact: contactContent } = content;
  const year = new Date().getFullYear();

  return (
    <Footer id="contact">
      <Inner>
        <div>
          <Heading>{contactContent.heading}</Heading>
          <Cta href={`mailto:${personal.email}`}>{contactContent.cta}</Cta>
        </div>
        <Meta>
          <div>{contactContent.entity}</div>
          <MetaLink href={`mailto:${personal.email}`}>{personal.email}</MetaLink>
          <MetaLink href={`tel:${personal.phone.replace(/\s/g, '')}`}>{personal.phone}</MetaLink>
          <div>{contactContent.city}</div>
          <Socials>
            <Social href={personal.linkedin} target="_blank" rel="noopener noreferrer">IN</Social>
            <Social href={`mailto:${personal.email}`}>@</Social>
          </Socials>
        </Meta>
      </Inner>
      <Bottom>
        <span>© {year} {personal.fullName}</span>
        <span>EN · FR · AR</span>
      </Bottom>
    </Footer>
  );
};
