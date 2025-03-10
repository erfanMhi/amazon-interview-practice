'use client';

import { useState, useEffect } from 'react';
import { amazonQuestions } from '@/data/questions';
import QuestionCard from '@/components/QuestionCard';
import Timer from '@/components/Timer';
import TimerCompletionMessage from '@/components/TimerCompletionMessage';
import SessionStart from '@/components/SessionStart';
import SessionProgress from '@/components/SessionProgress';
import SessionSummary from '@/components/SessionSummary';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Session,
  createNewSession,
  moveToNextQuestion,
  moveToPreviousQuestion,
  jumpToQuestion,
  getCurrentQuestion,
  isSessionComplete
} from '@/utils/sessionManager';

type AppState = 'start' | 'session' | 'complete';

export default function InterviewPage() {
  // Use client-side only initialization
  const [mounted, setMounted] = useState(false);
  const [appState, setAppState] = useState<AppState>('start');
  const [session, setSession] = useState<Session | null>(null);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [timerKey, setTimerKey] = useState(0); // Don't use Date.now() initially
  
  // Initialize client-side only values after mount
  useEffect(() => {
    setMounted(true);
    setTimerKey(Date.now()); // Now it's safe to use Date.now()
  }, []);
  
  // Start a new session
  const handleStartSession = (questionsCount: number) => {
    const newSession = createNewSession(amazonQuestions, questionsCount);
    setSession(newSession);
    setAppState('session');
    resetTimer(); // Reset timer when starting a new session
  };
  
  // Handle next question
  const handleNext = () => {
    if (session) {
      if (isSessionComplete(session)) {
        setAppState('complete');
      } else {
        setSession(moveToNextQuestion(session));
        resetTimer(); // Reset timer when moving to next question
      }
    }
  };
  
  // Handle previous question
  const handlePrevious = () => {
    if (session) {
      setSession(moveToPreviousQuestion(session));
      resetTimer(); // Reset timer when moving to previous question
    }
  };
  
  // Jump to a specific question
  const handleJumpToQuestion = (index: number) => {
    if (session) {
      setSession(jumpToQuestion(session, index));
      resetTimer(); // Reset timer when jumping to a specific question
    }
  };
  
  // Reset the timer by updating its key
  const resetTimer = () => {
    setTimerKey(Date.now());
  };
  
  // Handle timer complete
  const handleTimerComplete = () => {
    setShowCompletionMessage(true);
  };
  
  // Handle completion message close
  const handleCompletionMessageClose = () => {
    setShowCompletionMessage(false);
    
    // Auto-advance to next question if not at the end
    if (session && !isSessionComplete(session)) {
      handleNext();
    }
  };
  
  // Check if we should show the current question
  const shouldShowQuestion = appState === 'session' && session !== null;
  const currentQuestion = shouldShowQuestion ? getCurrentQuestion(session) : null;

  // Render different states
  const renderContent = () => {
    switch (appState) {
      case 'start':
        return (
          <SessionStart 
            onStartSession={handleStartSession} 
            totalQuestionsAvailable={amazonQuestions.length} 
          />
        );
        
      case 'session':
        return session && (
          <div className="w-full">
            {/* Question Card */}
            <div className="relative mb-10">
              <AnimatePresence mode="wait">
                {currentQuestion && (
                  <QuestionCard
                    key={currentQuestion.id}
                    question={currentQuestion}
                    currentIndex={session.currentQuestionIndex}
                    totalQuestions={session.questions.length}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Timer - Key is updated to reset timer and autoStart set to true */}
            <div className="w-full flex justify-center mb-10">
              <Timer 
                key={timerKey}
                duration={60} 
                onComplete={handleTimerComplete}
                autoStart={mounted} // Only auto-start if mounted
              />
            </div>

            {/* Navigation */}
            <SessionProgress 
              session={session}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onJumpToQuestion={handleJumpToQuestion}
            />
          </div>
        );
        
      case 'complete':
        return session && (
          <SessionSummary 
            session={session}
            onStartNewSession={() => setAppState('start')}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-indigo-950/50 dark:to-purple-950/30 py-8 px-4 sm:px-6 md:py-12 lg:px-8">
      <div className="max-w-4xl mx-auto relative">
        <AnimatePresence mode="wait">
          {/* Header - Only shown during session */}
          {appState === 'session' && (
            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                Amazon Behavioral Interview
              </h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Practice answering common Amazon behavioral interview questions with a 1-minute timer
              </p>
            </motion.header>
          )}

          {/* Main content area */}
          <motion.div
            key={appState}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>

          {/* Footer - Only shown during session */}
          {appState === 'session' && (
            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400 p-4 border-t border-gray-200 dark:border-gray-800"
            >
              <p>Designed to help you prepare for Amazon behavioral interviews</p>
              <p className="mt-1">Remember to structure your answers using the STAR method:
                <span className="font-medium text-indigo-600 dark:text-indigo-400"> Situation, Task, Action, Result</span>
              </p>
            </motion.footer>
          )}
        </AnimatePresence>
      </div>
      
      {/* Timer Completion Message */}
      <TimerCompletionMessage 
        isVisible={showCompletionMessage} 
        onClose={handleCompletionMessageClose} 
      />
    </main>
  );
}
