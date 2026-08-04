import { SITE } from "../../data/site";
import Reveal from "../../components/Reveal";
import SectionHead from "../../components/SectionHead";
import "./StudioPostcard.css";

/* THE PICTURE SIDE.
 *
 * The section above is the written side of a postcard; this is the other
 * face of the same card. The map is the photograph — retro arched
 * "Greetings from Mumbai" lettering, a hand-drawn ring around where we
 * actually are — and the address and hours are printed on the caption band
 * beneath the picture, the way linen postcards captioned theirs. The white
 * band also leaves OpenStreetMap's attribution unobscured. */
export default function StudioPostcard() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          layout="center"
          eyebrow="The Picture Side"
          title="Chai's On When You Arrive"
          text="You've written the message side — this is the picture side, and where it lands."
        />
        <Reveal className="pv-card" variant="zoom">
          <div className="pv-map-box">
            <iframe
              className="pv-map"
              title="VoyageNest office location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=72.80%2C19.03%2C72.87%2C19.09&layer=mapnik&marker=19.0607%2C72.8330"
              loading="lazy"
            ></iframe>

            {/* retro postcard lettering */}
            <svg className="pv-greet" viewBox="0 0 340 150" aria-hidden="true">
              <path id="pv-arc" d="M20 84 Q 170 22 320 84" fill="none" />
              <text className="pv-greet-script">
                <textPath href="#pv-arc" startOffset="50%" textAnchor="middle">Greetings from</textPath>
              </text>
              <text className="pv-greet-name" x="170" y="138" textAnchor="middle">MUMBAI</text>
            </svg>

            {/* the annotation a friend would ink over the photo */}
            <span className="pv-ring" aria-hidden="true" />
            <span className="pv-here" aria-hidden="true">we're here — come on up!</span>
          </div>

          {/* the printed caption band */}
          <div className="pv-caption">
            <div className="pv-cap-left">
              <b>VoyageNest Studio</b>
              <span>{SITE.address}</span>
              <span>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
                {" · "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </span>
            </div>
            <ul className="pv-cap-hours">
              <li><span>Mon – Fri</span>9:30 AM – 7:30 PM</li>
              <li><span>Saturday</span>10:00 AM – 6:00 PM</li>
              <li><span>Sunday</span>On-trip support only</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
