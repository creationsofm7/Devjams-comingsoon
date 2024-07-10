import "./App.css";
import CountdownTimer from "./components/countdown/countdown";
import MultipleFAQSections from "./components/faq/Faq";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/navbar";
import ContactCard from "./components/contactpage/contact";
import SocialMediaBar from "./components/social/social";
import PinnedSVG from "./components/pinned";
import Marquee from "./components/Marquee/Marquee";
import StackCard from "./components/Card/Card";

function App() {
  const targetDate: string = "2024-08-04T00:00:00";

  return (
    <>
      <Navbar />
      <Hero />
      <div>
        <div>
          <CountdownTimer targetDate={targetDate} />
        </div>

        <Marquee />
        {/* card  */}
        <StackCard />

        <MultipleFAQSections />

      

        <ContactCard />
        <SocialMediaBar />
        <PinnedSVG />
      </div>
    </>
  );
}

export default App;
