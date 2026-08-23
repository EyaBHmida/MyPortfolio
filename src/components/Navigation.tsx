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
  padding-top: max(22px, env(safe-area-inset-top));
  background: ${({ $scrolled }) => ($scrolled ? 'rgba(17,17,17,0.92)' : 'transparent')};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(10px)' : 'none')};
  transition: background ${theme.transitions.normal};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 16px 20px;
    padding-top: max(16px, env(safe-area-inset-top));
  }
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${theme.colors.white};
  position: relative;
  z-index: 1002;
`;

const Mark = styled.img`
  width: 22px;
  height: 30px;
  object-fit: contain;
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

const Burger = styled.button<{ $open: boolean }>`
  display: none;
  width: 44px;
  height: 44px;
  place-items: center;
  position: relative;
  z-index: 1002;

  @media (max-width: ${theme.breakpoints.md}) {
    display: grid;
  }

  span {
    position: absolute;
    left: 50%;
    width: 20px;
    height: 1.5px;
    background: ${theme.colors.white};
    transition: transform 0.3s ease, opacity 0.2s ease;
  }
  span:nth-child(1) {
    transform: ${({ $open }) => ($open ? 'translate(-50%, 0) rotate(45deg)' : 'translate(-50%, -5px)')};
  }
  span:nth-child(2) {
    opacity: ${({ $open }) => ($open ? 0 : 1)};
    transform: translate(-50%, 0);
  }
  span:nth-child(3) {
    transform: ${({ $open }) => ($open ? 'translate(-50%, 0) rotate(-45deg)' : 'translate(-50%, 5px)')};
  }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    inset: 0;
    z-index: 1001;
    background: ${theme.colors.black};
    padding: 96px 28px 40px;
    padding-top: max(96px, calc(env(safe-area-inset-top) + 72px));
    padding-bottom: max(40px, env(safe-area-inset-bottom));
    gap: 8px;
    overflow-y: auto;
    visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
    transition: opacity 0.35s ease, visibility 0.35s;
  }

  a {
    font-family: ${theme.fonts.serif};
    font-size: clamp(28px, 8vw, 40px);
    color: ${theme.colors.white};
    padding: 10px 0;
    line-height: 1.1;
  }
`;

const MobileCta = styled(Cta)`
  margin-top: 28px;
  width: fit-content;
  font-family: ${theme.fonts.body};
  font-size: 14px;
`;

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { personal } = content;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <Nav $scrolled={scrolled || open}>
      <Brand href="#hero" onClick={close}>
        <Mark src="/eya-mark.svg" alt={personal.fullName} />
        <Initials>{personal.initials}</Initials>
      </Brand>
      <Links>
        <li><LinkItem href="#about">About</LinkItem></li>
        <li><LinkItem href="#work">Work</LinkItem></li>
        <li><LinkItem href="#do">What I do</LinkItem></li>
        <li><LinkItem href="/">Editorial</LinkItem></li>
        <li><Cta href={`mailto:${personal.email}`}>{content.contact.cta}</Cta></li>
      </Links>
      <Burger
        type="button"
        $open={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </Burger>
      <MobileMenu $open={open}>
        <a href="#about" onClick={close}>About</a>
        <a href="#work" onClick={close}>Work</a>
        <a href="#do" onClick={close}>What I do</a>
        <a href="/" onClick={close}>Editorial</a>
        <MobileCta href={`mailto:${personal.email}`} onClick={close}>
          {content.contact.cta}
        </MobileCta>
      </MobileMenu>
    </Nav>
  );
};
