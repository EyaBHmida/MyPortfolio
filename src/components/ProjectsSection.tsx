import { useState } from 'react';
import styled from 'styled-components';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { theme } from '../styles/theme';
import content from '../data/content.json';

const ProjectsContainer = styled.section`
  min-height: 100vh;
  padding: ${theme.spacing['5xl']} ${theme.spacing.xl};
  background: ${theme.colors.surface};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['3xl']} ${theme.spacing.lg};
  }
`;

const ProjectsContent = styled.div`
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

const ProjectsGrid = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['2xl']};
`;

const ProjectCard = styled(motion.div)`
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  overflow: hidden;
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  
  &:hover {
    border-color: ${theme.colors.accentLight};
    box-shadow: ${theme.shadows.glow};
  }
`;

const ProjectHeader = styled.div`
  padding: ${theme.spacing['2xl']};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const ProjectInfo = styled.div`
  flex: 1;
`;

const ProjectTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.accent};
  margin-bottom: ${theme.spacing.sm};
`;

const ProjectSubtitle = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.accentLight};
  font-weight: ${theme.fontWeights.medium};
`;

const ProjectRole = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textMuted};
  margin-top: ${theme.spacing.sm};
`;

const ExpandButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.textMuted};
  font-size: ${theme.fontSizes.sm};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    border-color: ${theme.colors.accentLight};
    color: ${theme.colors.accentLight};
  }
`;

const ProjectDetails = styled(motion.div)`
  padding: 0 ${theme.spacing['2xl']} ${theme.spacing['2xl']};
  border-top: 1px solid ${theme.colors.border};
`;

const DetailSection = styled.div`
  padding-top: ${theme.spacing.xl};
  
  &:not(:last-child) {
    padding-bottom: ${theme.spacing.xl};
    border-bottom: 1px solid ${theme.colors.border};
  }
`;

const DetailTitle = styled.h4`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.accentLight};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: ${theme.spacing.md};
`;

const DetailText = styled.p`
  font-size: ${theme.fontSizes.md};
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
`;

const DetailList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const DetailItem = styled.li`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textSecondary};
  padding-left: ${theme.spacing.lg};
  position: relative;
  
  &::before {
    content: '\\2192';
    position: absolute;
    left: 0;
    color: ${theme.colors.accentLight};
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
`;

const ResultItem = styled.div`
  padding: ${theme.spacing.lg};
  background: ${theme.colors.accentMuted};
  border-left: 2px solid ${theme.colors.accentLight};
`;

const ResultText = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.accent};
  font-weight: ${theme.fontWeights.medium};
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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const { projects } = content;

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <ProjectsContainer id="projects" ref={ref}>
      <ProjectsContent>
        <SectionHeader>
          <SectionLabel
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Featured Work
          </SectionLabel>
          
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Case <span>Studies</span>
          </SectionTitle>
        </SectionHeader>
        
        <ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              variants={cardVariants}
              layout
            >
              <ProjectHeader onClick={() => toggleProject(project.id)}>
                <ProjectInfo>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectSubtitle>{project.subtitle}</ProjectSubtitle>
                  <ProjectRole>{project.role}</ProjectRole>
                </ProjectInfo>
                
                <ExpandButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {expandedProject === project.id ? 'Close' : 'View Details'}
                  <motion.span
                    animate={{ rotate: expandedProject === project.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    &#8595;
                  </motion.span>
                </ExpandButton>
              </ProjectHeader>
              
              <AnimatePresence>
                {expandedProject === project.id && (
                  <ProjectDetails
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <DetailSection>
                      <DetailTitle>Challenge</DetailTitle>
                      <DetailText>{project.challenge}</DetailText>
                    </DetailSection>
                    
                    <DetailSection>
                      <DetailTitle>Approach</DetailTitle>
                      <DetailList>
                        {project.approach.map((item, index) => (
                          <DetailItem key={index}>{item}</DetailItem>
                        ))}
                      </DetailList>
                    </DetailSection>
                    
                    <DetailSection>
                      <DetailTitle>Results</DetailTitle>
                      <ResultsGrid>
                        {project.results.map((result, index) => (
                          <ResultItem key={index}>
                            <ResultText>{result}</ResultText>
                          </ResultItem>
                        ))}
                      </ResultsGrid>
                    </DetailSection>
                  </ProjectDetails>
                )}
              </AnimatePresence>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsContent>
    </ProjectsContainer>
  );
};
