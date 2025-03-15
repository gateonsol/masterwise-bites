
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart2, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SkillLessonsSidebarProps {
  skillName: string;
  progressPercentage: number;
  completedLessons: number;
  completedLearningTime: number;
  totalLessons: number;
  relatedSkills: string[];
}

const SkillLessonsSidebar = ({
  skillName,
  progressPercentage,
  completedLessons,
  completedLearningTime,
  totalLessons,
  relatedSkills,
}: SkillLessonsSidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-amber-500" />
            Learning Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Complete your first lesson</span>
              {completedLessons > 0 ? (
                <Badge variant="default" className="bg-green-500">Completed</Badge>
              ) : (
                <Badge variant="outline">In Progress</Badge>
              )}
            </div>
            <Progress value={completedLessons > 0 ? 100 : 0} className="h-1" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">50% course completion</span>
              {progressPercentage >= 50 ? (
                <Badge variant="default" className="bg-green-500">Completed</Badge>
              ) : (
                <Badge variant="outline">In Progress</Badge>
              )}
            </div>
            <Progress value={Math.min(progressPercentage * 2, 100)} className="h-1" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Master {skillName}</span>
              {progressPercentage === 100 ? (
                <Badge variant="default" className="bg-green-500">Completed</Badge>
              ) : (
                <Badge variant="outline">In Progress</Badge>
              )}
            </div>
            <Progress value={progressPercentage} className="h-1" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart2 className="mr-2 h-5 w-5 text-blue-500" />
            Learning Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-lg font-semibold">{completedLessons} lessons</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Time Invested</p>
              <p className="text-lg font-semibold">{completedLearningTime} min</p>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Lessons Remaining</p>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {totalLessons - completedLessons}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold mb-4">Related Skills</h3>
        <div className="space-y-2">
          {relatedSkills.map((relatedSkill) => (
            skillName !== relatedSkill && (
              <Button 
                key={relatedSkill}
                variant="outline" 
                className="text-left justify-start w-full"
                onClick={() => navigate(`/skills/${relatedSkill}/lessons`)}
              >
                {relatedSkill}
              </Button>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillLessonsSidebar;
