import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { WorkSection } from './components/WorkSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { ToolsSection } from './components/ToolsSection';
import { ContactSection } from './components/ContactSection';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ProjectsSection />
        <ServicesSection />
        <ToolsSection />
        <ContactSection />
      </main>
    </ThemeProvider>
  );
}

export default App;
