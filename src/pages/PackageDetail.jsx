import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { PACKAGES, FALLBACK_IMG } from "../data/packages";
import { fmtINR, SITE } from "../data/site";
import { useUI } from "../components/UIContext";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import Accordion from "../components/Accordion";
import PackageCard from "../components/PackageCard";
import NotFound from "./NotFound";

const onImgError = (e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; };

export default function PackageDetail() {
  const { id } = useParams();
  const { openEnquiry } = useUI();
  const pkg = PACKAGES.find((p) => p.id === id);

  const related = useMemo(() => {
    if (!pkg) return [];
    return PACKAGES.filter((p) => p.id !== pkg.id && p.category === pkg.category).slice(0, 3);
  }, [pkg]);

  if (!pkg) return <NotFound />;

  const stars = "★".repeat(Math.round(pkg.rating));
  const gallery = pkg.gallery ?? [{ src: pkg.image, alt: pkg.imageAlt ?? pkg.title }];

  return (
    <>
      {/* ---------- HERO ---------- */}
      <header className="detail-hero">
        <div className="hero-media">
          <img src={pkg.image} alt={pkg.imageAlt ?? pkg.title} onError={onImgError} />
        </div>
        <div className="container detail-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>/</span>
            <Link to="/packages">Packages</Link><span>/</span>
            <Link to={`/packages?category=${pkg.category}`} style={{ textTransform: "capitalize" }}>{pkg.category}</Link>
          </nav>
          <span className="badge badge-orange">{pkg.badge}</span>
          <h1>{pkg.title}</h1>
          <div className="flex">
            <span className="pkg-loc" style={{ color: "rgba(255,255,255,.9)" }}><Icon name="pin" /> {pkg.location}</span>
            <span className="rating"><span className="stars">{stars}</span> {pkg.rating} <small>({pkg.reviews} reviews)</small></span>
            <span className="badge badge-glass"><Icon name="clock" /> {pkg.nights} Nights / {pkg.days} Days</span>
          </div>
        </div>
      </header>

      <div className="container section-tight">
        <div className="detail-layout">
          {/* ---------- MAIN COLUMN ---------- */}
          <div>
            <Reveal className="detail-section">
              <div className="quick-facts">
                <div className="fact"><Icon name="clock" /><strong>{pkg.nights}N / {pkg.days}D</strong><small>Duration</small></div>
                <div className="fact"><Icon name="globe" /><strong style={{ textTransform: "capitalize" }}>{pkg.category}</strong><small>{pkg.region}</small></div>
                <div className="fact"><Icon name="tag" /><strong>{fmtINR(pkg.price)}</strong><small>Per person</small></div>
                <div className="fact"><Icon name="users" /><strong>Customisable</strong><small>Dates &amp; group size</small></div>
              </div>
            </Reveal>

            <Reveal className="detail-section">
              <h2>Overview</h2>
              <p className="lead">{pkg.summary}</p>
            </Reveal>

            <Reveal className="detail-section">
              <h2>Trip Highlights</h2>
              <ul className="highlight-list">
                {pkg.highlights.map((h) => (
                  <li key={h}><Icon name="star" /> {h}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="detail-section">
              <h2>Day-by-Day Itinerary</h2>
              <Accordion
                defaultOpen={0}
                items={pkg.itinerary.map((day, i) => ({
                  day: `Day ${i + 1}`,
                  title: day.title,
                  body: day.desc
                }))}
              />
            </Reveal>

            <Reveal className="detail-section">
              <h2>What's Included</h2>
              <div className="incl-excl">
                <div className="incl">
                  <h3><Icon name="check" /> Inclusions</h3>
                  <ul>
                    {pkg.inclusions.map((item) => <li key={item}><Icon name="check" /> {item}</li>)}
                  </ul>
                </div>
                <div className="excl">
                  <h3><Icon name="x" /> Exclusions</h3>
                  <ul>
                    {pkg.exclusions.map((item) => <li key={item}><Icon name="x" /> {item}</li>)}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal className="detail-section" style={{ borderBottom: 0 }}>
              <h2>Gallery</h2>
              <div className="gallery-grid">
                {gallery.map(({ src, alt }, i) => (
                  <a key={src} href={src} target="_blank" rel="noopener noreferrer">
                    <img src={src} alt={alt || `${pkg.title} — photo ${i + 1}`} loading="lazy" onError={onImgError} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ---------- BOOKING SIDEBAR ---------- */}
          <aside>
            <Reveal variant="right">
              <div className="book-card">
                <div className="book-card-head">
                  <small>Starting from</small>
                  <div className="price">
                    <del>{fmtINR(pkg.oldPrice)}</del>
                    {fmtINR(pkg.price)} <span>/ person</span>
                  </div>
                </div>
                <div className="book-card-body">
                  <Button block size="lg" icon="arrow" onClick={() => openEnquiry(pkg.title)}>
                    Enquire Now — It's Free
                  </Button>
                  <Button
                    variant="secondary"
                    block
                    href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(`Hi! I'm interested in the "${pkg.title}" package.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon="whatsapp"
                  >
                    Chat on WhatsApp
                  </Button>
                  <div className="book-note">
                    <Icon name="shield" />
                    <span>No-cost EMI available · Free date changes up to 15 days before departure</span>
                  </div>
                  <div className="trust-row">
                    <div><Icon name="shield" /><small>Secure<br />Payments</small></div>
                    <div><Icon name="headset" /><small>24×7 Trip<br />Support</small></div>
                    <div><Icon name="tag" /><small>Best Price<br />Promise</small></div>
                  </div>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      {/* ---------- RELATED ---------- */}
      {related.length > 0 && (
        <section className="section bg-surface">
          <div className="container">
            <Reveal className="section-head split">
              <div>
                <span className="eyebrow">Keep Exploring</span>
                <h2 className="display-2">You Might Also Love</h2>
              </div>
              <Button variant="ghost" icon="arrow" to="/packages">All packages</Button>
            </Reveal>
            <div className="grid grid-3">
              {related.map((p, i) => <PackageCard key={p.id} pkg={p} delay={i * 0.09} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
