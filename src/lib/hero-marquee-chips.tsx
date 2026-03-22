'use client';

import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Clock,
  FlaskConical,
  Heart,
  Languages,
  Palette,
  PersonStanding,
  Shield,
  Sparkles,
  Star,
} from 'lucide-react';
import { gridPattern } from '@/lib/magicui-animations';

const CHIP_MOTION = {
  initial: { opacity: 0.7 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, repeat: Infinity, repeatType: 'reverse' as const },
};

const CARD_CLASS =
  'shrink-0 px-5 py-3 rounded-full border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform magic-grid';

const LABEL_SHADOW_STYLE = { textShadow: '0 2px 4px rgba(0,0,0,0.5)' } as const;

/** Translation function shape from {@link useLanguage}. */
export type HeroMarqueeTranslate = (key: string) => string;

export type HeroMarqueeChipConfig = {
  id: string;
  labelResolver: (t: HeroMarqueeTranslate) => string;
  Icon: LucideIcon;
  gradient: string;
  iconClassName: string;
};

/**
 * Data-only config for hero marquee pills. Add entries here to show more chips;
 * labels resolve at runtime via {@link getHeroMarqueeChips}.
 */
export const HERO_MARQUEE_CHIP_CONFIGS: HeroMarqueeChipConfig[] = [
  {
    id: 'montessori',
    labelResolver: (t) => t('home.discoverDifference.authenticMontessori.title'),
    Icon: Sparkles,
    gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.95), rgba(244, 63, 94, 0.95))',
    iconClassName: 'w-4 h-4 text-white group-hover:animate-spin drop-shadow-lg',
  },
  {
    id: 'ece',
    labelResolver: (t) => t('home.hero.stats.eceLicensed'),
    Icon: Shield,
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(6, 182, 212, 0.95))',
    iconClassName: 'w-4 h-4 text-white group-hover:animate-pulse drop-shadow-lg',
  },
  {
    id: 'community',
    labelResolver: (t) => t('home.discoverDifference.lovingCommunity.title'),
    Icon: Heart,
    gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.95), rgba(236, 72, 153, 0.95))',
    iconClassName: 'w-4 h-4 text-white group-hover:animate-bounce fill-white/50 drop-shadow-lg',
  },
  {
    id: 'since',
    labelResolver: (t) => t('home.hero.badgePrefix').split('•')[0]?.trim() ?? '',
    Icon: Star,
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.95), rgba(249, 115, 22, 0.95))',
    iconClassName: 'w-4 h-4 text-white group-hover:animate-spin fill-white/50 drop-shadow-lg',
  },
  {
    id: 'hours',
    labelResolver: (t) => t('home.hero.marqueeChips.extendedHours'),
    Icon: Clock,
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(20, 184, 166, 0.95))',
    iconClassName: 'w-4 h-4 text-white group-hover:animate-pulse drop-shadow-lg',
  },
  {
    id: 'bilingual',
    labelResolver: (t) => t('home.hero.marqueeChips.bilingual'),
    Icon: Languages,
    gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.95), rgba(139, 92, 246, 0.95))',
    iconClassName: 'w-4 h-4 text-white group-hover:animate-spin drop-shadow-lg',
  },
  {
    id: 'bible',
    labelResolver: (t) => t('home.hero.marqueeChips.bibleStories'),
    Icon: BookOpen,
    gradient: 'linear-gradient(135deg, rgba(14, 165, 233, 0.95), rgba(59, 130, 246, 0.95))',
    iconClassName: 'w-4 h-4 text-white group-hover:animate-bounce drop-shadow-lg',
  },
  {
    id: 'yoga',
    labelResolver: (t) => t('home.hero.marqueeChips.yoga'),
    Icon: PersonStanding,
    gradient: 'linear-gradient(135deg, rgba(52, 211, 153, 0.95), rgba(34, 197, 94, 0.95))',
    iconClassName: 'w-4 h-4 text-white group-hover:animate-pulse drop-shadow-lg',
  },
  {
    id: 'science',
    labelResolver: (t) => t('home.hero.marqueeChips.science'),
    Icon: FlaskConical,
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.95), rgba(37, 99, 235, 0.95))',
    iconClassName: 'w-4 h-4 text-white group-hover:animate-spin drop-shadow-lg',
  },
  {
    id: 'art',
    labelResolver: (t) => t('home.hero.marqueeChips.art'),
    Icon: Palette,
    gradient: 'linear-gradient(135deg, rgba(244, 114, 182, 0.95), rgba(217, 70, 239, 0.95))',
    iconClassName: 'w-4 h-4 text-white group-hover:animate-bounce drop-shadow-lg',
  },
];

export type ResolvedHeroMarqueeChip = HeroMarqueeChipConfig & { label: string };

/**
 * Resolves {@link HERO_MARQUEE_CHIP_CONFIGS} with localized labels for rendering.
 */
export function getHeroMarqueeChips(t: HeroMarqueeTranslate): ResolvedHeroMarqueeChip[] {
  return HERO_MARQUEE_CHIP_CONFIGS.map((config) => ({
    ...config,
    label: config.labelResolver(t),
  }));
}

type HeroMarqueeChipRowProps = {
  chips: ResolvedHeroMarqueeChip[];
  trackId: string;
  listRef?: RefObject<HTMLDivElement | null>;
  ariaHidden?: boolean;
};

/**
 * Single infinite-marquee track: maps resolved chips to pill cards.
 */
export function HeroMarqueeChipRow({
  chips,
  trackId,
  listRef,
  ariaHidden,
}: HeroMarqueeChipRowProps) {
  return (
    <div
      ref={listRef}
      className="flex items-center gap-4 animate-marquee-infinite pr-4"
      style={{ width: 'max-content' }}
      aria-hidden={ariaHidden}
    >
      {chips.map((chip) => {
        const Icon = chip.Icon;
        return (
          <motion.div
            key={`${trackId}-${chip.id}`}
            className={CARD_CLASS}
            style={{
              ...gridPattern,
              background: chip.gradient,
              position: 'relative',
              zIndex: 1,
            }}
            {...CHIP_MOTION}
          >
            <Icon className={chip.iconClassName} aria-hidden />
            <span
              className="text-white font-bold text-sm whitespace-nowrap magic-grid-text"
              style={LABEL_SHADOW_STYLE}
            >
              {chip.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
