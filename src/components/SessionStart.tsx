'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiSettings, FiChevronRight, FiBriefcase, FiInfo, FiAward } from 'react-icons/fi';

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
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Amazon Behavioral Interview Practice
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
          Master your interview skills with timed practice sessions using real Amazon behavioral questions.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
      >
        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <FiAward className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </span>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Practice Interview
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800/20">
                  <div className="flex items-start mb-2">
                    <FiInfo className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Each session consists of <span className="font-semibold">{questionsCount} randomly selected questions</span> from a pool of {totalQuestionsAvailable} Amazon behavioral questions.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <FiBriefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      You'll have <span className="font-semibold">60 seconds</span> to answer each question using the STAR method.
                    </p>
                  </div>
                </div>
              
                <AnimatePresence>
                  {showSettings && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700"
                    >
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                        <FiSettings className="w-4 h-4 text-indigo-500" />
                        <span>Session Settings</span>
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label htmlFor="questionCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex justify-between">
                            <span>Questions per session:</span>
                            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{questionsCount}</span>
                          </label>
                          <input
                            type="range"
                            id="questionCount"
                            min="5"
                            max={Math.min(totalQuestionsAvailable, 20)}
                            step="1"
                            value={questionsCount}
                            onChange={(e) => setQuestionsCount(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 accent-indigo-600"
                          />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>5</span>
                            <span>{Math.min(totalQuestionsAvailable, 20)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="flex flex-col justify-center space-y-4">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => onStartSession(questionsCount)}
                className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-xl group"
              >
                <div className="flex items-center gap-2">
                  <FiPlay className="w-5 h-5" />
                  <span className="text-lg">Start Interview Session</span>
                </div>
                <FiChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-xl transition-all"
              >
                <FiSettings className="w-4 h-4" />
                <span>{showSettings ? 'Hide Settings' : 'Customize Session'}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 