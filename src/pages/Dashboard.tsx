
import { useState, useEffect } from 'react';
import { Zap, Award } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardContent from '@/components/dashboard/DashboardContent';
import { SkillCardProps } from '@/components/SkillCard';
import { LessonCardProps } from '@/components/LessonCard';

const Dashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Show welcome toast
      toast({
        title: "Welcome back!",
        description: "You have 3 lessons waiting for you today.",
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [toast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <DashboardHeader username="Alex" />
          
          <DashboardContent 
            loading={loading}
            userSkills={userSkills}
            todayLessons={todayLessons}
            newLessons={newLessons}
            savedLessons={savedLessons}
            progressData={progressData}
            streakData={{
              streak: 5,
              longestStreak: 14,
              currentWeek: weekData
            }}
            achievements={achievements}
          />
        </div>
      </main>
    </div>
  );
};

// Sample data
const userSkills: SkillCardProps[] = [
  {
    id: '1',
    name: 'React.js Development',
    level: 'intermediate',
    progress: 65,
    streak: 7,
    estimatedTimeLeft: '2 weeks',
    badgesEarned: 4,
    totalBadges: 8,
    todayLessonCompleted: true,
  },
  {
    id: '2',
    name: 'UX Design Fundamentals',
    level: 'beginner',
    progress: 32,
    streak: 3,
    estimatedTimeLeft: '1 month',
    badgesEarned: 2,
    totalBadges: 10,
    todayLessonCompleted: false,
  },
];

const todayLessons: LessonCardProps[] = [
  {
    id: '1',
    title: 'React Hooks Simplified',
    description: 'Learn how to use React hooks to manage state and side effects in functional components.',
    duration: 8,
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    completed: true,
  },
  {
    id: '2',
    title: 'UX Design Principles Everyone Should Know',
    description: 'Essential design principles that will help you create better user experiences in your projects.',
    duration: 6,
    type: 'article',
    thumbnailUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    completed: false,
  },
];

const newLessons: LessonCardProps[] = [
  {
    id: '3',
    title: 'Advanced CSS Techniques',
    description: 'Take your CSS skills to the next level with these advanced techniques and best practices.',
    duration: 10,
    type: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    completed: false,
  },
];

const savedLessons: LessonCardProps[] = [
  {
    id: '4',
    title: 'The Future of Web Development',
    description: 'Explore the trends and technologies shaping the future of web development.',
    duration: 15,
    type: 'podcast',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    completed: false,
  },
];

const progressData = [
  { name: 'Mon', minutes: 15, lessons: 2 },
  { name: 'Tue', minutes: 25, lessons: 3 },
  { name: 'Wed', minutes: 10, lessons: 1 },
  { name: 'Thu', minutes: 30, lessons: 4 },
  { name: 'Fri', minutes: 20, lessons: 2 },
  { name: 'Sat', minutes: 15, lessons: 2 },
  { name: 'Sun', minutes: 5, lessons: 1 },
];

const weekData = [
  { day: 'M', completed: true, date: '12' },
  { day: 'T', completed: true, date: '13' },
  { day: 'W', completed: true, date: '14' },
  { day: 'T', completed: true, date: '15' },
  { day: 'F', completed: true, date: '16' },
  { day: 'S', completed: false, date: '17' },
  { day: 'S', completed: false, date: '18' },
];

const achievements = [
  {
    icon: <Zap size={16} className="text-amber-500" />,
    title: 'Week Streak',
    description: 'Completed lessons for 7 days in a row',
  },
  {
    icon: <Award size={16} className="text-blue-500" />,
    title: 'React Apprentice',
    description: 'Completed 50% of React.js learning path',
  },
];

export default Dashboard;
