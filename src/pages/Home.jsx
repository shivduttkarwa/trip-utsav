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
import CtaBanner from "../components/CtaBanner";

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
      {/* The Pangong road at last light: the closing image of the homepage is
          the road itself, which is the thing being sold. The focal points hold
          the horizon and the lit ridge in frame — centred, the crop drifts down
          into the road and loses the mountains, and portrait crops tighter
          still. */}
      <CtaBanner focal="58% 42%" focalM="66% 40%" />
    </>
  );
}
