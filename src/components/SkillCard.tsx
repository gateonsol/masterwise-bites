
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Clock, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface SkillCardProps {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'master';
  progress: number;
  streak: number;
  estimatedTimeLeft: string;
  badgesEarned: number;
  totalBadges: number;
  todayLessonCompleted: boolean;
}

const SkillCard = ({
  id,
  name,
  level,
  progress,
  streak,
  estimatedTimeLeft,
  badgesEarned,
  totalBadges,
  todayLessonCompleted,
}: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'intermediate': return 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20';
      case 'advanced': return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
      case 'master': return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
      default: return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <Link 
      to={`/skill/${id}`}
      className={cn(
        "block relative p-5 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300",
        isHovered ? "shadow-md transform -translate-y-1" : "shadow-sm"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status indicator */}
      {todayLessonCompleted ? (
        <Badge variant="default" className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">
          Complete
        </Badge>
      ) : (
        <Badge variant="outline" className="absolute top-3 right-3 border-amber-300 text-amber-600 hover:bg-amber-50">
          Pending
        </Badge>
      )}
      
      <div className="space-y-4">
        <div className="space-y-1">
          <Badge variant="outline" className={cn("font-normal", getLevelColor(level))}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </Badge>
          <h3 className="text-xl font-semibold mt-1 text-balance">{name}</h3>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Clock size={14} className="text-gray-400 mb-1" />
            <span className="font-medium">{estimatedTimeLeft}</span>
            <span className="text-xs text-gray-500">remaining</span>
          </div>
          
          <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
            <BarChart size={14} className="text-gray-400 mb-1" />
            <span className="font-medium">{streak}</span>
            <span className="text-xs text-gray-500">day streak</span>
          </div>
          
          <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Award size={14} className="text-gray-400 mb-1" />
            <span className="font-medium">{badgesEarned}/{totalBadges}</span>
            <span className="text-xs text-gray-500">badges</span>
          </div>
        </div>
      </div>
      
      {/* Hover effect gradient */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/0 to-blue-100/50 dark:from-blue-900/0 dark:via-blue-900/0 dark:to-blue-800/20 opacity-0 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      ></div>
    </Link>
  );
};

export default SkillCard;
