
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, PlayCircle, FileText, Headphones, CheckCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'video' | 'article' | 'podcast';
  completed?: boolean;
  thumbnailUrl?: string;
  skillName?: string;
}

const LessonCard = ({
  id,
  title,
  description,
  duration,
  type,
  completed = false,
  thumbnailUrl,
  skillName
}: LessonCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const getTypeIcon = () => {
    switch (type) {
      case 'video':
        return <PlayCircle size={16} className="mr-1" />;
      case 'article':
        return <FileText size={16} className="mr-1" />;
      case 'podcast':
        return <Headphones size={16} className="mr-1" />;
      default:
        return <FileText size={16} className="mr-1" />;
    }
  };
  
  const getSkillNameFromLessonId = () => {
    if (skillName) return skillName;
    
    // Extract skill name from lesson ID (format: skillname-lessonid)
    const parts = id.split('-');
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  };
  
  return (
    <Card
      className={cn(
        "overflow-hidden transition-shadow duration-200",
        isHovered ? "shadow-md" : "shadow-sm",
        completed ? "border-green-100 dark:border-green-900/30" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {thumbnailUrl && (
            <div className="w-full md:w-1/3 h-40 md:h-auto bg-gray-100 dark:bg-gray-800">
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className={`p-5 ${thumbnailUrl ? 'md:w-2/3' : 'w-full'}`}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <Badge variant="outline" className="flex items-center">
                {getTypeIcon()}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Badge>
              
              <div className="flex items-center text-gray-500 text-sm">
                <Clock size={14} className="mr-1" />
                {duration} min
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
            
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">{description}</p>
            
            <div className="flex items-center text-sm mb-4">
              <BookOpen size={14} className="mr-1 text-blue-500" />
              <span>{getSkillNameFromLessonId()}</span>
            </div>
            
            {completed && (
              <div className="flex items-center text-green-600 text-sm mb-3">
                <CheckCircle size={14} className="mr-1" />
                Completed
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-5 py-3 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
        {completed ? (
          <Button variant="outline" onClick={() => navigate(`/lesson/${id}`)}>
            Review
          </Button>
        ) : (
          <Button onClick={() => navigate(`/lesson/${id}`)}>
            Continue
          </Button>
        )}
        
        <Badge 
          variant={completed ? "default" : "outline"} 
          className={completed ? "bg-green-500" : ""}
        >
          {completed ? "Completed" : "In progress"}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default LessonCard;
