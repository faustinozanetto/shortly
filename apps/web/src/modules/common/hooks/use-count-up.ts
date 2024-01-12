import { useState, useEffect, useRef } from 'react';

type CountUpScrollProps = {
  startValue: number;
  endValue: number;
  startOnInView?: boolean;
  duration?: number;
  easingFunction?: (t: number) => number;
};

const easeOutQuad = (t: number) => t * (2 - t);

export const useCountUp = ({
  startValue,
  endValue,
  startOnInView = true,
  duration = 1000,
  easingFunction = easeOutQuad,
}: CountUpScrollProps) => {
  const [count, setCount] = useState(startValue);
  const [isVisible, setIsVisible] = useState(startOnInView);

  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const currentCount = Math.floor(startValue + easedProgress * (endValue - startValue));

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      }
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        animationFrameId = requestAnimationFrame(animateCount);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust as needed based on when you want the animation to start
    });

    if (startOnInView && countRef.current) {
      observer.observe(countRef.current);
    } else {
      animationFrameId = requestAnimationFrame(animateCount);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [startValue, endValue, duration, startOnInView]);

  return { count, ref: countRef };
};
