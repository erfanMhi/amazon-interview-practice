'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Session } from '@/utils/sessionManager';

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
  
  return (
    <div className="w-full flex flex-col">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 mb-4 rounded-full overflow-hidden">
        <div 
          className="bg-indigo-600 h-full transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        {/* Previous button */}
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
            currentIndex === 0
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          aria-label="Previous question"
        >
          <FiChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        {/* Question indicators */}
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-3">
            {currentIndex + 1}/{totalQuestions}
          </span>
          
          <div className="hidden sm:flex space-x-1">
            {session.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => onJumpToQuestion(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-indigo-600'
                    : index < currentIndex
                    ? 'bg-indigo-300 dark:bg-indigo-700'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={`Go to question ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Next button */}
        <button
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
            currentIndex === totalQuestions - 1
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          aria-label="Next question"
        >
          <span className="hidden sm:inline">Next</span>
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
} 