import React from 'react';
import '../../styles/Marquee.css';

const Marquee: React.FC = () => {
  return (
    <div className="marquee-container">
      <div className="marquee">
        <div className="marquee-content">
          <span className="marquee-item">🌐 Do Crazy Things That Matter&nbsp;</span>
          <span className="marquee-item">🌐 Do Crazy Things That Matter&nbsp;</span>
          <span className="marquee-item">🌐 Do Crazy Things That Matter&nbsp;</span>
          <span className="marquee-item">🌐 Do Crazy Things That Matter&nbsp;</span>
        </div>
        <div className="marquee-content">
          <span className="marquee-item">🌐 Do Crazy Things That Matter&nbsp;</span>
          <span className="marquee-item">🌐 Do Crazy Things That Matter&nbsp;</span>
          <span className="marquee-item">🌐 Do Crazy Things That Matter&nbsp;</span>
          <span className="marquee-item">🌐 Do Crazy Things That Matter&nbsp;</span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
