import Reveal from "../../components/Reveal";
import Button from "../../components/Button";
import { useUI } from "../../components/UIContext";
import "./CtaBanner.css";
import asset from "../../asset";

/* Closing CTA — full-bleed photograph, full viewport height, content over it.
 *
 * The picture is the Pangong road at last light: the closing image of the page
 * is the road itself, which is the thing being sold. It carries no meaning for
 * a screen reader, so it is decorative and the copy above it does the talking.
 *
 * Rendered as an <img> rather than a CSS background so it can be lazy-loaded —
 * this sits at the very bottom of the homepage, several screens down. */
export default function CtaBanner() {
  const { openEnquiry } = useUI();

  return (
    <section className="cta-full">
      <img
        className="cta-full-bg"
        src={asset("images/hero/hero-ladakh.webp")}
        alt=""
        loading="lazy"
        decoding="async"
      />

      <div className="container cta-full-inner">
        <Reveal>
          <span className="badge badge-glass mb-2">Limited Season Offers Live</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display-2">Your Next Story Begins With One Click</h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p>Get a free, no-obligation itinerary crafted by our experts within 24 hours.</p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="cta-full-actions">
            <Button size="lg" icon="arrow" onClick={() => openEnquiry()}>Plan My Trip Free</Button>
            <Button variant="white" size="lg" to="/packages">Browse Packages</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
