import Card from "./Card";
import Data from "./About";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const AboutData: AboutDataType[] = Object.values(Data);

type AboutDataType = {
  title: string;
  description: string;
  image: string;
  externalLink: string;
  buttonText?: string;
  buttonLink?: string;
};

export default function AboutSection() {
  const main = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sections: HTMLElement[] = gsap.utils.toArray("#about");
      const totalSections = sections.length;

      const lastSection = sections[totalSections - 1];
      const spacingBetweenCards = 110/window.innerHeight * 100; //in percentage of vh
      sections.forEach((section: HTMLElement, index: number) => {
        ScrollTrigger.create({
          trigger: section,
          start: `top ${10 + index * spacingBetweenCards}%`,
          end: () =>
            lastSection.offsetTop -
            lastSection.offsetHeight + spacingBetweenCards*(window.innerHeight /100) * (totalSections - 1),
          pin: true,
          pinSpacing: false,
          markers :false,
          invalidateOnRefresh: true,
        });
      });
    },
    { scope: main }
  );

  return (
    <div className="p-4 md:pt-40 md:p-24 " id="about" ref={main}>
      {AboutData.map((item: AboutDataType, index: number) => {
        return (
          <div id="about">
            <Card
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              externalLink={item.externalLink}
              buttonText={item.buttonText}
              buttonLink={item.buttonLink}
            />
          </div>
        );
      })}
    </div>
  );
}
