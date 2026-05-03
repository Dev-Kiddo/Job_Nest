import PopularJobs from "../components/PopularJobs";
import HeroSection from "../components/HeroSection";
import TestimonialSlider from "../components/TestimonialSlider";
import TrustedPartners from "../components/TrustedPartners";
import HowItWorks from "../components/HowItWorks";

const Home = () => {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <PopularJobs />
      <TestimonialSlider />
      <TrustedPartners />
    </>
  );
};

export default Home;
