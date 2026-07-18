import { useState } from "react";
import { Link } from "react-router-dom";
import { DESTINATIONS } from "../data/destinations";
import { FALLBACK_IMG, IMG } from "../data/packages";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import Button from "../components/Button";
import { useUI } from "../components/UIContext";

const HERO = IMG("photo-1530521954074-e64f6810b32d", 2000);

const FILTERS = [
  { value: "", label: "All" },
  { value: "India", label: "India" },
  { value: "abroad", label: "International" }
];

export default function Destinations() {
  const [filter, setFilter] = useState("");
  const { openEnquiry } = useUI();

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
                <Link className="dest-card" to={`/packages?search=${encodeURIComponent(d.query)}`}>
                  <img src={d.image} alt={d.name} loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }} />
                  <div className="dest-body">
                    <h3>{d.name}</h3>
                    <p>{d.country} · {d.blurb}</p>
                    <span className="dest-cta">Explore trips <Icon name="arrow" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="center mt-4">
            <p className="lead mb-2">Don't see your dream destination?</p>
            <Button icon="arrow" onClick={() => openEnquiry()}>We'll Plan It Anyway</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
