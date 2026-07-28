import Icon from "../../components/Icon";
import { DESTINATIONS } from "../../data/destinations";
import "./Marquee.css";

/* Scrolling destination strip below the hero. */
export default function Marquee() {
  return (
    <div className="hero-marquee">
      <div className="marquee">
        <div className="marquee-track">
          {[...DESTINATIONS, ...DESTINATIONS].map((d, i) => (
            <span className="marquee-item" key={i}><Icon name="pin" /> {d.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
