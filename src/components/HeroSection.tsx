import { useState, useEffect, lazy, Suspense } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';
import content from '../data/content.json';

// Lazy load the 3D scene for better performance
const HeroScene = lazy(() => import('./3d/HeroScene'));

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: ${theme.colors.background};
`;

// z-index 1: Transparent overlay with Soft Plum tint (above 3D shapes)
const TransparentOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(180, 155, 164, 0.15);
  z-index: 1;
  pointer-events: none;
`;

// z-index 2: Background image
const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 45%;
  height: 100%;
  background-image: url('/background-pic.jpg');
  background-size: cover;
  background-position: center left;
  opacity: 0.25;
  filter: grayscale(100%);
  z-index: 2;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      ${theme.colors.background} 0%,
      transparent 40%
    );
  }
  
  @media (max-width: ${theme.breakpoints.lg}) {
    width: 100%;
    opacity: 0.15;
  }
`;

// z-index 3: Content (text + foreground picture)
const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing['4xl']} ${theme.spacing.xl};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['4xl']};
  align-items: center;
  position: relative;
  z-index: 3;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: ${theme.spacing['2xl']};
  }
`;

const TextContent = styled.div`
  order: 2;
  text-align: right;
  position: relative;
  padding: ${theme.spacing['2xl']};
  border-radius: 20px;
  background: rgba(245, 240, 245, 0.85);
  backdrop-filter: blur(8px);
  
  @media (max-width: ${theme.breakpoints.lg}) {
    order: 2;
    text-align: center;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  order: 1;
  z-index: 4;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    order: 1;
  }
`;

const MainImage = styled(motion.img)`
  width: 100%;
  max-width: 450px;
  height: auto;
  object-fit: cover;
  filter: grayscale(20%);
  
  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 300px;
  }
`;

const ImageFrame = styled.div`
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100%;
  max-width: 450px;
  height: 100%;
  border: 2px solid ${theme.colors.accentLight};
  z-index: -1;
  
  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 300px;
    top: -15px;
    left: -15px;
  }
`;

const Greeting = styled(motion.p)`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.accentLight};
  font-weight: ${theme.fontWeights.medium};
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.md};
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
`;

const Name = styled(motion.h1)`
  font-family: 'Lora', ${theme.fonts.name};
  font-size: ${theme.fontSizes['5xl']};
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.accent};
  margin-bottom: ${theme.spacing.sm};
  letter-spacing: 0.05em;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.6);
  
  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: ${theme.fontSizes['4xl']};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

const Title = styled(motion.h2)`
  font-family: 'Robert Leuschke', ${theme.fonts.heading};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.accentLight};
  margin-bottom: ${theme.spacing.xl};
  font-style: italic;
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.5);
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.xl};
  }
`;

const RoleCarousel = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: ${theme.spacing.xl};
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    justify-content: center;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    height: 35px;
  }
`;

const Role = styled(motion.span)`
  font-family: 'Robert Leuschke', ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  font-style: italic;
  color: ${theme.colors.accentLighter};
  position: absolute;
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.5);
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
  }
`;

const Tagline = styled(motion.p)`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textSecondary};
  line-height: 1.9;
  max-width: 500px;
  margin-bottom: ${theme.spacing['2xl']};
  margin-left: auto;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.4);
  
  @media (max-width: ${theme.breakpoints.lg}) {
    margin: 0 auto ${theme.spacing['2xl']};
  }
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
  background: ${theme.colors.accent};
  color: ${theme.colors.surface};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all ${theme.transitions.normal};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: ${theme.colors.accentLight};
    transition: width ${theme.transitions.normal};
    z-index: -1;
  }
  
  &:hover {
    color: ${theme.colors.surface};
    
    &::before {
      width: 100%;
    }
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${theme.spacing['2xl']};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textMuted};
  font-size: ${theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  z-index: 5;
`;

const ScrollLine = styled(motion.div)`
  width: 1px;
  height: 60px;
  background: linear-gradient(
    to bottom,
    ${theme.colors.accentLight},
    transparent
  );
`;

export const HeroSection = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const { personal } = content;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % personal.roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [personal.roles.length]);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroContainer id="hero">
      {/* z-index 0: 3D Scene (bottom layer) */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
      
      {/* z-index 1: Transparent Soft Plum overlay */}
      <TransparentOverlay />
      
      {/* z-index 2: Background Image */}
      <BackgroundImage />
      
      {/* z-index 3: Content (text + foreground picture) */}
      <HeroContent>
        <TextContent>
          <Greeting
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hello, I'm
          </Greeting>
          
          <Name
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {personal.fullName}
          </Name>
          
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {personal.title}
          </Title>
          
          <RoleCarousel>
            <AnimatePresence mode="wait">
              <Role
                key={currentRoleIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                {personal.roles[currentRoleIndex]}
              </Role>
            </AnimatePresence>
          </RoleCarousel>
          
          <Tagline
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {personal.tagline}
          </Tagline>
          
          <CTAButton
            onClick={scrollToContact}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {content.contact.cta}
            <span>&#8594;</span>
          </CTAButton>
        </TextContent>
        
        <ImageWrapper
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <MainImage 
            src="/main-pic.jpg" 
            alt={personal.fullName}
          />
          <ImageFrame />
        </ImageWrapper>
      </HeroContent>
      
      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span>Scroll</span>
        <ScrollLine
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </ScrollIndicator>
    </HeroContainer>
  );
};
