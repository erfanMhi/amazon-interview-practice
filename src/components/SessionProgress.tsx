'use client';

import { FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import { Session } from '@/utils/sessionManager';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SessionProgressProps {
  session: Session;
  onPrevious: () => void;
  onNext: () => void;
  onJumpToQuestion: (index: number) => void;
}

export default function SessionProgress({ 
  session, 
  onPrevious, 
  onNext, 
  onJumpToQuestion
}: SessionProgressProps) {
  const currentIndex = session.currentQuestionIndex;
  const totalQuestions = session.questions.length;
  const [isMounted, setIsMounted] = useState(false);
  
  // Set mounted state on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Calculate progress width for server rendering
  const progressWidth = `${((currentIndex + 1) / totalQuestions) * 100}%`;
  
  // Animation properties conditionally applied
  const initialAnimation = isMounted ? { opacity: 0, y: 20 } : undefined;
  const enterAnimation = isMounted ? { opacity: 1, y: 0 } : undefined;
  const buttonTapAnimation = isMounted ? { scale: 0.95 } : undefined;
  
  // Dot animation properties
  const getDotAnimation = (index: number) => {
    if (!isMounted) return undefined;
    return {
      scale: index === currentIndex ? 1 : 0.8,
      opacity: index === currentIndex ? 1 : 0.7
    };
  };
  
  return (
    <motion.div 
      initial={initialAnimation}
      animate={enterAnimation}
      className="w-full flex flex-col"
    >
      {/* Progress indicators for larger screens */}
      <div className="hidden md:flex justify-center mb-6 max-w-md mx-auto">
        <div className="flex items-center space-x-2">
          {session.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => onJumpToQuestion(index)}
              className="group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label={`Go to question ${index + 1}`}
            >
              <motion.div
                initial={false}
                animate={getDotAnimation(index)}
                whileHover={isMounted ? { scale: 0.9, opacity: 0.9 } : undefined}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  index === currentIndex 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : index < currentIndex 
                      ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                {index < currentIndex ? (
                  <FiCheck className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </motion.div>
              
              {/* Line connecting dots */}
              {index < totalQuestions - 1 && (
                <div className="absolute top-1/2 -right-2 w-4 h-0.5 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Mobile progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 mb-4 rounded-full overflow-hidden shadow-inner">
        {isMounted ? (
          <motion.div 
            className="bg-gradient-to-r from-indigo-600 to-indigo-500 h-full"
            initial={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
            animate={{ width: progressWidth }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        ) : (
          <div 
            className="bg-gradient-to-r from-indigo-600 to-indigo-500 h-full"
            style={{ width: progressWidth }}
          />
        )}
      </div>
      
      <div className="flex justify-between items-center">
        {/* Previous button */}
        <motion.button
          whileTap={buttonTapAnimation}
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all ${
            currentIndex === 0
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
          }`}
          aria-label="Previous question"
        >
          <FiChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">Previous</span>
        </motion.button>
        
        {/* Question indicators for mobile */}
        <div className="flex items-center">
          {isMounted ? (
            <motion.span 
              key={currentIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg"
            >
              Question {currentIndex + 1} of {totalQuestions}
            </motion.span>
          ) : (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
          )}
        </div>
        
        {/* Next button */}
        <motion.button
          whileTap={buttonTapAnimation}
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all ${
            currentIndex === totalQuestions - 1
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
              : 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800/30 font-medium'
          }`}
          aria-label="Next question"
        >
          <span className="hidden sm:inline">Next</span>
          <FiChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
} 