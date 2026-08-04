import Reveal from "../../components/Reveal";
import Stat from "../../components/Stat";
import "./EntryRecord.css";

/* The numbers, kept as terse as a border officer's ledger. */
export default function EntryRecord() {
  return (
    <section className="section-tight">
      <div className="container">
        <Reveal className="ab-meter"><span className="eyebrow">Entry Record</span></Reveal>
        <div className="stats">
          <Stat value={12} label="Years in Service" />
          <Stat value={25000} label="Bearers Carried" />
          <Stat value={120} label="Territories Covered" />
          <Stat value={98} suffix="%" label="Renew With Us" />
        </div>
      </div>
    </section>
  );
}
