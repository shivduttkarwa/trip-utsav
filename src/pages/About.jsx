import { Link } from "react-router-dom";
import { FALLBACK_IMG, IMG } from "../data/packages";
import asset from "../asset";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import Stat from "../components/Stat";
import TestimonialSlider from "../components/TestimonialSlider";
import CtaBanner from "../components/CtaBanner";
import { useUI } from "../components/UIContext";
import "../styles/about.css";

const HERO = asset("images/hero/hero-about.webp");
/* The story is about a sea, so the picture beside it is one. */
const STORY = asset("images/packages/andaman-islands/01-radhanagar-beach.webp");

/* THE PAGE IS AN ITINERARY.
 *
 * Every other About page is the same four sections wearing different fonts:
 * story, numbers, values, faces. Ours was too. But this company writes
 * day-by-day itineraries for a living — so its own twelve years are told the
 * same way: as stops on a route. A dotted line runs down the page the way it
 * runs across the back of an in-flight magazine, and every section extends the
 * journey — the stats are the trip meter, the values are what's packed in the
 * bag, the team are polaroids from the road, the testimonials are postcards
 * home. The route's dotted line simply stops at 2026, because the next leg is
 * the reader's — which is what the closing CTA has been saying all along.
 */
const STOPS = [
  {
    year: "2016",
    title: "A Desk Becomes a Company",
    text: "The travel desk gets a name, a licence and a one-room office in Indore. A hundred travellers book in the first year — most of them entire families, sent to the hills with hand-written itineraries."
  },
  {
    year: "2018",
    title: "Crossing Borders",
    text: "The first passports land on the desk and the visa team is born. What starts as a single Schengen checklist grows into paperwork, appointments and follow-ups for forty-plus countries."
  },
  {
    year: "2020",
    title: "The Year Nobody Flew",
    text: "Borders shut, planes parked. We refunded or rebooked every trip on our books — every single one. Our quietest year is still the one we're proudest of."
  },
  {
    year: "2023",
    title: "The 20,000th Celebration",
    text: "Somewhere between a honeymoon in Bali and a golden anniversary in Kerala, traveller number twenty thousand came home with sand in their shoes."
  }
];

const VALUES = [
  { num: "01", tilt: "-1.1deg", title: "Travellers First", text: "Every decision starts with one question: is this genuinely better for the traveller? Commissions never pick your hotel — fit does." },
  { num: "02", tilt: "0.9deg", title: "Radical Transparency", text: "Line-item quotes, real photographs, honest trade-offs. If the sea-view room isn't worth it, we'll tell you before you pay for it." },
  { num: "03", tilt: "0.8deg", title: "Celebrate Everything", text: "A trip is never just logistics. Birthdays get cakes, anniversaries get décor, first flights get the window seat." },
  { num: "04", tilt: "-1deg", title: "Own the Outcome", text: "If something breaks mid-trip, we fix it first and settle accounts later. Your holiday is the priority, not the paperwork." }
];

const TEAM = [
  { name: "Kailash Utsav", role: "Founder & Chief Explorer", tilt: "-2deg", img: IMG("photo-1560250097-0b93528c311a", 600) },
  { name: "Meera Nair", role: "Head of Itineraries", tilt: "1.6deg", img: IMG("photo-1573496359142-b8d87734a5a2", 600) },
  { name: "Arjun Bhatt", role: "Visas & Documentation", tilt: "-1.4deg", img: IMG("photo-1472099645785-5658abf4ff4e", 600) },
  { name: "Sana Qureshi", role: "On-trip Support Lead", tilt: "2.2deg", img: IMG("photo-1580489944761-15a19d654956", 600) }
];

const pad = (n) => String(n).padStart(2, "0");
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

      {/* ---------- THE ROUTE ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            layout="center"
            eyebrow="Our Story"
            title="Twelve Years, One Itinerary"
            text="We write day-by-day routes for a living, so here is our own — every stop that made us who we are."
          />

          <div className="ab-route">
            {/* Stop 01 — departure. The founding story keeps the photograph and
                most of the room; everything after it is a leg of the journey. */}
            <Reveal as="article" className="ab-stop ab-stop--depart">
              <div className="ab-side">
                <figure className="ab-photo">
                  <img src={STORY} alt="A quiet stretch of Indian coastline at low tide" onError={onImgError} />
                  <figcaption>“The sea, finally.” — winter of 2014</figcaption>
                </figure>
              </div>
              <span className="ab-node ab-node--depart" aria-hidden="true"><Icon name="plane" /></span>
              <div className="ab-body">
                <span className="ab-stop-tag">Stop 01 · 2014 · Departure</span>
                <h3>A Grandmother and a <span className="text-grad">Sea She’d Never Seen</span></h3>
                <p className="lead">
                  In the winter of 2014, our founder spent a year of savings taking his grandmother
                  from Indore to the coast. Eleven hours by road, one night in a room with a
                  rattling fan. She walked down to the water in her sandals and stood in it for the
                  better part of an hour. She was seventy-one, and she had never once seen the sea.
                </p>
                <p>
                  He handed in his notice the following month. Trip Utsav exists because of that
                  hour — because somewhere inside every trip there is an hour like it. A first sea,
                  a first snowfall, a fiftieth anniversary somewhere you had only ever seen on a
                  calendar.
                </p>
                <p>
                  The name says the rest. <b>Utsav</b> means festival — because travel isn't an
                  escape from life, it's the celebration of it.
                </p>
              </div>
            </Reveal>

            {STOPS.map((s, i) => (
              <Reveal
                as="article"
                key={s.year}
                className={`ab-stop${i % 2 === 0 ? " ab-stop--flip" : ""}`}
              >
                <div className="ab-side"><span className="ab-year" aria-hidden="true">{s.year}</span></div>
                <span className="ab-node" aria-hidden="true" />
                <div className="ab-body">
                  <span className="ab-stop-tag">Stop {pad(i + 2)} · {s.year}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}

            {/* The last stop — where the dotted line runs out on purpose. */}
            <Reveal as="article" className="ab-stop ab-stop--here ab-stop--flip">
              <div className="ab-side"><span className="ab-year" aria-hidden="true">2026</span></div>
              <span className="ab-node ab-node--here" aria-hidden="true" />
              <div className="ab-body">
                <span className="ab-stop-tag">Stop 06 · Today · You Are Here</span>
                <h3>The Next Leg Isn’t Ours to Write</h3>
                <p>
                  Twelve years, 120 destinations, 25,000 celebrations — and the route keeps
                  growing. The dotted line ends at this stop for a reason: the next one is yours.
                </p>
                <Button icon="arrow" onClick={() => openEnquiry()}>Plan a Trip With Us</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- THE TRIP METER ---------- */}
      <section className="section-tight bg-surface">
        <div className="container">
          <Reveal className="ab-meter"><span className="eyebrow">The Trip Meter</span></Reveal>
          <div className="stats">
            <Stat value={12} label="Years on the Road" />
            <Stat value={25000} label="Happy Travellers" />
            <Stat value={120} label="Destinations Covered" />
            <Stat value={98} suffix="%" label="Would Book Again" />
          </div>
        </div>
      </section>

      {/* ---------- PACKED ON EVERY TRIP ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            layout="center"
            eyebrow="What We Stand For"
            title="Packed on Every Trip"
            text="Four values that go into the bag before anything else — twelve years on, not one has ever been left behind."
          />
          <div className="ab-tags">
            {VALUES.map((v, i) => (
              <Reveal key={v.num} delay={(i % 2) * 0.1}>
                <article className="ab-tag" style={{ "--tilt": v.tilt }}>
                  <span className="ab-tag-hole" aria-hidden="true" />
                  <span className="ab-tag-num">{v.num}<span>/04</span></span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- THE CREW ---------- */}
      <section className="section bg-surface">
        <div className="container">
          <SectionHead
            layout="center"
            eyebrow="The Crew"
            title="The People Who Pack Your Peace of Mind"
            text="No call centres, no ticket queues. Every trip on this site is planned by one of these four, by name."
          />
          <div className="ab-crew">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <figure className="ab-pol" style={{ "--tilt": m.tilt }}>
                  <span className="ab-tape" aria-hidden="true" />
                  <div className="ab-pol-photo">
                    <img src={m.img} alt={m.name} loading="lazy" decoding="async" onError={onImgError} />
                  </div>
                  <figcaption>
                    <strong>{m.name}</strong>
                    <small>{m.role}</small>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- POSTCARDS HOME ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Postcards Home" title="In Our Travellers' Words" />
          <TestimonialSlider />
        </div>
      </section>

      <CtaBanner
        compact
        image="images/hero/hero-ladakh.webp"
        focal="58% 42%"
        focalM="66% 40%"
        badge="Twelve years, still answering"
        title="Let's Plan Yours"
        text="Tell us the occasion and the rough dates. A real trip designer takes it from there — no obligation, nothing to pay."
        cta="Start My Trip"
        secondary={{ label: "Browse Packages", to: "/packages" }}
      />
    </>
  );
}
