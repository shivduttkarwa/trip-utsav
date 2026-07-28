import Stat from "../../components/Stat";

export default function StatsBar() {
  return (
    <section className="section-tight">
      <div className="container">
        <div className="stats">
          <Stat value={12} label="Years of Craft" />
          <Stat value={25000} label="Happy Travellers" />
          <Stat value={120} label="Destinations Covered" />
          <Stat value={4.8} suffix="★" label="Average Rating" decimals={1} />
        </div>
      </div>
    </section>
  );
}
