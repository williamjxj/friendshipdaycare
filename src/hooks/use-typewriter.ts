'use client';

import { useEffect, useState } from 'react';

const TYPE_DELAY_MS = 62; // ms per character while typing
const DELETE_DELAY_MS = 34; // ms per character while deleting
const HOLD_DELAY_MS = 1700; // hold a completed phrase before deleting
const BETWEEN_PHRASES_DELAY_MS = 350; // pause before typing the next phrase

/**
 * Typewriter loop: types each phrase character-by-character, holds the
 * completed phrase, deletes it, then moves on to the next phrase.
 * The loop restarts only when the phrase list contents change.
 */
export function useTypewriter(phrases: string[]) {
  const [text, setText] = useState('');
  const phrasesKey = phrases.join('\0');

  useEffect(() => {
    if (!phrasesKey) return;
    const activePhrases = phrasesKey.split('\0');

    // Accessibility: just show the first phrase if the user prefers reduced motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(activePhrases[0]);
      return;
    }

    let phraseIdx = 0;
    let charCount = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const phrase = activePhrases[phraseIdx];
      setText(phrase.slice(0, charCount));

      let delay = deleting ? DELETE_DELAY_MS : TYPE_DELAY_MS;
      if (!deleting && charCount !== phrase.length) charCount++;
      else if (deleting && charCount !== 0) charCount--;
      else if (!deleting) {
        deleting = true;
        delay = HOLD_DELAY_MS;
      } else {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % activePhrases.length;
        delay = BETWEEN_PHRASES_DELAY_MS;
      }

      timer = setTimeout(tick, delay);
    };

    tick();
    return () => clearTimeout(timer);
  }, [phrasesKey]);

  return text;
}
