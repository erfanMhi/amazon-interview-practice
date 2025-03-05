'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { FiCheck, FiClock, FiArrowRight } from 'react-icons/fi';

interface TimerCompletionMessageProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function TimerCompletionMessage({ 
  isVisible, 
  onClose 
}: TimerCompletionMessageProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { width, height } = useWindowSize();
  
  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Show confetti effect when the message appears
  useEffect(() => {
    if (isVisible && isMounted) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000); // Stop confetti after 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, isMounted]);
  
  // Don't render anything during SSR to avoid hydration mismatches
  if (!isMounted) return null;
  
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {showConfetti && <Confetti width={width} height={height} recycle={false} />}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full border border-gray-100 dark:border-gray-700 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ 
                type: 'spring',
                damping: 25,
                stiffness: 300
              }}
            >
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br from-green-200 to-green-300 dark:from-green-800/30 dark:to-green-700/30 opacity-50 blur-xl"></div>
                
                <div className="relative text-center">
                  <div className="mb-6 flex justify-center">
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        type: 'spring', 
                        delay: 0.2,
                        damping: 12
                      }}
                      className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 ring-8 ring-green-50 dark:ring-green-900/20"
                    >
                      <FiCheck className="h-10 w-10 text-green-600 dark:text-green-400" />
                    </motion.div>
                  </div>
                  
                  <motion.h3 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight"
                  >
                    Time's Up!
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 dark:text-gray-300 mb-8"
                  >
                    You've completed your answer successfully. Ready to move on to the next question?
                  </motion.p>
                  
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col space-y-3"
                  >
                    <button
                      onClick={onClose}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-medium rounded-xl transition-colors shadow-md"
                    >
                      <FiArrowRight className="w-5 h-5" />
                      <span>Continue to Next Question</span>
                    </button>
                    
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1 mt-2">
                      <FiClock className="w-3.5 h-3.5" />
                      <span>Remember to use the STAR method in your responses</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 