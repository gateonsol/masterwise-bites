
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BarChart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const SkillDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // This would normally fetch from an API
  const skillDetails = {
    name: "JavaScript Programming",
    level: "intermediate",
    progress: 45,
    streak: 7,
    estimatedTimeLeft: "25 days",
    badgesEarned: 3,
    totalBadges: 10,
    description: "Master JavaScript from fundamentals to advanced concepts with daily bite-sized lessons.",
    nextLessonId: "1",
    todayLessonCompleted: false
  };
  
  const handleStartLesson = () => {
    toast({
      title: "Lesson started!",
      description: "Your daily JavaScript lesson has been started.",
    });
  };
  
  return (
    <div className="container px-4 mx-auto py-12 max-w-4xl">
      <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>
      
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="w-full md:w-2/3">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={`font-normal ${
                  skillDetails.level === 'beginner' 
                    ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : skillDetails.level === 'intermediate' 
                      ? 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'text-purple-500 bg-purple-50 dark:bg-purple-900/20'
                }`}>
                  {skillDetails.level.charAt(0).toUpperCase() + skillDetails.level.slice(1)}
                </Badge>
                
                {skillDetails.todayLessonCompleted ? (
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                    Today: Complete
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-amber-300 text-amber-600 hover:bg-amber-50">
                    Today: Pending
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold">{skillDetails.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{skillDetails.description}</p>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Overall Progress</span>
                  <span className="font-medium">{skillDetails.progress}%</span>
                </div>
                <Progress value={skillDetails.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <Clock size={16} className="text-gray-400 mb-1" />
                  <span className="font-medium">{skillDetails.estimatedTimeLeft}</span>
                  <span className="text-xs text-gray-500">remaining</span>
                </div>
                
                <div className="flex flex-col items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <BarChart size={16} className="text-gray-400 mb-1" />
                  <span className="font-medium">{skillDetails.streak}</span>
                  <span className="text-xs text-gray-500">day streak</span>
                </div>
                
                <div className="flex flex-col items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <Zap size={16} className="text-gray-400 mb-1" />
                  <span className="font-medium">{skillDetails.badgesEarned}/{skillDetails.totalBadges}</span>
                  <span className="text-xs text-gray-500">badges</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to={`/lesson/${skillDetails.nextLessonId}`}>
                <Button onClick={handleStartLesson} size="lg" className="w-full md:w-auto">
                  Start Today's Lesson
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 rounded-xl bg-gray-50 dark:bg-gray-800 p-5">
            <h3 className="font-semibold text-lg mb-4">Lesson Schedule</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((day) => (
                <div key={day} className="flex items-center p-3 rounded-lg bg-white dark:bg-gray-900">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                    {day}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Lesson {day}</p>
                    <p className="text-xs text-gray-500">{day < 3 ? 'Completed' : day === 3 ? 'Today' : 'Upcoming'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;
