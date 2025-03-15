
import { useState, useEffect } from 'react';
import { Zap, Award, BookOpen, TrendingUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardContent from '@/components/dashboard/DashboardContent';
import { SkillCardProps } from '@/components/SkillCard';
import { LessonCardProps } from '@/components/LessonCard';
import { useAuth } from '@/contexts/AuthContext';
import { LessonContent } from '@/utils/types';
import { getLessonsForSkill, getAllSkills } from '@/utils/lessonContentService';

const Dashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [userSkills, setUserSkills] = useState<SkillCardProps[]>([]);
  const [todayLessons, setTodayLessons] = useState<LessonCardProps[]>([]);
  const [newLessons, setNewLessons] = useState<LessonCardProps[]>([]);
  const [savedLessons, setSavedLessons] = useState<LessonCardProps[]>([]);
  
  useEffect(() => {
    // Simulate data loading and fetch user data
    const fetchUserData = async () => {
      setLoading(true);
      
      try {
        // In a real app, this would come from an API or database
        // For this demo, we'll generate some data
        
        // 1. Get user skills from localStorage or generate random ones
        const savedSkills = localStorage.getItem('user_skills');
        let skills: SkillCardProps[] = [];
        
        if (savedSkills) {
          skills = JSON.parse(savedSkills);
        } else {
          // If no saved skills, create default ones
          const allSkills = getAllSkills();
          const randomSkills = allSkills
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          
          skills = randomSkills.map((skillName, index) => ({
            id: `skill-${index + 1}`,
            name: skillName,
            level: ['beginner', 'intermediate', 'advanced', 'master'][Math.floor(Math.random() * 4)] as 'beginner' | 'intermediate' | 'advanced' | 'master',
            progress: Math.floor(Math.random() * 100),
            streak: Math.floor(Math.random() * 10),
            estimatedTimeLeft: `${Math.floor(Math.random() * 4) + 1} weeks`,
            badgesEarned: Math.floor(Math.random() * 5),
            totalBadges: 10,
            todayLessonCompleted: Math.random() > 0.5
          }));
          
          localStorage.setItem('user_skills', JSON.stringify(skills));
        }
        
        setUserSkills(skills);
        
        // 2. Generate lessons for today
        const allLessons: LessonContent[] = [];
        skills.forEach(skill => {
          const skillLessons = getLessonsForSkill(skill.name);
          allLessons.push(...skillLessons);
        });
        
        // Convert to LessonCardProps
        const lessonCards: LessonCardProps[] = allLessons.map(lesson => {
          // Check if this lesson is completed or bookmarked
          const isCompleted = localStorage.getItem(`lesson_progress_${lesson.id}`) === "100";
          const isBookmarked = localStorage.getItem(`lesson_bookmarked_${lesson.id}`) === "true";
          
          return {
            id: lesson.id,
            title: lesson.title,
            description: lesson.description,
            duration: lesson.duration,
            type: lesson.type as 'video' | 'article' | 'podcast',
            completed: isCompleted,
            thumbnailUrl: ""
          };
        });
        
        // Separate into different categories
        setTodayLessons(lessonCards.slice(0, 3));
        setNewLessons(lessonCards.slice(3, 6));
        
        // Get bookmarked lessons
        const bookmarkedLessons = lessonCards.filter(lesson => 
          localStorage.getItem(`lesson_bookmarked_${lesson.id}`) === "true"
        );
        
        setSavedLessons(bookmarkedLessons.length > 0 ? bookmarkedLessons : lessonCards.slice(6, 9));
        
        // Show welcome toast
        toast({
          title: `Welcome back${user?.displayName ? `, ${user.displayName}` : ""}!`,
          description: "You have lessons waiting for you today.",
        });
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast({
          title: "Error loading dashboard",
          description: "There was a problem loading your personalized dashboard.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [toast, user]);
  
  // Get user activity data from localStorage
  const getUserActivity = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map(day => {
      const minutes = Math.floor(Math.random() * 30);
      const lessons = Math.ceil(minutes / 8); // Approximately 1 lesson for every 8 minutes
      return { name: day, minutes, lessons };
    });
  };
  
  // Get streak data
  const getStreakData = () => {
    // In a real app, this would be calculated from actual user activity
    const streak = parseInt(localStorage.getItem('current_streak') || '0');
    const longestStreak = parseInt(localStorage.getItem('longest_streak') || '0');
    
    // Generate week data
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ...
    
    return {
      streak,
      longestStreak: Math.max(streak, longestStreak),
      currentWeek: ["M", "T", "W", "T", "F", "S", "S"].map((day, index) => {
        const dayIndex = (index + 1) % 7; // Convert to 0 = Sunday format
        const dateDiff = dayIndex - currentDay;
        const date = new Date(today);
        date.setDate(today.getDate() + dateDiff);
        
        return {
          day,
          completed: index < currentDay || Math.random() > 0.3,
          date: date.getDate().toString()
        };
      })
    };
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <DashboardHeader username={user?.displayName || "Learner"} />
          
          <DashboardContent 
            loading={loading}
            userSkills={userSkills}
            todayLessons={todayLessons}
            newLessons={newLessons}
            savedLessons={savedLessons}
            progressData={getUserActivity()}
            streakData={getStreakData()}
            achievements={[
              {
                icon: <TrendingUp size={16} className="text-amber-500" />,
                title: "Fast Learner",
                description: "Completed 3 lessons in one day"
              },
              {
                icon: <BookOpen size={16} className="text-blue-500" />,
                title: "Knowledge Explorer",
                description: "Explored 3 different skills"
              },
              {
                icon: <Award size={16} className="text-green-500" />,
                title: "Coding Pioneer",
                description: "Started learning programming skills"
              }
            ]}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
