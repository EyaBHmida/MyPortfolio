export const tokens = {
  noir: '#150507',
  bordeaux: '#2E0C11',
  bordeaux2: '#3A1017',
  wine: '#4A1018',
  crimson: '#8E2136',
  lilac: '#D3BFDB',
  lilacDeep: '#AE93BE',
  ivory: '#F5EFF2',
  ivory2: '#EFE6EC',
  ink: '#2A0D13',
  serif: "'Cormorant Garamond', Didot, 'Bodoni MT', 'Times New Roman', serif",
  sans: "'Jost', 'Century Gothic', 'Avenir Next', system-ui, sans-serif",
  easeOut: 'cubic-bezier(.19,1,.22,1)',
  easeLuxe: 'cubic-bezier(.65,.05,0,1)',
  dur: '1.1s',
  gutter: 'clamp(1.25rem, 4vw, 4.5rem)',
  sectionY: 'clamp(4rem, 8vw, 7.5rem)',
  headerH: '5.25rem',
} as const;

export type Tokens = typeof tokens;
