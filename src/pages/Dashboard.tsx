
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardContent from '@/components/dashboard/DashboardContent';
import { SkillCardProps } from '@/components/SkillCard';
import { LessonCardProps } from '@/components/LessonCard';
import { useAuth } from '@/contexts/AuthContext';
import { getLessonsForSkill } from '@/utils/lessonContentService';

const Dashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [userSkills, setUserSkills] = useState<SkillCardProps[]>([]);
  const [todayLessons, setTodayLessons] = useState<LessonCardProps[]>([]);
  const [newLessons, setNewLessons] = useState<LessonCardProps[]>([]);
  const [savedLessons, setSavedLessons] = useState<LessonCardProps[]>([]);
  
  // Get user's name from user metadata or use a default
  const getUserName = () => {
    if (!user) return "Learner";
    
    // Try to get name from user metadata first
    const userMetadata = user.user_metadata;
    if (userMetadata && userMetadata.full_name) {
      return userMetadata.full_name;
    }
    
    // If no name in metadata, try to get from email
    if (user.email) {
      // Extract name part from email (everything before @)
      const emailName = user.email.split('@')[0];
      // Capitalize first letter
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    
    return "Learner";
  };
  
  useEffect(() => {
    // Fetch user data and lessons
    const fetchUserData = async () => {
      setLoading(true);
      
      try {
        // 1. Get user skills from localStorage
        const savedSkills = localStorage.getItem('user_skills');
        let skills: SkillCardProps[] = [];
        
        if (savedSkills) {
          skills = JSON.parse(savedSkills);
        }
        
        setUserSkills(skills);
        
        // 2. Get lessons for user's skills
        const allLessons: LessonCardProps[] = [];
        
        if (skills.length > 0) {
          // For each skill, get its lessons
          for (const skill of skills) {
            const skillLessons = getLessonsForSkill(skill.name);
            
            // Convert to LessonCardProps
            const lessonCards = skillLessons.map(lesson => {
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
            
            allLessons.push(...lessonCards);
          }
          
          // Divide lessons into categories
          // Today's lessons (first 3 uncompleted lessons)
          setTodayLessons(
            allLessons
              .filter(lesson => !lesson.completed)
              .slice(0, 3)
          );
          
          // New lessons (next 3 uncompleted lessons)
          setNewLessons(
            allLessons
              .filter(lesson => !lesson.completed)
              .slice(3, 6)
          );
          
          // Get bookmarked lessons
          const bookmarkedLessons = allLessons.filter(lesson => 
            localStorage.getItem(`lesson_bookmarked_${lesson.id}`) === "true"
          );
          
          setSavedLessons(bookmarkedLessons.length > 0 ? bookmarkedLessons : allLessons.slice(6, 9));
        } else {
          // No skills yet, empty arrays
          setTodayLessons([]);
          setNewLessons([]);
          setSavedLessons([]);
        }
        
        // Show welcome toast
        const userName = getUserName();
        toast({
          title: `Welcome${userName ? `, ${userName}` : ""}!`,
          description: skills.length > 0 
            ? "Continue your learning journey." 
            : "Start learning a new skill today.",
        });
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast({
          title: "Error loading dashboard",
          description: "There was a problem loading your dashboard.",
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
    
    // Look for real user activity in localStorage
    const activityData = days.map(day => {
      // Get today's day of week (0 = Sunday, 1 = Monday, etc.)
      const today = new Date().getDay();
      const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(day);
      
      // Calculate the date for this day
      const date = new Date();
      const diff = dayIndex - today;
      date.setDate(date.getDate() + diff);
      
      // Format as YYYY-MM-DD
      const dateStr = date.toISOString().split('T')[0];
      
      // Check if we have activity logged for this date
      const hasActivity = localStorage.getItem(`activity_${dateStr}`) === 'true';
      
      // Get actual minutes if available, otherwise 0
      const minutes = hasActivity ? parseInt(localStorage.getItem(`activity_minutes_${dateStr}`) || '20') : 0;
      const lessons = hasActivity ? parseInt(localStorage.getItem(`activity_lessons_${dateStr}`) || '1') : 0;
      
      return { name: day, minutes, lessons };
    });
    
    return activityData;
  };
  
  // Get streak data
  const getStreakData = () => {
    // Get real streak from localStorage if available
    const streak = parseInt(localStorage.getItem('current_streak') || '0');
    const longestStreak = parseInt(localStorage.getItem('longest_streak') || '0');
    
    // Generate week data based on actual activity
    const today = new Date();
    const dayNames = ["M", "T", "W", "T", "F", "S", "S"]; 
    const currentDay = (today.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
    
    return {
      streak,
      longestStreak: Math.max(streak, longestStreak),
      currentWeek: dayNames.map((day, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() - currentDay + index);
        const dateStr = date.toISOString().split('T')[0];
        
        // Check if we have activity for this day
        const completed = localStorage.getItem(`activity_${dateStr}`) === 'true';
        
        return {
          day,
          completed: index <= currentDay ? completed : false, // Only mark past days
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
          <DashboardHeader username={getUserName()} />
          
          <DashboardContent 
            loading={loading}
            userSkills={userSkills}
            todayLessons={todayLessons}
            newLessons={newLessons}
            savedLessons={savedLessons}
            progressData={getUserActivity()}
            streakData={getStreakData()}
            achievements={[]}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
