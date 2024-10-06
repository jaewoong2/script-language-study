import { motion, useAnimate } from 'framer-motion';
import { useEffect } from 'react';

export default function TextSpinnerLoader() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const containerWidth = (
      document.querySelector('.container') as HTMLDivElement
    )?.offsetWidth;

    const animateLoader = async () => {
      await animate(
        [
          [scope.current, { x: 0, width: '0%' }],
          [
            scope.current,
            { x: containerWidth, width: '95%' },
            { delay: 0.3 },
          ],
        ],
        {
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.8,
        },
        { ease: 'linear' },
      );
    };
    animateLoader();
  }, []);

  return (
    <div className="tw-relative tw-h-8">
      <motion.div
        ref={scope}
        className="tw-absolute tw-bottom-0 tw-h-full tw-bg-yellow-900"
      />
      <span className="tw-whitespace-nowrap tw-text-white tw-mix-blend-screen">
        <i className="tw-text-xs">Loading...</i>
      </span>
    </div>
  );
}
