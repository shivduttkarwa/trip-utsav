import Reveal from "../../components/Reveal";
import Button from "../../components/Button";
import { useUI } from "../../components/UIContext";
import "./WhyUs.css";

/* Why-us as a bento of four tiles.
 *
 * The previous version was an index whose rows flooded with a photograph on
 * hover — which meant the photography only existed for someone holding a mouse,
 * and every touch device got a plain text list. Here the pictures are on screen
 * from the start and the tiles carry their own weight; hover only opens the
 * crop a little further.
 *
 * The stills are the hero slider's, deliberately: they are already fetched and
 * decoded at the top of this page, so the tiles cost nothing to fill. */

const POINTS = [
  {
    idx: "01",
    title: "Human experts, not algorithms",
    text: "A dedicated trip designer from first call to touchdown home.",
    surface: "photo",
    span: "why-tile--wide why-tile--tall",
    img: "/images/hero/hero-kerala-4k.webp",
  },
  {
    idx: "02",
    title: "Fully customisable itineraries",
    text: "Every package is a starting point — stretch, swap and season to taste.",
    surface: "ink",
    span: "why-tile--wide",
  },
  {
    idx: "03",
    title: "24×7 on-trip support",
    text: "Missed connection at 2 AM? One WhatsApp and we're on it.",
    surface: "photo",
    span: "",
    img: "/images/hero/hero-kashmir-4k.webp",
  },
  {
    idx: "04",
    title: "Zero hidden costs",
    text: "What you see is what you pay — no line items at checkout.",
    surface: "soft",
    span: "",
  },
];

export default function WhyUs() {
  const { openEnquiry } = useUI();

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

        <div className="why-bento">
          {POINTS.map((p, i) => (
            <Reveal
              as="article"
              key={p.idx}
              delay={i * 0.08}
              className={`why-tile why-tile--${p.surface} ${p.span}`.trim()}
            >
              {p.img && <img className="why-tile-img" src={p.img} alt="" />}
              <span className="why-tile-idx">{p.idx}</span>
              <div className="why-tile-body">
                <h3 className="why-tile-title">{p.title}</h3>
                <p className="why-tile-text">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="why-cta">
            <Button icon="arrow" onClick={() => openEnquiry()}>Start Planning Free</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
