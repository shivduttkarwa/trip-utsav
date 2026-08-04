import AboutHero from "../sections/about/AboutHero";
import FirstEntry from "../sections/about/FirstEntry";
import MilestoneStamps from "../sections/about/MilestoneStamps";
import EntryRecord from "../sections/about/EntryRecord";
import CustomsDeclaration from "../sections/about/CustomsDeclaration";
import CrewPasses from "../sections/about/CrewPasses";
import InkTestimonials from "../sections/about/InkTestimonials";
import CtaBanner from "../components/CtaBanner";

/* THE PAGE IS A PASSPORT.
 *
 * A travel company's history laid out as the one document every traveller
 * owns: a first-entry story, milestone years as visa stamps at odd angles,
 * values sworn on a customs declaration, and the team as crew passes with
 * machine-readable strips. One stamp slot is left dashed and empty —
 * reserved — and clicking it opens the enquiry form, because the whole page
 * has been walking the reader toward that blank space.
 *
 * Each section lives in sections/about/ with its own stylesheet.
 */
export default function About() {
  return (
    <>
      <AboutHero />
      <FirstEntry />
      <MilestoneStamps />
      <EntryRecord />
      <CustomsDeclaration />
      <CrewPasses />
      <InkTestimonials />
      <CtaBanner
        compact
        image="images/hero/hero-ladakh.webp"
        focal="58% 42%"
        focalM="66% 40%"
        badge="Blank pages, left on purpose"
        title="Add Your Stamp"
        text="Tell us the occasion and the rough dates. A trip designer drafts the route, and this passport gets one more entry — yours."
        cta="Start My Trip"
        secondary={{ label: "Browse Packages", to: "/packages" }}
      />
    </>
  );
}
