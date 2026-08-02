/**
 * CTA band — a background video seen through a world map, and through the
 * words laid over it.
 *
 * One white sheet covers a full-bleed video. Its mask cuts the continents out
 * of that sheet, and the words sit INSIDE the sheet in black, so
 * `mix-blend-mode: screen` turns them into holes as well — screen leaves white
 * as white and takes black to fully transparent. The map and the lettering are
 * therefore the same effect, and the same video runs behind both.
 *
 * The words have to be children of the cover, not a layer above it: the blend
 * applies to the element and its descendants as one group. Sitting on top they
 * would simply paint black over the already-composited white.
 *
 * Static — no pin, no scrub, no JS. The only motion is the video itself.
 */
export default function Cta({ video }) {
  return (
    <section className="cta">
      <div className="cta-stage">
        <video className="cta-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
          <source src={video} type="video/mp4" />
        </video>

        {/* the white sheet — the map and the words are both holes in it */}
        <div className="cta-cover">
          {/* Four spans so each word can be placed on its own side of the map.
              The explicit spaces keep it one readable line when they flow back
              together on a phone. */}
          <div className="cta-intro">
            <h2 className="cta-intro-title">
              <span className="cta-word cta-word--the">The</span>{" "}
              <span className="cta-word cta-word--world">World</span>{" "}
              <em className="cta-word cta-word--awaits">Awaits</em>{" "}
              <span className="cta-word cta-word--you">You</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
