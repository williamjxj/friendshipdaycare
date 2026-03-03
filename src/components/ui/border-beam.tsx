"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  /**
   * The size of the border beam.
   */
  size?: number;
  /**
   * The duration of the border beam animation in seconds.
   */
  duration?: number;
  /**
   * The delay before the animation starts.
   */
  delay?: number;
  /**
   * The start color of the gradient.
   */
  colorFrom?: string;
  /**
   * The end color of the gradient.
   */
  colorTo?: string;
  /**
   * Whether to reverse the animation direction.
   */
  reverse?: boolean;
  /**
   * The initial offset position (0-100).
   */
  initialOffset?: number;
  /**
   * The border width of the beam.
   */
  borderWidth?: number;
  /**
   * Custom class name for the beam element.
   */
  className?: string;
  /**
   * Custom inline styles.
   */
  style?: React.CSSProperties;
}

/**
 * Animated border beam that travels along the border of its container.
 * Use with a parent that has `relative` and `overflow-hidden`.
 */
export function BorderBeam({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#3B82F6",
  colorTo = "#F97316",
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 2,
}: BorderBeamProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-transparent"
      style={
        {
          borderWidth: `${borderWidth}px`,
          mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        } as React.CSSProperties
      }
    >
      <motion.div
        className={cn("absolute aspect-square", className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
          ...style,
        } as React.CSSProperties}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
        }}
      />
    </div>
  );
}
