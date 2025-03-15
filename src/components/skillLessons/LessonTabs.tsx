
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LessonContent } from '@/utils/types';
import LessonCard from '@/components/LessonCard';
import { Skeleton } from '@/components/ui/skeleton';

interface LessonTabsProps {
  loading: boolean;
  lessons: LessonContent[];
  onExploreMore?: () => void;
}

const LessonTabs = ({ loading, lessons, onExploreMore }: LessonTabsProps) => {
  const navigate = useNavigate();
  
  // Filter completed and uncompleted lessons
  const completedLessons = lessons.filter(lesson => lesson.completed);
  const remainingLessons = lessons.filter(lesson => !lesson.completed);
  
  return (
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
              <Skeleton key={i} className="h-40 rounded-xl" />
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
                completed={lesson.completed || false}
                thumbnailUrl=""
              />
            ))}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="completed" className="space-y-4">
        {completedLessons.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't completed any lessons yet.</p>
            <p className="text-gray-500">Start learning to track your progress!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {completedLessons.map((lesson) => (
              <LessonCard 
                key={lesson.id} 
                id={lesson.id}
                title={lesson.title} 
                description={lesson.description}
                duration={lesson.duration}
                type={lesson.type as 'video' | 'article' | 'podcast'}
                completed={lesson.completed || false}
                thumbnailUrl=""
              />
            ))}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="remaining" className="space-y-4">
        {remainingLessons.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">You've completed all the lessons!</p>
            <Button onClick={onExploreMore || (() => navigate('/explore'))} className="mt-4">
              Explore More Skills
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {remainingLessons.map((lesson) => (
              <LessonCard 
                key={lesson.id} 
                id={lesson.id}
                title={lesson.title} 
                description={lesson.description}
                duration={lesson.duration}
                type={lesson.type as 'video' | 'article' | 'podcast'}
                completed={lesson.completed || false}
                thumbnailUrl=""
              />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default LessonTabs;
