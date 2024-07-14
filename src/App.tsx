import CountdownTimer from "./components/countdown/countdown";
import MultipleFAQSections from "./components/faq/Faq";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/navbar";
import ContactCard from "./components/contactpage/contact";
import SocialMediaBar from "./components/social/social";
import PinnedSVG from "./components/pinned";
import MarqueeComp from "./components/Marquee/Marquee";
import AboutSection from "./components/aboutSection/AboutSection";
function App() {
  const targetDate: string = "2024-08-04T00:00:00";
  window.addEventListener("keydown", function (e) {
    if (e.key == " " && e.target == document.body) {
      e.preventDefault();
    }
  });
  return (
    <div>
      <Navbar />
      <Hero />
      <CountdownTimer targetDate={targetDate} />
      <MarqueeComp />
      <div className="gridBackground">
        <AboutSection />
        <MultipleFAQSections />
        <ContactCard />
        <SocialMediaBar />
        <PinnedSVG />
      </div>
    </div>
  );
}

export default App;
