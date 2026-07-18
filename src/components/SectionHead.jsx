import Reveal from "./Reveal";

/**
 * Reusable section heading.
 * layout: default | center | split (title left, `aside` slot right)
 */
export default function SectionHead({ eyebrow, title, text, layout = "", aside = null }) {
  return (
    <Reveal className={`section-head ${layout}`.trim()}>
      {layout === "split" ? (
        <>
          <div>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2 className="display-2">{title}</h2>
            {text && <p className="lead">{text}</p>}
          </div>
          {aside}
        </>
      ) : (
        <>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 className="display-2">{title}</h2>
          {text && <p className="lead">{text}</p>}
        </>
      )}
    </Reveal>
  );
}
