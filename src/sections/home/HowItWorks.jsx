import Reveal from "../../components/Reveal";
import SectionHead from "../../components/SectionHead";
import "./HowItWorks.css";

const STEPS = [
  { title: "Tell Us Your Dream", text: "Share destination ideas, dates and budget — or just a vibe. We'll take it from there." },
  { title: "Get a Crafted Plan", text: "A travel expert designs a day-by-day itinerary with transparent pricing in 24 hours." },
  { title: "Book & Relax", text: "Pay securely in easy instalments. Flights, stays, visas — every detail handled." },
  { title: "Travel & Celebrate", text: "Fly out with 24×7 on-trip support one WhatsApp message away." },
];

/* Four steps on a drawn line rather than four cards in a row.
 *
 * These are a sequence, and boxes said nothing about that — each step was an
 * island of equal weight. Here one rail runs through all four and draws itself
 * as the section is reached, each node lighting as the line passes it, so the
 * section performs the order it is describing.
 *
 * The Reveal wrapper is here for its in-view class rather than its animation:
 * the whole sequence keys off .in, and the CSS neutralises the rise it would
 * otherwise apply to the track. */
export default function HowItWorks() {
  return (
    <section className="section bg-surface">
      <div className="container">
        <SectionHead layout="center" eyebrow="Simple as 1-2-3-4" title="How Your Trip Comes Together" />
        <Reveal className="hiw-track">
          {STEPS.map((s, i) => (
            <div className="hiw-step" key={s.title} style={{ "--i": i }}>
              <span className="hiw-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
