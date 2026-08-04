import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Reveal from "../../components/Reveal";
import SectionHead from "../../components/SectionHead";
import Icon from "../../components/Icon";
import { TESTIMONIALS } from "../../data/packages";
import { DESTINATIONS } from "../../data/destinations";
import "./Testimonials.css";

/* One place per review, in the order TESTIMONIALS declares them — the trip
   names are prose ("Leh–Ladakh Group Trip"), so they are matched here rather
   than parsed. Reviews passed in via the `items` prop carry their own `place`
   instead. Each resolves to a destination photo for the picture side. */
const PLACES = ["Maldives", "Ladakh", "Singapore", "Europe", "Thailand", "Kashmir"];

const buildCards = (items) =>
  items.map((t, i) => {
    const place = t.place ?? PLACES[i] ?? PLACES[0];
    return {
      ...t,
      place,
      code: place.slice(0, 3).toUpperCase(),
      image: DESTINATIONS.find((d) => d.name === place)?.image,
    };
  });

/* Reviews as postcards.
 *
 * A review is a message sent home from a trip, so it is set as one: the written
 * side of a postcard, divided down the middle, with the message in hand on the
 * left and the postage on the right — a stamp carrying the place, a postmark
 * struck across it, ruled address lines beneath.
 *
 * A postcard has two sides, which is the whole reason it works here. The
 * message faces up so the reviews read without anyone touching anything; the
 * card turns to show where it was written from. Hover on a pointer, tap on a
 * phone. Nothing but the photograph lives on the far side, so nothing is lost
 * if it is never turned.
 *
 * About reuses this section with its own reviews and heading via props; the
 * defaults render the home version. */
export default function Testimonials({
  items = TESTIMONIALS,
  eyebrow = "Traveller Stories",
  title = "25,000+ Celebrations and Counting",
}) {
  const cards = useMemo(() => buildCards(items), [items]);
  const railRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [flipped, setFlipped] = useState(() => new Set());
  const [edge, setEdge] = useState({ start: true, end: false });
  const drag = useRef({ down: false, startX: 0, startLeft: 0, id: null, moved: false });

  /* Which end the row is resting against. Returning the previous object when
     nothing changed lets React bail out of the re-render — this runs on every
     scroll event, and a fresh object each time would re-render the whole
     section throughout a drag.

     The 2px tolerance covers fractional scroll positions, which turn up at
     non-integer zoom levels and would otherwise leave a button live at an end
     it has actually reached. */
  const syncEdges = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    const start = rail.scrollLeft <= 2;
    const end = rail.scrollLeft >= max - 2;
    setEdge((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
  }, []);

  /* Also on resize: the breakpoints change how many cards are in view, which
     changes where the end is — and can put the row past it. */
  useEffect(() => {
    syncEdges();
    window.addEventListener("resize", syncEdges);
    return () => window.removeEventListener("resize", syncEdges);
  }, [syncEdges]);

  /* Steps by one card. Measured rather than assumed — the width is a calc that
     changes with the breakpoint. */
  const nudge = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 16;
    const step = card ? card.getBoundingClientRect().width + gap : rail.clientWidth;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  /* Drag-to-scroll, for pointers only. Touch is left alone deliberately: the
     browser's own panning has momentum and rubber-band that a scrollLeft loop
     cannot reproduce, so hijacking it would make the phone worse to use. */
  const onPointerDown = (e) => {
    if (e.pointerType === "touch" || e.button !== 0) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      startLeft: railRef.current.scrollLeft,
      id: e.pointerId,
      moved: false,
    };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.startX;
    /* Nothing happens until the pointer has actually travelled — below the
       threshold this is still a click, and the copy stays selectable. */
    if (!dragging) {
      if (Math.abs(dx) < 5) return;
      d.moved = true;
      railRef.current.setPointerCapture(d.id);
      setDragging(true);
    }
    railRef.current.scrollLeft = d.startLeft - dx;
  };

  const endDrag = () => {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    if (!dragging) return;
    railRef.current.releasePointerCapture?.(d.id);
    /* Releasing restores scroll-snap, and the browser settles to the nearest
       card on its own — no easing to write. */
    setDragging(false);
  };

  /* Tap to turn the card. Suppressed when the pointer has just dragged the row,
     or every throw of the slider would flip whichever card it finished on. */
  const toggleFlip = (id) => {
    if (drag.current.moved) return;
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="section notes-section">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} />

        <div
          className={`cards${dragging ? " is-dragging" : ""}`}
          ref={railRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onScroll={syncEdges}
        >
          {cards.map((t, i) => (
            <Reveal className="pc-wrap" key={t.name} delay={i * 0.08}>
              <article className={`pc${flipped.has(t.name) ? " is-flipped" : ""}`}>
                <div className="pc-inner">
                  {/* written side */}
                  <div className="pc-face pc-msg">
                    <div className="pc-left">
                      <blockquote>{t.text}</blockquote>
                      <div className="pc-sign">
                        <strong>{t.name}</strong>
                        <span>{t.trip}</span>
                      </div>
                    </div>

                    <div className="pc-right">
                      <div className="pc-post">
                        <span
                          className="pc-stamp"
                          style={{ backgroundImage: `url("${t.image}")` }}
                          aria-hidden="true"
                        />
                        <span className="pc-mark" aria-hidden="true">{t.code}</span>
                      </div>
                      <span className="pc-stars" aria-label="Rated 5 out of 5">★★★★★</span>
                      <span className="pc-lines" aria-hidden="true" />
                      <button
                        type="button"
                        className="pc-turn"
                        onClick={() => toggleFlip(t.name)}
                        aria-label={`See a photograph of ${t.place}`}
                      >
                        <Icon name="arrow" /> turn over
                      </button>
                    </div>
                  </div>

                  {/* picture side */}
                  <div className="pc-face pc-pic">
                    <img src={t.image} alt="" loading="lazy" decoding="async" />
                    <span className="pc-place">{t.place}</span>
                    <span className="pc-wish">Wish you were here</span>
                    {/* The only way back on a touch device, where nothing
                        hovers and the card no longer turns on a stray tap. */}
                    <button
                      type="button"
                      className="pc-turn pc-turn--back"
                      onClick={() => toggleFlip(t.name)}
                      aria-label={`Back to ${t.name}'s review`}
                    >
                      <Icon name="arrowLeft" /> turn back
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="notes-nav">
          <button
            className="slider-btn"
            onClick={() => nudge(-1)}
            disabled={edge.start}
            aria-label="Previous reviews"
          >
            <Icon name="arrowLeft" />
          </button>
          <button
            className="slider-btn"
            onClick={() => nudge(1)}
            disabled={edge.end}
            aria-label="Next reviews"
          >
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
