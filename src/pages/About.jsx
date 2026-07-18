import { Link } from "react-router-dom";
import { FALLBACK_IMG, IMG } from "../data/packages";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import Stat from "../components/Stat";
import TestimonialSlider from "../components/TestimonialSlider";
import { useUI } from "../components/UIContext";

const HERO = IMG("photo-1488646953014-85cb44e25828", 2000);
const STORY = IMG("photo-1469854523086-cc02fe5d8800", 1000);

const VALUES = [
  { num: "01", title: "Travellers First", text: "Every decision starts with one question: is this genuinely better for the traveller? Commissions never pick your hotel — fit does." },
  { num: "02", title: "Radical Transparency", text: "Line-item quotes, real photos, honest trade-offs. If the sea-view room isn't worth it, we'll tell you." },
  { num: "03", title: "Celebrate Everything", text: "A trip is never just logistics. Birthdays get cakes, anniversaries get décor, first flights get window seats." },
  { num: "04", title: "Own the Outcome", text: "If something breaks mid-trip, we fix it first and settle accounts later. Your holiday is the priority." }
];

const TEAM = [
  { name: "Kailash Utsav", role: "Founder & Chief Explorer", img: IMG("photo-1560250097-0b93528c311a", 600) },
  { name: "Meera Nair", role: "Head of Itineraries", img: IMG("photo-1573496359142-b8d87734a5a2", 600) },
  { name: "Arjun Bhatt", role: "Visas & Documentation", img: IMG("photo-1472099645785-5658abf4ff4e", 600) },
  { name: "Sana Qureshi", role: "On-trip Support Lead", img: IMG("photo-1580489944761-15a19d654956", 600) }
];

const onImgError = (e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; };

export default function About() {
  const { openEnquiry } = useUI();

  return (
    <>
      <header className="page-hero">
        <div className="hero-media">
          <img src={HERO} alt="" onError={onImgError} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <nav className="breadcrumb"><Link to="/">Home</Link><span>/</span> About</nav>
          <Reveal as="h1" className="display-2">Travel More, Celebrate Life</Reveal>
          <Reveal as="p" delay={0.15}>
            The story of a small travel desk that grew into 25,000 celebrations across 120
            destinations.
          </Reveal>
        </div>
      </header>

      {/* ---------- STORY ---------- */}
      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: "center", gap: "60px" }}>
          <Reveal variant="left">
            <div className="split-media">
              <img src={STORY} alt="A van on a road trip at golden hour" onError={onImgError} />
              <div className="float-card" style={{ bottom: "26px", right: "-18px" }}>
                <div className="icon"><Icon name="globe" /></div>
                <div><strong>120+ Destinations</strong><small>and counting</small></div>
              </div>
            </div>
          </Reveal>
          <Reveal variant="right">
            <span className="eyebrow">Our Story</span>
            <h2 className="display-2" style={{ margin: "14px 0 18px" }}>
              Born From a Trip That <span className="text-grad">Went Wrong</span>
            </h2>
            <p className="lead mb-2">
              In 2014, our founder watched a family's dream vacation collapse over one unconfirmed
              hotel voucher. The agency that sold it had vanished after the payment cleared.
            </p>
            <p className="mb-2">
              Trip Utsav started as the antidote: a travel company that stays on the trip after
              the invoice. Twelve years later, that promise is still the whole business model —
              real humans planning real journeys, reachable at 2 AM, accountable to the end.
            </p>
            <p className="mb-3">
              The name says the rest. <b>Utsav</b> means festival — because we believe travel
              isn't an escape from life, it's the celebration of it.
            </p>
            <Button icon="arrow" onClick={() => openEnquiry()}>Plan a Trip With Us</Button>
          </Reveal>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="section-tight bg-surface">
        <div className="container">
          <div className="stats">
            <Stat value={12} label="Years of Craft" />
            <Stat value={25000} label="Happy Travellers" />
            <Stat value={120} label="Destinations Covered" />
            <Stat value={98} suffix="%" label="Would Book Again" />
          </div>
        </div>
      </section>

      {/* ---------- VALUES ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            layout="center"
            eyebrow="What We Stand For"
            title="Four Values, Zero Compromise"
          />
          <div className="grid grid-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.num} delay={(i % 2) * 0.1}>
                <div className="icon-card">
                  <span className="value-num">{v.num}</span>
                  <h3 style={{ margin: "8px 0 10px" }}>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TEAM ---------- */}
      <section className="section bg-surface">
        <div className="container">
          <SectionHead
            layout="center"
            eyebrow="The Humans"
            title="The People Who Pack Your Peace of Mind"
          />
          <div className="grid grid-4">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="team-card">
                  <div className="photo">
                    <img src={m.img} alt={m.name} loading="lazy" onError={onImgError} />
                  </div>
                  <h3>{m.name}</h3>
                  <small>{m.role}</small>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Proof" title="In Our Travellers' Words" />
          <TestimonialSlider />
        </div>
      </section>
    </>
  );
}
