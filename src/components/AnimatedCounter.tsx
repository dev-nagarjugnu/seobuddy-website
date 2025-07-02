// src/components/AnimatedCounter.tsx

"use client";

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const AnimatedCounter = ({ target, prefix = '', suffix = '', className = '' }: AnimatedCounterProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={className}>
      {inView ? (
        <CountUp
          start={0}
          end={target}
          duration={2.5}
          separator=","
          prefix={prefix}
          suffix={suffix}
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </div>
  );
};

export default AnimatedCounter;