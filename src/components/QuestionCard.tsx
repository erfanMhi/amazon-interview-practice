'use client';

import { Question } from '@/data/questions';
import { motion } from 'framer-motion';
import { FiAward, FiCheckCircle } from 'react-icons/fi';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
}

export default function QuestionCard({ 
  question, 
  currentIndex, 
  totalQuestions 
}: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      {/* Progress bar at the top */}
      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 flex items-center gap-1">
            <FiAward className="w-3.5 h-3.5" />
            <span>{question.category}</span>
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
            {currentIndex + 1} of {totalQuestions}
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-8 leading-relaxed">
          {question.text}
        </h2>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800 rounded-xl p-5 mt-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
            <FiCheckCircle className="w-4 h-4 text-indigo-500" />
            <span>Tips for answering:</span>
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-3">
            <li className="flex items-start">
              <span className="mr-2 text-indigo-500 font-bold">•</span>
              <span>Use the <span className="font-semibold">STAR method</span> (Situation, Task, Action, Result)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-indigo-500 font-bold">•</span>
              <span>Be specific and provide <span className="font-semibold">concrete examples</span></span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-indigo-500 font-bold">•</span>
              <span>Focus on your <span className="font-semibold">individual contributions</span></span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
} 