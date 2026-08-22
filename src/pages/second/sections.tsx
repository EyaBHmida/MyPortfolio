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
  useFinePointer,
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
  title?: string;
  meta?: string;
};
type RoleItem = {
  id: string;
  src: string;
  kind: 'image' | 'video';
  caption: string;
  meta: string;
  body: string;
};
type Stat = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  display?: string;
};
type Client = { name: string; logo: string; fit: string };
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
  pharmavie: {
    kicker: string;
    title: string;
    titleEm: string;
    titleAfter: string;
    index: string;
    lede: string;
    gallery: GalleryItem[];
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
  pitstop: {
    kicker: string;
    title: string;
    titleEm: string;
    titleAfter: string;
    index: string;
    lede: string;
    gallery: GalleryItem[];
  };
  selected: {
    kicker: string;
    title: string;
    titleEm: string;
    titleAfter: string;
    index: string;
    lede: string;
    gallery: GalleryItem[];
  };
  roles: {
    kicker: string;
    title: string;
    titleEm: string;
    titleAfter: string;
    index: string;
    lede: string;
    items: RoleItem[];
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

const kenburns = keyframes`
  from { transform: scale(1.09) translateY(-0.6%); }
  to { transform: scale(1.02) translateY(0.6%); }
`;

const scrollHint = keyframes`
  0% { transform: scaleY(0); transform-origin: top; }
  45% { transform: scaleY(1); transform-origin: top; }
  55% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
`;

const grain = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-4%, -6%); }
  20% { transform: translate(-10%, 4%); }
  30% { transform: translate(6%, -8%); }
  40% { transform: translate(-4%, 12%); }
  50% { transform: translate(-10%, 6%); }
  60% { transform: translate(10%, 0); }
  70% { transform: translate(0, 8%); }
  80% { transform: translate(-12%, 0); }
  90% { transform: translate(8%, 4%); }
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

  body {
    font-family: ${tokens.sans};
    font-weight: 300;
    background: ${tokens.noir};
    color: ${tokens.ivory};
    line-height: 1.65;
    letter-spacing: 0.015em;
    -webkit-font-smoothing: antialiased;
    overflow-x: clip;
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
`;

const H2 = styled.h2<{ $light?: boolean; $lilac?: boolean }>`
  font-family: ${tokens.serif};
  font-weight: 500;
  font-size: clamp(2.4rem, 5.6vw, 4.9rem);
  line-height: 1.04;
  letter-spacing: 0.005em;
  color: ${({ $light, $lilac }) => ($light || $lilac ? tokens.wine : tokens.ivory)};
  em {
    font-style: italic;
    font-weight: 400;
  }
`;

const Display = styled.h2`
  font-family: ${tokens.serif};
  font-weight: 500;
  font-size: clamp(2.9rem, 8vw, 7rem);
  line-height: 1.04;
  max-width: 14ch;
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
`;

const SectionHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  margin-bottom: clamp(2.6rem, 6vw, 5rem);
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
  height: ${tokens.headerH};
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
  gap: 2rem;
  width: 100%;
`;

const BrandImg = styled.img`
  width: clamp(96px, 10vw, 128px);
  height: auto;
  filter: brightness(0) invert(1);
`;

const SiteNav = styled.nav`
  display: flex;
  gap: clamp(1.1rem, 2.2vw, 2.4rem);

  @media (max-width: 1023px) {
    display: none;
  }

  a {
    position: relative;
    font-size: 0.72rem;
    font-weight: 400;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: ${tokens.ivory};
    opacity: 0.82;
    padding-block: 0.5rem;
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
  font-size: 0.7rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-weight: 400;
  border: 1px solid rgba(211, 191, 219, 0.45);
  padding: 0.78rem 1.6rem;
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
  width: 2.6rem;
  height: 2.6rem;
  place-items: center;
  position: relative;
  z-index: 250;

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
    font-size: clamp(2rem, 8vw, 3rem);
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
    gap: 1.6rem;
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${tokens.lilac};
    opacity: 0;
    transition: opacity 0.6s 0.4s;
  }
  &.is-open .mm-foot {
    opacity: 1;
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
      if (y > window.innerHeight && y > lastY.current + 6) setHidden(true);
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
        className={`${scrolled ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''}`}
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
            to="/"
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
  min-height: 100svh;
  display: grid;
  padding: 0;
  overflow: clip;
  isolation: isolate;
`;

const HeroSlides = styled.div`
  position: absolute;
  inset: 0;

  .slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 2.2s ${tokens.easeLuxe};
    will-change: opacity;

    &.is-active {
      opacity: 1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 22%;
      transform: scale(1.02);
      will-change: transform;
    }

    &.is-active img {
      animation: ${kenburns} 8.5s ${tokens.easeOut} forwards;
    }
  }
`;

const HeroVeil = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(
      to bottom,
      rgba(21, 5, 7, 0.45) 0%,
      rgba(21, 5, 7, 0.12) 34%,
      rgba(21, 5, 7, 0.22) 62%,
      rgba(21, 5, 7, 0.88) 100%
    ),
    radial-gradient(120% 90% at 50% 108%, rgba(46, 12, 17, 0.75) 0%, transparent 60%);
`;

const HeroGrain = styled.div`
  position: absolute;
  inset: -100%;
  z-index: 2;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
  animation: ${grain} 9s steps(10) infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  align-self: end;
  justify-self: center;
  text-align: center;
  padding: 0 ${tokens.gutter} clamp(8rem, 16vh, 11rem);
  display: grid;
  justify-items: center;
  gap: 1.5rem;
  width: 100%;
`;

const HeroKicker = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
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

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const HeroSig = styled.img`
  width: min(74vw, 560px);
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
  font-size: clamp(1.35rem, 2.8vw, 2.1rem);
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

const HeroScroll = styled.div`
  position: absolute;
  z-index: 3;
  bottom: 1.6rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: ${tokens.lilac};
  opacity: 0;
  animation: ${riseIn} 1.2s ${tokens.easeOut} 1.4s forwards;

  &::after {
    content: '';
    width: 1px;
    height: 3.4rem;
    background: linear-gradient(${tokens.lilac}, transparent);
    animation: ${scrollHint} 2.4s ${tokens.easeLuxe} infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
    &::after {
      animation: none;
    }
  }
`;

const HeroIndex = styled.div`
  position: absolute;
  z-index: 3;
  right: ${tokens.gutter};
  bottom: 1.9rem;
  display: none;
  gap: 0.5rem;

  @media (min-width: 768px) {
    display: flex;
  }

  button {
    width: 2.2rem;
    height: 2px;
    background: rgba(211, 191, 219, 0.28);
    transition: background 0.4s;
    padding: 0;

    &.is-active {
      background: ${tokens.lilac};
    }
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
  const [slide, setSlide] = useState(0);
  const reduced = usePrefersReducedMotion();
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (images.length < 2 || reduced) return;
    const play = () => {
      timer.current = window.setInterval(() => {
        setSlide((n) => (n + 1) % images.length);
      }, 6500);
    };
    play();
    const onVis = () => {
      if (document.hidden && timer.current) window.clearInterval(timer.current);
      else play();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [images.length, reduced]);

  return (
    <Hero className="editorial-hero" id="top">
      <HeroSlides aria-hidden="true">
        {images.map((src, i) => (
          <div key={src} className={`slide ${i === slide ? 'is-active' : ''}`}>
            <img src={src} alt="" decoding="async" />
          </div>
        ))}
      </HeroSlides>
      <HeroVeil />
      <HeroGrain />
      <HeroContent>
        <HeroKicker>{kicker}</HeroKicker>
        <HeroSig src={signatureSrc} alt="" />
        <HeroLine>
          {lineBefore}
          <em>{lineEm}</em>
          {lineAfter}
        </HeroLine>
      </HeroContent>
      <HeroScroll>Scroll</HeroScroll>
      <HeroIndex>
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className={i === slide ? 'is-active' : undefined}
            aria-label={`Slide ${i + 1}`}
            onClick={() => {
              if (timer.current) window.clearInterval(timer.current);
              setSlide(i);
              if (!reduced) {
                timer.current = window.setInterval(() => {
                  setSlide((n) => (n + 1) % images.length);
                }, 6500);
              }
            }}
          />
        ))}
      </HeroIndex>
    </Hero>
  );
}

/* ---------- About ---------- */

const AboutSection = styled(Section)`
  background: linear-gradient(180deg, ${tokens.noir} 0%, ${tokens.bordeaux} 100%);
`;

const AboutGrid = styled.div`
  display: grid;
  gap: clamp(3rem, 6vw, 6rem);
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: 1.05fr 0.95fr;
  }
`;

const AboutCopyCol = styled.div`
  .h2 {
    margin: 1.4rem 0 2.2rem;
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
    inset: 1.1rem;
    border: 1px solid rgba(211, 191, 219, 0.35);
    pointer-events: none;
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
  gap: 2.6rem 1.6rem;
  margin-top: 3.2rem;
  border-top: 1px solid rgba(211, 191, 219, 0.2);
  padding-top: 2.6rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatBlock = styled.div`
  b {
    display: block;
    font-family: ${tokens.serif};
    font-weight: 500;
    font-size: clamp(2.3rem, 4vw, 3.4rem);
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
                {personal.fullName} — {personal.title}. {personal.location},{' '}
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
      <figure style={{ aspectRatio: 'var(--ar, 4/5)', position: 'relative', overflow: 'hidden', margin: 0 }}>
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

/* ---------- Pharmavie mosaic ---------- */

const LightSection = styled(Section)`
  background: ${tokens.ivory};
  color: ${tokens.ink};
`;

const BridalGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(0.85rem, 2.4vw, 1.6rem);
  list-style: none;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(1.1rem, 1.7vw, 2rem);
  }
`;

const BridalItem = styled.li`
  position: relative;
  ${mediaHover}

  a {
    display: block;
    position: relative;
    overflow: hidden;
    height: 100%;
    background: #ded3dd;
    box-shadow: 0 6px 22px rgba(42, 13, 19, 0.07);
    transition: box-shadow 0.32s ${tokens.easeOut}, transform 0.32s ${tokens.easeOut};
  }

  @media (hover: hover) {
    a:hover {
      box-shadow: 0 18px 44px rgba(42, 13, 19, 0.17);
    }
    a:hover img {
      transform: scale(1.03);
    }
  }

  &.b-feat {
    @media (min-width: 1024px) {
      grid-column: span 2;
      grid-row: span 2;

      figure {
        aspect-ratio: auto;
        height: 100%;
      }
    }
  }

  a:hover ${CapOverlay}, a:focus-visible ${CapOverlay} {
    opacity: 1;
    transform: none;
  }
`;

export function PharmavieSection({ data }: { data: Editorial['pharmavie'] }) {
  const { open } = useLightbox();
  useTouchColorReveal('#pharmavie .bridal-item');
  const items = data.gallery.map((g) => ({
    src: g.src,
    caption: `${g.caption ?? ''} ${g.index ?? ''}`.trim(),
    kind: g.kind,
  }));

  return (
    <LightSection id="pharmavie">
      <Wrap>
        <SectionHead>
          <Reveal>
            <Kicker $light>{data.kicker}</Kicker>
          </Reveal>
          <HeadRow>
            <SplitTitle
              before={data.title}
              em={data.titleEm}
              after={data.titleAfter}
              light
            />
            <Count $light>{data.index}</Count>
          </HeadRow>
          <Reveal>
            <Lede $light>{data.lede}</Lede>
          </Reveal>
        </SectionHead>
        <BridalGrid data-gallery>
          {data.gallery.map((item) => (
            <BridalItem
              key={item.src}
              className={`bridal-item work ${item.featured ? 'b-feat' : ''}`}
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
            </BridalItem>
          ))}
        </BridalGrid>
      </Wrap>
    </LightSection>
  );
}

/* ---------- Campaigns staggered ---------- */

const Works = styled.ul`
  display: grid;
  gap: clamp(1.1rem, 2.4vw, 2.2rem);
  grid-template-columns: repeat(2, 1fr);
  list-style: none;

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
      margin-top: clamp(1.5rem, 4vw, 4rem);
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

/* ---------- Pitstop posters ---------- */

const FilmSection = styled(Section)`
  background: ${tokens.noir};
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 14px;
    background-image: radial-gradient(
      circle at 7px 7px,
      ${tokens.bordeaux2} 3.5px,
      transparent 4px
    );
    background-size: 28px 14px;
    opacity: 0.8;
  }
  &::before {
    top: calc(${tokens.sectionY} * 0.42);
  }
  &::after {
    bottom: calc(${tokens.sectionY} * 0.42);
  }
`;

const Posters = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1rem, 2vw, 1.8rem);
  justify-content: flex-start;
  list-style: none;

  @media (min-width: 640px) {
    justify-content: center;
  }
`;

const Poster = styled.li`
  flex: 0 0 auto;
  width: calc((100% - 1 * clamp(1rem, 2vw, 1.8rem)) / 2 - 0.5px);

  @media (min-width: 640px) {
    width: calc((100% - 2 * clamp(1rem, 2vw, 1.8rem)) / 3 - 0.5px);
  }
  @media (min-width: 1024px) {
    width: calc((100% - 3 * clamp(1rem, 2vw, 1.8rem)) / 4 - 0.5px);
  }

  a {
    display: block;
    position: relative;
    overflow: hidden;
    background: #241018;
    transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
    transition: transform 0.5s ${tokens.easeOut}, box-shadow 0.5s;
    box-shadow: 0 10px 34px rgba(0, 0, 0, 0.45);
  }

  figure {
    aspect-ratio: 2 / 3;
    overflow: hidden;
    margin: 0;
    position: relative;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1) contrast(1.05) brightness(0.94);
    transition: filter 0.9s ${tokens.easeLuxe}, transform 1.2s ${tokens.easeLuxe};
  }

  .sheen {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      115deg,
      transparent 40%,
      rgba(211, 191, 219, 0.14) 50%,
      transparent 60%
    );
    transform: translateX(-120%);
    transition: transform 0.9s ${tokens.easeLuxe};
  }

  @media (hover: hover) {
    a:hover img,
    a:focus-visible img {
      filter: none;
      transform: scale(1.06);
    }
    a:hover {
      box-shadow: 0 26px 60px rgba(0, 0, 0, 0.6);
    }
    a:hover .sheen {
      transform: translateX(120%);
    }
  }

  &.in-color img {
    filter: none;
  }
`;

export function PitstopSection({ data }: { data: Editorial['pitstop'] }) {
  const { open } = useLightbox();
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  useTouchColorReveal('#pitstop .poster');
  const items = data.gallery.map((g) => ({
    src: g.src,
    caption: `${g.caption ?? ''} ${g.index ?? ''}`.trim(),
    kind: g.kind,
  }));

  return (
    <FilmSection id="pitstop" className="film">
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
        <Posters data-gallery className="posters">
          {data.gallery.map((item) => (
            <Poster
              key={item.src}
              className="poster"
              onMouseMove={
                fine && !reduced
                  ? (e) => {
                      const a = e.currentTarget.querySelector('a') as HTMLElement;
                      const r = a.getBoundingClientRect();
                      const x = (e.clientX - r.left) / r.width - 0.5;
                      const y = (e.clientY - r.top) / r.height - 0.5;
                      a.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`);
                      a.style.setProperty('--rx', `${(-y * 7).toFixed(2)}deg`);
                    }
                  : undefined
              }
              onMouseLeave={
                fine && !reduced
                  ? (e) => {
                      const a = e.currentTarget.querySelector('a') as HTMLElement;
                      a.style.setProperty('--ry', '0deg');
                      a.style.setProperty('--rx', '0deg');
                    }
                  : undefined
              }
            >
              <a
                href={item.src}
                data-lightbox
                onClick={(e) => {
                  e.preventDefault();
                  open(
                    items,
                    data.gallery.findIndex((g) => g.src === item.src),
                  );
                }}
              >
                <figure>
                  <img src={item.src} alt={item.caption ?? ''} loading="lazy" />
                  <span className="sheen" />
                </figure>
              </a>
            </Poster>
          ))}
        </Posters>
      </Wrap>
    </FilmSection>
  );
}

/* ---------- Selected covers ---------- */

const LilacSection = styled(Section)`
  background: linear-gradient(175deg, ${tokens.lilac} 0%, #c6aed2 100%);
  color: ${tokens.ink};
`;

const Mags = styled.ul`
  display: grid;
  gap: clamp(1.6rem, 3vw, 3rem);
  grid-template-columns: repeat(2, 1fr);
  list-style: none;

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Mag = styled.li`
  text-align: left;

  a {
    display: block;
    position: relative;
    overflow: hidden;
    background: #3b2033;
    box-shadow: 0 18px 50px rgba(42, 13, 19, 0.35);
    transition: transform 0.7s ${tokens.easeOut}, box-shadow 0.7s;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 10px;
      background: linear-gradient(90deg, rgba(42, 13, 19, 0.28), transparent);
      pointer-events: none;
    }
  }

  figure {
    aspect-ratio: 4 / 5;
    overflow: hidden;
    margin: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1) contrast(1.03);
    transition: filter 0.9s ${tokens.easeLuxe}, transform 1.2s ${tokens.easeLuxe};
  }

  @media (hover: hover) {
    a:hover {
      transform: translateY(-10px) rotate(-0.6deg);
      box-shadow: 0 34px 70px rgba(42, 13, 19, 0.5);
    }
    a:hover img,
    a:focus-visible img {
      filter: none;
      transform: scale(1.045);
    }
  }

  &.in-color img {
    filter: none;
  }
`;

const MagMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 1.1rem;
  gap: 1rem;

  b {
    font-family: ${tokens.serif};
    font-weight: 500;
    font-size: 1.15rem;
    color: ${tokens.wine};
  }

  span {
    font-size: 0.62rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: ${tokens.crimson};
  }
`;

export function SelectedSection({ data }: { data: Editorial['selected'] }) {
  const { open } = useLightbox();
  useTouchColorReveal('#selected .mag');
  const items = data.gallery.map((g) => ({
    src: g.src,
    caption: `${g.title ?? ''} ${g.meta ?? ''}`.trim(),
    kind: g.kind,
  }));

  return (
    <LilacSection id="selected">
      <Wrap>
        <SectionHead>
          <Reveal>
            <Kicker $lilac>{data.kicker}</Kicker>
          </Reveal>
          <HeadRow>
            <SplitTitle
              before={data.title}
              em={data.titleEm}
              after={data.titleAfter}
              lilac
            />
            <Count $lilac>{data.index}</Count>
          </HeadRow>
          <Reveal>
            <Lede $lilac>{data.lede}</Lede>
          </Reveal>
        </SectionHead>
        <Mags data-gallery>
          {data.gallery.map((item) => (
            <Mag key={item.src} className="mag">
              <a
                href={item.src}
                data-lightbox
                onClick={(e) => {
                  e.preventDefault();
                  open(
                    items,
                    data.gallery.findIndex((g) => g.src === item.src),
                  );
                }}
              >
                <figure>
                  <img src={item.src} alt={item.title ?? ''} loading="lazy" />
                </figure>
              </a>
              <MagMeta>
                <b>{item.title}</b>
                <span>{item.meta}</span>
              </MagMeta>
            </Mag>
          ))}
        </Mags>
      </Wrap>
    </LilacSection>
  );
}

/* ---------- Roles ---------- */

const GroomingGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(0.85rem, 2.4vw, 1.6rem);
  list-style: none;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(1.1rem, 1.7vw, 2rem);
  }
`;

const RoleCard = styled.li`
  ${mediaHover}

  a {
    display: block;
    position: relative;
    overflow: hidden;
    background: #241018;
  }

  img {
    object-position: center 28%;
  }

  a:hover ${CapOverlay}, a:focus-visible ${CapOverlay} {
    opacity: 1;
    transform: none;
  }
`;

const RoleBody = styled.p`
  margin-top: 1rem;
  font-size: 0.92rem;
  color: ${tokens.lilac};
  max-width: 38ch;
`;

export function RolesSection({ data }: { data: Editorial['roles'] }) {
  const { open } = useLightbox();
  useTouchColorReveal('#roles .work');
  const items = data.items.map((g) => ({
    src: g.src,
    caption: `${g.caption} ${g.meta}`,
    kind: g.kind as 'image' | 'video',
  }));

  return (
    <Section id="roles">
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
        <GroomingGrid data-gallery className="grooming-grid">
          {data.items.map((item) => (
            <RoleCard key={item.id} className="work">
              <GalleryMedia
                item={{
                  src: item.src,
                  kind: item.kind,
                  caption: item.caption,
                  index: item.meta,
                }}
                onOpen={() =>
                  open(
                    items,
                    data.items.findIndex((g) => g.id === item.id),
                  )
                }
              />
              <RoleBody>{item.body}</RoleBody>
            </RoleCard>
          ))}
        </GroomingGrid>
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
  gap: clamp(4rem, 9vw, 9rem);
  width: max-content;
  padding-inline: clamp(2rem, 4.5vw, 4.5rem);
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
          <Lede style={{ marginTop: '2.6rem' }}>{data.lede}</Lede>
        </Reveal>
      </Wrap>
    </StageSection>
  );
}

/* ---------- Partners ---------- */

const BrandWall = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: rgba(211, 191, 219, 0.13);
  border: 1px solid rgba(211, 191, 219, 0.13);

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const BrandCell = styled.div<{ $fit: string }>`
  background: ${tokens.noir};
  display: grid;
  place-items: center;
  padding: clamp(2rem, 4vw, 3.4rem) 1.4rem;
  transition: background 0.6s;

  img {
    max-height: clamp(2rem, 3.2vw, 2.9rem);
    width: auto;
    max-width: 78%;
    height: auto;
    object-fit: ${({ $fit }) => $fit};
    opacity: 0.62;
    filter: saturate(0);
    transition: opacity 0.5s, transform 0.5s ${tokens.easeOut};
  }

  &:hover {
    background: ${tokens.bordeaux};
  }
  &:hover img {
    opacity: 1;
    transform: scale(1.05);
  }

  &.filler {
    pointer-events: none;
    display: none;
  }
  &.filler.f1 {
    display: block;
  }
  @media (min-width: 1024px) {
    &.filler.f2,
    &.filler.f3 {
      display: block;
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
    <Section id="clients">
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
        <BrandWall>
          {clients.map((c) => (
            <BrandCell key={c.name} $fit={c.fit} className="brand-cell">
              <img src={c.logo} alt={c.name} />
            </BrandCell>
          ))}
          <BrandCell $fit="contain" className="brand-cell filler f1" aria-hidden />
          <BrandCell $fit="contain" className="brand-cell filler f2" aria-hidden />
          <BrandCell $fit="contain" className="brand-cell filler f3" aria-hidden />
        </BrandWall>
      </Wrap>
    </Section>
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
  margin-top: clamp(3rem, 6vw, 5rem);

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactCard = styled.div`
  background: color-mix(in srgb, ${tokens.noir} 88%, transparent);
  padding: clamp(2.2rem, 4.5vw, 3.8rem);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  transition: background 0.6s;

  &:hover {
    background: ${tokens.wine};
  }

  .kicker {
    font-size: 0.64rem;
  }

  a.mail {
    font-family: ${tokens.serif};
    font-size: clamp(1.4rem, 2.6vw, 2.2rem);
    color: ${tokens.ivory};
    display: inline-flex;
    align-items: center;
    gap: 0.9rem;
    width: fit-content;

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
  padding: clamp(3rem, 6vw, 5rem) 0 2.2rem;
`;

const FooterGrid = styled.div`
  display: grid;
  gap: 2.6rem;
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
  gap: 1.6rem 2.2rem;

  a {
    font-size: 0.68rem;
    letter-spacing: 0.26em;
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
  gap: 1rem;
  justify-content: space-between;
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color-mix(in srgb, ${tokens.lilac} 55%, transparent);
`;

const WaFloat = styled.a`
  position: fixed;
  z-index: 180;
  right: clamp(1rem, 3vw, 2rem);
  bottom: clamp(1rem, 3vw, 2rem);
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
            <Link to="/">Main site</Link>
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
