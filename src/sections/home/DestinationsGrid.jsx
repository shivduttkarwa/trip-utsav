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
        {/* swipe-m: below 640 these eight stack into a very long scroll, so the
            row becomes a swipeable track instead. Narrower cards than the
            packages track — these tiles are shorter, so 80% would waste width. */}
        <div className="grid grid-4 swipe-m swipe-m--sm">
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
