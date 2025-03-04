'use client';

import { Question } from '@/data/questions';
import { motion } from 'framer-motion';

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
      className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
          {question.category}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {question.text}
      </h2>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mt-4">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
          Tips for answering:
        </h3>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use the STAR method (Situation, Task, Action, Result)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Be specific and provide concrete examples</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Focus on your individual contributions</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
} 