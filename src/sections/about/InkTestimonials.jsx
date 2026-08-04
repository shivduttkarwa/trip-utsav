import Testimonials from "../home/Testimonials";

/* The About page's own postcards — reviews the home page doesn't show, each
   pinned to a destination so the picture side has a photograph to turn to.
   Rendering and styles come from the home Testimonials section. */
const INK_TESTIMONIALS = [
  { name: "Emily & Jake Thompson", trip: "Bali Villa Escape", place: "Bali", text: "We handed over ten vague screenshots and got back the honeymoon we couldn't describe. The cliff-top dinner on the last night was entirely their idea." },
  { name: "The Henderson Family", trip: "Kerala Backwaters", place: "Kerala", text: "A houseboat with our name on the chalkboard, a spice-garden lunch, and a driver who knew exactly when the kids needed ice cream. Flawless pacing." },
  { name: "Marcus Bailey", trip: "Dubai Long Weekend", place: "Dubai", text: "Four days, zero queues. Desert safari at golden hour, Burj tickets already in my inbox, and a dinner booking I still don't know how they got." },
  { name: "Olivia & Ryan Brooks", trip: "Rajasthan Heritage Trail", place: "Rajasthan", text: "Palaces by day, rooftop dinners by night. Our anniversary showed up mid-trip and so did a decorated suite we never asked for. They just knew." },
  { name: "Grace Miller", trip: "Goa New Year", place: "Goa", text: "Flights, a sea-view stay and a table booked for midnight — planned in nine days flat. I did nothing but pack, which is exactly how I wanted it." },
  { name: "Daniel & Sophie Reed", trip: "Andaman Island Hop", place: "Andaman", text: "Ferries, reefs and one perfectly empty beach. Every crossing was pre-booked, every snorkel fitted. We just floated from one blue to the next." }
];

export default function InkTestimonials() {
  return (
    <Testimonials
      eyebrow="In Their Own Ink"
      title="What Travellers Write Back"
      items={INK_TESTIMONIALS}
    />
  );
}
