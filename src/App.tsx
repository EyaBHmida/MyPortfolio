import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WorkSection } from './components/WorkSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ToolsSection } from './components/ToolsSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WorkSection />
        <ProjectsSection />
        <ToolsSection />
        <ProcessSection />
        <ContactSection />
      </main>
    </ThemeProvider>
  );
}

export default App;
