'use client';

import { useState, useEffect, useCallback } from 'react';
import { FiRefreshCw, FiPlay, FiPause } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface TimerProps {
  duration: number; // Duration in seconds
  onComplete?: () => void;
  autoStart?: boolean; // New prop to auto-start the timer
}

export default function Timer({ duration = 60, onComplete, autoStart = false }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false); // Initialize as inactive, regardless of autoStart
  const [isPaused, setIsPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Calculate progress percentage
  const progress = Math.round((timeLeft / duration) * 100);
  
  // Determine color based on time left
  const getColorClass = () => {
    if (timeLeft > duration * 0.6) return 'bg-emerald-500';
    if (timeLeft > duration * 0.3) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  // Determine progress gradient
  const getProgressGradient = () => {
    if (timeLeft > duration * 0.6) {
      return 'from-emerald-400 to-emerald-500';
    } else if (timeLeft > duration * 0.3) {
      return 'from-amber-400 to-amber-500';
    }
    return 'from-rose-400 to-rose-500';
  };

  // Reset timer
  const resetTimer = useCallback(() => {
    setTimeLeft(duration);
    setIsActive(autoStart && mounted); // Only auto-start if mounted
    setIsPaused(false);
  }, [duration, autoStart, mounted]);

  // Toggle timer
  const toggleTimer = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
    } else {
      setIsPaused(!isPaused);
    }
  }, [isActive, isPaused]);

  // Handle client-side initialization
  useEffect(() => {
    setMounted(true);
    if (autoStart) {
      setIsActive(true);
    }
  }, [autoStart]);

  // Handle timer countdown
  useEffect(() => {
    if (!isActive || isPaused || !mounted) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setIsActive(false);
          onComplete?.();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPaused, onComplete, mounted]);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Don't render anything during SSR to prevent hydration mismatches
  if (!mounted) {
    return (
      <div className="w-full max-w-xs">
        <div className="flex flex-col items-center">
          <div className="w-full h-8 bg-gray-100 dark:bg-gray-700 rounded-full mb-3 overflow-hidden shadow-inner p-1">
            <div className="h-full rounded-full bg-gray-200 dark:bg-gray-600" style={{ width: '100%' }} />
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="text-3xl md:text-4xl font-bold font-mono tabular-nums text-gray-400">
                {formatTime(duration)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 self-end mb-1">sec</span>
            </div>
            <div className="flex space-x-2">
              <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-500 flex items-center gap-1">
                <FiPlay className="w-4 h-4" />
                <span>Start</span>
              </div>
              <div className="p-2 rounded-lg text-gray-400">
                <FiRefreshCw className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs">
      <div className="flex flex-col items-center">
        <div className="w-full h-8 bg-gray-100 dark:bg-gray-700 rounded-full mb-3 overflow-hidden shadow-inner p-1">
          <motion.div 
            className={`h-full rounded-full transition-all bg-gradient-to-r ${getProgressGradient()}`}
            style={{ width: `${progress}%` }}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ 
              duration: 1, 
              ease: 'linear',
              type: 'tween'
            }}
          />
        </div>
        
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-3xl md:text-4xl font-bold font-mono tabular-nums bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              {formatTime(timeLeft)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 self-end mb-1">sec</span>
          </div>
          
          <div className="flex space-x-2">
            <motion.button
              onClick={toggleTimer}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white transition-colors shadow-md flex items-center gap-1"
            >
              {!isActive ? (
                <>
                  <FiPlay className="w-4 h-4" />
                  <span>Start</span>
                </>
              ) : isPaused ? (
                <>
                  <FiPlay className="w-4 h-4" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <FiPause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              )}
            </motion.button>
            
            <motion.button
              onClick={resetTimer}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Reset timer"
            >
              <FiRefreshCw className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
} 