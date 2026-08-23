import content from '../data/content.json';
import {
  AboutSectionView,
  CampaignsSection,
  ContactSectionView,
  EditorialFooter,
  EditorialHeader,
  EditorialHero,
  EditorialShell,
  EditorialWork,
  PartnersSection,
  Preloader,
  StageSectionView,
  WhatsAppFloat,
  type SecondPageData,
} from './second/sections.tsx';

const data = content as typeof content & { editorial: SecondPageData['editorial'] };

export const SecondPage = () => {
  const { editorial, personal, about, clients, hero, projects } = data;

  return (
    <EditorialShell>
      <Preloader
        signatureTopSrc="/eya-signature-eya.png"
        signatureBottomSrc="/eya-signature-ben-hmida.png"
        word="Marketing · Content · Partnerships"
      />
      <EditorialHeader
        nav={editorial.nav}
        cta={editorial.cta}
        signatureSrc="/eya-mark.svg"
        name={personal.fullName}
      />
      <main id="main">
        <EditorialHero
          images={hero.images}
          kicker={editorial.hero.kicker}
          lineBefore={editorial.hero.lineBefore}
          lineEm={editorial.hero.lineEm}
          lineAfter={editorial.hero.lineAfter}
          signatureSrc="/eya-signature.png"
        />
        <AboutSectionView
          editorial={editorial.about}
          about={about}
          personal={personal}
          portraitSrc="/cv-photo.jpg"
        />
        <EditorialWork projects={projects} />
        <CampaignsSection data={editorial.campaigns} />
        <StageSectionView data={editorial.stage} />
        <PartnersSection data={editorial.partners} clients={clients} />
        <ContactSectionView data={editorial.contactSection} personal={personal} />
      </main>
      <EditorialFooter
        nav={editorial.nav}
        signatureSrc="/eya-signature.png"
        name={personal.fullName}
        linkedin={personal.linkedin}
        tagline={editorial.footer.tagline}
      />
      <WhatsAppFloat phone={personal.phone} />
    </EditorialShell>
  );
};
