
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, Calendar, BookOpen } from 'lucide-react';

interface LearningProgressProps {
  skillName: string;
  progressPercentage: number;
  remainingTime: number;
  completedLessons: number;
  totalLessons: number;
  startDate?: string;
  level?: string;
}

const LearningProgress = ({
  skillName,
  progressPercentage,
  remainingTime,
  completedLessons,
  totalLessons,
  startDate,
  level = 'beginner',
}: LearningProgressProps) => {
  // Calculate estimated completion date
  const getEstimatedCompletionDate = () => {
    if (!startDate || completedLessons === totalLessons) return '';
    
    // If no lessons completed yet, estimate 7 days per lesson
    if (completedLessons === 0) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + (totalLessons * 7));
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    
    // Calculate based on current progress rate
    const startDateObj = new Date(startDate);
    const today = new Date();
    const daysPassed = Math.max(1, Math.floor((today.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)));
    const lessonsPerDay = completedLessons / daysPassed;
    const remainingLessons = totalLessons - completedLessons;
    const daysNeeded = Math.ceil(remainingLessons / lessonsPerDay);
    
    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + daysNeeded);
    
    return completionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatStartDate = () => {
    if (!startDate) return '30 days plan';
    
    const date = new Date(startDate);
    return `Started on ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const getLevelColor = () => {
    switch (level) {
      case 'beginner': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'intermediate': return 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20';
      case 'advanced': return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
      default: return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">{skillName} Learning Path</h1>
            <Badge className={getLevelColor()}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Badge>
          </div>
          <p className="text-gray-500 mt-1">Master {skillName} with personalized lessons</p>
        </div>
        <Badge variant="outline" className="text-blue-500 bg-blue-50 dark:bg-blue-900/20 flex items-center">
          <Calendar className="mr-1 h-4 w-4" /> 
          {formatStartDate()}
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
              {remainingTime > 0 && progressPercentage < 100 && (
                <p className="text-xs text-gray-500">Est. completion: {getEstimatedCompletionDate()}</p>
              )}
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
              <p className="font-semibold">{completedLessons}/{totalLessons} lessons</p>
              {completedLessons === totalLessons && (
                <p className="text-xs text-green-600">Skill mastered! 🎉</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningProgress;
