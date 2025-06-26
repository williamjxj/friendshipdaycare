'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export function LoadingSpinner({ size = 'md', message = 'Loading...' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const containerSizes = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Animated Rainbow Spinner */}
      <div className={`relative ${containerSizes[size]}`}>
        {/* Outer rotating ring */}
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-4 border-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400`}
          style={{
            background: 'conic-gradient(from 0deg, #ff6b9d, #c44569, #f8b500, #78e08f, #4bcffa, #a29bfe, #ff6b9d)',
            borderRadius: '50%',
            mask: 'radial-gradient(circle at center, transparent 60%, black 65%)',
            WebkitMask: 'radial-gradient(circle at center, transparent 60%, black 65%)'
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner bouncing dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: ['#ff6b9d', '#4bcffa', '#78e08f'][i]
                }}
                animate={{
                  y: [-4, 4, -4],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating hearts */}
        {size === 'lg' && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-400 text-lg"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`
                }}
                animate={{
                  y: [-10, -20, -10],
                  opacity: [0.7, 1, 0.7],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              >
                💖
              </motion.div>
            ))}
          </>
        )}
      </div>

      {/* Loading message */}
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-lg font-display font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          {message}
        </p>
        <motion.div
          className="flex justify-center space-x-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

// Full page loading component
export function PageLoader({ message = 'Loading magical content...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="text-center space-y-8 p-8">
        <LoadingSpinner size="lg" message={message} />
        
        {/* Fun loading messages */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-muted-foreground font-medium">
            🌟 Preparing something wonderful for you...
          </p>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            >
              {['🎨', '📚', '🧸', '🌈', '⭐', '🎈'][i]}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
