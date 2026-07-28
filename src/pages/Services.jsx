import { Link } from "react-router-dom";
import { FALLBACK_IMG, IMG } from "../data/packages";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import IconCard from "../components/IconCard";
import Accordion from "../components/Accordion";
import { useUI } from "../components/UIContext";

const HERO = IMG("photo-1436491865332-7a61a109cc05", 2000);

const SERVICES = [
  { icon: "plane", title: "Flight Bookings", text: "Domestic and international fares with smart routing, meal preferences and web check-in handled for you." },
  { icon: "pin", title: "Hotels & Resorts", text: "From boutique homestays to overwater villas — every property personally vetted or guest-verified." },
  { icon: "globe", title: "Visa Assistance", text: "Checklists, appointment booking, form-filling and follow-ups for 40+ countries, including Schengen." },
  { icon: "heart", title: "Honeymoon Packages", text: "Slow mornings, private dinners, surprise décor — romance engineered into every detail." },
  { icon: "users", title: "Group & MICE Tours", text: "Corporate offsites, incentive trips, college batches and big family reunions of 10 to 500 people." },
  { icon: "shield", title: "Travel Insurance", text: "Medical, baggage and trip-cancellation cover arranged with claims support when you need it." },
  { icon: "wallet", title: "Forex & EMI", text: "Competitive currency exchange, forex cards and no-cost EMI options on packages." },
  { icon: "calendar", title: "Custom Itineraries", text: "A blank page and a travel designer — build the exact trip in your head, day by day." },
  { icon: "headset", title: "24×7 On-trip Support", text: "A dedicated WhatsApp line while you travel. Delays, changes, emergencies — we answer." }
];

const FAQS = [
  { title: "How do I book a package?", body: "Send an enquiry through any form on the site or call us. Your trip designer confirms availability, fine-tunes the itinerary with you, and shares a secure payment link. A 25% advance locks your dates." },
  { title: "Can I customise a listed package?", body: "Absolutely — every package on this site is a starting template. Add days, upgrade hotels, swap cities, make it veg-only. Customisation is free; you only pay the fare difference." },
  { title: "What payment options do you support?", body: "UPI, cards, net-banking and bank transfer. Most packages can also be split into no-cost EMIs of 3–6 months through our partner banks." },
  { title: "What is the cancellation policy?", body: "Free date changes up to 15 days before departure on most packages. Cancellation charges depend on airline and hotel policies — your quote always states them clearly upfront." },
  { title: "Do you help with visas for international trips?", body: "Yes — documentation checklists, appointments, cover letters and follow-ups are included with every international package. Visa fees are payable to the embassy." },
  { title: "Is on-trip support really 24×7?", body: "Yes. Every travelling group gets a dedicated WhatsApp support line monitored round the clock, plus local partner contacts in the destination." }
];

export default function Services() {
  const { openEnquiry } = useUI();

  return (
    <>
      <header className="page-hero">
        <div className="hero-media">
          <img src={HERO} alt="" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <nav className="breadcrumb"><Link to="/">Home</Link><span>/</span> Services</nav>
          <Reveal as="h1" className="display-2">One Agency. Every Travel Service.</Reveal>
          <Reveal as="p" delay={0.15}>
            Flights to forex, visas to villas — if it's part of a journey, it's part of our job.
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <SectionHead
            layout="center"
            eyebrow="What We Do"
            title="Full-Service Travel, End to End"
          />
          <div className="grid grid-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.09}>
                <IconCard
                  icon={s.icon}
                  title={s.title}
                  text={s.text}
                  onClick={() => openEnquiry(s.title)}
                  linkLabel="Enquire"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container" style={{ maxWidth: "860px" }}>
          <SectionHead
            layout="center"
            eyebrow="Good to Know"
            title="Frequently Asked Questions"
          />
          <Reveal>
            <Accordion items={FAQS} defaultOpen={0} />
          </Reveal>
          <Reveal className="center mt-4">
            <p className="lead mb-2">Still have a question?</p>
            <div className="flex" style={{ justifyContent: "center" }}>
              <Button icon="arrow" to="/contact">Contact Us</Button>
              <Button variant="outline" onClick={() => openEnquiry()}>Request a Callback</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
