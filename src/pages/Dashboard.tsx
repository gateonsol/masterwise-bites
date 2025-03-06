
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Award, Zap } from 'lucide-react';
import SkillCard, { SkillCardProps } from '@/components/SkillCard';
import LessonCard, { LessonCardProps } from '@/components/LessonCard';
import ProgressChart from '@/components/ProgressChart';
import DailyStreak from '@/components/DailyStreak';
import Navbar from '@/components/Navbar';
import { useToast } from '@/components/ui/use-toast';

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
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold">Welcome back, Alex</h1>
                <p className="text-gray-500 mt-1">Continue your learning journey</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button asChild>
                  <Link to="/get-started">
                    <Plus size={18} className="mr-2" />
                    Add New Skill
                  </Link>
                </Button>
              </div>
            </div>
          </header>
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Skills and progress */}
            <div className="lg:col-span-2 space-y-8">
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <BookOpen size={18} className="mr-2 text-primary" />
                    Your Skills
                  </h2>
                  <Link to="/skills" className="text-sm text-primary hover:underline">
                    View all
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {loading ? (
                    Array(2).fill(0).map((_, i) => (
                      <div key={i} className="h-48 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                    ))
                  ) : (
                    userSkills.map((skill) => (
                      <SkillCard key={skill.id} {...skill} />
                    ))
                  )}
                </div>
              </section>
              
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Zap size={18} className="mr-2 text-primary" />
                    Today's Lessons
                  </h2>
                  <Link to="/explore" className="text-sm text-primary hover:underline">
                    Explore more
                  </Link>
                </div>
                
                <Tabs defaultValue="recommended" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="recommended">Recommended</TabsTrigger>
                    <TabsTrigger value="new">New</TabsTrigger>
                    <TabsTrigger value="saved">Saved</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="recommended" className="space-y-4">
                    {loading ? (
                      Array(2).fill(0).map((_, i) => (
                        <div key={i} className="h-40 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                      ))
                    ) : (
                      todayLessons.map((lesson) => (
                        <LessonCard key={lesson.id} {...lesson} />
                      ))
                    )}
                  </TabsContent>
                  
                  <TabsContent value="new" className="space-y-4">
                    {newLessons.map((lesson) => (
                      <LessonCard key={lesson.id} {...lesson} />
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="saved" className="space-y-4">
                    {savedLessons.map((lesson) => (
                      <LessonCard key={lesson.id} {...lesson} />
                    ))}
                  </TabsContent>
                </Tabs>
              </section>
            </div>
            
            {/* Right column - Stats and achievements */}
            <div className="space-y-8">
              <ProgressChart data={progressData} />
              
              <DailyStreak 
                streak={5}
                longestStreak={14}
                currentWeek={weekData}
              />
              
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Award size={18} className="mr-2 text-primary" />
                    Recent Achievements
                  </h2>
                </div>
                
                {loading ? (
                  <div className="h-48 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                ) : (
                  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm">
                    <div className="space-y-4">
                      {achievements.map((achievement, index) => (
                        <div 
                          key={index}
                          className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            {achievement.icon}
                          </div>
                          <div className="ml-3">
                            <h3 className="font-medium">{achievement.title}</h3>
                            <p className="text-sm text-gray-500">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
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
