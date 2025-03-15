
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, CheckCircle, BarChart2, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LessonContent } from '@/utils/types';
import LessonCard from '@/components/LessonCard';
import { useAuth } from '@/contexts/AuthContext';
import { getLessonsForSkill } from '@/utils/lessonContentService';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SkillLessons = () => {
  const { skill } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<LessonContent[]>([]);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [totalLearningTime, setTotalLearningTime] = useState(0);
  
  useEffect(() => {
    // Fetch personalized lessons for the skill
    const fetchLessons = async () => {
      setLoading(true);
      try {
        if (skill) {
          // Get lessons for the skill
          const skillLessons = getLessonsForSkill(skill);
          
          // Transform to LessonCardProps format
          const lessonCards = skillLessons.map(lesson => {
            // Check if this lesson is completed
            const isCompleted = localStorage.getItem(`lesson_progress_${lesson.id}`) === "100";
            return {
              ...lesson,
              completed: isCompleted
            };
          });
          
          setLessons(lessonCards);
          
          // Calculate stats
          const completed = lessonCards.filter(lesson => lesson.completed).length;
          setCompletedLessons(completed);
          
          const totalMinutes = lessonCards.reduce((sum, lesson) => sum + lesson.duration, 0);
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
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold">{skill} Learning Path</h1>
                  <p className="text-gray-500 mt-1">Master {skill} with bite-sized daily lessons</p>
                </div>
                <Badge variant="outline" className="text-blue-500 bg-blue-50 dark:bg-blue-900/20 flex items-center">
                  <Calendar className="mr-1 h-4 w-4" /> 
                  30 days plan
                </Badge>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Overall Progress</span>
                  <span className="font-medium">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Remaining Time</p>
                      <p className="font-semibold">{remainingTime} minutes</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Completed</p>
                      <p className="font-semibold">{completedLessons}/{lessons.length} lessons</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Learning Journey</h2>
              </div>
              
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Lessons</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="remaining">Remaining</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  {loading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-40 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {lessons.map((lesson) => (
                        <LessonCard 
                          key={lesson.id} 
                          id={lesson.id}
                          title={lesson.title} 
                          description={lesson.description}
                          duration={lesson.duration}
                          type={lesson.type as 'video' | 'article' | 'podcast'}
                          completed={lesson.completed}
                          thumbnailUrl=""
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="completed" className="space-y-4">
                  {lessons.filter(lesson => lesson.completed).length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">You haven't completed any lessons yet.</p>
                      <p className="text-gray-500">Start learning to track your progress!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {lessons
                        .filter(lesson => lesson.completed)
                        .map((lesson) => (
                          <LessonCard 
                            key={lesson.id} 
                            id={lesson.id}
                            title={lesson.title} 
                            description={lesson.description}
                            duration={lesson.duration}
                            type={lesson.type as 'video' | 'article' | 'podcast'}
                            completed={lesson.completed}
                            thumbnailUrl=""
                          />
                        ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="remaining" className="space-y-4">
                  {lessons.filter(lesson => !lesson.completed).length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">You've completed all the lessons!</p>
                      <Button onClick={() => navigate('/explore')} className="mt-4">
                        Explore More Skills
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {lessons
                        .filter(lesson => !lesson.completed)
                        .map((lesson) => (
                          <LessonCard 
                            key={lesson.id} 
                            id={lesson.id}
                            title={lesson.title} 
                            description={lesson.description}
                            duration={lesson.duration}
                            type={lesson.type as 'video' | 'article' | 'podcast'}
                            completed={lesson.completed}
                            thumbnailUrl=""
                          />
                        ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-amber-500" />
                  Learning Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Complete your first lesson</span>
                    {completedLessons > 0 ? (
                      <Badge variant="default" className="bg-green-500">Completed</Badge>
                    ) : (
                      <Badge variant="outline">In Progress</Badge>
                    )}
                  </div>
                  <Progress value={completedLessons > 0 ? 100 : 0} className="h-1" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">50% course completion</span>
                    {progressPercentage >= 50 ? (
                      <Badge variant="default" className="bg-green-500">Completed</Badge>
                    ) : (
                      <Badge variant="outline">In Progress</Badge>
                    )}
                  </div>
                  <Progress value={Math.min(progressPercentage * 2, 100)} className="h-1" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Master {skill}</span>
                    {progressPercentage === 100 ? (
                      <Badge variant="default" className="bg-green-500">Completed</Badge>
                    ) : (
                      <Badge variant="outline">In Progress</Badge>
                    )}
                  </div>
                  <Progress value={progressPercentage} className="h-1" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5 text-blue-500" />
                  Learning Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-lg font-semibold">{completedLessons} lessons</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Time Invested</p>
                    <p className="text-lg font-semibold">
                      {lessons
                        .filter(lesson => lesson.completed)
                        .reduce((sum, lesson) => sum + lesson.duration, 0)} min
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Lessons Remaining</p>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">
                      {lessons.length - completedLessons}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold mb-4">Related Skills</h3>
              <div className="space-y-2">
                {['Python', 'Web Development', 'Data Structures', 'Algorithms'].map((relatedSkill) => (
                  skill !== relatedSkill && (
                    <Button 
                      key={relatedSkill}
                      variant="outline" 
                      className="text-left justify-start w-full"
                      onClick={() => navigate(`/skills/${relatedSkill}/lessons`)}
                    >
                      {relatedSkill}
                    </Button>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillLessons;
