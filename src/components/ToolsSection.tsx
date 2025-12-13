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
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
  transition: all ${theme.transitions.normal};
  
  &:hover {
    border-color: ${theme.colors.accentLight};
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.glow};
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

// Tools data with identified names
const tools = [
  {
    id: 1,
    name: 'Google Analytics',
    category: 'Analytics',
    image: '/tools/WhatsApp Image 2025-12-11 à 15.19.47_8c56016f.jpg',
  },
  {
    id: 2,
    name: 'Figma',
    category: 'Design',
    image: '/tools/WhatsApp Image 2025-12-11 à 15.19.01_994e0fd6.jpg',
  },
  {
    id: 3,
    name: 'Adobe Photoshop',
    category: 'Design',
    image: '/tools/WhatsApp Image 2025-12-11 à 15.19.01_c8ab460e.jpg',
  },
  {
    id: 4,
    name: 'CapCut',
    category: 'Video Editing',
    image: '/tools/WhatsApp Image 2025-12-11 à 15.19.01_52aa88f8.jpg',
  },
  {
    id: 5,
    name: 'Trello',
    category: 'Project Management',
    image: '/tools/WhatsApp Image 2025-12-11 à 15.19.00_f74aac3f.jpg',
  },
  {
    id: 6,
    name: 'Notion',
    category: 'Project Management',
    image: '/tools/WhatsApp Image 2025-12-11 à 15.19.00_5c4cf39e.jpg',
  },
  {
    id: 7,
    name: 'WordPress',
    category: 'Content Management',
    image: '/tools/WhatsApp Image 2025-12-11 à 15.19.00_10201633.jpg',
  },
  {
    id: 8,
    name: 'Google Ads',
    category: 'Advertising',
    image: '/tools/WhatsApp Image 2025-12-11 à 15.19.00_938052de.jpg',
  },
  {
    id: 9,
    name: 'Canva',
    category: 'Design',
    image: '/tools/WhatsApp Image 2025-12-11 à 15.19.00_33841380.jpg',
  },
  {
    id: 10,
    name: 'Meta Business Suite',
    category: 'Social Media',
    image: '/tools/WhatsApp Image 2025-12-11 à 15.19.00_52cb8404.jpg',
  },
  {
    id: 11,
    name: 'TikTok for Business',
    category: 'Social Media',
    image: '/tools/WhatsApp Image 2025-12-11 à 15.19.00_39a9200f.jpg',
  },
  {
    id: 12,
    name: 'LinkedIn Ads',
    category: 'Advertising',
    image: '/tools/WhatsApp Image 2025-12-11 à 15.19.00_1791ecd2.jpg',
  },
  {
    id: 13,
    name: 'Meta',
    category: 'Social Media',
    image: '/tools/WhatsApp Image 2025-12-11 à 15.19.00_b21a2785.jpg',
  },
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
              whileHover={{ scale: 1.02 }}
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



