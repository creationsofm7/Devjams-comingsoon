import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import upperdino from "../../assets/upperdino.png";
import bottom from "../../assets/bottom.png";
import { sections } from "../Card/sections";

gsap.registerPlugin(ScrollTrigger);

interface FAQItemProps {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  faqs: FAQItemProps[];
  gradientColors: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  return (
    <div className="border border-gray-700 p-4">
      <h3 className="text-white text-lg font-medium mb-2">{question}</h3>
      <p className="text-gray-300">{answer}</p>
    </div>
  );
};

const FAQSection: React.FC<FAQSectionProps> = ({ title, faqs, gradientColors }) => {
  return (
    <div className="max-w-2xl mx-auto  mb-8 faq-section contact-c border-2 border-white rounded-lg">
      <div className={`bg-gradient-to-r ${gradientColors} p-4 rounded-t-lg`}>
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="rounded-b-md overflow-hidden border border-gray-700 border-t-0">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

const MultipleFAQSections: React.FC = () => {
  useEffect(() => {
    const faqSection1 = document.querySelector<HTMLElement>(".faq-section1");
    const faqSection2 = document.querySelector<HTMLElement>(".faq-section2");

    if (faqSection1 && faqSection2) {
      const section1Height = faqSection1.offsetHeight;

      gsap.fromTo(
        faqSection2,
        { opacity: 1, y: 0 },
        {
          opacity: 1,
          y: -0.91 * section1Height,
          scrollTrigger: {
            trigger: faqSection1,
            start: "bottom bottom", // When the bottom of the first card hits the bottom of the viewport
            // end: "bottom top", // Until the bottom of the first card hits the top of the viewport
            // end: () until the first card reaches 10% of the viewport height from the top
            end: () => `+=${0.1 * window.innerHeight}`,
            scrub: true,
            markers: true,
          },
        }
      );
    }
  }, []);

  // useEffect(() => {
  //   const faqSection1 = document.querySelector<HTMLElement>(".faq-section1");
  //   const faqSection2 = document.querySelector<HTMLElement>(".faq-section2");

  //   if (faqSection1 && faqSection2) {
  //     const section1Height = faqSection1.offsetHeight;

  //     const yValue = window.innerWidth <= 768 ? -0.97 * section1Height : -0.91 * section1Height;

  //     gsap.fromTo(
  //       faqSection2,
  //       { opacity: 1, y: 0 },
  //       {
  //         opacity: 1,
  //         y: yValue,
  //         scrollTrigger: {
  //           trigger: faqSection1,
  //           start: "bottom bottom", // When the bottom of the first card hits the bottom of the viewport
  //           // end: "bottom top", // Until the bottom of the first card hits the top of the viewport
  //           // end: () until the first card reaches 10% of the viewport height from the top
  //           end: () => `+=${0.1 * window.innerHeight}`,
  //           scrub: true,
  //           markers: true,
  //         },
  //       }
  //     );

  //     // Optional: Update y value on window resize
  //     const handleResize = () => {
  //       const newYValue = window.innerWidth <= 768 ? -0.97 * section1Height : -0.91 * section1Height;
  //       gsap.to(faqSection2, { y: newYValue });
  //     };

  //     window.addEventListener('resize', handleResize);
      
  //     // Cleanup on unmount
  //     return () => {
  //       window.removeEventListener('resize', handleResize);
  //     };
  //   }
  // }, []);

  return (
    <div className="min-h-screen py-8 flex flex-col lg:flex-row w-full">
      <div className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center mb-8 lg:mb-0 lg:w-1/2">
        <div className="space-y-2">
          <h1>Frequently</h1>
          <h1>Asked</h1>
          <h1>Questions</h1>
        </div>
        <div className="relative mt-8 lg:mt-16">
          <img src={upperdino} alt="Upper Dino" className="w-32 h-32 md:w-40 md:h-40 mx-auto dino1" />
          <img src={bottom} alt="Bottom Dino" className="w-32 h-24 md:w-40 md:h-30 mx-auto mt-32 lg:mt-64 dino2" />
        </div>
      </div>
      <div className="lg:w-1/2 lg:mt-40 px-4">
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