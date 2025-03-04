'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface TimerCompletionMessageProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function TimerCompletionMessage({ 
  isVisible, 
  onClose 
}: TimerCompletionMessageProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  
  // Show confetti effect when the message appears
  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000); // Stop confetti after 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {showConfetti && <Confetti width={width} height={height} recycle={false} />}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={onClose}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-10 w-10 text-green-600 dark:text-green-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Time's Up!
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Great job! You've completed your answer. Ready to move on to the next question?
                </p>
                
                <div className="flex space-x-3 justify-center">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 