/**
 * CTA band — a background video seen through a world map.
 *
 * Static by design. The white cover is masked with the world so the video
 * shows through the continents and the oceans stay white. There is no pin, no
 * scrubbed timeline and no second phase, so there is no JS here at all — the
 * only motion in the section is the video playing behind the map.
 *
 * The statement is stacked above the map on plain white rather than laid over
 * it, so it never has to compete with the continents behind it.
 */
export default function Cta({ video }) {
  return (
    <section className="cta">
      <div className="cta-stage">
        {/* Three spans so the desktop layout can place each word on its own
            side of the map. The explicit spaces keep it one readable line when
            they flow back together on a phone. */}
        <div className="cta-intro">
          <h2 className="cta-intro-title">
            <span className="cta-word cta-word--the">The</span>{" "}
            <span className="cta-word cta-word--world">World</span>{" "}
            <em className="cta-word cta-word--awaits">Awaits</em>
          </h2>
        </div>

        <div className="cta-map">
          <video className="cta-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
            <source src={video} type="video/mp4" />
          </video>
          {/* white cover with world-map-shaped holes */}
          <div className="cta-cover" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
