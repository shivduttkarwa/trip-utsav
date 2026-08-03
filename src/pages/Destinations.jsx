import { useState } from "react";
import { Link } from "react-router-dom";
import { DESTINATIONS } from "../data/destinations";
import { FALLBACK_IMG, IMG } from "../data/packages";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import DestinationCard from "../components/DestinationCard";
import CtaBanner from "../components/CtaBanner";

const HERO = IMG("photo-1530521954074-e64f6810b32d", 2000);

const FILTERS = [
  { value: "", label: "All" },
  { value: "India", label: "India" },
  { value: "abroad", label: "International" }
];

export default function Destinations() {
  const [filter, setFilter] = useState("");

  const list = DESTINATIONS.filter((d) => {
    if (!filter) return true;
    return filter === "India" ? d.country === "India" : d.country !== "India";
  });

  return (
    <>
      <header className="page-hero">
        <div className="hero-media">
          <img src={HERO} alt="" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <nav className="breadcrumb"><Link to="/">Home</Link><span>/</span> Destinations</nav>
          <Reveal as="h1" className="display-2">Where Will You Celebrate Next?</Reveal>
          <Reveal as="p" delay={0.15}>
            Twelve places our travellers can't stop talking about — tap one to see every trip we
            run there.
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <SectionHead
            layout="split"
            eyebrow="The Wander-list"
            title="Destinations We Know Inside Out"
            aside={
              <div className="chip-row">
                {FILTERS.map((f) => (
                  <button
                    key={f.label}
                    className={`chip${filter === f.value ? " active" : ""}`}
                    onClick={() => setFilter(f.value)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            }
          />
          <div className="grid grid-4">
            {list.map((d, i) => (
              <Reveal key={d.name} delay={(i % 4) * 0.07}>
                <DestinationCard dest={d} />
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* The in-grid "don't see your destination?" prompt used to live here and
          has been folded into this band — two invitations to the same modal,
          one directly above the other, read as a page unsure of its own ask.
          Secondary points at packages: a visitor on this page has been looking
          at places, so the useful next step is trips. */}
      <CtaBanner
        compact
        image="images/hero/hero-kerala.webp"
        focal="50% 52%"
        badge="12 destinations, endless routes"
        title="Don't See Your Dream Destination?"
        text="Name the place — or just the feeling — and we'll build the route around it. No obligation, nothing to pay."
        cta="We'll Plan It Anyway"
        secondary={{ label: "Browse Packages", to: "/packages" }}
      />
    </>
  );
}
