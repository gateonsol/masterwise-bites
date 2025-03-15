
// Type definitions for the learning platform

// Lesson content type
export interface LessonContent {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: number;
  type: 'video' | 'article' | 'podcast' | 'interactive';
  source: string;
  sourceUrl: string;
}

// Skill category type
export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

// Learning progress type
export interface LearningProgress {
  skillId: string;
  skillName: string;
  progress: number;
  lastAccessDate: string;
  completedLessons: string[];
  totalLessons: number;
}

// User statistics type
export interface UserStats {
  totalLearningTime: number; // in minutes
  totalCompletedLessons: number;
  currentStreak: number;
  longestStreak: number;
  weeklyActivity: {
    [day: string]: number; // minutes per day
  };
}

// Achievement type
export interface Achievement {
  id: string;
  title: string;
  description: string;
  dateEarned: string;
  iconName: string;
}

// Notification type
export interface Notification {
  id: string;
  type: 'reminder' | 'achievement' | 'update' | 'tip';
  title: string;
  message: string;
  date: string;
  read: boolean;
}
