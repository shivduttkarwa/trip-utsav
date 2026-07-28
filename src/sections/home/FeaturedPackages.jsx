import { useMemo, useState } from "react";
import Reveal from "../../components/Reveal";
import Button from "../../components/Button";
import SectionHead from "../../components/SectionHead";
import PackageCard from "../../components/PackageCard";
import { PACKAGES } from "../../data/packages";
import "./FeaturedPackages.css";

const TABS = [["all", "Featured"], ["domestic", "Domestic"], ["international", "International"]];

export default function FeaturedPackages() {
  const [tab, setTab] = useState("all");

  const featured = useMemo(() => {
    const byTab = tab === "all"
      ? PACKAGES.filter((p) => p.featured)
      : PACKAGES.filter((p) => p.category === tab);
    return byTab.slice(0, 6);
  }, [tab]);

  return (
    <section className="section bg-surface" id="featured">
      <div className="container">
        <SectionHead
          layout="split"
          eyebrow="Curated For You"
          title="Trending Trips, Loved by Travellers"
          text="Our most-booked packages this season — every one of them customisable to your dates and budget."
          aside={
            <div className="tabs">
              {TABS.map(([val, label]) => (
                <button key={val} className={`tab${tab === val ? " active" : ""}`} onClick={() => setTab(val)}>
                  {label}
                </button>
              ))}
            </div>
          }
        />
        <div className="grid grid-3">
          {featured.map((p, i) => <PackageCard key={p.id} pkg={p} delay={i * 0.09} />)}
        </div>
        <Reveal className="center mt-4">
          <Button variant="outline" icon="arrow" to="/packages">View All Packages</Button>
        </Reveal>
      </div>
    </section>
  );
}
