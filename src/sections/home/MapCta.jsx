import Cta from "../../components/Cta";

/* Full-bleed video band seen through a world map. Static — the section is one
   image, with no reveal to scroll through and no copy laid over it. The
   closing CTA on this page is <CtaBanner>, further down. */
export default function MapCta() {
  return <Cta video="/cta-bg.mp4" />;
}
