
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, BookOpen, Headphones, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type LessonType = 'video' | 'article' | 'podcast';

export interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  type: LessonType;
  thumbnailUrl?: string;
  completed: boolean;
}

const LessonCard = ({
  id,
  title,
  description,
  duration,
  type,
  thumbnailUrl,
  completed,
}: LessonCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getTypeIcon = (type: LessonType) => {
    switch (type) {
      case 'video': return <Video size={16} className="text-red-500" />;
      case 'article': return <BookOpen size={16} className="text-blue-500" />;
      case 'podcast': return <Headphones size={16} className="text-purple-500" />;
      default: return <BookOpen size={16} />;
    }
  };
  
  const getTypeLabel = (type: LessonType) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  return (
    <div 
      className={cn(
        "relative rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300",
        isHovered ? "shadow-md" : "shadow-sm",
        completed ? "bg-gray-50/50 dark:bg-gray-800/50" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row">
        {/* Thumbnail */}
        <div className="relative md:w-1/3 aspect-video md:aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          {thumbnailUrl ? (
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500"
              style={{
                transform: isHovered ? 'scale(1.05)' : 'scale(1)'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              {type === 'video' && <Video size={32} className="text-gray-400" />}
              {type === 'article' && <BookOpen size={32} className="text-gray-400" />}
              {type === 'podcast' && <Headphones size={32} className="text-gray-400" />}
            </div>
          )}
          
          {/* Play button for videos and podcasts */}
          {(type === 'video' || type === 'podcast') && (
            <div 
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <Play size={20} className="text-gray-900 ml-1" />
              </div>
            </div>
          )}
          
          {/* Completion badge */}
          {completed && (
            <div className="absolute top-2 right-2">
              <Badge variant="default" className="bg-green-500">Completed</Badge>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5 flex-1 flex flex-col md:justify-between">
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-1 text-xs">
                {getTypeIcon(type)}
                <span className="text-gray-500">{getTypeLabel(type)}</span>
              </div>
              <div className="mx-2 text-gray-300">•</div>
              <div className="flex items-center space-x-1 text-xs">
                <Clock size={14} className="text-gray-400" />
                <span className="text-gray-500">{duration} min</span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold leading-tight">{title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
          </div>
          
          <div className="mt-auto">
            <Link to={`/lesson/${id}`}>
              <Button 
                variant={completed ? "outline" : "default"} 
                className={cn(
                  "w-full transition-all",
                  completed ? "text-gray-500 hover:text-gray-700" : ""
                )}
              >
                {completed ? "Review Lesson" : "Start Lesson"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
