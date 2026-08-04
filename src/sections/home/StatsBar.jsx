import Reveal from "../../components/Reveal";
import useCountUp from "../../components/useCountUp";
import "./StatsBar.css";
import asset from "../../asset";

/* ONE photograph for the whole band — it lies across the section as the
   background, and the figures are cut out of that same frame. What changes per
   figure is only WHERE in it each one looks, so the row reads as four windows
   into a single place rather than four separate postcards.

   `pos` is that window: a background-position into the frame. They are chosen
   off the picture itself and each one has to be BRIGHT, because a digit is a
   thin sliver of image and a shadowed crop turns to mud once clipped to the
   glyphs — the dark left-hand forest is avoided for exactly that reason. */
const STATS_IMAGE = asset("images/hero/hero-kashmir.webp");

const STATS = [
  { value: 12, label: "Years of Craft", pos: "22% 78%" },              /* meadow */
  { value: 25000, label: "Happy Travellers", pos: "52% 26%" },         /* snow peaks */
  { value: 120, label: "Destinations Covered", pos: "86% 40%" },       /* sunlit slope */
  { value: 4.8, suffix: "★", decimals: 1, label: "Average Rating", pos: "62% 82%" },  /* river */
];

function StatWindow({ index, value, suffix = "+", decimals = 0, label, pos, delay }) {
  const [ref, display] = useCountUp(value, decimals);

  return (
    <Reveal as="div" className="wstat" delay={delay}>
      <span className="wstat-index">{String(index).padStart(2, "0")}</span>
      <span className="wstat-num" ref={ref} style={{ "--pos": pos }}>
        {display}
        <span className="wstat-suffix">{suffix}</span>
      </span>
      <span className="wstat-label">{label}</span>
    </Reveal>
  );
}

/* A dark full-bleed band, not another white strip. It lands between two light
   sections (featured packages above, destinations below), so it does the job of
   breaking the page's rhythm as well as carrying the numbers.

   The figures are cut out of photography rather than set in a flat colour: the
   digits are windows onto the places the numbers are counting. The .stats /
   .stat rules in components.css are a separate, lighter treatment still used on
   the About page — nothing here touches it. */
export default function StatsBar() {
  return (
    /* The photograph is handed to CSS as a variable rather than written into
       the stylesheet, because it lives in public/ and so needs the base prefix
       that asset() applies — a bare url() in CSS would resolve against the
       server root and 404 on GitHub Pages. Same reason the fills used to be
       set inline. */
    <section className="wstats" style={{ "--shot": `url("${STATS_IMAGE}")` }}>
      <div className="container">
        <span className="wstats-eyebrow">VoyageNest in numbers</span>
        <div className="wstats-grid">
          {STATS.map((stat, i) => (
            <StatWindow key={stat.label} index={i + 1} delay={i * 0.09} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
