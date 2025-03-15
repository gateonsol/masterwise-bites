
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RocketIcon, ChevronRight, Clock } from 'lucide-react';
import { getAllSkills } from '@/utils/lessonContentService';

interface Pathway {
  id: string;
  title: string;
  skills: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  category: string;
}

const RecommendedPathway = () => {
  const navigate = useNavigate();
  const [pathways, setPathways] = useState<Pathway[]>([]);
  
  useEffect(() => {
    // Generate pathway recommendations
    const allSkills = getAllSkills();
    
    // Create pathways based on skill categories
    const webDevPathway: Pathway = {
      id: 'web-dev',
      title: 'Full-Stack Web Development',
      skills: allSkills.filter(skill => 
        ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'].includes(skill)
      ),
      level: 'intermediate',
      estimatedHours: 60,
      category: 'Web Development'
    };
    
    const dataPathway: Pathway = {
      id: 'data-science',
      title: 'Data Science Fundamentals',
      skills: allSkills.filter(skill => 
        ['Python', 'Data Analysis', 'Machine Learning', 'SQL', 'Statistics'].includes(skill)
      ),
      level: 'beginner',
      estimatedHours: 45,
      category: 'Data Science'
    };
    
    const dsaPathway: Pathway = {
      id: 'dsa',
      title: 'Algorithms & Data Structures',
      skills: allSkills.filter(skill => 
        ['Data Structures', 'Algorithms', 'Python', 'Java', 'C++'].includes(skill)
      ),
      level: 'advanced',
      estimatedHours: 50,
      category: 'Computer Science'
    };
    
    setPathways([webDevPathway, dataPathway, dsaPathway]);
  }, []);
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'intermediate': return 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20';
      case 'advanced': return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
      default: return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };
  
  const handleStartPathway = (pathway: Pathway) => {
    // In a real app, this would register the user for the pathway
    // For now, navigate to the first skill in the pathway
    if (pathway.skills.length > 0) {
      navigate(`/skills/${encodeURIComponent(pathway.skills[0])}/lessons`);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold flex items-center">
          <RocketIcon size={18} className="mr-2 text-primary" />
          Recommended Learning Pathways
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pathways.map((pathway) => (
          <Card key={pathway.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className={getLevelColor(pathway.level)}>
                  {pathway.level.charAt(0).toUpperCase() + pathway.level.slice(1)}
                </Badge>
                <Badge variant="outline" className="text-gray-500 bg-gray-50 dark:bg-gray-800">
                  {pathway.category}
                </Badge>
              </div>
              <CardTitle className="text-lg mt-2">{pathway.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Clock size={14} className="mr-1" />
                <span>Approx. {pathway.estimatedHours} hours</span>
              </div>
              
              <div className="space-y-1.5">
                <p className="text-sm font-medium">Included Skills:</p>
                <div className="flex flex-wrap gap-1.5">
                  {pathway.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs font-normal">
                      {skill}
                    </Badge>
                  ))}
                  {pathway.skills.length > 4 && (
                    <Badge variant="secondary" className="text-xs font-normal">
                      +{pathway.skills.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full mt-2 justify-between" 
                size="sm"
                onClick={() => handleStartPathway(pathway)}
              >
                <span>Start Pathway</span>
                <ChevronRight size={16} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendedPathway;
