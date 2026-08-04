import { SITE } from "../../data/site";
import Icon from "../../components/Icon";
import Reveal from "../../components/Reveal";
import SectionHead from "../../components/SectionHead";
import "./StudioFinder.css";

/* The map beside the studio's address, written on a luggage tag — the one
   piece of paper travellers already trust to bring things home. */
export default function StudioFinder() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          layout="center"
          eyebrow="The Studio"
          title="Chai's On When You Arrive"
          text="Walk in for a whiteboard session — we love planning in person."
        />
        <div className="sf-grid">
          <Reveal className="sf-map-wrap">
            <iframe
              className="sf-map"
              title="VoyageNest office location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=75.83%2C22.70%2C75.90%2C22.75&layer=mapnik&marker=22.7196%2C75.8577"
              loading="lazy"
            ></iframe>
          </Reveal>

          <Reveal variant="right" className="sf-tag">
            <span className="sf-hole" aria-hidden="true" />
            <span className="sf-tag-head" aria-hidden="true">Crew tag · if in doubt, walk in</span>
            <ul className="sf-rows">
              <li><Icon name="pin" /><span>{SITE.address}</span></li>
              <li><Icon name="phone" /><a href={SITE.phoneHref}>{SITE.phone}</a></li>
              <li><Icon name="mail" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
            <ul className="sf-hours">
              <li><span>Mon – Fri</span> 9:30 AM – 7:30 PM</li>
              <li><span>Saturday</span> 10:00 AM – 6:00 PM</li>
              <li><span>Sunday</span> On-trip support only</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
