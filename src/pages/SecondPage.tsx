import content from '../data/content.json';
import {
  AboutSectionView,
  CampaignsSection,
  ContactSectionView,
  EditorialFooter,
  EditorialHeader,
  EditorialHero,
  EditorialShell,
  PartnersSection,
  PharmavieSection,
  PitstopSection,
  Preloader,
  RolesSection,
  SelectedSection,
  StageSectionView,
  WhatsAppFloat,
  type SecondPageData,
} from './second/sections.tsx';

const data = content as typeof content & { editorial: SecondPageData['editorial'] };

export const SecondPage = () => {
  const { editorial, personal, about, clients, hero } = data;

  return (
    <EditorialShell>
      <Preloader
        signatureSrc="/eya-signature.png"
        word="Marketing · Content · Partnerships"
      />
      <EditorialHeader
        nav={editorial.nav}
        cta={editorial.cta}
        signatureSrc="/eya-signature.png"
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
        <PharmavieSection data={editorial.pharmavie} />
        <CampaignsSection data={editorial.campaigns} />
        <PitstopSection data={editorial.pitstop} />
        <SelectedSection data={editorial.selected} />
        <RolesSection data={editorial.roles} />
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
