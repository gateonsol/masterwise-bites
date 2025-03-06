
import { Calendar, Trophy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DailyStreakProps {
  streak: number;
  longestStreak: number;
  currentWeek: Array<{
    day: string;
    completed: boolean;
    date: string;
  }>;
  className?: string;
}

const DailyStreak = ({ streak, longestStreak, currentWeek, className }: DailyStreakProps) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Calendar size={18} className="mr-2 text-primary" />
          Learning Streak
        </CardTitle>
        <CardDescription>Keep your daily learning momentum</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-stretch justify-between gap-4">
          <div className="flex-1 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{streak}</span>
            <span className="text-sm text-gray-500">Current Streak</span>
          </div>
          
          <div className="flex-1 p-4 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">{longestStreak}</span>
            <span className="text-sm text-gray-500">Longest Streak</span>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3 flex items-center">
            <Trophy size={16} className="mr-2 text-amber-500" />
            This Week's Progress
          </h4>
          <div className="grid grid-cols-7 gap-1">
            {currentWeek.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-gray-500 mb-1">{day.day}</div>
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    day.completed 
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                  )}
                >
                  {day.date}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between px-2">
          <div className="text-sm">
            <span className="text-gray-500">Total lessons completed:</span>
            <span className="font-medium ml-1">42</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Learning days:</span>
            <span className="font-medium ml-1">12</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyStreak;
