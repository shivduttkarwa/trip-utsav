import Reveal from "../../components/Reveal";
import useCountUp from "../../components/useCountUp";
import "./StatsBar.css";
import asset from "../../asset";

/* Each figure is filled with a different destination, so the row doubles as a
   glimpse of the catalogue. Bright, open frames only — a dark or busy crop
   turns the digits to mud once they are clipped to the glyphs. */
const STATS = [
  { value: 12, label: "Years of Craft", image: asset("images/hero/hero-ladakh-4k.webp") },
  { value: 25000, label: "Happy Travellers", image: asset("images/hero/hero-maldives-4k.webp") },
  { value: 120, label: "Destinations Covered", image: asset("images/hero/hero-kerala-4k.webp") },
  { value: 4.8, suffix: "★", decimals: 1, label: "Average Rating", image: asset("images/hero/hero-bali-4k.webp") },
];

function StatWindow({ index, value, suffix = "+", decimals = 0, label, image, delay }) {
  const [ref, display] = useCountUp(value, decimals);

  return (
    <Reveal as="div" className="wstat" delay={delay}>
      <span className="wstat-index">{String(index).padStart(2, "0")}</span>
      <span className="wstat-num" ref={ref} style={{ "--fill": `url("${image}")` }}>
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
    <section className="wstats">
      <div className="container">
        <span className="wstats-eyebrow">Trip Utsav in numbers</span>
        <div className="wstats-grid">
          {STATS.map((stat, i) => (
            <StatWindow key={stat.label} index={i + 1} delay={i * 0.09} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
