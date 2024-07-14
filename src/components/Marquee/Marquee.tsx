import React from "react";
import Marquee from "react-fast-marquee";

const MarqueeComp: React.FC = () => {
  return (
    <Marquee
      speed={110}
      gradient={false}
      autoFill={true}
      className="marquee overflow-y-hidden p-6 border-t-2 border-b-2 border-gray-300"
    >
      <p className="text-4xl">
        🌐 Do Crazy Things That Matter&nbsp;
      </p>
    </Marquee>
  );
};

export default MarqueeComp;
