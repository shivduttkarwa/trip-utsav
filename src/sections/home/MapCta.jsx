import Cta from "../../components/Cta";
import Button from "../../components/Button";

/* Full-bleed video CTA band (world map reveal). */
export default function MapCta() {
  return (
    <Cta video="/cta-bg.mp4">
      <span className="eyebrow">Anywhere You Dream</span>
      <h2 className="display-2">
        120+ Destinations.<br />One Trusted Partner.
      </h2>
      <p>
        From a dot on the map to the trip of a lifetime — wherever you point,
        we craft the journey around you.
      </p>
      <div className="hero-actions">
        <Button size="lg" icon="arrow" to="/destinations">Explore Destinations</Button>
      </div>
    </Cta>
  );
}
