import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import content from '../data/content.json';

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 32px;
  background: ${({ $scrolled }) => ($scrolled ? 'rgba(17,17,17,0.92)' : 'transparent')};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(10px)' : 'none')};
  transition: background ${theme.transitions.normal};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 16px 20px;
  }
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${theme.colors.white};
`;

const Mark = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  background: ${theme.colors.white};
  border-radius: 4px;
  padding: 3px;
`;

const Initials = styled.span`
  font-family: ${theme.fonts.display};
  font-size: 15px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const Links = styled.ul`
  display: flex;
  align-items: center;
  gap: 28px;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const LinkItem = styled.a`
  font-size: 13px;
  color: ${theme.colors.white};
  opacity: 0.85;

  &:hover { opacity: 1; }
`;

const Cta = styled.a`
  font-size: 13px;
  color: ${theme.colors.white};
  border: 1px solid ${theme.colors.white};
  border-radius: 999px;
  padding: 8px 16px;

  &:hover { background: ${theme.colors.white}; color: ${theme.colors.black}; }
`;

const MobileCta = styled(Cta)`
  display: none;
  @media (max-width: ${theme.breakpoints.md}) {
    display: inline-block;
  }
`;

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const { personal } = content;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Nav $scrolled={scrolled}>
      <Brand href="#hero">
        <Mark src="/brands/mark.jpeg" alt={personal.fullName} />
        <Initials>{personal.initials}</Initials>
      </Brand>
      <Links>
        <li><LinkItem href="#about">About</LinkItem></li>
        <li><LinkItem href="#work">Work</LinkItem></li>
        <li><LinkItem href="#do">What I do</LinkItem></li>
        <li><LinkItem href="/second">Editorial</LinkItem></li>
        <li><Cta href={`mailto:${personal.email}`}>{content.contact.cta}</Cta></li>
      </Links>
      <MobileCta href={`mailto:${personal.email}`}>{content.contact.cta}</MobileCta>
    </Nav>
  );
};
