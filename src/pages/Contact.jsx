import ContactHero from "../sections/contact/ContactHero";
import ContactChannels from "../sections/contact/ContactChannels";
import ContactPostcard from "../sections/contact/ContactPostcard";
import StudioPostcard from "../sections/contact/StudioPostcard";

/* Each section lives in sections/contact/ with its own stylesheet.
   See ContactPostcard.jsx for the page's concept — the enquiry form as the
   first postcard of the trip, written to us. */
export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactChannels />
      <ContactPostcard />
      <StudioPostcard />
    </>
  );
}
