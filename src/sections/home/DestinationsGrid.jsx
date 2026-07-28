import Reveal from "../../components/Reveal";
import Button from "../../components/Button";
import SectionHead from "../../components/SectionHead";
import DestinationCard from "../../components/DestinationCard";
import { DESTINATIONS } from "../../data/destinations";

export default function DestinationsGrid() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          layout="split"
          eyebrow="Wander-list"
          title="Destinations That Steal Hearts"
          aside={<Button variant="ghost" icon="arrow" to="/destinations">All destinations</Button>}
        />
        <div className="grid grid-4">
          {DESTINATIONS.slice(0, 8).map((d, i) => (
            <Reveal key={d.name} delay={i * 0.07}>
              <DestinationCard dest={d} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
