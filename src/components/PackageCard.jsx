import { useState } from "react";
import { Link } from "react-router-dom";
import { FALLBACK_IMG } from "../data/packages";
import { fmtINR } from "../data/site";
import Icon from "./Icon";
import Reveal from "./Reveal";

/* "Srinagar · Gulmarg · Pahalgam" → ["Srinagar", "Gulmarg", "Pahalgam"] */
const stopsOf = (loc) => loc.split("·").map((s) => s.trim()).filter(Boolean);

/* Airport-style code from a city name — "Pahalgam" → PAH.
   Not real IATA and not trying to be: it is a typographic device that makes the
   itinerary read as a ticket, which is why three letters of the name is enough. */
const code = (city) => city.replace(/[^\p{L}]/gu, "").slice(0, 3).toUpperCase();

export default function PackageCard({ pkg, delay = 0 }) {
  const [fav, setFav] = useState(false);

  /* Two of the packages are single-destination ("North & South Goa"), where
     there is no first and last city to fly between — those get a pinned
     destination line instead of a route. */
  const stops = stopsOf(pkg.location);
  const isRoute = stops.length >= 2;
  const via = stops.length - 2;
  const href = `/package/${pkg.id}`;

  return (
    <Reveal as="article" className="pkg-card" delay={delay}>
      <div className="pkg-ticket">
        <div className="pkg-media">
          <img
            src={pkg.image}
            alt={pkg.imageAlt ?? pkg.title}
            loading="lazy"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
          />
          <span className="pkg-stamp">{pkg.badge}</span>
          <button
            className={`pkg-fav${fav ? " active" : ""}`}
            aria-label="Save to wishlist"
            aria-pressed={fav}
            onClick={() => setFav(!fav)}
          >
            <Icon name="heart" />
          </button>
          <div className="pkg-chips">
            <span className="pkg-chip pkg-chip--rate">
              <Icon name="star" /> {pkg.rating} <small>({pkg.reviews})</small>
            </span>
            <span className="pkg-chip">
              <Icon name="clock" /> {pkg.nights}N / {pkg.days}D
            </span>
          </div>
        </div>

        <div className="pkg-body">
          {/* Route strip. Flat children, placed by the grid: codes on row one
              with the flight path between them, city names on row two. */}
          {isRoute ? (
            <div className="pkg-route">
              <b className="pkg-code">{code(stops[0])}</b>
              <span className="pkg-path">
                <i className="pkg-plane"><Icon name="plane" /></i>
              </span>
              <b className="pkg-code">{code(stops[stops.length - 1])}</b>
              <small className="pkg-city">{stops[0]}</small>
              <em className="pkg-stops">{via > 0 ? `${via} stop${via > 1 ? "s" : ""}` : "direct"}</em>
              <small className="pkg-city">{stops[stops.length - 1]}</small>
            </div>
          ) : (
            <div className="pkg-route pkg-route--single">
              <span className="pkg-where"><Icon name="pin" /> {pkg.location}</span>
              <span className="pkg-path">
                <i className="pkg-plane"><Icon name="plane" /></i>
              </span>
            </div>
          )}

          <h3 className="pkg-title"><Link to={href}>{pkg.title}</Link></h3>

          <div className="pkg-tags">
            {pkg.tags.map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>

        {/* Below the perforation — the part you tear off and keep. */}
        <div className="pkg-stub">
          <div className="pkg-fare">
            <small>Fare · per person</small>
            <b>
              {pkg.oldPrice && <del>{fmtINR(pkg.oldPrice)}</del>}
              {fmtINR(pkg.price)}
            </b>
          </div>
          <span className="pkg-barcode" aria-hidden="true" />
          {/* Carries the card-wide hit area (see .pkg-go::after in cards.css). */}
          <Link className="pkg-go" to={href} aria-label={`View ${pkg.title}`}>
            <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
