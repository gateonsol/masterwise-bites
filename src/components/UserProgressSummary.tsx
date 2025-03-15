
import { useEffect, useState } from 'react';
import { Flame, Medal, Clock } from 'lucide-react';

const UserProgressSummary = () => {
  const [stats, setStats] = useState({
    streak: 0,
    todayMinutes: 0,
    totalLessons: 0
  });
  
  useEffect(() => {
    // Get real data from localStorage
    const streak = parseInt(localStorage.getItem('current_streak') || '0');
    const totalLessons = parseInt(localStorage.getItem('total_completed_lessons') || '0');
    
    // Get today's activity
    const today = new Date().toISOString().split('T')[0];
    const todayMinutes = parseInt(localStorage.getItem(`activity_minutes_${today}`) || '0');
    
    // Create interval to update stats every minute (to show real-time progress)
    const interval = setInterval(() => {
      const currentStreak = parseInt(localStorage.getItem('current_streak') || '0');
      const currentCompleted = parseInt(localStorage.getItem('total_completed_lessons') || '0');
      const currentMinutes = parseInt(localStorage.getItem(`activity_minutes_${today}`) || '0');
      
      setStats({
        streak: currentStreak,
        todayMinutes: currentMinutes,
        totalLessons: currentCompleted
      });
    }, 60000); // Update every minute
    
    // Initial update
    setStats({
      streak,
      todayMinutes,
      totalLessons
    });
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      <div className="flex items-center px-4 py-2 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-300 rounded-lg">
        <Flame className="mr-2 h-5 w-5" />
        <span className="text-sm font-medium">{stats.streak} day streak</span>
      </div>
      
      <div className="flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-300 rounded-lg">
        <Clock className="mr-2 h-5 w-5" />
        <span className="text-sm font-medium">{stats.todayMinutes} min today</span>
      </div>
      
      <div className="flex items-center px-4 py-2 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-300 rounded-lg">
        <Medal className="mr-2 h-5 w-5" />
        <span className="text-sm font-medium">{stats.totalLessons} lessons completed</span>
      </div>
    </div>
  );
};

export default UserProgressSummary;
