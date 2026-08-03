import { Link } from "react-router-dom";
import Icon from "./Icon";
import { FALLBACK_IMG } from "../data/packages";

/* ============================================================
   DESTINATION CARD — a postage stamp.

   A wander-list is a set of places you mean to collect, and a
   stamp is the thing you collect. The metaphor is built rather
   than drawn: the perforations are a real mask cut into the
   paper's edge, and the shadow is a drop-shadow that reads that
   masked silhouette, so it falls from the notches instead of
   from a rectangle.

   Hovering lifts the stamp straight off the page — no rotation
   anywhere on the card.
   ============================================================ */
export default function DestinationCard({ dest }) {
  return (
    <Link className="dest-card" to={`/packages?search=${encodeURIComponent(dest.query)}`}>
      <span className="dest-stamp">
        <span className="dest-paper">
          <span className="dest-face">
            <img
              src={dest.image}
              alt={dest.name}
              loading="lazy"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
            />
            <span className="dest-rule" />
            <span className="dest-country">{dest.country}</span>
            <h3 className="dest-name">{dest.name}</h3>
          </span>
        </span>
      </span>

      <span className="dest-body">
        <p>{dest.blurb}</p>
        <span className="dest-cta">Explore trips <Icon name="arrow" /></span>
      </span>
    </Link>
  );
}
