import Reveal from "./Reveal";
import Button from "./Button";
import { useUI } from "./UIContext";
import "../styles/cta.css";
import asset from "../asset";

/* Closing CTA — full-bleed photograph with the copy over it.
 *
 * Shared by the homepage and the listing pages, which is why it lives here
 * rather than in sections/home. The two differ only in scale and wording: the
 * homepage version is the end of the whole story and takes a full screen, the
 * listing versions are a landing at the foot of a page you were already
 * browsing and take a band. `compact` is that difference.
 *
 * The primary action is always the enquiry modal — every page this appears on
 * is trying to start the same conversation — so only the secondary action is
 * configurable, pointing wherever the visitor has NOT just been.
 *
 * The image is an <img> rather than a CSS background so it can be lazy-loaded;
 * this always sits at the very bottom of a page, several screens down. It
 * carries no meaning for a screen reader, so it is decorative and the copy
 * does the talking.
 */
export default function CtaBanner({
  image = "images/hero/hero-ladakh.webp",
  /* Where the crop holds as the section changes shape. Passed per usage rather
     than baked into the CSS, because the right focal point is a fact about the
     photograph, not about the component. */
  focal = "50% 45%",
  focalM,
  badge = "Limited Season Offers Live",
  title = "Your Next Story Begins With One Click",
  text = "Get a free, no-obligation itinerary crafted by our experts within 24 hours.",
  cta = "Plan My Trip Free",
  secondary = { label: "Browse Packages", to: "/packages" },
  compact = false
}) {
  const { openEnquiry } = useUI();

  return (
    <section
      className={`cta-full${compact ? " cta-full--compact" : ""}`}
      style={{ "--focal": focal, "--focal-m": focalM }}
    >
      <img
        className="cta-full-bg"
        src={asset(image)}
        alt=""
        loading="lazy"
        decoding="async"
      />

      <div className="container cta-full-inner">
        {badge && (
          <Reveal>
            <span className="badge badge-glass mb-2">{badge}</span>
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <h2 className="display-2">{title}</h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p>{text}</p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="cta-full-actions">
            <Button size="lg" icon="arrow" onClick={() => openEnquiry()}>{cta}</Button>
            {secondary && (
              <Button variant="white" size="lg" to={secondary.to}>{secondary.label}</Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
