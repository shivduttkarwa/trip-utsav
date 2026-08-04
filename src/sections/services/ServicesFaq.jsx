import Accordion from "../../components/Accordion";
import Button from "../../components/Button";
import { useUI } from "../../components/UIContext";
import "./ServicesFaq.css";

const FAQS = [
  { title: "How do I book a package?", body: "Send an enquiry through any form on the site or call us. Your trip designer confirms availability, fine-tunes the itinerary with you, and shares a secure payment link. A 25% advance locks your dates." },
  { title: "Can I customise a listed package?", body: "Absolutely — every package on this site is a starting template. Add days, upgrade hotels, swap cities, make it veg-only. Customisation is free; you only pay the fare difference." },
  { title: "What payment options do you support?", body: "UPI, cards, net-banking and bank transfer. Most packages can also be split into no-cost EMIs of 3–6 months through our partner banks." },
  { title: "What is the cancellation policy?", body: "Free date changes up to 15 days before departure on most packages. Cancellation charges depend on airline and hotel policies — your quote always states them clearly upfront." },
  { title: "Do you help with visas for international trips?", body: "Yes — documentation checklists, appointments, cover letters and follow-ups are included with every international package. Visa fees are payable to the embassy." },
  { title: "Is on-trip support really 24×7?", body: "Yes. Every travelling group gets a dedicated WhatsApp support line monitored round the clock, plus local partner contacts in the destination." }
];

export default function ServicesFaq() {
  const { openEnquiry } = useUI();

  return (
    <section className="sv-faq">
      <div className="container sv-faq-grid">
        <div className="sv-faq-aside">
          <span className="eyebrow">Good to know</span>
          <h2 className="display-2">Questions,<br />answered</h2>
          <p>Everything people ask before they book. If yours is not here, ask a human — we answer in minutes, not days.</p>
          <div className="sv-faq-actions">
            <Button icon="arrow" to="/contact">Contact Us</Button>
            <Button variant="outline" onClick={() => openEnquiry()}>Request a Callback</Button>
          </div>
        </div>

        <div className="sv-faq-list">
          <Accordion items={FAQS} defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}
