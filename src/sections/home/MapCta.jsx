import Cta from "../../components/Cta";
import Button from "../../components/Button";
import { useUI } from "../../components/UIContext";

/* Full-bleed video CTA band (world map reveal). Children are revealed one by
   one by the <Cta> scrub timeline, in source order — keep to six or fewer. */
export default function MapCta() {
  const { openEnquiry } = useUI();

  return (
    <Cta video="/cta-bg.mp4">
      <span className="eyebrow">Anywhere You Dream</span>
      <h2 className="cta-title">
        120+ Destinations.<br />
        <em>One</em> Trusted Partner.
      </h2>
      <p>
        From a dot on the map to the trip of a lifetime — wherever you point,
        we craft the journey around you.
      </p>
      <div className="cta-actions">
        <Button size="lg" icon="arrow" to="/destinations">Explore Destinations</Button>
        <Button variant="glass" size="lg" onClick={() => openEnquiry()}>Talk to an Expert</Button>
      </div>
      <ul className="cta-trust">
        <li>12 Years of Craft</li>
        <li>25,000+ Happy Travellers</li>
        <li>4.8★ Average Rating</li>
      </ul>
    </Cta>
  );
}
