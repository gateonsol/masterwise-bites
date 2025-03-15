
import { useEffect, useState } from 'react';
import { Flame, Medal, Clock } from 'lucide-react';

const UserProgressSummary = () => {
  const [stats, setStats] = useState({
    streak: 0,
    todayMinutes: 0,
    totalLessons: 0
  });
  
  useEffect(() => {
    // In a real app, this would come from an API
    // For this demo, we'll generate or use localStorage
    const streak = parseInt(localStorage.getItem('current_streak') || '0');
    const totalLessons = parseInt(localStorage.getItem('total_completed_lessons') || '0');
    const randomMinutes = Math.floor(Math.random() * 40) + 5; // 5-45 minutes
    
    setStats({
      streak: streak || Math.floor(Math.random() * 10) + 1,
      todayMinutes: randomMinutes,
      totalLessons: totalLessons || Math.floor(Math.random() * 20) + 1
    });
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
