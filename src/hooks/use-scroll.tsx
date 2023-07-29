import { useScroll, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

export function useScrollPosition(min: number, max: number) {
  let { scrollY } = useScroll();
  let height = useMotionValue(max);

  useEffect(() => {
    return scrollY.on('change', (current) => {
      let previous = scrollY.getPrevious();
      let diff = current - previous;
      let newHeight = height.get() - diff * 0.25;

      height.set(Math.min(Math.max(newHeight, min), max));
    });
  }, [scrollY, height, max, min]);

  return { height };
}
