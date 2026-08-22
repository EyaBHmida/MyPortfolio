import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import content from '../data/content.json';

const HeadingBand = styled.section`
  background: ${theme.colors.paper};
  color: ${theme.colors.black};
  text-align: center;
  padding: 88px 24px;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 56px 20px;
  }

  h2 {
    font-family: ${theme.fonts.serif};
    font-size: clamp(40px, 12vw, 96px);
    letter-spacing: -0.04em;
  }
`;

const Gallery = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: ${theme.colors.black};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Cell = styled.button`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  display: block;
  width: 100%;
  padding: 0;
`;

const MediaImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MediaVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Play = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 44px;
  height: 44px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid ${theme.colors.white};
  background: rgba(0,0,0,0.25);

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 54%;
    transform: translate(-50%, -50%);
    border-left: 12px solid ${theme.colors.white};
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
`;

const Clients = styled.section`
  background: ${theme.colors.blackSoft};
  color: ${theme.colors.white};
  padding: 88px 32px 72px;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 64px 20px 48px;
  }
`;

const ClientsTitle = styled.h2`
  font-family: ${theme.fonts.serif};
  font-style: italic;
  font-size: clamp(32px, 8vw, 72px);
  text-align: center;
  margin-bottom: 48px;
  overflow-wrap: anywhere;
`;

const LogoRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    > *:nth-child(5) {
      grid-column: 1 / -1;
      max-width: 50%;
      justify-self: center;
    }
  }
`;

const LogoTile = styled.div<{ $tile: string }>`
  background: ${({ $tile }) => $tile};
  aspect-ratio: 1.4 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
`;

const Logo = styled.img<{ $fit: string }>`
  width: 100%;
  height: 100%;
  object-fit: ${({ $fit }) => $fit};
`;

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.94);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: max(24px, env(safe-area-inset-top)) 16px max(24px, env(safe-area-inset-bottom));
`;

const LightboxMedia = styled.img`
  max-width: 90vw;
  max-height: 88vh;
  object-fit: contain;
`;

const LightboxVideo = styled.video`
  max-width: 90vw;
  max-height: 88vh;
`;

const Close = styled.button`
  position: absolute;
  top: max(16px, env(safe-area-inset-top));
  right: 16px;
  color: ${theme.colors.white};
  font-size: 32px;
  z-index: 2001;
  width: 44px;
  height: 44px;
`;

export const WorkSection = () => {
  const [active, setActive] = useState<number | null>(null);
  const items = content.workGallery;
  const open = active !== null ? items[active] : null;

  return (
    <>
      <HeadingBand id="work">
        <h2>My work</h2>
      </HeadingBand>

      <Gallery>
        {items.map((item, index) => (
          <Cell key={item.id} type="button" onClick={() => setActive(index)} aria-label={`Open work sample ${item.id}`}>
            {item.type === 'video' ? (
              <>
                <MediaVideo src={item.src} muted />
                <Play />
              </>
            ) : (
              <MediaImg src={item.src} alt="" />
            )}
          </Cell>
        ))}
      </Gallery>

      <Clients>
        <ClientsTitle>Clients I’ve created for</ClientsTitle>
        <LogoRow>
          {content.clients.map((client) => (
            <LogoTile key={client.name} $tile={client.tile}>
              <Logo src={client.logo} alt={client.name} $fit={client.fit} />
            </LogoTile>
          ))}
        </LogoRow>
      </Clients>

      {open && (
        <Lightbox onClick={() => setActive(null)}>
          <Close type="button" onClick={() => setActive(null)} aria-label="Close">×</Close>
          {open.type === 'video' ? (
            <LightboxVideo src={open.src} controls autoPlay onClick={(e) => e.stopPropagation()} />
          ) : (
            <LightboxMedia src={open.src} alt="" onClick={(e) => e.stopPropagation()} />
          )}
        </Lightbox>
      )}
    </>
  );
};
