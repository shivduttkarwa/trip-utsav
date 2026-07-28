import Reveal from "../../components/Reveal";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { useUI } from "../../components/UIContext";
import { IMG, FALLBACK_IMG } from "../../data/packages";
import "./WhyUs.css";

const WHYUS_IMG = IMG("photo-1488646953014-85cb44e25828", 1000);

const POINTS = [
  { title: "Human experts, not algorithms", text: "A dedicated trip designer from first call to touchdown home." },
  { title: "Fully customisable itineraries", text: "Every package is a starting point — stretch, swap and season to taste." },
  { title: "24×7 on-trip support", text: "Missed connection at 2 AM? One WhatsApp and we're on it." },
];

export default function WhyUs() {
  const { openEnquiry } = useUI();

  return (
    <section className="section">
      <div className="container grid grid-2 whyus">
        <Reveal variant="left">
          <div className="split-media">
            <img src={WHYUS_IMG} alt="Traveller planning a journey with a map" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }} />
            <div className="float-card float-card--bl">
              <div className="icon"><Icon name="shield" /></div>
              <div><strong>Zero Hidden Costs</strong><small>What you see is what you pay</small></div>
            </div>
            <div className="float-card float-card--tr">
              <div className="icon"><Icon name="star" /></div>
              <div><strong>4.8★ Rated</strong><small>2,000+ verified reviews</small></div>
            </div>
          </div>
        </Reveal>
        <Reveal variant="right">
          <span className="eyebrow">Why Trip Utsav</span>
          <h2 className="display-2 whyus-title">
            We Don't Sell Tours.<br />We Craft <span className="text-grad">Celebrations.</span>
          </h2>
          <p className="lead mb-3">
            Anyone can book a hotel. We obsess over the sunrise slot at the Taj, the window seat
            over the Himalayas, the candle-lit surprise on your anniversary night.
          </p>
          <ul className="check-list">
            {POINTS.map((p) => (
              <li key={p.title}>
                <span className="tick"><Icon name="check" /></span>
                <div><strong>{p.title}</strong><p>{p.text}</p></div>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <Button icon="arrow" onClick={() => openEnquiry()}>Start Planning Free</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
