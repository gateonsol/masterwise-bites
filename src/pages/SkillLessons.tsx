
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LessonCardProps } from '@/components/LessonCard';
import LessonCard from '@/components/LessonCard';
import { useAuth } from '@/contexts/AuthContext';

const SkillLessons = () => {
  const { skill } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<LessonCardProps[]>([]);
  
  useEffect(() => {
    // Simulate API call to fetch personalized lessons
    const fetchLessons = async () => {
      setLoading(true);
      try {
        // In a real app, this would fetch from your backend
        // For now, we'll generate mock data based on the skill
        setTimeout(() => {
          const mockLessons: LessonCardProps[] = [
            {
              id: "1",
              title: `Introduction to ${skill}`,
              description: `Learn the fundamentals of ${skill} with this beginner-friendly lesson.`,
              duration: 10,
              type: "video",
              completed: false,
              thumbnailUrl: ""
            },
            {
              id: "2",
              title: `${skill} Core Concepts`,
              description: `Build a solid foundation in ${skill} by understanding these essential concepts.`,
              duration: 8,
              type: "article",
              completed: false,
              thumbnailUrl: ""
            },
            {
              id: "3",
              title: `Practical ${skill} Exercises`,
              description: `Apply your knowledge with these hands-on exercises designed to reinforce your learning.`,
              duration: 15,
              type: "video",
              completed: false,
              thumbnailUrl: ""
            }
          ];
          setLessons(mockLessons);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching lessons:", error);
        toast({
          title: "Error fetching lessons",
          description: "Unable to load your personalized lessons. Please try again.",
          variant: "destructive",
        });
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

  return (
    <div className="container px-4 mx-auto py-12 max-w-4xl">
      <Link to="/explore" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Explore
      </Link>
      
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{skill} - Your Learning Path</h1>
          <Badge variant="outline" className="text-blue-500 bg-blue-50 dark:bg-blue-900/20">
            <Calendar className="mr-1 h-4 w-4" /> 
            30 days plan
          </Badge>
        </div>
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium">0%</span>
          </div>
          <Progress value={0} className="h-2" />
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="mr-1 h-4 w-4" />
          <span>Estimated 5-10 minutes per day</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="font-medium">Ready to start learning?</span>
          </div>
          
          <Link to={`/skill/${encodeURIComponent(skill || '')}`}>
            <Button size="sm">
              View Skill Details
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Personalized Lessons</h2>
          <div className="text-sm text-gray-500">
            <CheckCircle className="inline-block mr-1 h-4 w-4" />
            <span>0/3 completed</span>
          </div>
        </div>
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} {...lesson} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillLessons;
