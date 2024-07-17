import React, { useState, useEffect } from "react";

type CountdownTimerProps = {
  targetDate: string;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft(): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } {
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
    {
      label: "Days",
      value: timeLeft.days,
      colors: "from-blue-500 via-teal-500 to-green-500",
    },
    {
      label: "Hours",
      value: timeLeft.hours,
      colors: "from-green-500 via-yellow-500 to-yellow-500",
    },
    {
      label: "Minutes",
      value: timeLeft.minutes,
      colors: "from-yellow-500 via-orange-500 to-red-500",
    },
    {
      label: "Seconds",
      value: timeLeft.seconds,
      colors: "from-red-500 via-purple-500 to-blue-500",
    },
  ];

  return (
    <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-around gap-8 p-4">
      <h1 className="text-3xl md:text-4xl lg:text-6xl w-full text-center">
        Registrations Opening Soon!
      </h1>
      <div className="flex flex-wrap w-full items-center justify-center gap-8 ">
        {timerComponents.map((timerComponent) => (
          <div className="flex flex-col max-w-full w-[300px]">
            <div className="max-w-full w-[300px] max-h-full h-[200px] border-2 rounded-2xl bg-[#202124] z-10 flex flex-col items-center justify-center">
              <p className="text-8xl countdown-text">
                {timerComponent.value < 10
                  ? `0${timerComponent.value}`
                  : timerComponent.value}
              </p>
              <p className="text-2xl">{timerComponent.label}</p>
            </div>
            <div
              className={`max-w-full w-[300px] border-2 h-[35px] rounded-b-2xl -mt-4 z-0 bg-gradient-to-r ${timerComponent.colors}`}
            ></div>
            <div
              className={`max-w-full w-[300px] border-2 h-[35px] rounded-b-2xl -mt-4 -z-10 bg-gradient-to-r ${timerComponent.colors}`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
