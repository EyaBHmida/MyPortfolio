import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import Lenis from 'lenis';
import { tokens } from './tokens.ts';

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return reduced;
}

export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return fine;
}

type LenisContextValue = {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement) => void;
};

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => undefined,
});

export function useLenisScroll() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    document.documentElement.classList.add('js');
    if (reduced || !fine) {
      document.documentElement.classList.remove('lenis');
      return;
    }
    document.documentElement.classList.add('lenis');
    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenisRef.current = instance;
    setLenis(instance);
    let raf = 0;
    const loop = (t: number) => {
      instance.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
      document.documentElement.classList.remove('lenis');
    };
  }, [reduced, fine]);

  const scrollTo = useCallback(
    (target: string | HTMLElement) => {
      const el =
        typeof target === 'string'
          ? (document.querySelector(target === '#top' ? '.editorial-hero' : target) as HTMLElement | null)
          : target;
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      const instance = lenisRef.current;
      if (instance) instance.scrollTo(y, { duration: 1.4 });
      else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
    },
    [reduced],
  );

  const value = useMemo(() => ({ lenis, scrollTo }), [lenis, scrollTo]);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}

const riseIn = keyframes`
  from { opacity: 0; transform: translateY(26px); }
  to { opacity: 1; transform: none; }
`;

const sigIn = keyframes`
  to { opacity: 1; transform: none; }
`;

const PreloaderRoot = styled.div`
  position: fixed;
  inset: 0;
  z-index: 400;
  display: grid;
  place-items: center;
  background: ${tokens.noir};
  transition: opacity 0.9s ${tokens.easeLuxe}, visibility 0.9s;

  &.is-done {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
`;

const PreloaderInner = styled.div`
  display: grid;
  place-items: center;
  gap: 1.6rem;
  text-align: center;
  padding-inline: 1.25rem;
`;

const PreloaderSigStack = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  gap: 0.15rem;
  opacity: 0;
  transform: translateY(14px);
  animation: ${sigIn} 1.4s ${tokens.easeOut} 0.15s forwards;
`;

const PreloaderSig = styled.img`
  display: block;
  height: auto;
  filter: brightness(0) invert(1);

  &.is-eya {
    width: min(38vw, 168px);
  }

  &.is-rest {
    width: min(72vw, 280px);
  }
`;

const PreloaderLine = styled.div`
  width: min(72vw, 280px);
  height: 1px;
  background: rgba(211, 191, 219, 0.18);
  overflow: hidden;

  i {
    display: block;
    height: 100%;
    width: 100%;
    background: ${tokens.lilac};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ${tokens.easeOut};
  }
`;

const PreloaderWord = styled.p`
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${tokens.lilacDeep};
  max-width: min(92vw, 340px);
  line-height: 1.6;
  overflow-wrap: anywhere;
`;

export function Preloader({
  signatureTopSrc,
  signatureBottomSrc,
  word,
}: {
  signatureTopSrc: string;
  signatureBottomSrc: string;
  word: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(!reduced);
  const [done, setDone] = useState(false);
  const barRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (reduced) return;
    document.body.style.overflow = 'hidden';
    let p = 0;
    const tick = window.setInterval(() => {
      p = Math.min(p + Math.random() * 18, 92);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p / 100})`;
    }, 160);

    const ready = Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise<void>((r) => setTimeout(r, 900)),
    ]);

    const race = Promise.race([
      ready,
      new Promise<void>((r) => setTimeout(r, 2600)),
    ]);

    race.then(() => {
      window.clearInterval(tick);
      if (barRef.current) barRef.current.style.transform = 'scaleX(1)';
      window.setTimeout(() => {
        setDone(true);
        document.body.style.overflow = '';
        window.setTimeout(() => setVisible(false), 1000);
      }, 350);
    });

    return () => {
      window.clearInterval(tick);
      document.body.style.overflow = '';
    };
  }, [reduced]);

  if (!visible) return null;

  return createPortal(
    <PreloaderRoot className={done ? 'is-done' : undefined} aria-hidden="true">
      <PreloaderInner>
        <PreloaderSigStack>
          <PreloaderSig className="is-eya" src={signatureTopSrc} alt="" width={445} height={488} />
          <PreloaderSig className="is-rest" src={signatureBottomSrc} alt="" width={1091} height={431} />
        </PreloaderSigStack>
        <PreloaderLine>
          <i ref={barRef} />
        </PreloaderLine>
        <PreloaderWord>{word}</PreloaderWord>
      </PreloaderInner>
    </PreloaderRoot>,
    document.body,
  );
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            el.classList.add('is-in');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    const sweep = window.setInterval(() => {
      if (el.classList.contains('is-in')) {
        window.clearInterval(sweep);
        return;
      }
      if (el.getBoundingClientRect().top < window.innerHeight * 0.94) {
        el.classList.add('is-in');
        io.unobserve(el);
        window.clearInterval(sweep);
      }
    }, 450);
    return () => {
      io.disconnect();
      window.clearInterval(sweep);
    };
  }, [reduced]);

  return ref;
}

export function useSplitReady(active: boolean) {
  const reduced = usePrefersReducedMotion();
  return reduced || active;
}

type LightboxItem = { src: string; caption: string; kind: 'image' | 'video' };

type LightboxContextValue = {
  open: (items: LightboxItem[], index: number) => void;
};

const LightboxContext = createContext<LightboxContextValue>({
  open: () => undefined,
});

export function useLightbox() {
  return useContext(LightboxContext);
}

const LightboxRoot = styled.div`
  position: fixed;
  inset: 0;
  z-index: 320;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, ${tokens.noir} 92%, transparent);
  backdrop-filter: blur(18px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.55s ${tokens.easeOut}, visibility 0.55s;

  &.is-open {
    opacity: 1;
    visibility: visible;
  }
`;

const LightboxMedia = styled.div`
  max-width: min(92vw, 1200px);
  max-height: 72svh;
  margin-bottom: 6svh;
  opacity: 0;
  transform: scale(0.94);
  transition: opacity 0.5s ${tokens.easeOut}, transform 0.6s ${tokens.easeLuxe};
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.6);

  ${LightboxRoot}.is-open & {
    opacity: 1;
    transform: none;
  }

  img,
  video {
    max-width: min(92vw, 1200px);
    max-height: 72svh;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
  }

  @media (max-width: 640px) {
    max-height: 58svh;
    margin-bottom: 12svh;

    img,
    video {
      max-height: 58svh;
    }
  }
`;

const LbCaption = styled.p`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  width: min(92vw, 44rem);
  font-size: 0.64rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${tokens.lilac};
  text-align: left;
  line-height: 1.7;
  flex-wrap: wrap;
  padding-inline: 0.75rem;
  overflow-wrap: anywhere;

  @media (max-width: 640px) {
    bottom: 1.05rem;
    font-size: 0.58rem;
    letter-spacing: 0.06em;
  }
`;

const LbCount = styled.span`
  font-family: ${tokens.serif};
  font-style: italic;
  font-size: 1.05rem;
  letter-spacing: 0.05em;
  color: ${tokens.ivory};
  white-space: nowrap;
  flex: none;
`;

const LbBtn = styled.button`
  position: absolute;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  margin: 0;
  border-radius: 50%;
  border: 1px solid rgba(245, 239, 242, 0.88);
  background: transparent;
  color: ${tokens.ivory};
  appearance: none;
  -webkit-appearance: none;
  box-shadow: none;
  transition: background 0.35s ${tokens.easeOut}, border-color 0.35s;

  &:hover,
  &:focus-visible {
    background: rgba(245, 239, 242, 0.1);
    border-color: ${tokens.ivory};
  }

  svg {
    width: 0.95rem;
    height: 0.95rem;
    display: block;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.35;
    stroke-linecap: round;
    stroke-linejoin: round;
    pointer-events: none;
  }

  &.lb-close {
    top: max(1.25rem, env(safe-area-inset-top));
    right: max(1.25rem, env(safe-area-inset-right));
  }
  &.lb-prev {
    left: max(1.25rem, env(safe-area-inset-left));
    top: 50%;
    transform: translateY(-50%);
  }
  &.lb-next {
    right: max(1.25rem, env(safe-area-inset-right));
    top: 50%;
    transform: translateY(-50%);
  }
`;

export function LightboxProvider({ children }: { children: ReactNode }) {
  const { lenis } = useLenisScroll();
  const [openState, setOpenState] = useState(false);
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [index, setIndex] = useState(0);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const open = useCallback((group: LightboxItem[], i: number) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setItems(group);
    setIndex(i);
    setOpenState(true);
    document.body.style.overflow = 'hidden';
    lenis?.stop();
  }, [lenis]);

  const close = useCallback(() => {
    setOpenState(false);
    document.body.style.overflow = '';
    lenis?.start();
    lastFocus.current?.focus();
  }, [lenis]);

  const show = useCallback(
    (i: number) => {
      if (!items.length) return;
      setIndex((i + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    if (!openState) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
      if (e.key === 'Tab') {
        const buttons = Array.from(
          document.querySelectorAll('.editorial-lb-btn'),
        ) as HTMLElement[];
        if (!buttons.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openState, close, show, index]);

  const current = items[index];
  const value = useMemo(() => ({ open }), [open]);

  return (
    <LightboxContext.Provider value={value}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <LightboxRoot
            className={openState ? 'is-open' : undefined}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 48) show(index + (dx < 0 ? 1 : -1));
              touchX.current = null;
            }}
          >
            <LightboxMedia>
              {current?.kind === 'video' ? (
                <video src={current.src} controls playsInline muted />
              ) : current ? (
                <img src={current.src} alt={current.caption} />
              ) : null}
            </LightboxMedia>
            <LbCaption>
              <LbCount>
                {items.length ? `${index + 1} / ${items.length}` : ''}
              </LbCount>
              <span>{current?.caption ?? ''}</span>
            </LbCaption>
            <LbBtn
              ref={closeRef}
              className="lb-close editorial-lb-btn"
              type="button"
              aria-label="Close gallery"
              onClick={close}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
              </svg>
            </LbBtn>
            <LbBtn
              className="lb-prev editorial-lb-btn"
              type="button"
              aria-label="Previous image"
              onClick={() => show(index - 1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.5 5.5L8 12l6.5 6.5" />
              </svg>
            </LbBtn>
            <LbBtn
              className="lb-next editorial-lb-btn"
              type="button"
              aria-label="Next image"
              onClick={() => show(index + 1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9.5 5.5L16 12l-6.5 6.5" />
              </svg>
            </LbBtn>
          </LightboxRoot>,
          document.body,
        )}
    </LightboxContext.Provider>
  );
}

export function useCountUp(
  end: number,
  enabled: boolean,
  duration = 1200,
): number {
  const [value, setValue] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!enabled) return;
    if (reduced) {
      setValue(end);
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - k, 4);
      setValue(Math.round(end * eased));
      if (k < 1) raf = requestAnimationFrame(step);
      else setValue(end);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, enabled, duration, reduced]);

  return value;
}

const CursorRing = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 390;
  pointer-events: none;
  border-radius: 50%;
  translate: -50% -50%;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(211, 191, 219, 0.6);
  display: none;
  place-items: center;
  transition:
    width 0.35s ${tokens.easeOut},
    height 0.35s ${tokens.easeOut},
    background 0.35s,
    border-color 0.35s;

  &.is-link {
    width: 64px;
    height: 64px;
    background: color-mix(in srgb, ${tokens.lilac} 88%, transparent);
    border-color: transparent;

    .cursor-label {
      opacity: 1;
    }
  }

  .cursor-label {
    font-size: 0.52rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: ${tokens.ink};
    opacity: 0;
    transition: opacity 0.25s;
  }

  @media (hover: hover) and (pointer: fine) {
    body.has-cursor & {
      display: grid;
    }
  }
`;

const CursorDot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 390;
  pointer-events: none;
  border-radius: 50%;
  translate: -50% -50%;
  width: 5px;
  height: 5px;
  background: ${tokens.lilac};
  display: none;

  @media (hover: hover) and (pointer: fine) {
    body.has-cursor & {
      display: block;
    }
  }
`;

export function CustomCursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine || reduced) {
      document.body.classList.remove('has-cursor');
      return;
    }
    document.body.classList.add('has-cursor');
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.translate = `${mx}px ${my}px`;
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.translate = `${rx}px ${ry}px`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest?.('a,button');
      const gallery = link?.closest?.('[data-gallery]');
      if (!ringRef.current) return;
      ringRef.current.classList.toggle('is-link', Boolean(gallery));
      if (link && !gallery) {
        ringRef.current.style.borderColor = 'transparent';
        ringRef.current.style.background = 'rgba(211,191,219,.25)';
      } else if (!gallery) {
        ringRef.current.style.borderColor = '';
        ringRef.current.style.background = '';
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.body.classList.remove('has-cursor');
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return createPortal(
    <>
      <CursorRing ref={ringRef}>
        <span className="cursor-label">View</span>
      </CursorRing>
      <CursorDot ref={dotRef} />
    </>,
    document.body,
  );
}

export function useParallax(factor = 0.1) {
  const ref = useRef<HTMLImageElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const img = ref.current;
    if (!img || reduced) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const parent = img.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const delta = (r.top + r.height / 2 - window.innerHeight / 2) * factor;
      img.style.transform = `translateY(${(-delta).toFixed(1)}px)`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, [factor, reduced]);

  return ref;
}

export function useTouchColorReveal(selector: string) {
  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches) return;
    const els = Array.from(document.querySelectorAll(selector));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          en.target.classList.toggle('in-color', en.isIntersecting);
        });
      },
      { rootMargin: '-32% 0px -32% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
}

export { riseIn };
