import { useEffect, useRef, useState } from "react";
import { useUI } from "./UIContext";
import { SITE } from "../data/site";
import { WORLD_LAND } from "./worldMap";
import Icon from "./Icon";

/* Toast, WhatsApp float, back-to-top and the one-time preloader */

export function ToastHost() {
  const { toast } = useUI();
  return (
    <div className={`toast${toast.show ? " show" : ""}`} role="status">
      <Icon name="check" />
      <span>{toast.msg}</span>
    </div>
  );
}

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a className="wa-float" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <Icon name="whatsapp" />
      </a>
      <button
        className={`to-top${showTop ? " show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <Icon name="up" />
      </button>
    </>
  );
}

/* ---------- PRELOADER ----------
   A world-map loader: the plane hops Delhi → Dubai → Paris → New York and its
   position along the route IS the progress bar. Progress is time-driven with a
   floor of PL_RUN ms, then gated on document readiness, so it never flashes by
   on a warm cache nor stalls at 99% on a cold one.

   Map is plate carrée (equirectangular) on a 1000×500 grid, so
   x = (lon + 180) × 2.7778 and y = (90 − lat) × 2.7778. Every stop below sits
   at its real coordinates; the coastlines are deliberately low-poly. */

const PL_RUN = 5600;       // ms the journey takes at full length

/* `dy` staggers the code labels off each other — DEL and DXB are only 60 user
   units apart, so on a phone-width map their labels would collide side by side. */
const PL_STOPS = [
  { code: "DEL", city: "Delhi", x: 714, y: 171, dy: 30 },
  { code: "DXB", city: "Dubai", x: 654, y: 180, dy: -17 },
  { code: "CDG", city: "Paris", x: 506, y: 114, dy: 30 },
  { code: "JFK", city: "New York", x: 295, y: 137, dy: 30 },
];

/* One continuous curve through all four stops, bowed north like a great circle.
   Per-leg paths were what made the plane snap round at each stop: separate
   curves meet at a corner, so the tangent jumps instantly. Here each stop's
   outgoing control point is colinear with its incoming one — same direction,
   so the heading is continuous through the junction and the plane banks
   through Dubai and Paris instead of pivoting on the spot. Edit with care:
   move a control point and you break the tangent match at that stop. */
const PL_ROUTE =
  "M714,171 C692.2,167.7 673.3,190.6 654,180" +   // Delhi → Dubai
  " C606.7,154 559.6,120.4 506,114" +             // Dubai → Paris
  " C435.5,105.6 363.4,117.8 295,137";            // Paris → New York

/* Airliner in plan view, nose at +x and centred on the origin, so the rAF loop
   can place it with a bare translate + rotate. Swept tapered wings, tailplane
   and a tapered nose — reads as an aircraft rather than a generic arrow. */
const PL_PLANE =
  "M20,0C19,-1.2 17,-2 14,-2.2L5,-2.6L3,-2.8L-7,-16L-10.5,-16.3L-4.5,-3.4" +
  "L-12.5,-3L-13.5,-3.2L-18.5,-7.6L-20.5,-7.6L-18,-3L-20.5,-1.6L-21,0" +
  "L-20.5,1.6L-18,3L-20.5,7.6L-18.5,7.6L-13.5,3.2L-12.5,3L-4.5,3.4" +
  "L-10.5,16.3L-7,16L3,2.8L5,2.6L14,2.2C17,2 19,1.2 20,0Z";

const easeIO = (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);

export function Preloader() {
  const [phase, setPhase] = useState("in");   // in → out → done
  /* The map fills the viewport width either way, so the plane needs to be
     drawn bigger in user units on a narrow one to stay readable. */
  const [planeScale] = useState(() =>
    window.matchMedia("(max-width: 700px)").matches ? 1.25 : 0.72
  );
  const baseRef = useRef(null);   // geometry source (no pathLength on it)
  const trailRef = useRef(null);
  const stopRefs = useRef([]);
  const planeRef = useRef(null);
  const pctRef = useRef(null);
  const legRef = useRef(null);

  /* Drive the counter, the trails, the stop pins and the plane from one rAF
     loop, written straight to the DOM — re-rendering React 60×/s to move a
     plane two pixels is waste. */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const base = baseRef.current;
    const trail = trailRef.current;
    if (!base) return;

    const total = base.getTotalLength();

    /* Where each stop falls along the route, found by walking the path once and
       keeping the nearest sample to each city. Sub-segment lengths aren't
       exposed by the SVG API, and this survives any later edit to PL_ROUTE. */
    const stopAt = PL_STOPS.map(() => 0);
    const near = PL_STOPS.map(() => Infinity);
    for (let s = 0; s <= total; s += 0.5) {
      const q = base.getPointAtLength(s);
      PL_STOPS.forEach((st, j) => {
        const d = (q.x - st.x) ** 2 + (q.y - st.y) ** 2;
        if (d < near[j]) { near[j] = d; stopAt[j] = s; }
      });
    }

    /* Timeline → distance. One unbroken flight: the plane never parks, it just
       eases away from Delhi and settles into New York. Mixing linear with
       ease-in-out keeps those ends soft without making the middle a sprint. */
    const journey = (t) => 0.45 * t + 0.55 * easeIO(t);

    let legLabel = "";
    const paint = (p) => {
      if (pctRef.current) pctRef.current.textContent = String(Math.round(p)).padStart(2, "0");

      const flown = journey(p / 100) * total;
      if (trail) trail.style.strokeDashoffset = String(1 - flown / total);

      if (planeRef.current) {
        const at = base.getPointAtLength(flown);
        /* Heading is sampled either side of the plane, never forward-only: at
           the end of the route `flown + 1` clamps back onto `flown`, and
           atan2(0, 0) is 0 — which would snap the nose round to due east. */
        const back = base.getPointAtLength(Math.max(0, flown - 0.75));
        const fwd = base.getPointAtLength(Math.min(total, flown + 0.75));
        const deg = (Math.atan2(fwd.y - back.y, fwd.x - back.x) * 180) / Math.PI;
        planeRef.current.setAttribute("transform", `translate(${at.x} ${at.y}) rotate(${deg})`);
      }

      stopRefs.current.forEach((el, j) => {
        if (el) el.classList.toggle("on", flown >= stopAt[j] - 0.5);
      });

      let i = 0;
      while (i < PL_STOPS.length - 2 && flown >= stopAt[i + 1]) i++;
      const label = `${PL_STOPS[i].city} → ${PL_STOPS[i + 1].city}`;
      if (label !== legLabel && legRef.current) {
        legLabel = label;
        legRef.current.textContent = label;
      }
    };

    const RUN = reduce ? 700 : PL_RUN;
    let loaded = document.readyState === "complete";
    const onLoad = () => { loaded = true; };
    window.addEventListener("load", onLoad);

    const t0 = performance.now();
    let p = 0;
    let raf = 0;

    const tick = (now) => {
      const e = now - t0;
      const ceiling = 97 * Math.min(1, e / RUN);
      const target = loaded && e >= RUN ? 100 : ceiling;
      p += (target - p) * 0.16;
      if (target === 100 && p > 99.4) p = 100;
      paint(p);
      if (p >= 100) {
        setPhase("out");
        /* The hero slider holds its first slide until this fires, so the page
           is revealed at the start of the rotation rather than part-way in. */
        window.dispatchEvent(new Event("tu:reveal"));
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    paint(0);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("load", onLoad); };
  }, []);

  /* Hold the page still underneath, and unmount once the curtains are up. */
  useEffect(() => {
    if (phase === "done") return;
    if (phase === "in") {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
    const t = setTimeout(() => setPhase("done"), 1450);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => () => { document.body.style.overflow = ""; }, []);

  if (phase === "done") return null;

  return (
    <div className={`pl${phase === "out" ? " out" : ""}`} role="status" aria-label="Loading">
      <div className="pl-panels" aria-hidden="true"><i /><i /><i /></div>

      <div className="pl-content">
        <img className="pl-logo" src="/trip-utsav-logo.svg" alt="Trip Utsav" />

        <svg className="pl-map" viewBox="0 18 1000 404" fill="none" aria-hidden="true">
          <defs>
            {/* Tuned for the light backdrop: the trail fades out behind the
                plane rather than glowing, so it reads as ink on paper. */}
            <linearGradient id="plTrail" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#c24d28" />
              <stop offset="55%" stopColor="#e0613a" />
              <stop offset="100%" stopColor="#e0613a" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <path className="pl-land" d={WORLD_LAND} />
          <path className="pl-equator" d="M0,250 H1000" />

          <path
            ref={baseRef}
            className="pl-route"
            d={PL_ROUTE}
            strokeDasharray="0.5 7"
            strokeLinecap="round"
          />
          <path
            ref={trailRef}
            className="pl-trail"
            d={PL_ROUTE}
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="1"
            strokeLinecap="round"
          />

          {PL_STOPS.map((s, i) => (
            <g key={s.code} ref={(el) => (stopRefs.current[i] = el)} className="pl-stop">
              <circle className="pl-pulse" cx={s.x} cy={s.y} r="7" />
              <circle className="pl-ring" cx={s.x} cy={s.y} r="7" />
              <circle className="pl-dot" cx={s.x} cy={s.y} r="2.6" />
              <text className="pl-code" x={s.x} y={s.y + s.dy}>{s.code}</text>
            </g>
          ))}

          <g ref={planeRef} className="pl-plane">
            <g transform={`scale(${planeScale})`}>
              <path d={PL_PLANE} />
            </g>
          </g>
        </svg>

        <div className="pl-meta">
          <span ref={legRef}>Delhi → Dubai</span>
          <span className="pl-pct"><b ref={pctRef}>00</b>%</span>
        </div>
      </div>
    </div>
  );
}
