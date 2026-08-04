import ServicesHero from "../sections/services/ServicesHero";
import ServicesBento from "../sections/services/ServicesBento";
import ServicesFaq from "../sections/services/ServicesFaq";
import CtaBanner from "../components/CtaBanner";

/* Each section lives in sections/services/ with its own stylesheet.
   See ServicesBento.jsx for the bento concept. */
export default function Services() {
  return (
    <>
      <ServicesHero />
      <ServicesBento />
      <ServicesFaq />
      <CtaBanner
        compact
        image="images/hero/hero-contact.webp"
        focal="50% 45%"
        badge="No obligation, nothing to pay"
        title="Tell Us What You Need"
        text="One message and a trip designer takes it from there — flights, stay, visa, the lot."
        cta="Start My Trip"
        secondary={{ label: "Browse Packages", to: "/packages" }}
      />
    </>
  );
}
