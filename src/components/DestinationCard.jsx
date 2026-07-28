import { Link } from "react-router-dom";
import Icon from "./Icon";
import { FALLBACK_IMG } from "../data/packages";

/* Reusable destination tile — links into the packages listing.
   `showCountry` prefixes the country to the blurb (used on the Destinations page). */
export default function DestinationCard({ dest, showCountry = false }) {
  return (
    <Link className="dest-card" to={`/packages?search=${encodeURIComponent(dest.query)}`}>
      <img
        src={dest.image}
        alt={dest.name}
        loading="lazy"
        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
      />
      <div className="dest-body">
        <h3>{dest.name}</h3>
        <p>{showCountry ? `${dest.country} · ${dest.blurb}` : dest.blurb}</p>
        <span className="dest-cta">Explore trips <Icon name="arrow" /></span>
      </div>
    </Link>
  );
}
