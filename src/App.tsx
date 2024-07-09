import "./App.css";
import CountdownTimer from "./components/countdown/countdown";
import MultipleFAQSections from "./components/faq/Faq";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/navbar";
import ContactCard from "./components/contactpage/contact";
import SocialMediaBar from "./components/social/social";
import PinnedSVG from "./components/pinned";

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
        <div className="flex flex-1 w-full">
          <div className="text-6xl font-semibold align-middle justify-center mt-40 m-40 ">
            <h1>Frequently</h1>
            <h1>Asked</h1>
            <h1>Questions</h1>
          </div>
          <MultipleFAQSections />
        </div>
        <ContactCard />
        <SocialMediaBar />
        <PinnedSVG />
      </div>
    </>
  );
}

export default App;
