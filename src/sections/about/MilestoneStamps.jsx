import Reveal from "../../components/Reveal";
import SectionHead from "../../components/SectionHead";
import { useUI } from "../../components/UIContext";
import "./MilestoneStamps.css";

/* Milestone years as visa stamps at odd angles. One slot is left dashed and
   empty — reserved — and clicking it opens the enquiry form, because the
   whole page has been walking the reader toward that blank space. */
const STAMPS = [
  { year: "2014", shape: "round", ink: "blue", tilt: "-7deg", title: "Founded", detail: "Indore · one desk, one phone" },
  { year: "2017", shape: "rect", ink: "green", tilt: "2.5deg", title: "Borders Crossed", detail: "first passports on the desk — the visa team is born" },
  { year: "2020", shape: "rect", ink: "rust", tilt: "-3.5deg", title: "Rescheduled, Not Abandoned", detail: "every locked-down trip honoured, rebooked or refunded" },
  { year: "2022", shape: "round", ink: "green", tilt: "6deg", title: "Destination №100", detail: "Ha Long Bay, since you ask" },
  { year: "2025", shape: "rect", ink: "blue", tilt: "-2deg", title: "Traveller 25,000", detail: "came home with sand in her shoes" }
];

export default function MilestoneStamps() {
  const { openEnquiry } = useUI();

  return (
    <section className="section ab-pages">
      <div className="container">
        <SectionHead
          layout="center"
          eyebrow="Pages 02–07"
          title="Every Year Leaves a Mark"
          text="Our milestones, recorded the way a passport records them — in ink, at odd angles, with no room for modesty."
        />
        <div className="ab-stamps">
          {STAMPS.map((s, i) => (
            <Reveal key={s.year} variant="zoom" delay={i * 0.09}>
              <div
                className={`ab-stamp ab-stamp--${s.shape} ab-stamp--${s.ink}`}
                style={{ "--tilt": s.tilt }}
              >
                <span className="ab-stamp-org">VoyageNest · Immigration of Joy</span>
                <span className="ab-stamp-year">{s.year}</span>
                <strong>{s.title}</strong>
                <em>{s.detail}</em>
              </div>
            </Reveal>
          ))}

          {/* The blank slot the whole page walks toward. */}
          <Reveal variant="zoom" delay={STAMPS.length * 0.09}>
            <button className="ab-stamp ab-stamp--reserved" onClick={() => openEnquiry()}>
              <span className="ab-stamp-org">VoyageNest · Immigration of Joy</span>
              <span className="ab-stamp-year">20__</span>
              <strong>Space Reserved</strong>
              <em>your trip goes here — tap to claim it</em>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
