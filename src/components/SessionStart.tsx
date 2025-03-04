'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiSettings } from 'react-icons/fi';

interface SessionStartProps {
  onStartSession: (questionsCount: number) => void;
  totalQuestionsAvailable: number;
}

export default function SessionStart({ 
  onStartSession, 
  totalQuestionsAvailable 
}: SessionStartProps) {
  const [questionsCount, setQuestionsCount] = useState(10);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Amazon Behavioral Interview Practice
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Practice answering behavioral questions with a 60-second timer
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4">
          <h3 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
            Session Format
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Each session consists of {questionsCount} randomly selected questions from a pool of {totalQuestionsAvailable} Amazon behavioral questions.
          </p>
        </div>

        {showSettings && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
          >
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4">
              Session Settings
            </h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="questionCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Questions per session: {questionsCount}
                </label>
                <input
                  type="range"
                  id="questionCount"
                  min="5"
                  max={Math.min(totalQuestionsAvailable, 20)}
                  step="1"
                  value={questionsCount}
                  onChange={(e) => setQuestionsCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>5</span>
                  <span>{Math.min(totalQuestionsAvailable, 20)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => onStartSession(questionsCount)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            <FiPlay className="w-5 h-5" />
            <span>Start Interview Session</span>
          </button>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-colors"
          >
            <FiSettings className="w-4 h-4" />
            <span>{showSettings ? 'Hide Settings' : 'Customize Session'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
} 