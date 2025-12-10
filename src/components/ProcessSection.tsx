import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { theme } from '../styles/theme';
import content from '../data/content.json';

const ProcessContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: ${theme.spacing['5xl']} ${theme.spacing.xl};
  position: relative;
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['3xl']} ${theme.spacing.lg};
  }
`;

const ProcessContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['4xl']};
`;

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
  span {
    color: ${theme.colors.accent};
  }
`;

const Timeline = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
  
  &::before {
    content: '';
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(
      to bottom,
      transparent,
      ${theme.colors.accent},
      ${theme.colors.accent},
      transparent
    );
    
    @media (max-width: ${theme.breakpoints.md}) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.xl};
  position: relative;
  
  @media (max-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.lg};
  }
`;

const StepNumber = styled(motion.div)`
  width: 60px;
  height: 60px;
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.surface};
  border: 2px solid ${theme.colors.accent};
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.accent};
  position: relative;
  z-index: 1;
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 40px;
    height: 40px;
    min-width: 40px;
    font-size: ${theme.fontSizes.lg};
  }
`;

const StepContent = styled.div`
  flex: 1;
  padding: ${theme.spacing.md} 0;
`;

const StepTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
`;

const StepDescription = styled.p`
  font-size: ${theme.fontSizes.md};
  line-height: 1.7;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { process } = content;

  return (
    <ProcessContainer id="process" ref={ref}>
      <ProcessContent>
        <SectionHeader>
          <SectionLabel
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            My Approach
          </SectionLabel>
          
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            How I <span>Work</span>
          </SectionTitle>
        </SectionHeader>
        
        <Timeline
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {process.map((step) => (
            <TimelineItem key={step.step} variants={itemVariants}>
              <StepNumber
                whileHover={{ scale: 1.1, borderColor: theme.colors.accentHover }}
                transition={{ duration: 0.3 }}
              >
                {step.step}
              </StepNumber>
              <StepContent>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepContent>
            </TimelineItem>
          ))}
        </Timeline>
      </ProcessContent>
    </ProcessContainer>
  );
};

