import { Link } from "react-router-dom";
import Icon from "../../components/Icon";
import { DESTINATIONS } from "../../data/destinations";
import "./Marquee.css";

/* Scrolling destination strip below the hero. Each item links into the packages
   listing on that destination, the same target the destination cards use.

   The list is rendered twice because the -50% keyframe needs a second copy to
   loop against. That copy is a visual device, not content: it is hidden from
   assistive tech and pulled out of the tab order, so the strip offers twelve
   destinations rather than announcing all of them twice. */
export default function Marquee() {
  const run = (copy) =>
    DESTINATIONS.map((d) => (
      <Link
        className="marquee-item"
        key={`${copy}-${d.name}`}
        to={`/packages?search=${encodeURIComponent(d.query)}`}
        {...(copy === 1 && { "aria-hidden": true, tabIndex: -1 })}
      >
        <Icon name="pin" /> {d.name}
      </Link>
    ));

  return (
    <div className="hero-marquee">
      <div className="marquee">
        <div className="marquee-track">
          {run(0)}
          {run(1)}
        </div>
      </div>
    </div>
  );
}
