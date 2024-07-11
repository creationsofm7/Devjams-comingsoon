import React, { useRef } from 'react';
// import styles from './Card.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './style.css';  // Assuming the styles are defined in this file
import redirect from '../../assets/redirect.svg';
import arrow from '../../assets/arrow.svg';
import gdsc from '../../assets/gdsc.svg';
import devjams from "../../assets/devjams.svg";
import vit from "../../assets/vit.svg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AboutSection: React.FC<{ title: string; description: string; imgSrc: string; buttonText: string }> = ({ title, description, imgSrc, buttonText }) => (
    <div className="about">
        <div className="topWrapper">
            <h1>{title}</h1>
            <div className="redirect">
                <a href="#"><img src={redirect} alt="Redirect" /></a>
            </div>
        </div>
        <div className="line"></div>
        <div className="wrapper">
            <p>{description}</p>
            <img src={imgSrc} alt={title} className="dummy-image" />
        </div>
        <a href="#"><button className="register-button">
            <span className="dummy-icon">↗</span>
            {buttonText}
        </button></a>
    </div>
);

const GDSCSection: React.FC = () => (
    <div className="about">
        <div className="topWrapper">
            <h1>About GDSC</h1>
            <div className="redirect">
                <a  href="https://www.dscvit.com/"  target="_blank"><img src={redirect} alt="Redirect" /></a>
            </div>
        </div>
        <div className="line"></div>
        <div className="wrapper">
            <p>We do crazy things that matter. Join us, if you dare to dream beyond the binary. Everyone's favourite tech club.</p>
            <div className="imageWrapper">
                <img src={gdsc} alt="GDSC" className="gdsc" />
                <img src={arrow} alt="Arrow" className="arrow" />
            </div>
        </div>
        <a href="https://www.dscvit.com/" target="_blank"><button className="register-button">
            <span className="dummy-icon">↗</span>
            Visit Website
        </button></a>
    </div>
);

const VITSection: React.FC = () => (
    <div className="about">
        <div className="topWrapper">
            <h1>About VIT</h1>
            <div className="redirect">
                <a href="https://vit.ac.in/" target="_blank"><img src={redirect} alt="Redirect" /></a>
            </div>
        </div>
        <div className="line"></div>
        <div className="wrapper">
            <p>We do crazy things that matter. Join us, if you dare to dream beyond the binary. Everyone's favourite tech club. Everyone's favourite tech club. Everyone</p>
            <img src={vit} alt="VIT" className="dummy-image" />
        </div>
        <a href="https://vit.ac.in/" target="_blank"><button className="register-button">
            <span className="dummy-icon">↗</span>
            Learn More
        </button></a>
    </div>
);

function Card() {
    const main = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const sections: HTMLElement[] = gsap.utils.toArray("#about");
            const totalSections = sections.length;

            const lastSection = sections[totalSections - 1];
            const spacingBetweenCards = 14; // in percentage of vh
            sections.forEach((section: HTMLElement, index: number) => {
                ScrollTrigger.create({
                    trigger: section,
                    start: `top ${5 + index * spacingBetweenCards}%`,
                    // end: () => lastSection.offsetTop,
                    end: () => lastSection.offsetTop - window.innerHeight,
                    pin: true,
                    pinSpacing: false,
                    markers: false,
                    scrub: 6,
                });
            });
        },
        { scope: main }
    );

    return (
        <div>
            <div
                className=" w-full p-8"
                ref={main}
            >
                <div  id="about">
                    <AboutSection
                        title="About DevJams"
                        description="We do crazy things that matter. Join us, if you dare to dream beyond the binary. Everyone's favourite tech club. Everyone's favourite tech club. Everyone"
                        imgSrc={devjams}
                        buttonText="Register Now"
                    />
                </div>
                <div id="about">
                    <GDSCSection />
                </div>
                <div  id="about">
                    <VITSection />
                </div>
                <div  id="about"></div>
            </div>
            {/* <div className="mb-10"></div> */}
        </div>
    );
}

export default Card;    