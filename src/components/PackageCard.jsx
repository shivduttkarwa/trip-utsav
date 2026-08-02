import { useState } from "react";
import { Link } from "react-router-dom";
import { FALLBACK_IMG } from "../data/packages";
import { fmtINR } from "../data/site";
import Icon from "./Icon";
import Button from "./Button";
import Reveal from "./Reveal";

export default function PackageCard({ pkg, delay = 0 }) {
  const [fav, setFav] = useState(false);
  const stars = "★".repeat(Math.round(pkg.rating));

  return (
    <Reveal as="article" className="pkg-card" delay={delay}>
      <div className="pkg-media">
        <img
          src={pkg.image}
          alt={pkg.imageAlt ?? pkg.title}
          loading="lazy"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
        />
        <span className="badge badge-orange">{pkg.badge}</span>
        <button
          className={`pkg-fav${fav ? " active" : ""}`}
          aria-label="Save to wishlist"
          onClick={() => setFav(!fav)}
        >
          <Icon name="heart" />
        </button>
        <span className="pkg-duration"><Icon name="clock" /> {pkg.nights}N / {pkg.days}D</span>
      </div>

      <div className="pkg-body">
        <div className="pkg-meta">
          <span className="pkg-loc"><Icon name="pin" /> {pkg.location}</span>
          <span className="rating">
            <span className="stars">{stars}</span> {pkg.rating} <small>({pkg.reviews})</small>
          </span>
        </div>
        <h3><Link to={`/package/${pkg.id}`}>{pkg.title}</Link></h3>
        <div className="pkg-tags">
          {pkg.tags.map((t) => <span key={t}>{t}</span>)}
        </div>
        <div className="pkg-foot">
          <div className="pkg-price">
            <small>Starting from</small>
            <span className="amount">
              <del>{fmtINR(pkg.oldPrice)}</del>{fmtINR(pkg.price)} <span>/person</span>
            </span>
          </div>
          <Button variant="outline" size="sm" icon="arrow" to={`/package/${pkg.id}`}>View</Button>
        </div>
      </div>
    </Reveal>
  );
}
