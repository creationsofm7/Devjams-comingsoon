import React, { useState, useEffect } from 'react';

type CountdownTimerProps = {
  targetDate: string;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft(): { days: number; hours: number; minutes: number; seconds: number } {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [
    { label: 'Days', value: timeLeft.days, colors: 'from-blue-500 via-teal-500 to-green-500' },
    { label: 'Hours', value: timeLeft.hours, colors: 'from-green-500 via-yellow-500 to-yellow-500' },
    { label: 'Minutes', value: timeLeft.minutes, colors: 'from-yellow-500 via-orange-500 to-red-500' },
    { label: 'Seconds', value: timeLeft.seconds, colors: 'from-red-500 via-purple-500 to-blue-500' },
  ];

  return (
    <div className="contact-c text-white p-4 sm:p-6 md:p-8 rounded-lg">
      <h2 className="text-2xl sm:text-1xl font-normal md:text-4xl mb-4 sm:mb-6 md:mb-8 text-center">Registrations Opening Soon!</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {timerComponents.map(({ label, value, colors }) => (
          <div key={label} className="text-center w-full sm:w-1/2 md:w-auto">
            <div className="bg-gray-800 rounded-lg px-4 sm:px-8 md:px-10 py-3 sm:py-4 relative overflow-hidden border-2">
              <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${colors}`}></div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors}`}></div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">{value?.toString().padStart(2, '0') || '00'}</div>
              <div className="text-xs sm:text-sm">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;