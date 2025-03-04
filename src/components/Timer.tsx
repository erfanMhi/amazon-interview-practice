'use client';

import { useState, useEffect, useCallback } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

interface TimerProps {
  duration: number; // Duration in seconds
  onComplete?: () => void;
  autoStart?: boolean; // New prop to auto-start the timer
}

export default function Timer({ duration = 60, onComplete, autoStart = false }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(autoStart); // Initialize based on autoStart
  const [isPaused, setIsPaused] = useState(false);

  // Calculate progress percentage
  const progress = Math.round((timeLeft / duration) * 100);
  
  // Determine color based on time left
  const getColorClass = () => {
    if (timeLeft > duration * 0.6) return 'bg-emerald-500';
    if (timeLeft > duration * 0.3) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  // Reset timer
  const resetTimer = useCallback(() => {
    setTimeLeft(duration);
    setIsActive(autoStart); // When resetting, use autoStart value
    setIsPaused(false);
  }, [duration, autoStart]);

  // Toggle timer
  const toggleTimer = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
    } else {
      setIsPaused(!isPaused);
    }
  }, [isActive, isPaused]);

  // Auto start when component mounts if autoStart is true
  useEffect(() => {
    if (autoStart) {
      setIsActive(true);
      setIsPaused(false);
    }
  }, [autoStart]);

  // Handle timer countdown
  useEffect(() => {
    if (!isActive || isPaused) return;

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
  }, [isActive, isPaused, onComplete]);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-xs">
      <div className="flex flex-col items-center">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${getColorClass()}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="w-full flex items-center justify-between">
          <span className="text-3xl font-bold font-mono">{formatTime(timeLeft)}</span>
          
          <div className="flex space-x-2">
            <button
              onClick={toggleTimer}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              {!isActive ? 'Start' : isPaused ? 'Resume' : 'Pause'}
            </button>
            
            <button
              onClick={resetTimer}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Reset timer"
            >
              <FiRefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 