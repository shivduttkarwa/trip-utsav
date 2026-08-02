import Cta from "../../components/Cta";
import Button from "../../components/Button";
import { useUI } from "../../components/UIContext";

/* Full-bleed video CTA band (world map reveal). Children are revealed one by
   one by the <Cta> scrub timeline, in source order — keep to six or fewer.

   Three blocks, deliberately. The eyebrow pill and the trust strip that used to
   sit here are gone: the strip repeated the stats band's three figures verbatim
   a few sections up the same page, and the pill was a fourth object competing
   for attention in a band whose whole job is one action. */
export default function MapCta() {
  const { openEnquiry } = useUI();

  return (
    <Cta video="/cta-bg.mp4">
      <h2 className="cta-title">
        120+ Destinations.<br />
        <em>One</em> Trusted Partner.
      </h2>
      <p>Wherever you point on the map, we craft the journey around you.</p>
      <div className="cta-actions">
        <Button size="lg" icon="arrow" to="/destinations">Explore Destinations</Button>
        <Button variant="glass" size="lg" onClick={() => openEnquiry()}>Talk to an Expert</Button>
      </div>
    </Cta>
  );
}
