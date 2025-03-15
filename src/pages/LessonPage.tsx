
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight, ChevronLeft, Clock, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { getLessonById, getLessonsForSkill } from '@/utils/lessonContentService';
import { LessonContent } from '@/utils/types';
import { Skeleton } from '@/components/ui/skeleton';
import Navbar from '@/components/Navbar';

const LessonPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [lessonData, setLessonData] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [skillName, setSkillName] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      try {
        if (id) {
          const lesson = getLessonById(id);
          if (lesson) {
            setLessonData(lesson);
            
            // Extract skill name from the lesson ID (format: skillname-lessonid)
            const skillPrefix = id.split('-')[0];
            setSkillName(skillPrefix);
            
            const savedProgress = localStorage.getItem(`lesson_progress_${id}`);
            setProgress(savedProgress ? parseInt(savedProgress) : 0);
            
            const bookmarked = localStorage.getItem(`lesson_bookmarked_${id}`) === 'true';
            setBookmarked(bookmarked);
          } else {
            toast({
              title: "Lesson not found",
              description: "The requested lesson could not be found.",
              variant: "destructive",
            });
            navigate('/dashboard');
          }
        }
      } catch (error) {
        console.error("Error fetching lesson:", error);
        toast({
          title: "Error loading lesson",
          description: "There was a problem loading the lesson content.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchLesson();
    
    // Auto-progress every 2 minutes if still less than 100%
    const progressInterval = setInterval(() => {
      if (progress < 100 && !loading && lessonData) {
        const newProgress = Math.min(progress + 10, 100);
        setProgress(newProgress);
        localStorage.setItem(`lesson_progress_${id}`, newProgress.toString());
      }
    }, 120000); // 2 minutes instead of 10 seconds for a more realistic pace
    
    return () => clearInterval(progressInterval);
  }, [id, toast, navigate, loading, lessonData]);
  
  const handleCompleteLesson = () => {
    setProgress(100);
    localStorage.setItem(`lesson_progress_${id}`, "100");
    
    const totalCompleted = parseInt(localStorage.getItem('total_completed_lessons') || '0') + 1;
    localStorage.setItem('total_completed_lessons', totalCompleted.toString());
    
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`activity_${today}`, 'true');
    
    const currentLessons = parseInt(localStorage.getItem(`activity_lessons_${today}`) || '0') + 1;
    localStorage.setItem(`activity_lessons_${today}`, currentLessons.toString());
    
    const currentMinutes = parseInt(localStorage.getItem(`activity_minutes_${today}`) || '0');
    localStorage.setItem(`activity_minutes_${today}`, (currentMinutes + (lessonData?.duration || 10)).toString());
    
    updateStreak();
    
    if (skillName) {
      updateSkillProgress(skillName);
    }
    
    toast({
      title: "Lesson completed!",
      description: "Great job! You've completed this lesson.",
    });
  };
  
  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    const wasActiveYesterday = localStorage.getItem(`activity_${yesterdayStr}`) === 'true';
    
    let currentStreak = parseInt(localStorage.getItem('current_streak') || '0');
    
    if (wasActiveYesterday || currentStreak === 0) {
      currentStreak += 1;
    } else {
      currentStreak = 1;
    }
    
    localStorage.setItem('current_streak', currentStreak.toString());
    
    const longestStreak = parseInt(localStorage.getItem('longest_streak') || '0');
    if (currentStreak > longestStreak) {
      localStorage.setItem('longest_streak', currentStreak.toString());
    }
  };
  
  const updateSkillProgress = (skillName: string) => {
    if (!id) return;
    
    const userSkills = JSON.parse(localStorage.getItem('user_skills') || '[]');
    const updatedSkills = userSkills.map((skill: any) => {
      if (skill.name.toLowerCase().includes(skillName.toLowerCase())) {
        const skillLessons = getLessonsForSkill(skill.name);
        
        let completedCount = 0;
        skillLessons.forEach(lesson => {
          if (localStorage.getItem(`lesson_progress_${lesson.id}`) === "100") {
            completedCount++;
          }
        });
        
        const newProgress = Math.round((completedCount / skillLessons.length) * 100);
        const today = new Date().toISOString().split('T')[0];
        
        // Mark that the user completed a lesson for this skill today
        localStorage.setItem(`skill_completed_${skill.id}_${today}`, 'true');
        
        return {
          ...skill,
          progress: newProgress,
          todayLessonCompleted: true
        };
      }
      return skill;
    });
    
    localStorage.setItem('user_skills', JSON.stringify(updatedSkills));
  };
  
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    localStorage.setItem(`lesson_bookmarked_${id}`, (!bookmarked).toString());
    
    toast({
      title: bookmarked ? "Bookmark removed" : "Lesson bookmarked",
      description: bookmarked 
        ? "This lesson has been removed from your bookmarks" 
        : "This lesson has been added to your bookmarks",
    });
  };
  
  const getAdjacentLessons = () => {
    if (!lessonData || !id || !skillName) return { prevLessonId: null, nextLessonId: null };
    
    const skillLessons = getLessonsForSkill(skillName);
    const sortedLessons = skillLessons.sort((a, b) => 
      a.id.localeCompare(b.id)
    );
    
    const currentIndex = sortedLessons.findIndex(lesson => lesson.id === id);
    
    return {
      prevLessonId: currentIndex > 0 ? sortedLessons[currentIndex - 1].id : null,
      nextLessonId: currentIndex < sortedLessons.length - 1 ? sortedLessons[currentIndex + 1].id : null
    };
  };
  
  const { prevLessonId, nextLessonId } = getAdjacentLessons();
  
  const handleReturnToSkill = () => {
    if (skillName) {
      navigate(`/skills/${encodeURIComponent(skillName)}/lessons`);
    } else {
      navigate('/dashboard');
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="container px-4 mx-auto py-8 max-w-4xl mt-16">
        <div className="mb-6 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleReturnToSkill}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {skillName ? `Back to ${skillName}` : 'Back to Dashboard'}
          </Button>
          
          {!loading && lessonData && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {lessonData.duration} minutes
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBookmark}
                className={bookmarked ? "text-primary" : ""}
              >
                <Bookmark className="h-4 w-4" />
              </Button>
              <a 
                href={lessonData.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <span className="mr-1">Source</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ) : lessonData ? (
            <>
              <h1 className="text-2xl font-bold mb-6">{lessonData.title}</h1>
              
              <div className="mb-6 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: lessonData.content }}
              />
              
              <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-100 dark:border-gray-800">
                <Button variant="outline" onClick={handleBookmark}>
                  {bookmarked ? "Saved" : "Save for Later"}
                </Button>
                
                <Button onClick={handleCompleteLesson} className="inline-flex items-center">
                  Mark as Complete
                  <CheckCircle2 className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold">Lesson not found</h2>
              <p className="text-gray-500 mt-2">This lesson doesn't exist or has been removed.</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-between">
          {prevLessonId ? (
            <Button variant="outline" onClick={() => navigate(`/lesson/${prevLessonId}`)} className="inline-flex items-center">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous Lesson
            </Button>
          ) : (
            <div></div>
          )}
          
          {nextLessonId ? (
            <Button variant="outline" onClick={() => navigate(`/lesson/${nextLessonId}`)} className="inline-flex items-center">
              Next Lesson
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button variant="outline" onClick={handleReturnToSkill} className="inline-flex items-center">
              Complete Skill
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default LessonPage;
