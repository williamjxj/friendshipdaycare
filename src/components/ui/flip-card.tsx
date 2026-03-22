import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

/**
 * FlipCard - 3D flip card for mission/values, inspired by CEFA Curriculum section.
 * Usage: <FlipCard front={<FrontContent />} back={<BackContent />} />
 */
export const FlipCard: React.FC<FlipCardProps> = ({ front, back, className }) => {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div
      className={clsx(
        'relative w-full h-full cursor-pointer perspective-[1200px] group',
        className
      )}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      tabIndex={0}
      aria-pressed={flipped}
      role="button"
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
    >
      <motion.div
        className="absolute inset-0 w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        style={{ willChange: 'transform' }}
      >
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
          {front}
        </div>
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rotate-y-180">
          {back}
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
