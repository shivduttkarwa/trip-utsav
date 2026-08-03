import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SITE } from "../data/site";
import { DESTINATIONS } from "../data/destinations";
import { useUI } from "./UIContext";
import Icon from "./Icon";
import Button from "./Button";
import "../styles/footer.css";
import asset from "../asset";

/* WHERE NEXT — the type IS the window.
 *
 * The rest of this site works in paper: boarding passes, stamps, postcards, a
 * passport page. Doing another one of those down here would be a fifth verse
 * of the same song, so the footer goes the other way — no object, no texture,
 * no simulation of a thing. Just scale, photography and one idea.
 *
 * The idea: a destination's name is set at colossal editorial scale and its
 * letterforms are cut out of that destination's own photograph. The word is
 * not labelling the place, it is a hole in the page with the place behind it.
 * The index underneath is the control — move across it and the word and the
 * view inside it change together. Left alone it travels on its own, which is
 * the whole proposition of the company stated without a sentence.
 *
 * Everything else in the footer is deliberately quiet: thin rules, small type,
 * generous air. One loud idea and a lot of silence reads as modern; several
 * competing ideas read as a template.
 */

/* Six, hand-picked for spread rather than sliced off the top of the list —
   the first six destinations are all Indian, which would make the footer look
   like a domestic-only operator. Resolved by name so re-ordering the data
   cannot silently change what the footer shows, and filtered so a rename
   drops a card instead of rendering `undefined`. */
const WANT = ["Kashmir", "Ladakh", "Bali", "Maldives", "Dubai", "Europe"];

/* Art overrides for the word, keyed by destination.
 *
 * The frame that reads best inside letterforms is not the frame that reads
 * best on a card: a card shows a whole composition, the word shows a handful
 * of vertical slices of it. Our own hero photography is shot wide and open,
 * which survives that treatment where a busier stock frame turns to noise.
 * Only the word is overridden — the destination card and the Kashmir postcard
 * still take DESTINATIONS.image, so nothing else on the site moves.
 *
 * Hero art also exists for Ladakh, Bali, Kerala and Maldives if these want
 * pulling across too. */
const ART = {
  Kashmir: "images/hero/hero-kashmir.webp"
};

const PICKS = WANT.map((n) => DESTINATIONS.find((d) => d.name === n))
  .filter(Boolean)
  .map((d) => ({ ...d, art: ART[d.name] ? asset(ART[d.name]) : d.image }));

const EXPLORE = [
  { to: "/packages?category=domestic", label: "Domestic" },
  { to: "/packages?category=international", label: "International" },
  { to: "/destinations", label: "Destinations" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];

export default function Footer() {
  const { showToast } = useUI();
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  /* Travels on its own until someone takes the wheel, and never travels for a
     visitor who has asked for stillness — this is decorative motion in a
     region of the page nobody scrolled to on purpose. */
  useEffect(() => {
    if (held) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % PICKS.length), 3400);
    return () => clearInterval(id);
  }, [held]);

  const hold = (i) => () => { setActive(i); setHeld(true); };
  const release = () => setHeld(false);

  const onNewsletter = (e) => {
    e.preventDefault();
    const email = e.target.elements.email;
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      email.focus();
      showToast("Please enter a valid email address");
      return;
    }
    e.target.reset();
    showToast("You're in! Deals landing in your inbox soon ✈️");
  };

  const now = PICKS[active];

  return (
    <footer className="footer">
      <div className="lc-glow" aria-hidden="true" />

      <div className="container">
        {/* ---- The window ---- */}
        <section className="lc-stage" aria-label="Destinations">
          <div className="lc-top">
            <span className="lc-eyebrow">Where to next?</span>
            <span className="lc-count">
              <b>{String(active + 1).padStart(2, "0")}</b>
              <i />
              {String(PICKS.length).padStart(2, "0")}
            </span>
          </div>

          {/* Every word occupies the same grid cell, so the tallest sets the
              height once and nothing below moves as they change. */}
          <p className="lc-word">
            {PICKS.map((d, i) => (
              <span
                key={d.name}
                className={i === active ? "is-on" : ""}
                style={{ backgroundImage: `url("${d.art}")` }}
                aria-hidden={i !== active}
              >
                {d.name}
              </span>
            ))}
          </p>

          <p className="lc-blurb" key={now?.name}>{now?.blurb}</p>

          <ul className="lc-index" onMouseLeave={release}>
            {PICKS.map((d, i) => (
              <li key={d.name}>
                <Link
                  to={`/packages?search=${encodeURIComponent(d.query)}`}
                  className={i === active ? "is-on" : ""}
                  onMouseEnter={hold(i)}
                  onFocus={hold(i)}
                  onBlur={release}
                >
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <span>{d.name}</span>
                  <em>{d.country}</em>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Quiet half ---- */}
        <div className="lc-grid">
          <div className="lc-brand">
            <img src={asset("trip-utsav-logo.svg")} alt="Trip Utsav" />
            <p>
              Travel More, Celebrate Life. Journeys across India and the world — from weekend
              escapes to grand honeymoons — with the care of a friend and the precision of a pro.
            </p>
            <div className="lc-socials">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7h2.4l.5-3h-2.9V9.1c0-.9.3-1.6 1.7-1.6H16V4.8c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9V11H7.5v3H10v7z" /></svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.5.4 7.8.4 7.8.4s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8l5.2 3.2Z" /></svg>
              </a>
              <a href={SITE.whatsapp} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" />
              </a>
            </div>
          </div>

          <nav className="lc-nav" aria-label="Sitemap">
            <h4>Explore</h4>
            <ul>
              {EXPLORE.map((l) => (
                <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="lc-reach">
            <h4>Reach us</h4>
            {/* .footer-contact is shared with the Contact page aside — same
                dark ground, so it is reused rather than forked. */}
            <ul className="footer-contact">
              <li><Icon name="pin" /><span>{SITE.address}</span></li>
              <li><Icon name="phone" /><a href={SITE.phoneHref}>{SITE.phone}</a></li>
              <li><Icon name="mail" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </div>

          <div className="lc-sub">
            <h4>Weekly dispatch</h4>
            <p>Hand-picked offers, every week. 25,000+ travellers already on the list.</p>
            <form onSubmit={onNewsletter} noValidate>
              <input
                type="email"
                name="email"
                placeholder="you@email.com"
                aria-label="Email address"
              />
              <Button size="sm" icon="arrow" type="submit">Join</Button>
            </form>
          </div>
        </div>
      </div>

      <div className="lc-base">
        <div className="container">
          <span>© {new Date().getFullYear()} Trip Utsav — Travel More, Celebrate Life.</span>
          <span className="lc-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
