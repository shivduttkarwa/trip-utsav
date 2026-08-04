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
/* The founding story happens on a houseboat, so the photograph is one. */
const STORY = asset("images/packages/kerala-backwaters/02-alleppey-houseboat.webp");

/* THE PAGE IS A PASSPORT.
 *
 * A travel company's history laid out as the one document every traveller
 * owns: a navy cover, a first-entry story, milestone years as visa stamps at
 * odd angles, values sworn on a customs declaration, and the team as crew
 * passes with machine-readable strips. One stamp slot is left dashed and
 * empty — reserved — and clicking it opens the enquiry form, because the
 * whole page has been walking the reader toward that blank space.
 */
const STAMPS = [
  { year: "2014", shape: "round", ink: "blue", tilt: "-7deg", title: "Founded", detail: "Indore · one desk, one phone" },
  { year: "2017", shape: "rect", ink: "green", tilt: "2.5deg", title: "Borders Crossed", detail: "first passports on the desk — the visa team is born" },
  { year: "2020", shape: "rect", ink: "rust", tilt: "-3.5deg", title: "Rescheduled, Not Abandoned", detail: "every locked-down trip honoured, rebooked or refunded" },
  { year: "2022", shape: "round", ink: "green", tilt: "6deg", title: "Destination №100", detail: "Ha Long Bay, since you ask" },
  { year: "2025", shape: "rect", ink: "blue", tilt: "-2deg", title: "Traveller 25,000", detail: "came home with sand in her shoes" }
];

const DECLARATIONS = [
  { title: "People Before Margins", text: "If the cheaper hotel is the better hotel, that is the one in your quote. Commission has never chosen a room for us." },
  { title: "The Whole Truth, On Paper", text: "Line-item pricing, real photographs, honest trade-offs. Surprises belong in trips, never in invoices." },
  { title: "Every Trip Is an Occasion", text: "Birthdays get cake, anniversaries get décor on the bed, first flights get the window seat. Always have." },
  { title: "We Stay On the Hook", text: "When something breaks mid-journey we fix it first and settle the paperwork later. Your holiday outranks our ledger." }
];

const TEAM = [
  {
    name: "Kailash Utsav", role: "Founder & Chief Explorer", img: IMG("photo-1560250097-0b93528c311a", 600),
    fields: [["On the road since", "2014"], ["Known for", "Replying at 2 a.m."]],
    mrz: ["P<TUTSAV<<KAILASH<UTSAV<<<<<<<<<<<<<<<<<<<<", "FOUNDER<<SINCE2014<<INDORE<<<<<<<<<<<<<<<01"]
  },
  {
    name: "Meera Nair", role: "Head of Itineraries", img: IMG("photo-1573496359142-b8d87734a5a2", 600),
    fields: [["On the road since", "2016"], ["Known for", "Napkin sketches that become routes"]],
    mrz: ["P<TUTSAV<<MEERA<NAIR<<<<<<<<<<<<<<<<<<<<<<<", "ITINERARIES<<SINCE2016<<<<<<<<<<<<<<<<<<<02"]
  },
  {
    name: "Arjun Bhatt", role: "Visas & Documentation", img: IMG("photo-1472099645785-5658abf4ff4e", 600),
    fields: [["On the road since", "2017"], ["Known for", "Schengen files, first attempt"]],
    mrz: ["P<TUTSAV<<ARJUN<BHATT<<<<<<<<<<<<<<<<<<<<<<", "VISAS<<SINCE2017<<FIRSTATTEMPT<<<<<<<<<<<03"]
  },
  {
    name: "Sana Qureshi", role: "On-trip Support Lead", img: IMG("photo-1580489944761-15a19d654956", 600),
    fields: [["On the road since", "2019"], ["Known for", "Fixing missed flights before breakfast"]],
    mrz: ["P<TUTSAV<<SANA<QURESHI<<<<<<<<<<<<<<<<<<<<<", "SUPPORT<<SINCE2019<<TIMEZONE<YOURS<<<<<<<04"]
  }
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
          <Reveal as="h1" className="display-2">Twelve Years of Ink</Reveal>
          <Reveal as="p" delay={0.15}>
            Some companies keep annual reports. We keep a passport — stamps, signatures, and
            25,000 names that travelled on it.
          </Reveal>
        </div>
      </header>

      {/* ---------- THE COVER ---------- */}
      <section className="ab-cover">
        <div className="container">
          <Reveal className="ab-cover-frame" variant="zoom">
            <span className="ab-cover-emblem" aria-hidden="true"><Icon name="globe" /></span>
            <span className="ab-cover-type">Passport</span>
            <h2 className="ab-cover-name">Trip Utsav</h2>
            <em className="ab-cover-motto">The Republic of Celebration</em>
            <p>Issued in Indore, est. 2014 — valid wherever life throws a party.</p>
            <div className="ab-cover-row">
              <span>Bearers · 25,000+</span>
              <span>Territories · 120+</span>
              <span>Renewed · daily</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- PAGE 01 — THE FIRST ENTRY ---------- */}
      <section className="section">
        <div className="container ab-story">
          <Reveal variant="left" className="ab-story-media">
            <img src={STORY} alt="A houseboat drifting through the Alleppey backwaters" onError={onImgError} />
            <span className="ab-story-stamp" aria-hidden="true">
              <b>First Entry</b>
              <i>Kerala · Dec 2014</i>
            </span>
          </Reveal>

          <Reveal variant="right">
            <span className="eyebrow">Page 01 · The First Entry</span>
            <h2 className="display-2 ab-story-title">Nineteen People, One Houseboat</h2>
            <p className="lead mb-2">
              In December 2014, our founder took on the hardest clients of his life: his own
              family. Nineteen people across three generations, one houseboat in Alleppey, for
              his parents' fortieth wedding anniversary.
            </p>
            <p className="mb-2">
              The week was beautiful chaos — a seasick uncle, a toddler's sandal overboard, a
              wheelchair coaxed up a gangway. But on the last evening, with everyone singing on
              deck, his father said the sentence this company is built on: <em>"Forty years —
              and this is the first week the whole family has belonged to each other."</em>
            </p>
            <p className="mb-3">
              Trip Utsav was registered three months later and named in that spirit.
              <b> Utsav</b> means festival — because we don't really sell travel. We sell the
              occasions hiding inside it.
            </p>
            <Button icon="arrow" onClick={() => openEnquiry()}>Plan a Trip With Us</Button>
          </Reveal>
        </div>
      </section>

      {/* ---------- THE STAMPS ---------- */}
      <section className="section ab-pages">
        <div className="container">
          <SectionHead
            layout="center"
            eyebrow="Pages 02–07"
            title="Every Year Leaves a Mark"
            text="Our milestones, recorded the way a passport records them — in ink, at odd angles, with no room for modesty."
          />
          <div className="ab-stamps">
            {STAMPS.map((s, i) => (
              <Reveal key={s.year} variant="zoom" delay={i * 0.09}>
                <div
                  className={`ab-stamp ab-stamp--${s.shape} ab-stamp--${s.ink}`}
                  style={{ "--tilt": s.tilt }}
                >
                  <span className="ab-stamp-org">Trip Utsav · Immigration of Joy</span>
                  <span className="ab-stamp-year">{s.year}</span>
                  <strong>{s.title}</strong>
                  <em>{s.detail}</em>
                </div>
              </Reveal>
            ))}

            {/* The blank slot the whole page walks toward. */}
            <Reveal variant="zoom" delay={STAMPS.length * 0.09}>
              <button className="ab-stamp ab-stamp--reserved" onClick={() => openEnquiry()}>
                <span className="ab-stamp-org">Trip Utsav · Immigration of Joy</span>
                <span className="ab-stamp-year">20__</span>
                <strong>Space Reserved</strong>
                <em>your trip goes here — tap to claim it</em>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- ENTRY RECORD ---------- */}
      <section className="section-tight">
        <div className="container">
          <Reveal className="ab-meter"><span className="eyebrow">Entry Record</span></Reveal>
          <div className="stats">
            <Stat value={12} label="Years in Service" />
            <Stat value={25000} label="Bearers Carried" />
            <Stat value={120} label="Territories Covered" />
            <Stat value={98} suffix="%" label="Renew With Us" />
          </div>
        </div>
      </section>

      {/* ---------- CUSTOMS DECLARATION ---------- */}
      <section className="section bg-surface">
        <div className="container">
          <SectionHead
            layout="center"
            eyebrow="Customs"
            title="Nothing to Declare, Except…"
            text="Four things we carry through every border, and have never once paid duty on."
          />
          <Reveal className="ab-form">
            <div className="ab-form-head">
              <span>Customs Declaration</span>
              <span>Form TU-04 · Rev. 2026</span>
            </div>
            <p className="ab-form-intro">
              The undersigned, travelling on behalf of 25,000 guests, declares the following —
              and nothing else:
            </p>
            <div className="ab-form-rows">
              {DECLARATIONS.map((d) => (
                <div className="ab-decl" key={d.title}>
                  <span className="ab-box" aria-hidden="true"><Icon name="check" /></span>
                  <div>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="ab-form-foot">
              <div className="ab-sign">
                <span className="ab-sign-name">Kailash Utsav</span>
                <small>Signature of the undersigned</small>
              </div>
              <span className="ab-form-seal" aria-hidden="true">Trip Utsav · Est. 2014 · Indore</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- THE CREW ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            layout="center"
            eyebrow="Issuing Authority"
            title="The Four Signatures Behind Every Stamp"
            text="No call centres, no ticket queues. Every trip on this site is drafted, stamped and signed by one of these four."
          />
          <div className="ab-crew">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={(i % 2) * 0.1}>
                <article className="ab-id">
                  <div className="ab-id-strip">
                    <span>Trip Utsav · Crew Pass</span>
                    <span>Type P</span>
                  </div>
                  <div className="ab-id-main">
                    <div className="ab-id-photo">
                      <img src={m.img} alt={m.name} loading="lazy" decoding="async" onError={onImgError} />
                    </div>
                    <dl>
                      <div className="ab-id-wide">
                        <dt>Name</dt>
                        <dd className="ab-id-name">{m.name}</dd>
                      </div>
                      <div className="ab-id-wide">
                        <dt>Role</dt>
                        <dd>{m.role}</dd>
                      </div>
                      {m.fields.map(([k, v]) => (
                        <div key={k} className={v.length > 16 ? "ab-id-wide" : undefined}>
                          <dt>{k}</dt>
                          <dd>{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="ab-mrz" aria-hidden="true">
                    <span>{m.mrz[0]}</span>
                    <span>{m.mrz[1]}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- IN THEIR OWN INK ---------- */}
      <section className="section bg-surface">
        <div className="container">
          <SectionHead eyebrow="In Their Own Ink" title="What Travellers Write Back" />
          <TestimonialSlider />
        </div>
      </section>

      <CtaBanner
        compact
        image="images/hero/hero-ladakh.webp"
        focal="58% 42%"
        focalM="66% 40%"
        badge="Blank pages, left on purpose"
        title="Add Your Stamp"
        text="Tell us the occasion and the rough dates. A trip designer drafts the route, and this passport gets one more entry — yours."
        cta="Start My Trip"
        secondary={{ label: "Browse Packages", to: "/packages" }}
      />
    </>
  );
}
