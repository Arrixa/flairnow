import renderLogo from "../components/common/logos/LogoFull";
import FeatureSection from "./_components/home/FeatureSection";
import HeroSection from "./_components/home/HeroSection";
import ResourcesSection from "./_components/home/ResourcesSection";
import StatsSection from "./_components/home/StatsSection";
import TestimonialSection from "./_components/home/TestimonialSection";

export default function Home() {
  return (
    <main>
      <div className='flex flex-col'>
        <HeroSection />
        <FeatureSection />
        <TestimonialSection />

        <ResourcesSection />
        <StatsSection />
      </div>
    </main>
  )
}
