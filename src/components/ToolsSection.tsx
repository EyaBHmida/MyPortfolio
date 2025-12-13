import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { theme } from '../styles/theme';

const ToolsContainer = styled.section`
  padding: ${theme.spacing['5xl']} ${theme.spacing.xl};
  background: ${theme.colors.surface};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['3xl']} ${theme.spacing.lg};
  }
`;

const ToolsContent = styled.div`
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

const SectionDescription = styled(motion.p)`
  max-width: 600px;
  margin: ${theme.spacing.xl} auto 0;
  text-align: center;
  color: ${theme.colors.textSecondary};
`;

const ToolsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.lg};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ToolCard = styled(motion.div)`
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
  transition: all ${theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ToolIcon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 60px;
    height: 60px;
  }
`;

const ToolName = styled.h4`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.accent};
  text-align: center;
  font-weight: ${theme.fontWeights.medium};
`;

const ToolCategory = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.accentLight};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

// Tools data with identified names and categories
const tools = [
  { id: 1, name: 'Canva', category: 'Design', image: '/Tools/1.png' },
  { id: 2, name: 'Figma', category: 'Design', image: '/Tools/2.png' },
  { id: 3, name: 'Adobe Photoshop', category: 'Design', image: '/Tools/3.png' },
  { id: 4, name: 'Adobe Illustrator', category: 'Design', image: '/Tools/4.png' },
  { id: 5, name: 'CapCut', category: 'Video Editing', image: '/Tools/5.png' },
  { id: 6, name: 'Meta', category: 'Social Media', image: '/Tools/6.png' },
  { id: 7, name: 'Google Ads', category: 'Advertising', image: '/Tools/7.png' },
  { id: 8, name: 'Google Analytics', category: 'Analytics', image: '/Tools/8.png' },
  { id: 9, name: 'TikTok for Business', category: 'Social Media', image: '/Tools/11.png' },
  { id: 10, name: 'Notion', category: 'Project Management', image: '/Tools/9.png' },
  { id: 11, name: 'Trello', category: 'Project Management', image: '/Tools/10.png' },
  { id: 12, name: 'WordPress', category: 'Content Management', image: '/Tools/12.png' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export const ToolsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <ToolsContainer id="tools" ref={ref}>
      <ToolsContent>
        <SectionHeader>
          <SectionLabel
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Tech Stack
          </SectionLabel>
          
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Tools I <span>Use</span>
          </SectionTitle>
          
          <SectionDescription
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The platforms and software I leverage to create impactful marketing strategies and stunning content.
          </SectionDescription>
        </SectionHeader>
        
        <ToolsGrid
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <ToolIcon>
                <img src={tool.image} alt={tool.name} />
              </ToolIcon>
              <ToolName>{tool.name}</ToolName>
              <ToolCategory>{tool.category}</ToolCategory>
            </ToolCard>
          ))}
        </ToolsGrid>
      </ToolsContent>
    </ToolsContainer>
  );
};



