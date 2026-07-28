import Reveal from "../../components/Reveal";
import Button from "../../components/Button";
import { useUI } from "../../components/UIContext";
import "./CtaBanner.css";

export default function CtaBanner() {
  const { openEnquiry } = useUI();

  return (
    <section className="section-tight cta-banner-section">
      <div className="container">
        <Reveal variant="zoom">
          <div className="cta-banner">
            <span className="badge badge-glass mb-2">Limited Season Offers Live</span>
            <h2 className="display-2">Your Next Story Begins With One Click</h2>
            <p>Get a free, no-obligation itinerary crafted by our experts within 24 hours.</p>
            <div className="flex" style={{ justifyContent: "center" }}>
              <Button size="lg" icon="arrow" onClick={() => openEnquiry()}>Plan My Trip Free</Button>
              <Button variant="white" size="lg" to="/packages">Browse Packages</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
