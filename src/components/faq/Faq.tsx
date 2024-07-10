import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import upperdino from "../../assets/upperdino.png";
import bottom from "../../assets/bottom.png";
import { sections } from "../Card/sections";

gsap.registerPlugin(ScrollTrigger);

type FAQItemProps = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  title: string;
  faqs: FAQItemProps[];
  gradientColors: string;
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
  return (
    <div className="border p-4">
      <div className="">
        <h3 className="text-white text-lg font-medium">{question}</h3>
      </div>
      <div className=" bg-gray-900 text-gray-300">
        <p>{answer}</p>
      </div>
    </div>
  );
};

const FAQSection = ({ title, faqs, gradientColors }: FAQSectionProps) => {
  return (
    <div className="max-w-2xl mx-auto p-4 mb-8 faq-section">
      <div className={`bg-gradient-to-r ${gradientColors} p-4 rounded-t-lg`}>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="bg-gray-900 rounded-b-md overflow-hidden border border-gray-700 border-t-0">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

const MultipleFAQSections = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".faq-section1",
      { opacity: 0, y: 200 },
      {
        opacity: 1,
        y: 0,

        stagger: 0.3,
        scrollTrigger: {
          trigger: ".dino1",
          start: "top 80%",
          end: "bottom 80%",
          pin: true,

          scrub: true,
          markers: true, // Remove this line in production
        },
      }
    ).fromTo(
      ".faq-section2",
      { opacity: 0, y: 200 },
      {
        opacity: 1,
        y: -440,

        stagger: 0.3,
        scrollTrigger: {
          trigger: ".dino2",
          start: "top 80% ",
          end: "bottom 80%",
          

          scrub: true,
          markers: true, // Remove this line in production
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen py-8 flex flex-1 w-full hello">
      <div className="text-6xl font-semibold text-center mb-16 w-1/2">
        <div className="">
          <h1>Frequently</h1>
          <h1>Asked</h1>
          <h1>Questions</h1>
        </div>

        <img src={upperdino} alt="FAQ" className="w-40 h-40 m-14 dino1" />
        <img src={bottom} alt="FAQ" className="w-40 h-30 m-14 mt-96 dino2" />
      </div>
      <div className="mt-40">
        <div className="faq-section1">
          <FAQSection
            title={sections[0].title}
            faqs={sections[0].faqs}
            gradientColors={sections[0].gradientColors}
          />
        </div>
        <div className="faq-section2">
          <FAQSection
            title={sections[1].title}
            faqs={sections[1].faqs}
            gradientColors={sections[1].gradientColors}
          />
        </div>
      </div>
    </div>
  );
};

export default MultipleFAQSections;
