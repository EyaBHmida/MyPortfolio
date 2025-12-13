import { useState } from 'react';
import styled from 'styled-components';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { theme } from '../styles/theme';

const WorkContainer = styled.section`
  min-height: 100vh;
  padding: ${theme.spacing['5xl']} ${theme.spacing.xl};
  background: ${theme.colors.background};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['3xl']} ${theme.spacing.lg};
  }
`;

const WorkContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['4xl']};
`;

const SectionLabel = styled(motion.span)`
  display: inline-block;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.accentLight};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: ${theme.spacing.lg};
  font-weight: ${theme.fontWeights.medium};
`;

const SectionTitle = styled(motion.h2)`
  color: ${theme.colors.accent};
  
  span {
    color: ${theme.colors.accentLight};
  }
`;

const UniformGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.sm};
  }
`;

const GridItem = styled(motion.div)<{ $isVideo?: boolean }>`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 8px;
  background: ${theme.colors.surface};
  box-shadow: 0 2px 8px rgba(70, 23, 64, 0.08);
  aspect-ratio: 1 / 1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to top,
      rgba(70, 23, 64, 0.6) 0%,
      transparent 60%
    );
    opacity: 0;
    transition: opacity ${theme.transitions.normal};
    border-radius: 8px;
  }
  
  &:hover::after {
    opacity: 1;
  }
  
  &:hover {
    box-shadow: 0 8px 24px rgba(70, 23, 64, 0.15);
  }
`;

const GridImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${theme.transitions.slow};
  
  ${GridItem}:hover & {
    transform: scale(1.08);
  }
`;

const GridVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(70, 23, 64, 0.2);
  transition: transform ${theme.transitions.normal};
  
  ${GridItem}:hover & {
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 14px solid ${theme.colors.accent};
    border-top: 9px solid transparent;
    border-bottom: 9px solid transparent;
    margin-left: 3px;
  }
`;

const Lightbox = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
`;

const LightboxContent = styled(motion.div)`
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
`;

const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
`;

const LightboxVideo = styled.video`
  max-width: 100%;
  max-height: 85vh;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.xl};
  right: ${theme.spacing.xl};
  font-size: ${theme.fontSizes['3xl']};
  color: white;
  z-index: 2001;
  
  &:hover {
    color: ${theme.colors.accentLight};
  }
`;

const NavButton = styled.button<{ $direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => $direction === 'prev' ? 'left: 20px;' : 'right: 20px;'}
  transform: translateY(-50%);
  font-size: ${theme.fontSizes['3xl']};
  color: white;
  padding: ${theme.spacing.md};
  z-index: 2001;
  
  &:hover {
    color: ${theme.colors.accentLight};
  }
`;

// Work items - images and videos from the Work folder (ordered by filename)
const workItems = [
  { id: 1, src: '/Work/1.jpg', type: 'image' },
  { id: 2, src: '/Work/2.jpg', type: 'image' },
  { id: 3, src: '/Work/3.jpg', type: 'image' },
  { id: 4, src: '/Work/4.jpg', type: 'image' },
  { id: 5, src: '/Work/5.jpg', type: 'image' },
  { id: 6, src: '/Work/6.jpg', type: 'image' },
  { id: 7, src: '/Work/7.jpg', type: 'image' },
  { id: 8, src: '/Work/8.jpg', type: 'image' },
  { id: 9, src: '/Work/9.jpg', type: 'image' },
  { id: 10, src: '/Work/10.jpg', type: 'image' },
  { id: 11, src: '/Work/11.jpg', type: 'image' },
  { id: 12, src: '/Work/12.jpg', type: 'image' },
  { id: 13, src: '/Work/13.jpg', type: 'image' },
  { id: 14, src: '/Work/14.jpg', type: 'image' },
  { id: 15, src: '/Work/15.jpg', type: 'image' },
  { id: 16, src: '/Work/16.mp4', type: 'video' },
  { id: 17, src: '/Work/17.mp4', type: 'video' },
  { id: 18, src: '/Work/18.jpg', type: 'image' },
  { id: 19, src: '/Work/19.jpg', type: 'image' },
  { id: 20, src: '/Work/20.jpg', type: 'image' },
  { id: 21, src: '/Work/21.mp4', type: 'video' },
  { id: 22, src: '/Work/22.jpg', type: 'image' },
  { id: 23, src: '/Work/23.jpg', type: 'image' },
  { id: 24, src: '/Work/24.jpg', type: 'image' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = 'auto';
  };

  const goToPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? workItems.length - 1 : lightboxIndex - 1);
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === workItems.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <WorkContainer id="work" ref={ref}>
      <WorkContent>
        <SectionHeader>
          <SectionLabel
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Portfolio
          </SectionLabel>
          
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            My <span>Work</span>
          </SectionTitle>
        </SectionHeader>
        
        <UniformGrid
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {workItems.map((item, index) => (
            <GridItem
              key={item.id}
              variants={itemVariants}
              $isVideo={item.type === 'video'}
              onClick={() => openLightbox(index)}
              whileHover={{ y: -5 }}
            >
              {item.type === 'video' ? (
                <>
                  <GridVideo src={item.src} muted />
                  <PlayIcon />
                </>
              ) : (
                <GridImage src={item.src} alt={`Work sample ${item.id}`} loading="lazy" />
              )}
            </GridItem>
          ))}
        </UniformGrid>
      </WorkContent>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <CloseButton onClick={closeLightbox}>&#10005;</CloseButton>
            <NavButton $direction="prev" onClick={(e) => { e.stopPropagation(); goToPrev(); }}>
              &#8592;
            </NavButton>
            <LightboxContent
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              {workItems[lightboxIndex].type === 'video' ? (
                <LightboxVideo src={workItems[lightboxIndex].src} controls autoPlay />
              ) : (
                <LightboxImage src={workItems[lightboxIndex].src} alt="Work sample" />
              )}
            </LightboxContent>
            <NavButton $direction="next" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
              &#8594;
            </NavButton>
          </Lightbox>
        )}
      </AnimatePresence>
    </WorkContainer>
  );
};

