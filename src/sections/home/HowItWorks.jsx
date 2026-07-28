import Reveal from "../../components/Reveal";
import SectionHead from "../../components/SectionHead";
import "./HowItWorks.css";

const STEPS = [
  { title: "Tell Us Your Dream", text: "Share destination ideas, dates and budget — or just a vibe. We'll take it from there." },
  { title: "Get a Crafted Plan", text: "A travel expert designs a day-by-day itinerary with transparent pricing in 24 hours." },
  { title: "Book & Relax", text: "Pay securely in easy instalments. Flights, stays, visas — every detail handled." },
  { title: "Travel & Celebrate", text: "Fly out with 24×7 on-trip support one WhatsApp message away." },
];

export default function HowItWorks() {
  return (
    <section className="section bg-surface">
      <div className="container">
        <SectionHead layout="center" eyebrow="Simple as 1-2-3-4" title="How Your Trip Comes Together" />
        <div className="grid grid-4 steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.09}>
              <div className="step">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
