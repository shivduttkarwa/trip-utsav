import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../../components/Reveal";
import Button from "../../components/Button";
import SectionHead from "../../components/SectionHead";
import Icon from "../../components/Icon";
import { useUI } from "../../components/UIContext";
import "./WhyUs.css";
import asset from "../../asset";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   WHY VOYAGENEST — stacking cards over a held photograph.

   THE STACKING IS CSS. Not ScrollTrigger pins.

   Every complaint about this section — jank on the way in, a snap
   at the release, the last card leaving one behind — came from the
   same source: five overlapping ScrollTrigger pins with
   pinSpacing:false, all ending on one shared trigger. A pin is JS
   reacting to a scroll event, so it is always at least a frame
   late, it has to be un-done and re-done on every refresh, and
   when several release on the same tick they all snap back to
   their flow positions at once. That is not a tuning problem, it
   is the mechanism.

   `position: sticky` does the identical job in the compositor,
   ahead of paint, with nothing to schedule and nothing to release.
   Four sticky wrappers at top:0 in one parent naturally overlay in
   DOM order — which IS the stack. It cannot drift, cannot arrive
   late, and cannot be left in a broken state by scrolling fast or
   scrolling backwards, because there is no state.

   GSAP is left with the one job CSS cannot do: tipping each card
   back as the next arrives. That is a scrubbed tween on transform
   and opacity only. If its measurements were ever wrong the timing
   would drift slightly — nothing would break, because nothing about
   the layout depends on it.
   ============================================================ */

/* The stage sits behind every card and is heavily darkened, so it takes the
   one hero still none of the cards use. */
const SHOT = asset("images/hero/hero-maldives.webp");

/* Figures, not statistics — each is a restatement of a promise this site
   already makes in words, so nothing here claims anything new. */
/* ---------- The medallions ----------
 * A travel icon from the site's own set, mounted in a drawn surround: a ring
 * of dots, a hairline circle, one heavier arc, and an inner circle.
 *
 * The icons come from components/icons.js rather than being redrawn here, so
 * this section cannot drift from the pin, wallet and headset used everywhere
 * else on the site. What makes them read as artwork rather than as UI chrome
 * is the surround and the scale, not a different drawing.
 *
 * The heavy arc turns a quarter further on each card, so the four medallions
 * are the same object caught at four different positions instead of four
 * decorations that happen to look alike.
 */
const C = 100;
const pol = (r, deg) => {
  const a = (deg - 90) * (Math.PI / 180);
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
};
const f = (n) => n.toFixed(2);
const arc = (r, a0, a1) => {
  const [x0, y0] = pol(r, a0);
  const [x1, y1] = pol(r, a1);
  return `M ${f(x0)} ${f(y0)} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${f(x1)} ${f(y1)}`;
};

function Mark({ icon, turn }) {
  return (
    <span className="mk-medal">
      <svg className="mk-ring" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
        {Array.from({ length: 48 }, (_, i) => {
          const [x, y] = pol(92, (i * 360) / 48);
          return <circle key={i} cx={f(x)} cy={f(y)} r="1.6" className="mk-seed" />;
        })}
        <circle cx={C} cy={C} r="74" className="mk-hair" />
        <path d={arc(74, turn, turn + 74)} className="mk-line" />
        <circle cx={C} cy={C} r="55" className="mk-hair" />
      </svg>
      <span className="mk-glyph"><Icon name={icon} /></span>
    </span>
  );
}

/* Four surfaces, so the stack reads as four distinct things arriving rather
   than one panel being redrawn. Every mark is set in currentColor, which is
   what lets the same drawing sit on a navy card and a paper one without a
   second palette to keep in step. */
const CARDS = [
  {
    n: "1",
    tag: "The designer",
    title: "Human experts, not algorithms",
    text: "No ticket queues, no chatbot. One person who knows your trip, your dates and your family's quirks.",
    tone: "ink",
    icon: "users",
    turn: 0,
  },
  {
    n: "100%",
    tag: "The itinerary",
    title: "Fully customisable itineraries",
    text: "Stretch it, swap a city, add a night, move the whole thing a month. Every itinerary is a starting point.",
    tone: "flame",
    icon: "pin",
    turn: 90,
  },
  {
    n: "24×7",
    tag: "The safety net",
    title: "On-trip support that answers",
    text: "Missed connection at 2 AM? One WhatsApp and we're on it — with local partners in the destination.",
    tone: "paper",
    icon: "headset",
    turn: 180,
  },
  {
    n: "0",
    tag: "The price",
    title: "Zero hidden costs",
    text: "What you see is what you pay. Taxes, transfers and the extras other people bill later are already in.",
    tone: "sea",
    icon: "wallet",
    turn: 270,
  },
];

export default function WhyUs() {
  const { openEnquiry } = useUI();
  const root = useRef(null);
  const wraps = useRef([]);
  const cards = useRef([]);

  useLayoutEffect(() => {
    /* The stack itself is CSS and works regardless, so this only skips the
       tipping-back. Nothing is lost but the depth. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const w = wraps.current.filter(Boolean);
      const c = cards.current.filter(Boolean);
      if (w.length < 2 || c.length !== w.length) return;

      c.forEach((card, i) => {
        if (i >= w.length - 1) return;

        /* Driven by the card BEHIND you arriving, not by your own exit — that
           is what couples the two so one appears to push the other back.
           A real tween rather than an onUpdate writing gsap.set: GSAP
           interpolates it and is guaranteed to land exactly on both ends, in
           both directions, at any scroll speed. */
        gsap.fromTo(
          card,
          { rotateX: 0, scale: 1, "--veil": 0 },
          {
            /* No Z rotation. The reference rolls the card 4 degrees as well,
               and on screen that does not read as depth — it reads as a card
               hung crooked. rotateX alone tips it away from the reader, which
               is the thing actually being described. */
            rotateX: 26,
            scale: 0.9,
            "--veil": 0.45,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: w[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="why" ref={root}>
      <div className="container">
        <SectionHead
          eyebrow="Why VoyageNest"
          title={<>We don't sell tours.<br />We craft <span className="text-grad">celebrations.</span></>}
          text="Anyone can book a hotel. We obsess over the sunrise slot at the Taj, the window seat over the Himalayas, the candle-lit surprise on your anniversary night."
        />
      </div>

      <div className="wsk">
        {/* Absolutely positioned over the whole run, with a sticky child. That
            is what keeps the photograph behind every card to the last frame —
            a sticky element only sticks for the height of its own parent, so
            the parent has to be the full section, not one screen of it. */}
        <div className="wsk-bg" aria-hidden="true">
          <div className="wsk-bg-in">
            <img src={SHOT} alt="" fetchPriority="low" decoding="async" />
          </div>
        </div>

        <div className="wsk-cards">
          {CARDS.map((c, i) => (
            <div
              className="wsk-wrap"
              key={c.title}
              ref={(el) => { wraps.current[i] = el; }}
            >
              <article
                className={`wsk-card wsk-card--${c.tone}`}
                ref={(el) => { cards.current[i] = el; }}
              >
                {/* The drawing is the card. It gets the whole upper field and
                    every pixel of slack in the height; the words are a caption
                    under it, which is the right order — you look, then you
                    read. */}
                <span className="wsk-art">
                  <Mark icon={c.icon} turn={c.turn} />
                </span>

                <span className="wsk-foot">
                  <span className="wsk-meta">
                    <span className="wsk-no">{String(i + 1).padStart(2, "0")}</span>
                    <span className="wsk-n">{c.n}</span>
                    <span className="wsk-tag">{c.tag}</span>
                  </span>
                  <h3 className="wsk-title">{c.title}</h3>
                  <p className="wsk-text">{c.text}</p>
                </span>

                {/* Darkens the card as it goes back. Opacity is the one visual
                    change the compositor handles for free, so depth costs no
                    paint. */}
                <span className="wsk-veil" aria-hidden="true" />
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <Reveal>
          <div className="why-cta">
            <Button icon="arrow" onClick={() => openEnquiry()}>Start Planning Free</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
