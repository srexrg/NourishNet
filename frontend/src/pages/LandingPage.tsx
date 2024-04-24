import { About } from "../components/About";
import { FAQ } from "../components/FAQ";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { Navbar } from "../components/Navbar";
import { JoinUs } from "../components/Newsletter";
import { ScrollToTop } from "../components/ScrollToTop";
import { Services } from "../components/Services";
import { Team } from "../components/Team";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Team />
      <JoinUs />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default LandingPage;
