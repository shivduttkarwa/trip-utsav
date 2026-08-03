import Reveal from "../../components/Reveal";
import SectionHead from "../../components/SectionHead";
import Icon from "../../components/Icon";
import "./HowItWorks.css";

const STEPS = [
  { code: "Dream", title: "Tell Us Your Dream", text: "Share destination ideas, dates and budget — or just a vibe. We'll take it from there." },
  { code: "Plan", title: "Get a Crafted Plan", text: "A travel expert designs a day-by-day itinerary with transparent pricing in 24 hours." },
  { code: "Book", title: "Book & Relax", text: "Pay securely in easy instalments. Flights, stays, visas — every detail handled." },
  { code: "Fly", title: "Travel & Celebrate", text: "Fly out with 24×7 on-trip support one WhatsApp message away." },
];

/* The four steps as one boarding pass, perforated into stubs.
 *
 * Every previous attempt here arranged four separate objects in a row — cards,
 * tiles, nodes on a line — and the arrangement was the only thing that changed.
 * This is a single object instead: one ticket, torn along three perforations,
 * so the steps are parts of one thing rather than four things placed near each
 * other. It is also the artefact the process actually produces, which is about
 * as on-brand as a travel site's process section can get.
 *
 * The last stub is the one you keep: it goes orange and takes the plane. */
export default function HowItWorks() {
  return (
    <section className="section bg-surface">
      <div className="container">
        <SectionHead eyebrow="From Enquiry To Boarding" title="How Your Trip Comes Together" />
        <Reveal className="pass">
          {STEPS.map((s, i) => (
            <div
              className={`pass-stub${i === STEPS.length - 1 ? " pass-stub--go" : ""}`}
              key={s.title}
            >
              <span className="pass-tag">
                Step {String(i + 1).padStart(2, "0")}
                {i === STEPS.length - 1 && <i className="pass-plane"><Icon name="plane" /></i>}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="pass-code">{s.code}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
