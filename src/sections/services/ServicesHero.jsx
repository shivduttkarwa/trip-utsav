import { Link } from "react-router-dom";
import { FALLBACK_IMG } from "../../data/packages";
import asset from "../../asset";
import Reveal from "../../components/Reveal";

const HERO = asset("images/hero/hero-services.webp");

const onImgError = (e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; };

/* Styled entirely by the shared .page-hero rules — no CSS of its own. */
export default function ServicesHero() {
  return (
    <header className="page-hero">
      <div className="hero-media">
        <img src={HERO} alt="" onError={onImgError} />
      </div>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <nav className="breadcrumb"><Link to="/">Home</Link><span>/</span> Services</nav>
        <Reveal as="h1" className="display-2">One Agency. Every Travel Service.</Reveal>
        <Reveal as="p" delay={0.15}>
          Flights to forex, visas to villas — if it's part of a journey, it's part of our job.
        </Reveal>
      </div>
    </header>
  );
}
