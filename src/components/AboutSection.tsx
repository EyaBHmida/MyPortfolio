import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { theme } from '../styles/theme';
import content from '../data/content.json';

const AboutContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: ${theme.spacing['5xl']} ${theme.spacing.xl};
  background: ${theme.colors.backgroundAlt};
  position: relative;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['3xl']} ${theme.spacing.lg};
  }
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['4xl']};
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['2xl']};
  }
`;

const AboutLeft = styled.div``;

const SectionLabel = styled(motion.span)`
  display: inline-block;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: ${theme.spacing.lg};
  font-weight: ${theme.fontWeights.medium};
`;

const SectionTitle = styled(motion.h2)`
  margin-bottom: ${theme.spacing.xl};
  
  span {
    color: ${theme.colors.accent};
  }
`;

const Description = styled(motion.p)`
  margin-bottom: ${theme.spacing.xl};
  line-height: 1.9;
`;

const Philosophy = styled(motion.blockquote)`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['2xl']};
  font-style: italic;
  color: ${theme.colors.text};
  padding-left: ${theme.spacing.xl};
  border-left: 2px solid ${theme.colors.accent};
  line-height: 1.6;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.xl};
  }
`;

const AboutRight = styled.div``;

const ExpertiseTitle = styled(motion.h3)`
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.text};
`;

const ExpertiseList = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ExpertiseItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textSecondary};
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
  
  &::before {
    content: '◆';
    color: ${theme.colors.accent};
    font-size: ${theme.fontSizes.xs};
    margin-top: 4px;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { about } = content;

  return (
    <AboutContainer id="about" ref={ref}>
      <AboutContent>
        <AboutLeft>
          <SectionLabel
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            About Me
          </SectionLabel>
          
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Crafting <span>Stories</span> That Connect Brands With People
          </SectionTitle>
          
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {about.description}
          </Description>
          
          <Philosophy
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            "{about.philosophy}"
          </Philosophy>
        </AboutLeft>
        
        <AboutRight>
          <ExpertiseTitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Expertise
          </ExpertiseTitle>
          
          <ExpertiseList
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {about.expertise.map((skill, index) => (
              <ExpertiseItem
                key={index}
                variants={itemVariants}
              >
                {skill}
              </ExpertiseItem>
            ))}
          </ExpertiseList>
        </AboutRight>
      </AboutContent>
    </AboutContainer>
  );
};

