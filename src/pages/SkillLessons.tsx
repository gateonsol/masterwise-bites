
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { LessonContent } from '@/utils/types';
import { useAuth } from '@/contexts/AuthContext';
import { getLessonsForSkill } from '@/utils/lessonContentService';
import Navbar from '@/components/Navbar';
import LearningProgress from '@/components/skillLessons/LearningProgress';
import LessonTabs from '@/components/skillLessons/LessonTabs';
import SkillLessonsSidebar from '@/components/skillLessons/SkillLessonsSidebar';

const SkillLessons = () => {
  const { skill } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<LessonContent[]>([]);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [totalLearningTime, setTotalLearningTime] = useState(0);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    // Fetch personalized lessons for the skill
    const fetchLessons = async () => {
      setLoading(true);
      try {
        if (skill) {
          // Get lessons for the skill
          const skillLessons = getLessonsForSkill(skill);
          
          // Check if user has this skill in their list
          const userSkills = JSON.parse(localStorage.getItem('user_skills') || '[]');
          const userSkill = userSkills.find((s: any) => s.name === skill);
          
          if (userSkill) {
            setStartDate(userSkill.startDate);
          }
          
          // Transform LessonContent to include completed property
          const enhancedLessons = skillLessons.map(lesson => {
            // Check if this lesson is completed
            const isCompleted = localStorage.getItem(`lesson_progress_${lesson.id}`) === "100";
            return {
              ...lesson,
              completed: isCompleted
            };
          });
          
          setLessons(enhancedLessons);
          
          // Calculate stats
          const completed = enhancedLessons.filter(lesson => lesson.completed).length;
          setCompletedLessons(completed);
          
          const totalMinutes = enhancedLessons.reduce((sum, lesson) => sum + lesson.duration, 0);
          setTotalLearningTime(totalMinutes);
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
        toast({
          title: "Error fetching lessons",
          description: "Unable to load your personalized lessons. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (skill) {
      fetchLessons();
    } else {
      navigate('/explore');
    }
  }, [skill, navigate, toast]);

  if (!skill) {
    return null;
  }

  // Calculate progress percentage
  const progressPercentage = lessons.length > 0 
    ? Math.round((completedLessons / lessons.length) * 100) 
    : 0;

  // Get remaining learning time
  const remainingTime = lessons
    .filter(lesson => !lesson.completed)
    .reduce((sum, lesson) => sum + lesson.duration, 0);

  // Calculate completed learning time
  const completedLearningTime = lessons
    .filter(lesson => lesson.completed)
    .reduce((sum, lesson) => sum + lesson.duration, 0);

  // Define related skills based on the current skill category
  const getRelatedSkills = (currentSkill: string) => {
    // Map of skills to their related skills
    const skillCategories: Record<string, string[]> = {
      'JavaScript': ['TypeScript', 'React', 'Node.js', 'Web Development'],
      'Python': ['Data Science', 'Machine Learning', 'Django', 'Flask'],
      'Data Structures': ['Algorithms', 'Python', 'Java', 'Computer Science'],
      'React': ['JavaScript', 'TypeScript', 'Redux', 'Web Development'],
      // Add more mappings as needed
    };
    
    // Return related skills or a default set
    return skillCategories[currentSkill] || ['Python', 'JavaScript', 'Data Structures', 'Algorithms'];
  };

  return (
    <>
      <Navbar />
      <div className="container px-4 mx-auto py-12 max-w-5xl mt-16">
        <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <LearningProgress 
              skillName={skill}
              progressPercentage={progressPercentage}
              remainingTime={remainingTime}
              completedLessons={completedLessons}
              totalLessons={lessons.length}
              startDate={startDate}
            />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Learning Journey</h2>
              </div>
              
              <LessonTabs 
                loading={loading}
                lessons={lessons}
                onExploreMore={() => navigate('/explore')}
              />
            </div>
          </div>
          
          <SkillLessonsSidebar 
            skillName={skill}
            progressPercentage={progressPercentage}
            completedLessons={completedLessons}
            completedLearningTime={completedLearningTime}
            totalLessons={lessons.length}
            relatedSkills={getRelatedSkills(skill)}
          />
        </div>
      </div>
    </>
  );
};

export default SkillLessons;
