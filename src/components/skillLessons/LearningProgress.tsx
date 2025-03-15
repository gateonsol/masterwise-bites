
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, Calendar } from 'lucide-react';

interface LearningProgressProps {
  skillName: string;
  progressPercentage: number;
  remainingTime: number;
  completedLessons: number;
  totalLessons: number;
}

const LearningProgress = ({
  skillName,
  progressPercentage,
  remainingTime,
  completedLessons,
  totalLessons,
}: LearningProgressProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold">{skillName} Learning Path</h1>
          <p className="text-gray-500 mt-1">Master {skillName} with bite-sized daily lessons</p>
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
              <p className="font-semibold">{completedLessons}/{totalLessons} lessons</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningProgress;
