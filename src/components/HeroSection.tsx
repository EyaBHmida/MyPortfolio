import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';
import content from '../data/content.json';

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${theme.spacing['4xl']} ${theme.spacing.xl};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at 50% 0%,
      rgba(201, 169, 98, 0.08) 0%,
      transparent 50%
    );
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  z-index: 1;
`;

const Greeting = styled(motion.p)`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.accent};
  font-weight: ${theme.fontWeights.medium};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.lg};
`;

const Name = styled(motion.h1)`
  font-size: ${theme.fontSizes['7xl']};
  font-weight: ${theme.fontWeights.light};
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(135deg, ${theme.colors.text} 0%, ${theme.colors.textSecondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: ${theme.fontSizes['5xl']};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['4xl']};
  }
`;

const RoleCarousel = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${theme.spacing['2xl']};
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.md}) {
    height: 50px;
  }
`;

const Role = styled(motion.span)`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['3xl']};
  font-style: italic;
  color: ${theme.colors.accent};
  position: absolute;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['2xl']};
  }
`;

const Tagline = styled(motion.p)`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.textSecondary};
  line-height: 1.8;
  max-width: 700px;
  margin: 0 auto ${theme.spacing['3xl']};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
  }
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
  background: transparent;
  border: 1px solid ${theme.colors.accent};
  color: ${theme.colors.accent};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: ${theme.colors.accent};
    transition: width ${theme.transitions.normal};
    z-index: -1;
  }
  
  &:hover {
    color: ${theme.colors.background};
    
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
`;

const ScrollLine = styled(motion.div)`
  width: 1px;
  height: 60px;
  background: linear-gradient(
    to bottom,
    ${theme.colors.accent},
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
      <HeroContent>
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
          {personal.name}
        </Name>
        
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
          <span>→</span>
        </CTAButton>
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

