import Stat from "../../components/Stat";

/* A dark full-bleed band, not another white strip. It lands between two light
   sections (featured packages above, destinations below), so it does the job of
   breaking the page's rhythm as well as carrying the numbers. */
export default function StatsBar() {
  return (
    <section className="stats-band">
      <div className="container">
        <span className="stats-eyebrow">Trip Utsav in numbers</span>
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
