
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LessonCard, { LessonCardProps } from '@/components/LessonCard';

interface LessonsSectionProps {
  todayLessons: LessonCardProps[];
  newLessons: LessonCardProps[];
  savedLessons: LessonCardProps[];
  loading: boolean;
}

const LessonsSection = ({ 
  todayLessons, 
  newLessons, 
  savedLessons, 
  loading 
}: LessonsSectionProps) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Zap size={18} className="mr-2 text-primary" />
          Today's Lessons
        </h2>
        <Link to="/explore" className="text-sm text-primary hover:underline">
          Explore more
        </Link>
      </div>
      
      <Tabs defaultValue="recommended" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommended" className="space-y-4">
          {loading ? (
            Array(2).fill(0).map((_, i) => (
              <div key={i} className="h-40 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
            ))
          ) : (
            todayLessons.map((lesson) => (
              <LessonCard key={lesson.id} {...lesson} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="new" className="space-y-4">
          {newLessons.map((lesson) => (
            <LessonCard key={lesson.id} {...lesson} />
          ))}
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-4">
          {savedLessons.map((lesson) => (
            <LessonCard key={lesson.id} {...lesson} />
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default LessonsSection;
