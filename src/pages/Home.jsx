import HeroSearch from "../sections/home/HeroSearch";
import Marquee from "../sections/home/Marquee";
import FeaturedPackages from "../sections/home/FeaturedPackages";
import StatsBar from "../sections/home/StatsBar";
import DestinationsGrid from "../sections/home/DestinationsGrid";
import MapCta from "../sections/home/MapCta";
import ServicesPreview from "../sections/home/ServicesPreview";
import WhyUs from "../sections/home/WhyUs";
import HowItWorks from "../sections/home/HowItWorks";
import Testimonials from "../sections/home/Testimonials";
import CtaBanner from "../sections/home/CtaBanner";

export default function Home() {
  return (
    <>
      <HeroSearch />
      <Marquee />
      <FeaturedPackages />
      <StatsBar />
      <MapCta />
      <DestinationsGrid />
      <ServicesPreview />
      <WhyUs />
      <HowItWorks />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
