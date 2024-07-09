import React from 'react';
import '../../styles/Marquee.css';

const Marquee: React.FC = () => {
  return (
    <div className="marquee-container">
      <div className="marquee">
        <div className="marquee-content">
          <span className="marquee-item">🌐 Do Crazy Things That Matter</span>
          <span className="marquee-item">🌐 Do Crazy Things That Matter</span>
          <span className="marquee-item">🌐 Do Crazy Things That Matter</span>
          <span className="marquee-item">🌐 Do Crazy Things That Matter</span>
        </div>
        <div className="marquee-content">
          <span className="marquee-item">🌐 Do Crazy Things That Matter </span>
          <span className="marquee-item">🌐 Do Crazy Things That Matter </span>
          <span className="marquee-item">🌐 Do Crazy Things That Matter </span>
          <span className="marquee-item">🌐 Do Crazy Things That Matter </span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
