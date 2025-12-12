import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { theme } from '../styles/theme';
import content from '../data/content.json';

const ServicesContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: ${theme.spacing['5xl']} ${theme.spacing.xl};
  background: ${theme.colors.background};
  position: relative;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['3xl']} ${theme.spacing.lg};
  }
`;

const ServicesContent = styled.div`
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

const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  padding: ${theme.spacing['2xl']};
  position: relative;
  overflow: hidden;
  transition: all ${theme.transitions.normal};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${theme.colors.gradientPrimary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${theme.transitions.normal};
  }
  
  &:hover {
    border-color: ${theme.colors.accentLight};
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.glow};
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const ServiceIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.accentLight};
  font-family: 'Robert Leuschke', ${theme.fonts.heading};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.light};
  border: 1px solid ${theme.colors.accentLight};
`;

const ServiceTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.accent};
`;

const ServiceDescription = styled.p`
  font-size: ${theme.fontSizes.md};
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
`;

const getIcon = (iconName: string) => {
  const icons: { [key: string]: string } = {
    calendar: '01',
    users: '02',
    palette: '03',
    trending: '04',
  };
  return icons[iconName] || '00';
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { services } = content;

  return (
    <ServicesContainer id="services" ref={ref}>
      <ServicesContent>
        <SectionHeader>
          <SectionLabel
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            What I Offer
          </SectionLabel>
          
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Services & <span>Expertise</span>
          </SectionTitle>
        </SectionHeader>
        
        <ServicesGrid
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
            >
              <ServiceIcon>{getIcon(service.icon)}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ServicesContent>
    </ServicesContainer>
  );
};
