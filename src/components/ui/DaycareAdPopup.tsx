"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';


const LOGO_IMAGE = '/daycare-logo.png';
const POPUP_KEY = 'daycare_ad_popup_closed_v2'; // versioned key for easy reset
const POPUP_DELAY = 2000;


export default function DaycareAdPopup() {
  // null = not yet decided (SSR), true = open, false = closed
  const [open, setOpen] = useState<null | boolean>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Always show on every page load (remove sessionStorage check)
    const timer = setTimeout(() => setOpen(true), POPUP_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    // Optionally: set sessionStorage for manual testing, but not used for gating
    if (typeof window !== 'undefined') sessionStorage.setItem(POPUP_KEY, '1');
  };

  // Don't render anything until client decides (prevents hydration flash)
  if (open === null) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="relative bg-white rounded-2xl shadow-xl w-[95vw] min-w-80 max-w-5xl shrink-0 overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="p-6 sm:p-8">
              {/* Header: logo + title side by side */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 relative shrink-0">
                  <Image
                    src={LOGO_IMAGE}
                    alt="Friendship Corner Daycare Logo"
                    fill
                    sizes="80px"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">🌸 Friendship Corner Montessori Daycare 🌸</p>
                  <h1 className="text-lg font-bold leading-snug text-gray-900">NOW ENROLLING FOR SEPTEMBER!</h1>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">
                Are you looking for a safe, nurturing, and fun environment for your little ones? Look no further!
              </p>

              <p className="text-sm font-semibold text-gray-800 mb-4">
                🍎 We Accept Children Aged 2.5 – 5 Years Old 🍎
              </p>

              {/* Contact info */}
              <div className="space-y-2 mb-4 text-sm text-gray-700">
                <div>
                  <p className="font-bold">📍 Location:</p>
                  <p>2950 Dewdney Trunk,<br />Coquitlam, BC V3C 2J4</p>
                </div>
                <div>
                  <p className="font-bold">📞 Call Us Today!</p>
                  <p>Tel: 604-945-8504</p>
                </div>
                <div>
                  <p className="font-bold">📧 Email Us for More Information:</p>
                  <p>friendship.care@live.ca</p>
                </div>
              </div>

              {/* Why choose */}
              <p className="text-sm font-bold text-gray-800 mb-2">Why Choose Friendship Corner Daycare?</p>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 mb-4 w-full">
                <li>Licensed and experienced staff</li>
                <li>Safe and engaging learning environment</li>
                <li>Fun activities that promote social, emotional, and cognitive development</li>
                <li>Flexible hours to accommodate your needs</li>
              </ul>

              <p className="text-sm font-bold text-gray-900">
                Spaces are limited! Don't wait—secure your child's spot today!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}