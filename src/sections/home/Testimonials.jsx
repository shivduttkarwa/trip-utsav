import SectionHead from "../../components/SectionHead";
import TestimonialSlider from "../../components/TestimonialSlider";

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow="Traveller Stories" title="25,000+ Celebrations and Counting" />
        <TestimonialSlider />
      </div>
    </section>
  );
}
