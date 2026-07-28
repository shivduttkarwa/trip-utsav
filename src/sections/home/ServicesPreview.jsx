import Reveal from "../../components/Reveal";
import SectionHead from "../../components/SectionHead";
import IconCard from "../../components/IconCard";

const SERVICES = [
  { icon: "plane", title: "Flights & Hotels", text: "Best-fare flight bookings and hand-checked hotels, from budget to ultra-luxury." },
  { icon: "globe", title: "Visa Assistance", text: "Documentation, appointments and follow-ups for tourist visas across 40+ countries." },
  { icon: "heart", title: "Honeymoon Specials", text: "Candlelit dinners, room décor and slow itineraries designed for two." },
  { icon: "users", title: "Group & Corporate Tours", text: "College batches, family reunions and MICE — we move groups of 10 to 500." },
];

export default function ServicesPreview() {
  return (
    <section className="section bg-surface">
      <div className="container">
        <SectionHead
          layout="center"
          eyebrow="Beyond Packages"
          title="Every Travel Service, One Roof"
          text="Trip Utsav is a full-service agency — whatever moves you, we arrange it."
        />
        <div className="grid grid-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.09}>
              <IconCard icon={s.icon} title={s.title} text={s.text} to="/services" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
