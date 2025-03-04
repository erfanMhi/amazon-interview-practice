import { Question } from '@/data/questions';

export interface Session {
  id: string;
  questions: Question[];
  startTime: Date;
  currentQuestionIndex: number;
}

/**
 * Randomly selects a subset of questions from the full list
 */
export function selectRandomQuestions(questions: Question[], count: number = 10): Question[] {
  // Create a copy of the original array to avoid modifying it
  const shuffled = [...questions];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Return the first 'count' questions
  return shuffled.slice(0, count);
}

/**
 * Creates a new session with randomly selected questions
 */
export function createNewSession(allQuestions: Question[], questionsPerSession: number = 10): Session {
  return {
    id: generateSessionId(),
    questions: selectRandomQuestions(allQuestions, questionsPerSession),
    startTime: new Date(),
    currentQuestionIndex: 0,
  };
}

/**
 * Generates a unique session ID
 */
function generateSessionId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Moves to the next question in a session
 */
export function moveToNextQuestion(session: Session): Session {
  if (session.currentQuestionIndex < session.questions.length - 1) {
    return {
      ...session,
      currentQuestionIndex: session.currentQuestionIndex + 1,
    };
  }
  return session;
}

/**
 * Moves to the previous question in a session
 */
export function moveToPreviousQuestion(session: Session): Session {
  if (session.currentQuestionIndex > 0) {
    return {
      ...session,
      currentQuestionIndex: session.currentQuestionIndex - 1,
    };
  }
  return session;
}

/**
 * Checks if the session is complete (all questions viewed)
 */
export function isSessionComplete(session: Session): boolean {
  return session.currentQuestionIndex >= session.questions.length - 1;
}

/**
 * Gets the current question from a session
 */
export function getCurrentQuestion(session: Session): Question {
  return session.questions[session.currentQuestionIndex];
}

/**
 * Jump to a specific question in the session
 */
export function jumpToQuestion(session: Session, index: number): Session {
  if (index >= 0 && index < session.questions.length) {
    return {
      ...session,
      currentQuestionIndex: index,
    };
  }
  return session;
} 