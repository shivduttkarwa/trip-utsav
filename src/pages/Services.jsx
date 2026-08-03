import { Link } from "react-router-dom";
import { FALLBACK_IMG } from "../data/packages";
import asset from "../asset";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import Accordion from "../components/Accordion";
import CtaBanner from "../components/CtaBanner";
import { useUI } from "../components/UIContext";
import "../styles/services.css";

const HERO = asset("images/hero/hero-services.webp");

/* NINE SERVICES, SIZED BY WHAT THEY ARE WORTH.
 *
 * This page was a 3x3 grid of identical cards, and that uniformity was the
 * whole problem: nine tiles of equal area assert that nine services matter
 * equally. They do not. Custom itineraries are the business; forex is a
 * convenience. Given no hierarchy the eye scans rows and remembers none of
 * them, which is exactly what a template feels like.
 *
 * So the set is laid out as a bento — each service takes the area it has
 * earned. The flagship takes four tiles and a photograph, the promise that
 * closes deals takes colour, the rest sit at their real weight. No two
 * neighbouring tiles share a shape, so the eye travels the set instead of
 * scanning it, and the layout itself says what we would otherwise have to
 * write a sentence to claim.
 *
 * `w`/`h` are declared here beside the copy rather than in the stylesheet: the
 * size of a tile is an editorial decision about that service, not a fact about
 * the grid, and it belongs where someone editing the copy will see it.
 */
const SERVICES = [
  {
    icon: "calendar",
    title: "Custom Itineraries",
    text: "A blank page and a travel designer. Build the exact trip in your head, day by day — then let us price it, book it and run it.",
    w: 2, h: 2, tone: "photo"
  },
  { icon: "plane", title: "Flight Bookings", text: "Smart routing, meal preferences and web check-in, handled for you." },
  { icon: "pin", title: "Hotels & Resorts", text: "Boutique homestays to overwater villas — every property vetted." },
  { icon: "globe", title: "Visa Assistance", text: "Checklists, appointments, form-filling and follow-ups for 40+ countries, Schengen included.", w: 2 },
  { icon: "heart", title: "Honeymoon Packages", text: "Slow mornings, private dinners, surprise décor." },
  { icon: "users", title: "Group & MICE Tours", text: "Corporate offsites, incentive trips, college batches and family reunions — 10 to 500 people.", w: 2, tone: "dark" },
  { icon: "shield", title: "Travel Insurance", text: "Medical, baggage and cancellation cover, with claims support." },
  { icon: "wallet", title: "Forex & EMI", text: "Competitive exchange rates, forex cards and no-cost EMI on packages.", w: 2 },
  {
    icon: "headset",
    title: "24×7 On-trip Support",
    text: "A dedicated WhatsApp line while you travel. Delays, changes, emergencies — a human answers.",
    w: 2, tone: "accent"
  }
];

const FAQS = [
  { title: "How do I book a package?", body: "Send an enquiry through any form on the site or call us. Your trip designer confirms availability, fine-tunes the itinerary with you, and shares a secure payment link. A 25% advance locks your dates." },
  { title: "Can I customise a listed package?", body: "Absolutely — every package on this site is a starting template. Add days, upgrade hotels, swap cities, make it veg-only. Customisation is free; you only pay the fare difference." },
  { title: "What payment options do you support?", body: "UPI, cards, net-banking and bank transfer. Most packages can also be split into no-cost EMIs of 3–6 months through our partner banks." },
  { title: "What is the cancellation policy?", body: "Free date changes up to 15 days before departure on most packages. Cancellation charges depend on airline and hotel policies — your quote always states them clearly upfront." },
  { title: "Do you help with visas for international trips?", body: "Yes — documentation checklists, appointments, cover letters and follow-ups are included with every international package. Visa fees are payable to the embassy." },
  { title: "Is on-trip support really 24×7?", body: "Yes. Every travelling group gets a dedicated WhatsApp support line monitored round the clock, plus local partner contacts in the destination." }
];

const pad = (n) => String(n).padStart(2, "0");

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

      {/* ---------- THE BENTO ---------- */}
      <section className="sv">
        <div className="container">
          <div className="sv-head">
            <span className="eyebrow">What we do</span>
            <h2 className="display-2">Nine ways we carry the load</h2>
            <p>Not a menu to choose from — take one, take all nine. Most travellers start with one and end up handing us the lot.</p>
          </div>

          <div className="sv-grid">
            {SERVICES.map((s, i) => (
              <Reveal
                key={s.title}
                className={`sv-tile${s.tone ? ` sv-tile--${s.tone}` : ""}${s.w === 2 ? " w2" : ""}${s.h === 2 ? " h2" : ""}`}
                delay={(i % 4) * 0.06}
              >
                {s.tone === "photo" && (
                  <img
                    className="sv-tile-bg"
                    src={asset("images/hero/hero-kashmir.webp")}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                )}

                <div className="sv-tile-top">
                  <span className="sv-no">{pad(i + 1)}</span>
                  <span className="sv-ico"><Icon name={s.icon} /></span>
                </div>

                <h3>{s.title}</h3>
                <p>{s.text}</p>

                {/* The whole tile is the target, not just these two words. The
                    overlay hangs off the button so the tile stays a plain
                    <article> — a heading is not valid inside a <button>. */}
                <button className="sv-go" onClick={() => openEnquiry(s.title)}>
                  Enquire <Icon name="arrow" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
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
