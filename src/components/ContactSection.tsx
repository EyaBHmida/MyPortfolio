import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { theme } from '../styles/theme';
import content from '../data/content.json';

const ContactContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['5xl']} ${theme.spacing.xl};
  background: ${theme.colors.surface};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: radial-gradient(
      ellipse at 50% 100%,
      rgba(183, 138, 190, 0.1) 0%,
      transparent 50%
    );
    pointer-events: none;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['3xl']} ${theme.spacing.lg};
  }
`;

const ContactContent = styled.div`
  max-width: 800px;
  text-align: center;
  z-index: 1;
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
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.accent};
  
  span {
    color: ${theme.colors.accentLight};
  }
`;

const Description = styled(motion.p)`
  font-size: ${theme.fontSizes.xl};
  line-height: 1.8;
  margin-bottom: ${theme.spacing['3xl']};
  color: ${theme.colors.textSecondary};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
  }
`;

const ContactLinks = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['3xl']};
`;

const ContactLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textMuted};
  transition: all ${theme.transitions.normal};
  
  span {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.accentLight};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: ${theme.fontWeights.medium};
    min-width: 80px;
  }
  
  &:hover {
    color: ${theme.colors.accent};
    transform: translateX(10px);
  }
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl} ${theme.spacing['3xl']};
  background: ${theme.colors.accent};
  color: ${theme.colors.surface};
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeights.semibold};
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
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadows.glow};
    color: ${theme.colors.surface};
    background: ${theme.colors.accentLight};
    
    &::before {
      left: 100%;
    }
  }
`;

const Footer = styled(motion.footer)`
  position: absolute;
  bottom: ${theme.spacing.xl};
  left: 0;
  right: 0;
  text-align: center;
`;

const FooterText = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textMuted};
  
  span {
    color: ${theme.colors.accentLight};
  }
`;

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { personal, contact: contactContent } = content;

  return (
    <ContactContainer id="contact" ref={ref}>
      <ContactContent>
        <SectionLabel
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </SectionLabel>
        
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {contactContent.heading.split(' ')[0]}{' '}
          <span>{contactContent.heading.split(' ').slice(1).join(' ')}</span>
        </SectionTitle>
        
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {contactContent.description}
        </Description>
        
        <ContactLinks
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ContactLink
            href={`mailto:${personal.email}`}
            whileHover={{ x: 10 }}
          >
            <span>Email</span>
            {personal.email}
          </ContactLink>
          
          <ContactLink
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 10 }}
          >
            <span>LinkedIn</span>
            View Profile
          </ContactLink>
        </ContactLinks>
        
        <CTAButton
          href={`mailto:${personal.email}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {contactContent.cta}
          <span>&#8594;</span>
        </CTAButton>
      </ContactContent>
      
      <Footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <FooterText>
          &copy; {new Date().getFullYear()} <span>{personal.fullName}</span>. All rights reserved.
        </FooterText>
      </Footer>
    </ContactContainer>
  );
};
