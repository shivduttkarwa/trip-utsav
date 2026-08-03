import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../../components/Reveal";
import Button from "../../components/Button";
import SectionHead from "../../components/SectionHead";
import { useUI } from "../../components/UIContext";
import "./WhyUs.css";
import asset from "../../asset";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   WHY TRIP UTSAV — stacking cards over a held photograph.

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
const CARDS = [
  {
    n: "1",
    title: "Human experts, not algorithms",
    lead: "dedicated trip designer, from your first call to touchdown home",
    text: "No ticket queues, no chatbot. One person who knows your trip, your dates and your family's quirks.",
    tone: "ink",
    img: asset("images/hero/hero-kerala.webp"),
  },
  {
    n: "100%",
    title: "Fully customisable itineraries",
    lead: "of every package is yours to change",
    text: "Stretch it, swap a city, add a night, move the whole thing a month. Every itinerary is a starting point.",
    tone: "flame",
    img: asset("images/hero/hero-ladakh.webp"),
  },
  {
    n: "24×7",
    title: "On-trip support that answers",
    lead: "support for as long as you are travelling",
    text: "Missed connection at 2 AM? One WhatsApp and we're on it — with local partners in the destination.",
    tone: "paper",
    img: asset("images/hero/hero-kashmir.webp"),
  },
  {
    n: "0",
    title: "Zero hidden costs",
    lead: "surprise line items at checkout",
    text: "What you see is what you pay. Taxes, transfers and the extras other people bill later are already in.",
    tone: "sea",
    img: asset("images/hero/hero-bali.webp"),
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
          eyebrow="Why Trip Utsav"
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
                {/* Takes all the slack in the card's height, so the card
                    always fills its screen exactly and the type below never
                    has to be squeezed to make it fit. */}
                <span className="wsk-shot">
                  <img src={c.img} alt="" loading="lazy" decoding="async" />
                </span>

                <span className="wsk-meta">
                  <span className="wsk-no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="wsk-rule" aria-hidden="true" />
                </span>

                <h3 className="wsk-title">{c.title}</h3>

                <span className="wsk-fig">
                  <span className="wsk-n">{c.n}</span>
                  <span className="wsk-lead">{c.lead}</span>
                </span>

                <p className="wsk-text">{c.text}</p>

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
