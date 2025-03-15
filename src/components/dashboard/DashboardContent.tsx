
import SkillsSection from './SkillsSection';
import LessonsSection from './LessonsSection';
import StatsColumn from './StatsColumn';
import { SkillCardProps } from '@/components/SkillCard';
import { LessonCardProps } from '@/components/LessonCard';
import { ReactNode } from 'react';
import RecommendedPathway from '@/components/RecommendedPathway';

interface DashboardContentProps {
  loading: boolean;
  userSkills: SkillCardProps[];
  todayLessons: LessonCardProps[];
  newLessons: LessonCardProps[];
  savedLessons: LessonCardProps[];
  progressData: Array<{
    name: string;
    minutes: number;
    lessons: number;
  }>;
  streakData: {
    streak: number;
    longestStreak: number;
    currentWeek: Array<{
      day: string;
      completed: boolean;
      date: string;
    }>;
  };
  achievements: Array<{
    icon: ReactNode;
    title: string;
    description: string;
  }>;
}

const DashboardContent = ({
  loading,
  userSkills,
  todayLessons,
  newLessons,
  savedLessons,
  progressData,
  streakData,
  achievements
}: DashboardContentProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left column - Skills and progress */}
      <div className="lg:col-span-2 space-y-8">
        <SkillsSection 
          skills={userSkills} 
          loading={loading} 
        />
        
        <LessonsSection 
          todayLessons={todayLessons}
          newLessons={newLessons}
          savedLessons={savedLessons}
          loading={loading}
        />
        
        <RecommendedPathway />
      </div>
      
      {/* Right column - Stats and achievements */}
      <div>
        <StatsColumn 
          progressData={progressData}
          streakData={streakData}
          achievements={achievements}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default DashboardContent;
