import { useState } from "react";
import Reveal from "../../components/Reveal";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { useUI } from "../../components/UIContext";
import "./WhyUs.css";

/* Why-us as an index whose rows become the destination.
 *
 * On hover a row floods with its own photograph — the image band wipes in from
 * the gutter while the picture itself settles out of a push-in, the title lifts
 * character by character, and the whole row inverts to white. Four things move
 * on one trigger, which is what separates it from a hover state.
 *
 * The stills are the hero slider's, deliberately: they are already fetched and
 * decoded at the top of this page, so a row fills instantly and costs nothing. */

const POINTS = [
  {
    title: "Human experts, not algorithms",
    text: "A dedicated trip designer from first call to touchdown home.",
    img: "/images/hero/hero-kerala-4k.webp",
  },
  {
    title: "Fully customisable itineraries",
    text: "Every package is a starting point — stretch, swap and season to taste.",
    img: "/images/hero/hero-ladakh-4k.webp",
  },
  {
    title: "24×7 on-trip support",
    text: "Missed connection at 2 AM? One WhatsApp and we're on it.",
    img: "/images/hero/hero-kashmir-4k.webp",
  },
  {
    title: "Zero hidden costs",
    text: "What you see is what you pay — no line items appearing at checkout.",
    img: "/images/hero/hero-maldives-4k.webp",
  },
];

export default function WhyUs() {
  const { openEnquiry } = useUI();
  const [hot, setHot] = useState(-1);

  return (
    <section className="why">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Why Trip Utsav</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="why-title">
            We don't sell tours.<br />We craft <span className="text-grad">celebrations.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="why-lead">
            Anyone can book a hotel. We obsess over the sunrise slot at the Taj, the window seat
            over the Himalayas, the candle-lit surprise on your anniversary night.
          </p>
        </Reveal>

        <ul className="why-list" onPointerLeave={() => setHot(-1)}>
          {POINTS.map((p, i) => (
            <li
              key={p.title}
              className={`why-row${i === hot ? " is-hot" : ""}`}
              onPointerEnter={() => setHot(i)}
            >
              <span className="why-row-bg" aria-hidden="true">
                <img src={p.img} alt="" />
              </span>

              <span className="why-idx">{String(i + 1).padStart(2, "0")}</span>

              {/* Split per character to stagger the lift; aria-label keeps it
                  one continuous string for anything reading the page. */}
              <h3 className="why-row-title" aria-label={p.title}>
                {[...p.title].map((ch, k) => (
                  <span key={k} aria-hidden="true" style={{ "--k": k }}>
                    {ch === " " ? " " : ch}
                  </span>
                ))}
              </h3>

              <p className="why-row-text">{p.text}</p>
              <i className="why-row-go" aria-hidden="true"><Icon name="arrow" /></i>
            </li>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="why-cta">
            <Button icon="arrow" onClick={() => openEnquiry()}>Start Planning Free</Button>
            <span className="why-trust"><b>4.8★</b> from 2,000+ verified reviews</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
