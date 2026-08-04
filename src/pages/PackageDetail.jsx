import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PACKAGES, FALLBACK_IMG } from "../data/packages";
import { fmtINR, SITE } from "../data/site";
import { useUI } from "../components/UIContext";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import PackageCard from "../components/PackageCard";
import CtaBanner from "../components/CtaBanner";
import Lightbox from "../components/Lightbox";
import NotFound from "./NotFound";
import "../styles/package-detail.css";

/* THE TRIP, TOLD AS A JOURNEY.
 *
 * The itinerary is the most important thing on a package page — it is the
 * product — and it used to be collapsed inside an <Accordion>: six closed rows
 * with the actual trip hidden behind them, under a stack of equal-weight
 * headings that gave "Overview" the same billing as six days in Kashmir.
 *
 * So the itinerary stops being a widget and becomes the spine of the page. The
 * days scroll past on one side while a stage on the other holds still, showing
 * the photograph of wherever you have reached under a numeral counting the day.
 * Scrolling the page is travelling the trip. Nothing is hidden, nothing is
 * clicked open, and the length of the section is the length of the holiday —
 * which is information, not decoration.
 *
 * The booking card left the sidebar for a bar pinned to the foot of the window.
 * A sticky card costs a third of the page width on every screen, and the route
 * needs that width for its stage; a bar costs a strip, is always in reach, and
 * is the same control on a phone as on a desktop rather than a separate mobile
 * treatment bolted underneath.
 */

const onImgError = (e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; };
const pad = (n) => String(n).padStart(2, "0");

export default function PackageDetail() {
  const { id } = useParams();
  const { openEnquiry } = useUI();
  const pkg = PACKAGES.find((p) => p.id === id);

  const [day, setDay] = useState(0);
  const [ready, setReady] = useState(false);      /* booking bar: small pause after arriving */
  const [atFooter, setAtFooter] = useState(false); /* booking bar: stood down at the footer */
  const [shot, setShot] = useState(null);   /* gallery lightbox: open index, null = closed */
  const dayEls = useRef([]);

  const related = useMemo(() => {
    if (!pkg) return [];
    return PACKAGES.filter((p) => p.id !== pkg.id && p.category === pkg.category).slice(0, 3);
  }, [pkg]);

  /* The booking bar arrives on its own, a beat after the page does — not on
     scroll. The pause lets the hero land first; then the bar slides up and
     stays in reach for the whole read. */
  useEffect(() => {
    setReady(false);
    const t = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(t);
  }, [pkg?.id]);

  /* …and stands down at the footer: once the site's own closing furniture is
     on screen the page has ended, and a bar over it is just in the way. The
     footer lives outside this page's subtree, hence the query. */
  useEffect(() => {
    const footer = document.querySelector(".footer");
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setAtFooter(e.isIntersecting), { threshold: 0 });
    io.observe(footer);
    return () => io.disconnect();
  }, [pkg?.id]);

  const barOn = ready && !atFooter;

  /* Which day the stage is showing.
   *
   * The rootMargin collapses the viewport to a thin band across its middle, so
   * a day becomes current when it crosses the centre of the screen rather than
   * when it first appears at the bottom — which is what keeps the picture in
   * step with the text being read rather than a screen ahead of it.
   *
   * Re-run on package id: the refs array is rebuilt when the route changes and
   * an observer still watching the previous trip's nodes would never fire. */
  useEffect(() => {
    if (!pkg) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setDay(Number(e.target.dataset.i));
        });
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 }
    );
    dayEls.current.filter(Boolean).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pkg?.id, pkg]);

  useEffect(() => { setDay(0); }, [pkg?.id]);

  if (!pkg) return <NotFound />;

  const gallery = pkg.gallery ?? [{ src: pkg.image, alt: pkg.imageAlt ?? pkg.title }];
  /* One frame per day, cycled. Trips run five to seven days against five
     photographs, so the back of a long itinerary reuses the front of the
     gallery rather than falling back to a placeholder. */
  const frameFor = (i) => gallery[i % gallery.length];
  const waLink = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(`Hi! I'm interested in the "${pkg.title}" package.`)}`;

  return (
    <>
      {/* ---------- HERO ---------- */}
      <header className="detail-hero">
        <div className="hero-media">
          <img src={pkg.image} alt={pkg.imageAlt ?? pkg.title} onError={onImgError} />
        </div>

        <div className="container tr-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>/</span>
            <Link to="/packages">Packages</Link><span>/</span>
            <Link to={`/packages?category=${pkg.category}`} style={{ textTransform: "capitalize" }}>{pkg.category}</Link>
          </nav>

          <h1>{pkg.title}</h1>

          {/* The trip as data, set on one rule. Each cell is a fact worth
              comparing between packages; prose would bury all four. */}
          <dl className="tr-facts">
            <div>
              <dt>Route</dt>
              <dd>{pkg.location}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{pkg.nights} nights · {pkg.days} days</dd>
            </div>
            <div>
              <dt>Rated</dt>
              <dd>{pkg.rating} <small>/ {pkg.reviews} reviews</small></dd>
            </div>
            <div>
              <dt>From</dt>
              <dd className="tr-facts-price">{fmtINR(pkg.price)} <small>pp</small></dd>
            </div>
          </dl>
        </div>
      </header>

      {/* ---------- THE CASE ---------- */}
      <section className="tr-open">
        <div className="container tr-open-grid">
          <Reveal className="tr-open-lead">
            <span className="eyebrow">{pkg.badge}</span>
            <p>{pkg.summary}</p>
            <div className="tr-tags">
              {pkg.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
          </Reveal>

          <Reveal className="tr-hi" delay={0.1}>
            <h2>Why this one</h2>
            <ol>
              {pkg.highlights.map((h, i) => (
                <li key={h}><b>{pad(i + 1)}</b><span>{h}</span></li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------- THE ROUTE ---------- */}
      <section className="tr-route" aria-label="Day-by-day itinerary">
        <div className="container">
          <div className="tr-route-head">
            <span className="eyebrow">The route</span>
            <h2 className="display-2">{pkg.days} days, in order</h2>
          </div>

          <div className="tr-route-grid">
            {/* The stage. Sticky, so it holds while the days move past it. */}
            <div className="tr-stage" aria-hidden="true">
              <div className="tr-stage-frame">
                {pkg.itinerary.map((d, i) => (
                  <img
                    key={d.title}
                    className={i === day ? "is-on" : ""}
                    src={frameFor(i).src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={onImgError}
                  />
                ))}
                <span className="tr-stage-num">{pad(day + 1)}</span>
                <span className="tr-stage-place">{pkg.itinerary[day]?.title}</span>
              </div>

              {/* Progress as a filled rail — how far through the trip you have
                  read, in the same gesture as how far through the page. */}
              <div className="tr-rail">
                <i style={{ "--p": `${((day + 1) / pkg.itinerary.length) * 100}%` }} />
                <b>{pad(day + 1)} / {pad(pkg.itinerary.length)}</b>
              </div>
            </div>

            <ol className="tr-days">
              {pkg.itinerary.map((d, i) => (
                <li
                  key={d.title}
                  data-i={i}
                  ref={(el) => { dayEls.current[i] = el; }}
                  className={i === day ? "is-on" : ""}
                >
                  <span className="tr-day-no">Day {pad(i + 1)}</span>
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                  {/* The stage is desktop-only; below it the frame travels with
                      its own day instead of being pinned beside them. */}
                  <img
                    className="tr-day-shot"
                    src={frameFor(i).src}
                    alt={frameFor(i).alt}
                    loading="lazy"
                    decoding="async"
                    onError={onImgError}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- THE LEDGER ---------- */}
      <section className="tr-ledger">
        <div className="container">
          <div className="tr-route-head">
            <span className="eyebrow">No surprises</span>
            <h2 className="display-2">What the price covers</h2>
          </div>

          <div className="tr-ledger-grid">
            <Reveal className="tr-col tr-col--in">
              <h3>Included</h3>
              <ul>
                {pkg.inclusions.map((item) => (
                  <li key={item}><Icon name="check" /><span>{item}</span></li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="tr-col tr-col--out" delay={0.1}>
              <h3>Not included</h3>
              <ul>
                {pkg.exclusions.map((item) => (
                  <li key={item}><Icon name="x" /><span>{item}</span></li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="tr-assure">
            <span><Icon name="shield" /> Secure payments</span>
            <span><Icon name="headset" /> 24×7 trip support</span>
            <span><Icon name="tag" /> Best price promise</span>
            <span><Icon name="calendar" /> Free date changes up to 15 days out</span>
          </div>
        </div>
      </section>

      {/* ---------- GALLERY ---------- */}
      <section className="tr-shots-wrap">
        <div className="container">
          <div className="tr-route-head">
            <span className="eyebrow">On the ground</span>
            <h2 className="display-2">{pkg.location}</h2>
          </div>
          <ul className="tr-shots">
            {gallery.map(({ src, alt }, i) => (
              <li key={src}>
                <button type="button" onClick={() => setShot(i)} aria-label={`View photo ${i + 1} of ${gallery.length}`}>
                  <img
                    src={src}
                    alt={alt || `${pkg.title} — photo ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    onError={onImgError}
                  />
                </button>
              </li>
            ))}
          </ul>
          {shot != null && (
            <Lightbox images={gallery} index={shot} onIndex={setShot} onClose={() => setShot(null)} />
          )}
        </div>
      </section>

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
            <div className="grid grid-3 swipe-m">
              {related.map((p, i) => <PackageCard key={p.id} pkg={p} delay={i * 0.09} />)}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        compact
        image="images/hero/hero-maldives.webp"
        focal="50% 46%"
        badge="Every trip here is customisable"
        title="Want This Trip, Your Way?"
        text="Different dates, a slower pace, an extra city — tell us and we'll rebuild it around you at no extra cost to ask."
        cta="Plan My Trip Free"
        secondary={{ label: "See Destinations", to: "/destinations" }}
      />

      {/* ---------- BOOKING BAR ---------- */}
      <div className={`tr-bar${barOn ? " is-on" : ""}`}>
        <div className="container">
          <div className="tr-bar-price">
            <small>{pkg.nights}N / {pkg.days}D · from</small>
            <b>
              {pkg.oldPrice && <del>{fmtINR(pkg.oldPrice)}</del>}
              {fmtINR(pkg.price)}
              <span>/ person</span>
            </b>
          </div>
          <div className="tr-bar-actions">
            <Button
              variant="secondary"
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              icon="whatsapp"
            >
              WhatsApp
            </Button>
            <Button icon="arrow" onClick={() => openEnquiry(pkg.title)}>
              Enquire — it's free
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
