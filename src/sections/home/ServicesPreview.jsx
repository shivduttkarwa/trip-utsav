import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";
import SectionHead from "../../components/SectionHead";
import Icon from "../../components/Icon";
import "./ServicesPreview.css";

/* `ink` alternates the stamp colour the way a real page alternates consulates.
   `rot` is the angle it was pressed at and `shift` how far down the page —
   no two are square to each other, because no two ever are. */
const SERVICES = [
  { icon: "plane", title: "Flights & Hotels", text: "Best-fare flight bookings and hand-checked hotels, from budget to ultra-luxury.", ink: "cool", rot: "-2.4deg", shift: "0rem" },
  { icon: "globe", title: "Visa Assistance", text: "Documentation, appointments and follow-ups for tourist visas across 40+ countries.", ink: "warm", rot: "1.8deg", shift: "0.85rem" },
  { icon: "heart", title: "Honeymoon Specials", text: "Candlelit dinners, room décor and slow itineraries designed for two.", ink: "warm", rot: "-1.5deg", shift: "0.3rem" },
  { icon: "users", title: "Group & Corporate Tours", text: "College batches, family reunions and MICE — we move groups of 10 to 500.", ink: "cool", rot: "2.5deg", shift: "1.05rem" },
];

/* The machine-readable zone, carrying the brand line where a passport carries
   the holder. Kept as data rather than JSX text so the chevrons never have to
   be escaped. */
const MRZ = [
  "P<INDTRIP<UTSAV<<TRAVEL<MORE<<CELEBRATE<LIFE<<",
  "TU25000001<4IND<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
];

/* Services as stamps in a passport.
 *
 * A boarding pass is one journey. A passport page is every permission you have
 * ever been granted — which is what "one roof" actually means. So the section
 * is a two-page spread of security paper: a gutter down the middle, a guilloche
 * rosette printed under everything, an endorsement across the top and a
 * machine-readable zone along the foot.
 *
 * The stamps are not placed, they are pressed. Each one drops in oversized and
 * over-rotated and lands hard on its own angle, one after another, so reaching
 * the section is the act of stamping the page. */
export default function ServicesPreview() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          layout="center"
          eyebrow="Beyond Packages"
          title="Every Travel Service, One Roof"
          text="Trip Utsav is a full-service agency — whatever moves you, we arrange it."
        />

        <Reveal className="pp">
          <span className="pp-mark" aria-hidden="true">Trip Utsav · Admitted</span>

          <div className="pp-grid">
            {SERVICES.map((s, i) => (
              <Link
                to="/services"
                key={s.title}
                className={`pp-stamp pp-stamp--${s.ink}`}
                style={{ "--rot": s.rot, "--shift": s.shift, "--i": i }}
              >
                <i className="pp-icon"><Icon name={s.icon} /></i>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="pp-foot">Arranged</span>
              </Link>
            ))}
          </div>

          <span className="pp-mrz" aria-hidden="true">
            {MRZ.map((line) => <b key={line}>{line}</b>)}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
