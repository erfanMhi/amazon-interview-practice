'use client';

import { motion } from 'framer-motion';
import { FiRefreshCw, FiStar, FiClock } from 'react-icons/fi';
import { Session } from '@/utils/sessionManager';

interface SessionSummaryProps {
  session: Session;
  onStartNewSession: () => void;
}

export default function SessionSummary({ 
  session, 
  onStartNewSession 
}: SessionSummaryProps) {
  const questionCount = session.questions.length;
  const sessionDuration = new Date().getTime() - session.startTime.getTime();
  const minutes = Math.floor(sessionDuration / (1000 * 60));
  const seconds = Math.floor((sessionDuration % (1000 * 60)) / 1000);
  
  // Group questions by category
  const categoryCounts: Record<string, number> = {};
  session.questions.forEach(question => {
    categoryCounts[question.category] = (categoryCounts[question.category] || 0) + 1;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8"
    >
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiStar className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Session Complete!
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Great job practicing your Amazon interview responses
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 flex items-center">
          <div className="mr-4 bg-indigo-100 dark:bg-indigo-800 p-3 rounded-full">
            <FiClock className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
          </div>
          <div>
            <h3 className="font-medium text-indigo-800 dark:text-indigo-200">
              Session Duration
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {minutes}m {seconds}s
            </p>
          </div>
        </div>
        
        <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-4 flex items-center">
          <div className="mr-4 bg-emerald-100 dark:bg-emerald-800 p-3 rounded-full">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-6 h-6 text-emerald-600 dark:text-emerald-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
              />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-emerald-800 dark:text-emerald-200">
              Questions Practiced
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {questionCount} questions
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
          Leadership Principles Covered
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <div 
              key={category}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
            >
              {category} ({count})
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <button
          onClick={onStartNewSession}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
        >
          <FiRefreshCw className="w-5 h-5" />
          <span>Start New Session</span>
        </button>
      </div>
    </motion.div>
  );
} 