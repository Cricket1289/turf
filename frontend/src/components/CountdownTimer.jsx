import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const target = new Date('2026-04-17T17:00:00');
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });

      if (difference < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 justify-center items-center py-10">
      <TimeBox value={timeLeft.days} label="Days" />
      <TimeBox value={timeLeft.hours} label="Hours" />
      <TimeBox value={timeLeft.minutes} label="Mins" />
      <TimeBox value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

const TimeBox = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="glass w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mb-3 neon-border">
      <span className="text-2xl md:text-4xl font-sports font-black text-neon">{value.toString().padStart(2, '0')}</span>
    </div>
    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500">{label}</span>
  </div>
);

export default CountdownTimer;
