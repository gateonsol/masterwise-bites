
import { ReactNode } from 'react';
import ProgressChart from '@/components/ProgressChart';
import DailyStreak from '@/components/DailyStreak';
import AchievementsSection from './AchievementsSection';

interface StatsColumnProps {
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
  loading: boolean;
}

const StatsColumn = ({ 
  progressData, 
  streakData, 
  achievements, 
  loading 
}: StatsColumnProps) => {
  return (
    <div className="space-y-8">
      <ProgressChart data={progressData} />
      
      <DailyStreak 
        streak={streakData.streak}
        longestStreak={streakData.longestStreak}
        currentWeek={streakData.currentWeek}
      />
      
      <AchievementsSection 
        achievements={achievements}
        loading={loading}
      />
    </div>
  );
};

export default StatsColumn;
