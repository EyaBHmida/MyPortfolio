import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';
import {
  CustomCursor,
  LenisProvider,
  LightboxProvider,
  Preloader,
  riseIn,
  useCountUp,
  useLenisScroll,
  useLightbox,
  useParallax,
  usePrefersReducedMotion,
  useReveal,
  useTouchColorReveal,
} from './motion.tsx';
import { tokens } from './tokens.ts';

type NavItem = { href: string; label: string };
type GalleryItem = {
  src: string;
  kind: 'image' | 'video';
  caption?: string;
  index?: string;
  featured?: boolean;
  span?: string;
  push?: boolean;
  ar?: string;
  title?: string;
  meta?: string;
};
type Stat = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  display?: string;
};
type Client = { name: string; logo: string; fit: string; tile: string; tone?: string };
type ProjectPoint = { num: string; title: string; body: string };
type Project = {
  id: string;
  theme: string;
  kicker: string;
  title: string;
  dates: string;
  logo: string;
  logoFit: string;
  logoTile: string;
  phones: string[];
  points: ProjectPoint[];
};
type Editorial = {
  nav: NavItem[];
  cta: { href: string; label: string };
  hero: { kicker: string; lineBefore: string; lineEm: string; lineAfter: string };
  about: {
    kicker: string;
    title: string;
    titleEm: string;
    titleAfter: string;
    stats: Stat[];
  };
  expertise: {
    kicker: string;
    title: string;
    titleEm: string;
    titleAfter: string;
    index: string;
    lede: string;
    services: { title: string; body: string }[];
    processKicker: string;
    process: { title: string; body: string }[];
  };
  credentials: {
    kicker: string;
    title: string;
    titleEm: string;
    titleAfter: string;
    index: string;
    toolGroups: { label: string; items: string[] }[];
    certifications: string[];
  };
  campaigns: {
    kicker: string;
    title: string;
    titleEm: string;
    titleAfter: string;
    index: string;
    lede: string;
    gallery: GalleryItem[];
  };
  stage: {
    kicker: string;
    title: string;
    titleEm: string;
    titleAfter: string;
    index: string;
    lede: string;
    items: string[];
  };
  partners: {
    kicker: string;
    title: string;
    titleEm: string;
    titleAfter: string;
    index: string;
  };
  contactSection: {
    kicker: string;
    title: string;
    titleEm: string;
    titleAfter: string;
    cards: { kicker: string; kind: string; body: string }[];
  };
  footer: { tagline: string };
};

type Personal = {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  linkedin: string;
  title: string;
  location: string;
  availability: string;
};

type AboutCopy = { lead: string; body: string };

export type SecondPageData = {
  editorial: Editorial;
  personal: Personal;
  about: AboutCopy;
  clients: Client[];
  heroImages: string[];
};

/** Endila live-site hero fade: opacity only, ~1.851s, cubic-bezier(0.4, 0.8, 0.74, 1) */
const endilaFade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const marqueeAnim = keyframes`
  to { transform: translateX(-50%); }
`;

const waPulse = keyframes`
  0% { transform: scale(0.85); opacity: 0; }
  35% { opacity: 0.7; }
  100% { transform: scale(1.25); opacity: 0; }
`;

export const EditorialGlobal = createGlobalStyle`
  html.lenis { height: auto; }
  .lenis.lenis-smooth { scroll-behavior: auto; }

  html {
    overflow-x: clip;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  body {
    margin: 0;
    font-family: ${tokens.sans};
    font-weight: 300;
    background: ${tokens.noir};
    color: ${tokens.ivory};
    line-height: 1.65;
    letter-spacing: 0.015em;
    -webkit-font-smoothing: antialiased;
    overflow-x: clip;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  body.has-cursor,
  body.has-cursor a,
  body.has-cursor button {
    cursor: none;
  }

  ::selection {
    background: ${tokens.crimson};
    color: ${tokens.ivory};
  }

  :focus-visible {
    outline: 2px solid ${tokens.lilac};
    outline-offset: 3px;
    border-radius: 2px;
  }

  .js .reveal {
    opacity: 0;
    transform: translateY(44px);
    transition: opacity 1.1s ${tokens.easeOut}, transform 1.1s ${tokens.easeOut};
    transition-delay: var(--d, 0s);
  }
  .js .reveal.is-in {
    opacity: 1;
    transform: none;
  }
  .js .reveal-img .frame {
    clip-path: inset(0 0 100% 0);
    transition: clip-path 1.3s ${tokens.easeLuxe};
    transition-delay: var(--d, 0s);
  }
  .js .reveal-img.is-in .frame {
    clip-path: inset(0 0 0% 0);
  }
  .split-line {
    display: inline-block;
    overflow: clip;
    vertical-align: bottom;
  }
  .split-line > span {
    display: inline-block;
    transition: transform 1.1s ${tokens.easeLuxe};
    transition-delay: var(--d, 0s);
  }
  .js .split-line > span {
    transform: translateY(118%);
  }
  .js .is-in .split-line > span,
  .js .split-done.is-in .split-line > span {
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001s !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001s !important;
      scroll-behavior: auto !important;
    }
    .reveal, .reveal-img, .split-line > span {
      opacity: 1 !important;
      transform: none !important;
      clip-path: none !important;
    }
  }
`;

const Shell = styled.div`
  background: ${tokens.noir};
  color: ${tokens.ivory};
`;

const Wrap = styled.div`
  width: min(100% - 2 * ${tokens.gutter}, 1560px);
  margin-inline: auto;
`;

const Section = styled.section<{ $pad?: boolean }>`
  position: relative;
  padding-block: ${({ $pad = true }) => ($pad ? tokens.sectionY : 0)};

  @media (max-width: 700px) {
    padding-block: ${({ $pad = true }) => ($pad ? '3.25rem' : 0)};
  }
`;

const Kicker = styled.p<{ $light?: boolean; $lilac?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: ${({ $light, $lilac }) =>
    $lilac ? tokens.wine : $light ? tokens.crimson : tokens.lilac};

  &::before {
    content: '';
    width: 2.6rem;
    height: 1px;
    background: ${({ $light, $lilac }) =>
      $lilac ? tokens.wine : $light ? tokens.crimson : tokens.lilac};
    opacity: 0.6;
  }

  @media (max-width: 700px) {
    letter-spacing: 0.2em;
    font-size: 0.62rem;
    gap: 0.6rem;
    max-width: 100%;
    flex-wrap: wrap;

    &::before {
      width: 1.4rem;
    }
  }
`;

const H2 = styled.h2<{ $light?: boolean; $lilac?: boolean }>`
  font-family: ${tokens.serif};
  font-weight: 500;
  font-size: clamp(2rem, 9vw, 4.9rem);
  line-height: 1.04;
  letter-spacing: 0.005em;
  overflow-wrap: anywhere;
  color: ${({ $light, $lilac }) => ($light || $lilac ? tokens.wine : tokens.ivory)};
  em {
    font-style: italic;
    font-weight: 400;
  }
`;

const Display = styled.h2`
  font-family: ${tokens.serif};
  font-weight: 500;
  font-size: clamp(2.2rem, 11vw, 7rem);
  line-height: 1.04;
  max-width: 14ch;
  overflow-wrap: anywhere;
  em {
    font-style: italic;
    font-weight: 400;
  }
`;

const Lede = styled.p<{ $light?: boolean; $lilac?: boolean }>`
  font-size: clamp(1.05rem, 1.5vw, 1.25rem);
  font-weight: 300;
  max-width: 56ch;
  color: ${({ $light, $lilac }) =>
    $lilac
      ? `color-mix(in srgb, ${tokens.ink} 82%, ${tokens.wine})`
      : $light
        ? `color-mix(in srgb, ${tokens.ink} 78%, ${tokens.crimson})`
        : tokens.lilac};
`;

const Count = styled.p<{ $light?: boolean; $lilac?: boolean }>`
  font-family: ${tokens.serif};
  font-style: italic;
  font-size: 1.1rem;
  color: ${({ $light, $lilac }) =>
    $light || $lilac ? tokens.crimson : tokens.lilacDeep};
  letter-spacing: 0.05em;
  white-space: nowrap;

  @media (max-width: 700px) {
    white-space: normal;
  }
`;

const SectionHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: clamp(1.75rem, 3.5vw, 3rem);
  max-width: 64rem;
`;

const HeadRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
`;

function SplitTitle({
  before,
  em,
  after,
  className,
  as: Tag = H2,
  light,
  lilac,
}: {
  before: string;
  em: string;
  after: string;
  className?: string;
  as?: typeof H2 | typeof Display;
  light?: boolean;
  lilac?: boolean;
}) {
  const ref = useReveal<HTMLHeadingElement>();
  const reduced = usePrefersReducedMotion();
  const words = useMemo(() => {
    const parts: { text: string; italic?: boolean }[] = [];
    before.split(/(\s+)/).forEach((p) => {
      if (p) parts.push({ text: p });
    });
    parts.push({ text: em, italic: true });
    after.split(/(\s+)/).forEach((p) => {
      if (p) parts.push({ text: p });
    });
    return parts;
  }, [before, em, after]);

  let wordIndex = 0;

  return (
    <Tag
      ref={ref}
      className={`split-done reveal ${className ?? ''}`}
      $light={light}
      $lilac={lilac}
    >
      {reduced
        ? (
          <>
            {before}
            <em>{em}</em>
            {after}
          </>
        )
        : words.map((w, i) => {
            if (/^\s+$/.test(w.text)) return <span key={`s${i}`}> </span>;
            const d = wordIndex++ * 0.07;
            return (
              <span className="split-line" key={`${w.text}-${i}`}>
                <span style={{ ['--d' as string]: `${d}s` }}>
                  {w.italic ? <em>{w.text}</em> : w.text}
                </span>
              </span>
            );
          })}
    </Tag>
  );
}

function Reveal({
  children,
  className,
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${className ?? ''}`}
      style={delay ? ({ ['--d' as string]: delay } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

/* ---------- Header ---------- */

const SiteHeader = styled.header`
  position: fixed;
  inset-inline: 0;
  top: 0;
  z-index: 200;
  height: calc(${tokens.headerH} + env(safe-area-inset-top));
  padding-top: env(safe-area-inset-top);

  @media (max-width: 1023px) {
    height: calc(4.25rem + env(safe-area-inset-top));
  }
  display: flex;
  align-items: center;
  transition:
    background 0.5s,
    backdrop-filter 0.5s,
    box-shadow 0.5s,
    transform 0.5s ${tokens.easeOut};

  &.is-scrolled {
    background: color-mix(in srgb, ${tokens.noir} 82%, transparent);
    backdrop-filter: blur(14px);
    box-shadow: 0 1px 0 rgba(211, 191, 219, 0.09);
  }
  &.is-hidden {
    transform: translateY(-100%);
  }
`;

const HeaderIn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
`;

const BrandImg = styled.img`
  width: clamp(92px, 26vw, 148px);
  height: auto;
  display: block;
  filter: brightness(0) invert(1);
`;

const SiteNav = styled.nav`
  display: flex;
  align-items: center;
  gap: clamp(0.45rem, 1vw, 1.15rem);
  min-width: 0;

  @media (max-width: 1023px) {
    display: none;
  }

  a {
    position: relative;
    font-size: 0.68rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${tokens.ivory};
    opacity: 0.82;
    padding-block: 0.5rem;
    white-space: nowrap;
    transition: opacity 0.3s;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0.15rem;
      width: 100%;
      height: 1px;
      background: ${tokens.lilac};
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.5s ${tokens.easeOut};
    }

    &:hover,
    &.is-active {
      opacity: 1;
    }
    &:hover::after,
    &.is-active::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

const HeaderCta = styled.a`
  font-family: ${tokens.sans};
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${tokens.ivory};
  text-decoration: none;
  border: 1px solid rgba(245, 239, 242, 0.7);
  padding: 0.62rem 1.15rem;
  border-radius: 99px;
  transition: background 0.4s, color 0.4s, border-color 0.4s;
  white-space: nowrap;

  &:hover {
    background: ${tokens.lilac};
    color: ${tokens.ink};
    border-color: ${tokens.lilac};
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;

const Burger = styled.button`
  display: none;
  width: 44px;
  height: 44px;
  place-items: center;
  position: relative;
  z-index: 250;
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;

  @media (max-width: 1023px) {
    display: grid;
  }

  span {
    position: absolute;
    left: 50%;
    width: 1.7rem;
    height: 1.5px;
    background: ${tokens.ivory};
    transition: transform 0.45s ${tokens.easeOut}, opacity 0.3s;
  }
  span:nth-child(1) {
    transform: translate(-50%, -5px);
  }
  span:nth-child(2) {
    transform: translate(-50%, 0);
  }
  span:nth-child(3) {
    transform: translate(-50%, 5px);
  }
  &[aria-expanded='true'] span:nth-child(1) {
    transform: translate(-50%, 0) rotate(45deg);
  }
  &[aria-expanded='true'] span:nth-child(2) {
    opacity: 0;
  }
  &[aria-expanded='true'] span:nth-child(3) {
    transform: translate(-50%, 0) rotate(-45deg);
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  inset: 0;
  z-index: 240;
  background: linear-gradient(160deg, ${tokens.bordeaux} 0%, ${tokens.noir} 90%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${tokens.gutter};
  padding-top: max(5rem, calc(env(safe-area-inset-top) + 4rem));
  overflow-y: auto;
  clip-path: inset(0 0 100% 0);
  visibility: hidden;
  transition: clip-path 0.8s ${tokens.easeLuxe}, visibility 0.8s;

  &.is-open {
    clip-path: inset(0 0 0% 0);
    visibility: visible;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  nav a {
    font-family: ${tokens.serif};
    font-size: clamp(1.7rem, 8vw, 3rem);
    color: ${tokens.ivory};
    padding-block: 0.35rem;
    display: flex;
    align-items: baseline;
    gap: 1rem;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ${tokens.easeOut}, transform 0.6s ${tokens.easeOut};

    small {
      font-family: ${tokens.sans};
      font-size: 0.65rem;
      letter-spacing: 0.3em;
      color: ${tokens.lilacDeep};
    }
  }

  &.is-open nav a {
    opacity: 1;
    transform: none;
  }

  .mm-foot {
    margin-top: 3rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 1.6rem;
    opacity: 0;
    transition: opacity 0.6s 0.4s;
  }
  &.is-open .mm-foot {
    opacity: 1;
  }

  .mm-foot a {
    font-family: ${tokens.sans};
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${tokens.ivory};
    text-decoration: none;
    border: 1px solid rgba(245, 239, 242, 0.7);
    padding: 0.78rem 1.6rem;
    border-radius: 99px;
  }
`;

export function EditorialHeader({
  nav,
  cta,
  signatureSrc,
  name,
}: {
  nav: NavItem[];
  cta: { href: string; label: string };
  signatureSrc: string;
  name: string;
}) {
  const { scrollTo, lenis } = useLenisScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('');
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (
        window.innerWidth > 1023 &&
        y > window.innerHeight &&
        y > lastY.current + 6
      ) {
        setHidden(true);
      }
      if (y < lastY.current - 6) setHidden(false);
      if (y < 40) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = nav.map((n) => n.href.replace('#', ''));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          setActive(`#${en.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    ids.forEach((id) => {
      const s = document.getElementById(id);
      if (s) io.observe(s);
    });
    return () => io.disconnect();
  }, [nav]);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
    lenis?.start();
  };

  const onNav = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    scrollTo(href);
    history.replaceState(null, '', href);
  };

  const toggleMenu = () => {
    setMenuOpen((open) => {
      const next = !open;
      document.body.style.overflow = next ? 'hidden' : '';
      if (next) lenis?.stop();
      else lenis?.start();
      return next;
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        document.body.style.overflow = '';
        lenis?.start();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lenis]);

  return (
    <>
      <SiteHeader
        className={`${scrolled ? 'is-scrolled' : ''} ${hidden && !menuOpen ? 'is-hidden' : ''}`}
      >
        <Wrap>
          <HeaderIn>
            <a href="#top" aria-label={name} onClick={onNav('#top')}>
              <BrandImg src={signatureSrc} alt={name} />
            </a>
            <SiteNav>
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={active === item.href ? 'is-active' : undefined}
                  onClick={onNav(item.href)}
                >
                  {item.label}
                </a>
              ))}
            </SiteNav>
            <HeaderCta href={cta.href} onClick={onNav(cta.href)}>
              {cta.label}
            </HeaderCta>
            <Burger
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              <span />
              <span />
              <span />
            </Burger>
          </HeaderIn>
        </Wrap>
      </SiteHeader>

      <MobileMenu className={menuOpen ? 'is-open' : undefined} id="mobile-menu">
        <nav>
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onNav(item.href)}
              style={{ transitionDelay: `${0.08 + i * 0.05}s` }}
            >
              <small>{String(i + 1).padStart(2, '0')}</small>
              {item.label}
            </a>
          ))}
          <Link
            to="/second"
            onClick={closeMenu}
            style={{
              color: 'inherit',
              display: 'flex',
              gap: '1rem',
              alignItems: 'baseline',
              fontFamily: tokens.serif,
              fontSize: 'clamp(2rem, 8vw, 3rem)',
              paddingBlock: '0.35rem',
            }}
          >
            <small
              style={{
                fontFamily: tokens.sans,
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                color: tokens.lilacDeep,
              }}
            >
              00
            </small>
            Main site
          </Link>
        </nav>
        <div className="mm-foot">
          <a href={cta.href} onClick={onNav(cta.href)}>
            {cta.label}
          </a>
        </div>
      </MobileMenu>
    </>
  );
}

/* ---------- Hero ---------- */

const Hero = styled(Section)`
  position: relative;
  min-height: 100svh;
  padding: 0;
  overflow: clip;
  isolation: isolate;
  background: ${tokens.noir};

  @media (max-width: 700px) {
    padding-block: 0;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  min-height: 100svh;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const HeroPhoto = styled.div<{ $delay: number }>`
  min-height: 100svh;
  overflow: hidden;
  opacity: 0;
  animation: ${endilaFade} 1.851s cubic-bezier(0.4, 0.8, 0.74, 1) both;
  animation-delay: ${({ $delay }) => `${$delay}s`};

  img {
    width: 100%;
    height: 100svh;
    object-fit: cover;
    object-position: center 18%;
    display: block;
  }

  @media (max-width: 700px) {
    img {
      object-position: 22% 16%;
    }

    &:not(:first-child) {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const HeroContent = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  align-content: end;
  justify-items: center;
  text-align: center;
  gap: 0.85rem;
  padding: 0 ${tokens.gutter} clamp(2.4rem, 6vh, 4.25rem);
  pointer-events: none;

  @media (max-width: 700px) {
    padding-bottom: 2.75rem;
    gap: 0.7rem;
  }
`;

const HeroKicker = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-family: ${tokens.sans};
  font-size: 0.72rem;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: ${tokens.lilac};
  opacity: 0;
  animation: ${riseIn} 1.2s ${tokens.easeOut} 0.25s forwards;

  &::before,
  &::after {
    content: '';
    width: 2.6rem;
    height: 1px;
    background: ${tokens.lilac};
    opacity: 0.6;
  }

  @media (max-width: 700px) {
    letter-spacing: 0.16em;
    font-size: 0.58rem;
    gap: 0.55rem;
    max-width: 100%;
    flex-wrap: wrap;
    justify-content: center;

    &::before,
    &::after {
      width: 1.1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const HeroSig = styled.img`
  width: min(68vw, 440px);
  opacity: 0;
  animation: ${riseIn} 1.4s ${tokens.easeOut} 0.45s forwards;
  filter: brightness(0) invert(1) drop-shadow(0 8px 40px rgba(21, 5, 7, 0.55));

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const HeroLine = styled.h1`
  color: ${tokens.ivory};
  font-family: ${tokens.serif};
  font-weight: 400;
  font-size: clamp(1.2rem, 4.6vw, 2.1rem);
  line-height: 1.25;
  letter-spacing: 0.02em;
  max-width: 34ch;
  opacity: 0;
  animation: ${riseIn} 1.4s ${tokens.easeOut} 0.7s forwards;

  em {
    color: ${tokens.lilac};
    font-style: italic;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

export function EditorialHero({
  images,
  kicker,
  lineBefore,
  lineEm,
  lineAfter,
  signatureSrc,
}: {
  images: string[];
  kicker: string;
  lineBefore: string;
  lineEm: string;
  lineAfter: string;
  signatureSrc: string;
}) {
  const photos = images.slice(0, 3);

  return (
    <Hero className="editorial-hero" id="top">
      <HeroGrid aria-hidden="true">
        {photos.map((src, i) => (
          <HeroPhoto key={src} $delay={0.1 + i * 0.05}>
            <img src={src} alt="" decoding="async" />
          </HeroPhoto>
        ))}
      </HeroGrid>
      <HeroContent>
        <HeroKicker>{kicker}</HeroKicker>
        <HeroSig src={signatureSrc} alt="" />
        <HeroLine>
          {lineBefore}
          <em>{lineEm}</em>
          {lineAfter}
        </HeroLine>
      </HeroContent>
    </Hero>
  );
}

/* ---------- About ---------- */

const AboutSection = styled(Section)`
  background: linear-gradient(180deg, ${tokens.noir} 0%, ${tokens.bordeaux} 100%);
`;

const AboutGrid = styled.div`
  display: grid;
  gap: clamp(2rem, 4vw, 3.5rem);
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: 1.05fr 0.95fr;
  }
`;

const AboutCopyCol = styled.div`
  .h2 {
    margin: 1rem 0 1.4rem;
    max-width: 16ch;
  }
`;

const BodyCopy = styled.p`
  max-width: 60ch;
  color: color-mix(in srgb, ${tokens.ivory} 86%, ${tokens.lilac});
  font-size: 1.02rem;

  & + & {
    margin-top: 1.2em;
  }
`;

const AboutMedia = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0.7rem;
    border: 1px solid rgba(211, 191, 219, 0.35);
    pointer-events: none;
  }

  @media (min-width: 700px) {
    &::after {
      inset: 1.1rem;
    }
  }

  .frame {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4 / 5;
  }

  img {
    width: 100%;
    height: 118%;
    object-fit: cover;
    object-position: center 15%;
    will-change: transform;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem 1rem;
  margin-top: 2.2rem;
  border-top: 1px solid rgba(211, 191, 219, 0.2);
  padding-top: 1.75rem;

  @media (max-width: 639px) {
    gap: 1.4rem 0.8rem;
  }

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatBlock = styled.div`
  b {
    display: block;
    font-family: ${tokens.serif};
    font-weight: 500;
    font-size: clamp(1.45rem, 7vw, 3.4rem);
    color: ${tokens.ivory};
    line-height: 1;

    sup {
      font-size: 0.5em;
      color: ${tokens.lilac};
      margin-left: 0.1em;
    }
  }

  span {
    display: block;
    margin-top: 0.7rem;
    font-size: 0.66rem;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: ${tokens.lilacDeep};

    @media (max-width: 639px) {
      letter-spacing: 0.08em;
      font-size: 0.58rem;
    }
  }
`;

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const n = useCountUp(stat.value, active);
  const label = stat.display ?? `${stat.prefix ?? ''}${n}${stat.suffix}`;
  return (
    <StatBlock>
      <b>
        {stat.display ? (
          label
        ) : (
          <>
            {stat.prefix}
            {n}
            {stat.suffix ? <sup>{stat.suffix}</sup> : null}
          </>
        )}
      </b>
      <span>{stat.label}</span>
    </StatBlock>
  );
}

export function AboutSectionView({
  editorial,
  about,
  personal,
  portraitSrc,
}: {
  editorial: Editorial['about'];
  about: AboutCopy;
  personal: Personal;
  portraitSrc: string;
}) {
  const statsRef = useReveal<HTMLDivElement>();
  const [statsIn, setStatsIn] = useState(false);
  const mediaRef = useReveal<HTMLDivElement>();
  const parallaxRef = useParallax(0.1);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStatsIn(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [statsRef]);

  return (
    <AboutSection id="about">
      <Wrap>
        <AboutGrid className="about-grid">
          <AboutCopyCol>
            <Reveal>
              <Kicker>{editorial.kicker}</Kicker>
            </Reveal>
            <SplitTitle
              className="h2"
              before={editorial.title}
              em={editorial.titleEm}
              after={editorial.titleAfter}
            />
            <Reveal delay="0.1s">
              <BodyCopy>{about.lead}</BodyCopy>
              <BodyCopy>{about.body}</BodyCopy>
              <BodyCopy>
                {personal.fullName}, {personal.title}. {personal.location},{' '}
                {personal.availability.toLowerCase()}.
              </BodyCopy>
            </Reveal>
            <Stats ref={statsRef} className="reveal">
              {editorial.stats.map((s) => (
                <StatItem key={s.label} stat={s} active={statsIn} />
              ))}
            </Stats>
          </AboutCopyCol>
          <AboutMedia ref={mediaRef} className="reveal-img reveal">
            <div className="frame">
              <img ref={parallaxRef} src={portraitSrc} alt={personal.fullName} />
            </div>
          </AboutMedia>
        </AboutGrid>
      </Wrap>
    </AboutSection>
  );
}

/* ---------- Expertise: services + process ---------- */

const ExpertiseSectionEl = styled(Section)`
  background: linear-gradient(180deg, ${tokens.bordeaux} 0%, ${tokens.noir} 100%);
`;

const ServiceGrid = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1px;
  background: rgba(211, 191, 219, 0.16);
  border: 1px solid rgba(211, 191, 219, 0.16);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceCard = styled.li`
  background: ${tokens.noir};
  padding: clamp(1.15rem, 2.4vw, 1.85rem);
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  transition: background 0.6s;

  &:hover {
    background: ${tokens.wine};
  }

  .num {
    font-family: ${tokens.serif};
    font-style: italic;
    font-size: 1.1rem;
    color: ${tokens.lilacDeep};
  }

  h3 {
    font-family: ${tokens.serif};
    font-weight: 500;
    font-size: clamp(1.4rem, 2.2vw, 1.9rem);
    line-height: 1.15;
    color: ${tokens.ivory};
  }

  p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: color-mix(in srgb, ${tokens.ivory} 78%, ${tokens.lilac});
  }
`;

const ProcessHead = styled.div`
  margin: clamp(2.4rem, 4.5vw, 3.5rem) 0 clamp(1.25rem, 2.5vw, 1.75rem);
`;

const ProcessList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1.35rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }
`;

const ProcessStep = styled.li`
  position: relative;
  padding-top: 1.6rem;
  border-top: 1px solid rgba(211, 191, 219, 0.28);

  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: 0;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${tokens.lilac};
  }

  .step {
    font-size: 0.64rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: ${tokens.lilacDeep};
  }

  h4 {
    font-family: ${tokens.serif};
    font-weight: 500;
    font-size: clamp(1.5rem, 2.4vw, 2rem);
    margin: 0.4rem 0 0.35rem;
    color: ${tokens.ivory};
  }

  p {
    font-size: 0.9rem;
    color: ${tokens.lilac};
    max-width: 24ch;
  }
`;

export function ExpertiseSectionView({ data }: { data: Editorial['expertise'] }) {
  return (
    <ExpertiseSectionEl id="expertise">
      <Wrap>
        <SectionHead>
          <Reveal>
            <Kicker>{data.kicker}</Kicker>
          </Reveal>
          <HeadRow>
            <SplitTitle before={data.title} em={data.titleEm} after={data.titleAfter} />
            <Count>{data.index}</Count>
          </HeadRow>
          <Reveal>
            <Lede>{data.lede}</Lede>
          </Reveal>
        </SectionHead>
        <Reveal>
          <ServiceGrid>
            {data.services.map((s, i) => (
              <ServiceCard key={s.title}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </ServiceCard>
            ))}
          </ServiceGrid>
        </Reveal>
        <ProcessHead>
          <Reveal>
            <Kicker>{data.processKicker}</Kicker>
          </Reveal>
        </ProcessHead>
        <Reveal>
          <ProcessList>
            {data.process.map((p, i) => (
              <ProcessStep key={p.title}>
                <span className="step">Step {String(i + 1).padStart(2, '0')}</span>
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </ProcessStep>
            ))}
          </ProcessList>
        </Reveal>
      </Wrap>
    </ExpertiseSectionEl>
  );
}

/* ---------- Credentials: tools, certifications, education ---------- */

const CredentialsSectionEl = styled(Section)`
  background: ${tokens.ivory};
  color: ${tokens.ink};
`;

const CredGrid = styled.div`
  display: grid;
  gap: clamp(1.75rem, 3.5vw, 2.75rem);

  @media (min-width: 1024px) {
    grid-template-columns: 1.15fr 0.85fr;
  }
`;

const CredLabel = styled.h3`
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${tokens.crimson};
  margin-bottom: 0.7rem;
`;

const ToolGroup = styled.div`
  & + & {
    margin-top: 1.4rem;
  }
`;

const Chips = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;

  li {
    font-size: 0.88rem;
    padding: 0.5rem 1rem;
    border: 1px solid rgba(42, 13, 19, 0.2);
    border-radius: 99px;
    color: ${tokens.ink};
    transition: background 0.4s, color 0.4s, border-color 0.4s;
  }

  li:hover {
    background: ${tokens.wine};
    border-color: ${tokens.wine};
    color: ${tokens.ivory};
  }
`;

const CredList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;

  li {
    padding: 0.7rem 0;
    border-top: 1px solid rgba(42, 13, 19, 0.14);
  }

  li:last-child {
    border-bottom: 1px solid rgba(42, 13, 19, 0.14);
  }

  b {
    display: block;
    font-family: ${tokens.serif};
    font-weight: 500;
    font-size: clamp(1.15rem, 1.8vw, 1.4rem);
    line-height: 1.25;
    color: ${tokens.ink};
  }

  span {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.86rem;
    color: color-mix(in srgb, ${tokens.ink} 70%, ${tokens.crimson});
  }
`;

type Education = { degree: string; school: string; dates: string };
type Language = { code: string; level: string };

export function CredentialsSectionView({
  data,
  education,
  languages,
}: {
  data: Editorial['credentials'];
  education: Education[];
  languages: Language[];
}) {
  return (
    <CredentialsSectionEl id="credentials">
      <Wrap>
        <SectionHead>
          <Reveal>
            <Kicker $light>{data.kicker}</Kicker>
          </Reveal>
          <HeadRow>
            <SplitTitle light before={data.title} em={data.titleEm} after={data.titleAfter} />
            <Count $light>{data.index}</Count>
          </HeadRow>
        </SectionHead>
        <CredGrid>
          <Reveal>
            {data.toolGroups.map((g) => (
              <ToolGroup key={g.label}>
                <CredLabel>{g.label}</CredLabel>
                <Chips>
                  {g.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </Chips>
              </ToolGroup>
            ))}
          </Reveal>
          <Reveal delay="0.1s">
            <CredLabel>Certifications</CredLabel>
            <CredList>
              {data.certifications.map((c) => (
                <li key={c}>
                  <b>{c}</b>
                </li>
              ))}
            </CredList>
            <CredLabel>Education</CredLabel>
            <CredList>
              {education.map((e) => (
                <li key={e.degree}>
                  <b>{e.degree}</b>
                  {(e.school || e.dates) && (
                    <span>{[e.school, e.dates].filter(Boolean).join(' · ')}</span>
                  )}
                </li>
              ))}
            </CredList>
            <CredLabel>Languages</CredLabel>
            <Chips>
              {languages.map((l) => (
                <li key={l.code}>
                  {l.code} · {l.level}
                </li>
              ))}
            </Chips>
          </Reveal>
        </CredGrid>
      </Wrap>
    </CredentialsSectionEl>
  );
}

/* ---------- Gallery shared ---------- */

const mediaHover = css`
  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1) contrast(1.04) brightness(0.96);
    transform: scale(1.001);
    transition:
      filter 1s ${tokens.easeLuxe},
      transform 1.4s ${tokens.easeLuxe};
    will-change: filter, transform;
  }

  @media (hover: hover) {
    a:hover img,
    a:hover video,
    a:focus-visible img,
    a:focus-visible video {
      filter: grayscale(0) contrast(1);
      transform: scale(1.055);
    }
  }

  &.in-color img,
  &.in-color video {
    filter: grayscale(0) contrast(1);
  }
`;

const CapOverlay = styled.figcaption`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.1rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
  font-size: 0.64rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${tokens.ivory};
  background: linear-gradient(transparent, rgba(21, 5, 7, 0.72));
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.6s ${tokens.easeOut}, transform 0.6s ${tokens.easeOut};

  .idx {
    font-family: ${tokens.serif};
    font-style: italic;
    font-size: 1rem;
    letter-spacing: 0.05em;
    color: ${tokens.lilac};
  }

  @media (hover: none) {
    display: none;
  }
`;

function GalleryMedia({
  item,
  onOpen,
}: {
  item: GalleryItem;
  onOpen: () => void;
}) {
  return (
    <a
      href={item.src}
      data-lightbox
      data-caption={`${item.caption ?? item.title ?? ''} ${item.index ?? item.meta ?? ''}`.trim()}
      onClick={(e) => {
        e.preventDefault();
        onOpen();
      }}
    >
      <figure style={{ aspectRatio: item.ar ?? 'var(--ar, 4/5)', position: 'relative', overflow: 'hidden', margin: 0 }}>
        {item.kind === 'video' ? (
          <video src={item.src} muted loop playsInline autoPlay />
        ) : (
          <img src={item.src} alt={item.caption ?? item.title ?? ''} loading="lazy" />
        )}
        <CapOverlay>
          <span>{item.caption ?? item.title}</span>
          <span className="idx">{item.index ?? item.meta}</span>
        </CapOverlay>
      </figure>
    </a>
  );
}

/* ---------- Editorial work bands (Endila structure, Aya skin) ---------- */

const WorkBand = styled.section<{ $light: boolean }>`
  background: ${({ $light }) => ($light ? tokens.ivory : tokens.noir)};
  color: ${({ $light }) => ($light ? tokens.ink : tokens.ivory)};
  padding-block: ${tokens.sectionY};
  border-top: 1px solid ${({ $light }) =>
    $light ? 'rgba(42, 13, 19, 0.12)' : 'rgba(211, 191, 219, 0.12)'};

  @media (max-width: 700px) {
    padding-block: 3.25rem;
  }
`;

const WorkInner = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(1.6rem, 3.5vw, 2.6rem);
  align-items: center;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 1.6rem;

    > * {
      min-width: 0;
    }
  }
`;

const WorkRole = styled.p<{ $light: boolean }>`
  font-family: ${tokens.serif};
  font-size: clamp(1.25rem, 2.2vw, 1.85rem);
  font-weight: 400;
  margin-bottom: 0.55rem;
  color: ${({ $light }) => ($light ? tokens.ink : tokens.ivory)};
`;

const WorkTitle = styled.h3<{ $light: boolean }>`
  font-family: ${tokens.sans};
  font-size: clamp(1.65rem, 8.5vw, 3.75rem);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  line-height: 1.02;
  margin-bottom: 0.45rem;
  overflow-wrap: anywhere;
  color: ${({ $light }) => ($light ? tokens.ink : tokens.ivory)};
`;

const WorkDates = styled.p<{ $light: boolean }>`
  font-size: 0.88rem;
  margin-bottom: 1.25rem;
  opacity: 0.7;
  color: ${({ $light }) => ($light ? tokens.ink : tokens.lilac)};
`;

const WorkPoints = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WorkPoint = styled.div`
  display: grid;
  grid-template-columns: 2.6rem 1fr;
  gap: 0.7rem;
`;

const WorkNum = styled.span<{ $light: boolean }>`
  font-size: 1.2rem;
  letter-spacing: 0.04em;
  color: ${({ $light }) => ($light ? tokens.crimson : tokens.lilac)};
`;

const WorkPointTitle = styled.h4<{ $light: boolean }>`
  font-family: ${tokens.serif};
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.35rem;
  color: ${({ $light }) => ($light ? tokens.ink : tokens.ivory)};
`;

const WorkPointBody = styled.p<{ $light: boolean }>`
  font-size: 0.95rem;
  line-height: 1.55;
  opacity: 0.88;
  color: ${({ $light }) =>
    $light
      ? `color-mix(in srgb, ${tokens.ink} 82%, ${tokens.crimson})`
      : `color-mix(in srgb, ${tokens.ivory} 86%, ${tokens.lilac})`};
`;

const WorkVisual = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  min-width: 0;
  width: 100%;
`;

const WorkLogoFrame = styled.div<{ $tile: string }>`
  width: min(280px, 100%);
  aspect-ratio: 1.35 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $tile }) => $tile};
  padding: ${({ $tile }) => ($tile === 'transparent' ? '1rem' : '0.85rem')};
`;

const WorkLogo = styled.img<{ $fit: string }>`
  width: 100%;
  height: 100%;
  object-fit: ${({ $fit }) => $fit};
`;

const WorkPhones = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: nowrap;
  width: 100%;
`;

const WorkPhone = styled.button`
  flex: 1 1 0;
  min-width: 0;
  max-width: 132px;
  aspect-ratio: 9 / 19;
  border-radius: 18px;
  border: 6px solid #0b0b0b;
  overflow: hidden;
  background: #0b0b0b;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
  padding: 0;
  cursor: pointer;

  position: relative;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  container-type: inline-size;

  @media (min-width: 701px) {
    flex: 0 0 132px;
    border-width: 8px;
    border-radius: 22px;
  }
`;

/* Instagram-style feed screen: the whole post is visible, never cropped or stretched */
const Feed = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;
  color: #111;
  text-align: left;

  .top {
    display: flex;
    align-items: center;
    gap: 4cqw;
    padding: 9cqw 5cqw 4cqw;
  }

  .avatar {
    flex: none;
    width: 13cqw;
    height: 13cqw;
    border-radius: 50%;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 0 0 1.2cqw #fff, 0 0 0 2cqw #d62976;
    display: grid;
    place-items: center;
  }

  .avatar img {
    width: 80%;
    height: 80%;
    object-fit: contain;
  }

  .handle {
    flex: 1;
    min-width: 0;
    font-size: 6.5cqw;
    font-weight: 600;
    letter-spacing: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .post {
    width: 100%;
    height: auto;
    display: block;
  }

  .actions {
    display: flex;
    gap: 5cqw;
    padding: 4cqw 5cqw 2cqw;

    svg {
      width: 9cqw;
      height: 9cqw;
    }

    svg:last-child {
      margin-left: auto;
    }
  }

  .caption {
    flex: 1;
    min-height: 0;
    overflow: hidden;
    padding: 1cqw 5cqw;

    i {
      display: block;
      height: 3.2cqw;
      margin: 2.6cqw 0;
      border-radius: 2cqw;
      background: #e6e6e6;
    }

    i:first-child {
      width: 40%;
      background: #cfcfcf;
    }
    i:nth-child(2) {
      width: 92%;
    }
    i:nth-child(3) {
      width: 70%;
    }
    i:nth-child(4) {
      width: 30%;
      background: #f0f0f0;
    }
  }

  .nav {
    display: flex;
    justify-content: space-around;
    padding: 4cqw 3cqw 7cqw;
    border-top: 1px solid #eee;

    svg {
      width: 9cqw;
      height: 9cqw;
    }
  }
`;

const ig = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, viewBox: '0 0 24 24' };

function FeedScreen({ src, logo, handle }: { src: string; logo: string; handle: string }) {
  return (
    <Feed>
      <div className="top">
        <span className="avatar">
          <img src={logo} alt="" />
        </span>
        <span className="handle">{handle}</span>
      </div>
      <img className="post" src={src} alt="" loading="lazy" />
      <div className="actions" aria-hidden="true">
        <svg {...ig}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
        <svg {...ig}><path d="M20 12a8 8 0 1 1-3.2-6.4L21 4l-1.2 4.2A8 8 0 0 1 20 12z" /></svg>
        <svg {...ig}><path d="M21 3 10 14M21 3l-7 18-4-7-7-4z" /></svg>
        <svg {...ig}><path d="M6 3h12v18l-6-4-6 4z" /></svg>
      </div>
      <div className="caption" aria-hidden="true">
        <i /><i /><i /><i />
      </div>
      <div className="nav" aria-hidden="true">
        <svg {...ig}><path d="M3 11 12 4l9 7v9h-6v-6H9v6H3z" /></svg>
        <svg {...ig}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
        <svg {...ig}><rect x="3" y="3" width="18" height="18" rx="5" /><path d="M12 8v8M8 12h8" /></svg>
        <svg {...ig}><rect x="3" y="3" width="18" height="18" rx="5" /><path d="m10 8 6 4-6 4z" /></svg>
        <svg {...ig}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
      </div>
    </Feed>
  );
}

function isVideoSrc(src: string) {
  return /\.mp4($|\?)/i.test(src);
}

function WorkBandView({ project }: { project: Project }) {
  const light = project.theme === 'light';
  const { open } = useLightbox();
  const revealRef = useReveal<HTMLDivElement>();
  const phoneItems = project.phones.map((src) => ({
    src,
    caption: project.title,
    kind: (isVideoSrc(src) ? 'video' : 'image') as 'image' | 'video',
  }));

  return (
    <WorkBand id={project.id} $light={light}>
      <Wrap>
        <WorkInner ref={revealRef} className="reveal">
          <div>
            <WorkRole $light={light}>{project.kicker}</WorkRole>
            <WorkTitle $light={light}>{project.title}</WorkTitle>
            <WorkDates $light={light}>{project.dates}</WorkDates>
            <WorkPoints>
              {project.points.map((point) => (
                <WorkPoint key={point.num}>
                  <WorkNum $light={light}>{point.num}</WorkNum>
                  <div>
                    <WorkPointTitle $light={light}>{point.title}</WorkPointTitle>
                    <WorkPointBody $light={light}>{point.body}</WorkPointBody>
                  </div>
                </WorkPoint>
              ))}
            </WorkPoints>
          </div>
          <WorkVisual>
            {project.logo !== '' && (
              <WorkLogoFrame $tile={project.logoTile}>
                <WorkLogo src={project.logo} alt={project.title} $fit={project.logoFit} />
              </WorkLogoFrame>
            )}
            {project.phones.length > 0 && (
              <WorkPhones data-gallery>
                {project.phones.map((src, i) => (
                  <WorkPhone
                    key={src}
                    type="button"
                    aria-label={`${project.title} mockup ${i + 1}`}
                    onClick={() => open(phoneItems, i)}
                  >
                    {isVideoSrc(src) ? (
                      <video src={src} muted loop playsInline autoPlay />
                    ) : (
                      <FeedScreen
                        src={src}
                        logo={project.logo}
                        handle={project.title.toLowerCase().replace(/[^a-z0-9]+/g, '')}
                      />
                    )}
                  </WorkPhone>
                ))}
              </WorkPhones>
            )}
          </WorkVisual>
        </WorkInner>
      </Wrap>
    </WorkBand>
  );
}

export function EditorialWork({ projects }: { projects: Project[] }) {
  return (
    <div id="projects">
      {projects.map((project) => (
        <WorkBandView key={project.id} project={project} />
      ))}
    </div>
  );
}


/* ---------- Campaigns staggered ---------- */

const Works = styled.ul`
  padding: 0;
  margin: 0;
  display: grid;
  gap: clamp(0.85rem, 2.4vw, 2.2rem);
  grid-template-columns: 1fr;
  list-style: none;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(12, 1fr);

    > li {
      grid-column: span 4;
    }
    > li.w-5 {
      grid-column: span 5;
    }
    > li.w-7 {
      grid-column: span 7;
    }
    > li.w-6 {
      grid-column: span 6;
    }
    > li.w-3 {
      grid-column: span 3;
    }
    > li.push {
      margin-top: clamp(0.75rem, 2vw, 2rem);
    }
  }
`;

const WorkItem = styled.li`
  position: relative;
  ${mediaHover}

  a {
    display: block;
    position: relative;
    overflow: hidden;
    background: #241018;
  }

  a:hover ${CapOverlay}, a:focus-visible ${CapOverlay} {
    opacity: 1;
    transform: none;
  }
`;

export function CampaignsSection({ data }: { data: Editorial['campaigns'] }) {
  const { open } = useLightbox();
  useTouchColorReveal('#campaigns .work');
  const items = data.gallery.map((g) => ({
    src: g.src,
    caption: `${g.caption ?? ''} ${g.index ?? ''}`.trim(),
    kind: g.kind,
  }));

  return (
    <Section id="campaigns">
      <Wrap>
        <SectionHead>
          <Reveal>
            <Kicker>{data.kicker}</Kicker>
          </Reveal>
          <HeadRow>
            <SplitTitle before={data.title} em={data.titleEm} after={data.titleAfter} />
            <Count>{data.index}</Count>
          </HeadRow>
          <Reveal>
            <Lede>{data.lede}</Lede>
          </Reveal>
        </SectionHead>
        <Works data-gallery>
          {data.gallery.map((item) => (
            <WorkItem
              key={item.src}
              className={`work ${item.span ? `w-${item.span}` : ''} ${item.push ? 'push' : ''}`}
            >
              <GalleryMedia
                item={item}
                onOpen={() =>
                  open(
                    items,
                    data.gallery.findIndex((g) => g.src === item.src),
                  )
                }
              />
            </WorkItem>
          ))}
        </Works>
      </Wrap>
    </Section>
  );
}

/* ---------- Stage marquee ---------- */

const StageSection = styled(Section)`
  padding-block: calc(${tokens.sectionY} * 0.8);
  background: ${tokens.bordeaux};
  overflow: clip;
`;

const Marquee = styled.div`
  --speed: 36s;
  position: relative;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);

  &:hover .marquee-track {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    -webkit-mask-image: none;
    mask-image: none;

    .marquee-track {
      animation: none;
      width: auto;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
`;

const MarqueeTrack = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(2.25rem, 5vw, 4.5rem);
  width: max-content;
  padding-inline: clamp(1.25rem, 3vw, 2.5rem);
  animation: ${marqueeAnim} var(--speed) linear infinite;

  span {
    font-family: ${tokens.serif};
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 500;
    letter-spacing: 0.04em;
    white-space: nowrap;
    color: ${tokens.ivory};
    opacity: 0.92;
    flex: none;
  }
`;

export function StageSectionView({ data }: { data: Editorial['stage'] }) {
  const loop = [...data.items, ...data.items];
  return (
    <StageSection className="stage">
      <Wrap>
        <SectionHead>
          <Reveal>
            <Kicker>{data.kicker}</Kicker>
          </Reveal>
          <HeadRow>
            <SplitTitle before={data.title} em={data.titleEm} after={data.titleAfter} />
            <Count>{data.index}</Count>
          </HeadRow>
        </SectionHead>
      </Wrap>
      <Marquee className="marquee">
        <MarqueeTrack className="marquee-track">
          {loop.map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </MarqueeTrack>
      </Marquee>
      <Wrap>
        <Reveal>
          <Lede style={{ marginTop: '1.5rem' }}>{data.lede}</Lede>
        </Reveal>
      </Wrap>
    </StageSection>
  );
}

/* ---------- Partners ---------- */

const PartnersSectionEl = styled(Section)`
  background: #767676;

  .h2 {
    color: #fff;
    font-style: italic;
    font-weight: 400;
    font-size: clamp(2.4rem, 7vw, 5.6rem);
    margin-bottom: clamp(1.5rem, 3vw, 2.4rem);
  }
`;

const BrandWall = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem 1rem;
  align-items: center;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem 1.25rem;
  }
`;

const BrandCell = styled.li<{ $white: boolean }>`
  display: grid;
  place-items: center;
  min-height: clamp(88px, 12vw, 132px);

  img {
    width: min(100%, 340px);
    max-height: clamp(72px, 12vw, 120px);
    height: auto;
    object-fit: contain;
    display: block;
    filter: ${({ $white }) => ($white ? 'brightness(0) invert(1)' : 'none')};
    transition: transform 0.7s ${tokens.easeLuxe};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover img {
      transform: scale(1.06);
    }
  }
`;

export function PartnersSection({
  data,
  clients,
}: {
  data: Editorial['partners'];
  clients: Client[];
}) {
  return (
    <PartnersSectionEl id="clients">
      <Wrap>
        <SplitTitle className="h2" before={data.title} em={data.titleEm} after={data.titleAfter} />
        <Reveal>
          <BrandWall>
            {clients.map((c) => (
              <BrandCell key={c.name} $white={c.tone === 'white'}>
                <img src={c.logo} alt={c.name} loading="lazy" />
              </BrandCell>
            ))}
          </BrandWall>
        </Reveal>
      </Wrap>
    </PartnersSectionEl>
  );
}

/* ---------- Contact ---------- */

const ContactSectionEl = styled(Section)`
  background:
    radial-gradient(90% 70% at 50% 115%, rgba(142, 33, 54, 0.32) 0%, transparent 60%),
    linear-gradient(180deg, ${tokens.noir}, ${tokens.bordeaux});
`;

const ContactGrid = styled.div`
  display: grid;
  gap: 1px;
  background: rgba(211, 191, 219, 0.16);
  border: 1px solid rgba(211, 191, 219, 0.16);
  margin-top: clamp(1.75rem, 3.5vw, 2.75rem);

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactCard = styled.div`
  background: color-mix(in srgb, ${tokens.noir} 88%, transparent);
  padding: clamp(1.25rem, 3vw, 2.4rem);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  transition: background 0.6s;

  &:hover {
    background: ${tokens.wine};
  }

  .kicker {
    font-size: 0.64rem;
  }

  a.mail {
    font-family: ${tokens.serif};
    font-size: clamp(1.05rem, 4.8vw, 2.2rem);
    color: ${tokens.ivory};
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.55rem 0.9rem;
    max-width: 100%;
    overflow-wrap: anywhere;

    svg {
      width: 1.1rem;
      height: 1.1rem;
      flex: none;
      transition: transform 0.4s ${tokens.easeOut};
    }

    &:hover svg {
      transform: translate(4px, -4px);
    }
  }

  p {
    font-size: 0.92rem;
    color: ${tokens.lilac};
    max-width: 38ch;
  }
`;

export function ContactSectionView({
  data,
  personal,
}: {
  data: Editorial['contactSection'];
  personal: Personal;
}) {
  const wa = `https://wa.me/${personal.phone.replace(/\D/g, '')}`;

  return (
    <ContactSectionEl id="contact" className="contact">
      <Wrap>
        <Reveal>
          <Kicker>{data.kicker}</Kicker>
        </Reveal>
        <SplitTitle
          as={Display}
          before={data.title}
          em={data.titleEm}
          after={data.titleAfter}
        />
        <ContactGrid>
          {data.cards.map((card) => {
            const href =
              card.kind === 'email'
                ? `mailto:${personal.email}`
                : card.kind === 'whatsapp'
                  ? wa
                  : `tel:${personal.phone.replace(/\s/g, '')}`;
            const label =
              card.kind === 'email'
                ? personal.email
                : card.kind === 'whatsapp'
                  ? personal.phone
                  : personal.phone;
            return (
              <ContactCard key={card.kicker} className="contact-card">
                <Kicker className="kicker">{card.kicker}</Kicker>
                <a
                  className="mail"
                  href={href}
                  target={card.kind === 'whatsapp' ? '_blank' : undefined}
                  rel={card.kind === 'whatsapp' ? 'noopener noreferrer' : undefined}
                >
                  {label}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 17L17 7M10 7h7v7" />
                  </svg>
                </a>
                <p>{card.body}</p>
              </ContactCard>
            );
          })}
        </ContactGrid>
      </Wrap>
    </ContactSectionEl>
  );
}

/* ---------- Footer + WhatsApp ---------- */

const SiteFooter = styled.footer`
  background: ${tokens.noir};
  border-top: 1px solid rgba(211, 191, 219, 0.12);
  padding: clamp(2rem, 4vw, 3.25rem) 0 max(1.5rem, env(safe-area-inset-bottom));
`;

const FooterGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  align-items: center;
  text-align: center;
`;

const FooterSig = styled.img`
  width: min(52vw, 240px);
  margin-inline: auto;
  opacity: 0.9;
  filter: brightness(0) invert(1);
`;

const FooterNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.85rem 1.35rem;

  a {
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${tokens.lilac};
    opacity: 0.8;
    transition: opacity 0.3s;

    &:hover {
      opacity: 1;
    }
  }
`;

const Socials = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.1rem;

  a {
    width: 2.9rem;
    height: 2.9rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    border: 1px solid rgba(211, 191, 219, 0.3);
    color: ${tokens.lilac};
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    transition:
      background 0.4s,
      color 0.4s,
      border-color 0.4s,
      transform 0.4s ${tokens.easeOut};

    &:hover {
      background: ${tokens.lilac};
      color: ${tokens.ink};
      border-color: ${tokens.lilac};
      transform: translateY(-4px);
    }
  }
`;

const FooterFine = styled.div`
  margin-top: 2.8rem;
  padding-top: 1.8rem;
  border-top: 1px solid rgba(211, 191, 219, 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  justify-content: space-between;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: color-mix(in srgb, ${tokens.lilac} 55%, transparent);
  overflow-wrap: anywhere;
`;

const WaFloat = styled.a`
  position: fixed;
  z-index: 180;
  right: max(1rem, env(safe-area-inset-right));
  bottom: max(1rem, env(safe-area-inset-bottom));
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, ${tokens.wine}, ${tokens.crimson});
  color: ${tokens.ivory};
  box-shadow:
    0 12px 34px rgba(21, 5, 7, 0.5),
    inset 0 0 0 1px rgba(211, 191, 219, 0.35);
  opacity: 0;
  transform: translateY(18px) scale(0.9);
  pointer-events: none;
  transition:
    opacity 0.6s ${tokens.easeOut},
    transform 0.6s ${tokens.easeOut},
    box-shadow 0.4s;

  &.is-visible {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }

  &:hover {
    box-shadow:
      0 16px 44px rgba(142, 33, 54, 0.55),
      inset 0 0 0 1px ${tokens.lilac};
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 1px solid rgba(211, 191, 219, 0.35);
    opacity: 0;
    animation: ${waPulse} 3s ${tokens.easeOut} infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    pointer-events: auto;
    &::after {
      display: none;
    }
  }
`;

export function EditorialFooter({
  nav,
  signatureSrc,
  name,
  linkedin,
  tagline,
}: {
  nav: NavItem[];
  signatureSrc: string;
  name: string;
  linkedin: string;
  tagline: string;
}) {
  const { scrollTo } = useLenisScroll();
  const year = new Date().getFullYear();

  return (
    <SiteFooter className="site-footer">
      <Wrap>
        <FooterGrid>
          <FooterSig src={signatureSrc} alt={name} />
          <FooterNav>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
            <Link to="/second">Main site</Link>
          </FooterNav>
          <Socials>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              IN
            </a>
          </Socials>
          <FooterFine>
            <span>
              © {year} {name.toUpperCase()}. ALL RIGHTS RESERVED
            </span>
            <span>{tagline}</span>
          </FooterFine>
        </FooterGrid>
      </Wrap>
    </SiteFooter>
  );
}

export function WhatsAppFloat({ phone }: { phone: string }) {
  const [visible, setVisible] = useState(false);
  const wa = `https://wa.me/${phone.replace(/\D/g, '')}`;

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <WaFloat
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className={`wa-float ${visible ? 'is-visible' : ''}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.3-1.1A11 11 0 0 0 20.5 3.5zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.1.6.6-3-.2-.3A9.1 9.1 0 1 1 12 20.5zm5-6.8c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3c0-.1 0-.3-.1-.4s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3a10.7 10.7 0 0 0 4.1 3.3c1.5.6 1.8.5 2.2.4s1.3-.5 1.5-1 .3-.9.2-1-.2-.2-.4-.3z" />
      </svg>
    </WaFloat>
  );
}

export function EditorialShell({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <LightboxProvider>
        <Shell>
          <EditorialGlobal />
          <CustomCursor />
          {children}
        </Shell>
      </LightboxProvider>
    </LenisProvider>
  );
}

export { Preloader };
