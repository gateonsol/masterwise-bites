
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Laptop, 
  Presentation, 
  Brush, 
  Code, 
  Music, 
  Brain,
  TrendingUp, 
  Users, 
  ClipboardList, 
  Palette, 
  Terminal, 
  Smartphone, 
  Gamepad, 
  Piano, 
  FileText, 
  Mic, 
  Heart, 
  BarChart, 
  Cloud, 
  Type,
  Clock,
  Play
} from 'lucide-react';

interface SkillGridProps {
  category: string;
  onStart: () => void;
}

interface Skill {
  name: string;
  icon: ReactNode;
}

const SkillGrid = ({ category, onStart }: SkillGridProps) => {
  // Different skill examples for each category
  const getSkills = (category: string): Skill[] => {
    switch (category) {
      case 'tech':
        return [
          { name: 'Web Development', icon: <Laptop size={24} /> },
          { name: 'Data Science', icon: <BarChart size={24} /> },
          { name: 'AI & Machine Learning', icon: <Brain size={24} /> },
          { name: 'Cloud Computing', icon: <Cloud size={24} /> },
        ];
      case 'business':
        return [
          { name: 'Marketing', icon: <TrendingUp size={24} /> },
          { name: 'Leadership', icon: <Users size={24} /> },
          { name: 'Public Speaking', icon: <Presentation size={24} /> },
          { name: 'Project Management', icon: <ClipboardList size={24} /> },
        ];
      case 'design':
        return [
          { name: 'UI/UX Design', icon: <Brush size={24} /> },
          { name: 'Graphic Design', icon: <Palette size={24} /> },
          { name: 'Motion Graphics', icon: <Play size={24} /> },
          { name: 'Typography', icon: <Type size={24} /> },
        ];
      case 'programming':
        return [
          { name: 'JavaScript', icon: <Code size={24} /> },
          { name: 'Python', icon: <Terminal size={24} /> },
          { name: 'Mobile Development', icon: <Smartphone size={24} /> },
          { name: 'Game Development', icon: <Gamepad size={24} /> },
        ];
      case 'music':
        return [
          { name: 'Guitar', icon: <Music size={24} /> },
          { name: 'Piano', icon: <Piano size={24} /> },
          { name: 'Music Theory', icon: <FileText size={24} /> },
          { name: 'Singing', icon: <Mic size={24} /> },
        ];
      case 'personal':
        return [
          { name: 'Productivity', icon: <Clock size={24} /> },
          { name: 'Meditation', icon: <Heart size={24} /> },
          { name: 'Critical Thinking', icon: <Brain size={24} /> },
          { name: 'Time Management', icon: <Clock size={24} /> },
        ];
      default:
        return [];
    }
  };
  
  const skills = getSkills(category);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {skills.map((skill, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4 text-primary">
              {skill.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
            <p className="text-gray-500 text-sm mb-4">Master essential skills with bite-sized daily lessons</p>
            <Button variant="outline" size="sm" onClick={onStart}>
              Start Learning
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillGrid;
