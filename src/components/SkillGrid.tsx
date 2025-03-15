
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
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
import { useToast } from '@/components/ui/use-toast';

interface SkillGridProps {
  category: string;
  onStart: () => void;
}

interface Skill {
  name: string;
  icon: ReactNode;
  description: string;
}

const SkillGrid = ({ category, onStart }: SkillGridProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Different skill examples for each category
  const getSkills = (category: string): Skill[] => {
    switch (category) {
      case 'tech':
        return [
          { 
            name: 'Web Development', 
            icon: <Laptop size={24} />,
            description: 'Learn HTML, CSS, JavaScript and modern web frameworks'
          },
          { 
            name: 'Data Science', 
            icon: <BarChart size={24} />,
            description: 'Master data analysis, visualization and machine learning'
          },
          { 
            name: 'AI & Machine Learning', 
            icon: <Brain size={24} />,
            description: 'Explore neural networks, deep learning and AI applications'
          },
          { 
            name: 'Cloud Computing', 
            icon: <Cloud size={24} />,
            description: 'Build and deploy scalable applications in the cloud'
          },
        ];
      case 'business':
        return [
          { 
            name: 'Marketing', 
            icon: <TrendingUp size={24} />,
            description: 'Learn digital marketing, SEO, and growth strategies'
          },
          { 
            name: 'Leadership', 
            icon: <Users size={24} />,
            description: 'Develop effective leadership and management skills'
          },
          { 
            name: 'Public Speaking', 
            icon: <Presentation size={24} />,
            description: 'Master presentation and communication techniques'
          },
          { 
            name: 'Project Management', 
            icon: <ClipboardList size={24} />,
            description: 'Learn methodologies for successful project delivery'
          },
        ];
      case 'design':
        return [
          { 
            name: 'UI/UX Design', 
            icon: <Brush size={24} />,
            description: 'Create intuitive and beautiful digital interfaces'
          },
          { 
            name: 'Graphic Design', 
            icon: <Palette size={24} />,
            description: 'Master visual communication and branding'
          },
          { 
            name: 'Motion Graphics', 
            icon: <Play size={24} />,
            description: 'Create compelling animations and video effects'
          },
          { 
            name: 'Typography', 
            icon: <Type size={24} />,
            description: 'Learn the principles of effective type design'
          },
        ];
      case 'programming':
        return [
          { 
            name: 'JavaScript', 
            icon: <Code size={24} />,
            description: 'Master modern JavaScript and popular frameworks'
          },
          { 
            name: 'Python', 
            icon: <Terminal size={24} />,
            description: 'Learn Python for web, data science and automation'
          },
          { 
            name: 'Mobile Development', 
            icon: <Smartphone size={24} />,
            description: 'Build native and cross-platform mobile applications'
          },
          { 
            name: 'Game Development', 
            icon: <Gamepad size={24} />,
            description: 'Create engaging games with modern game engines'
          },
        ];
      case 'music':
        return [
          { 
            name: 'Guitar', 
            icon: <Music size={24} />,
            description: 'Learn to play guitar from basics to advanced techniques'
          },
          { 
            name: 'Piano', 
            icon: <Piano size={24} />,
            description: 'Master piano from fundamentals to performance'
          },
          { 
            name: 'Music Theory', 
            icon: <FileText size={24} />,
            description: 'Understand the language and structure of music'
          },
          { 
            name: 'Singing', 
            icon: <Mic size={24} />,
            description: 'Develop your vocal range and singing techniques'
          },
        ];
      case 'personal':
        return [
          { 
            name: 'Productivity', 
            icon: <Clock size={24} />,
            description: 'Optimize your workflow and time management'
          },
          { 
            name: 'Meditation', 
            icon: <Heart size={24} />,
            description: 'Practice mindfulness and stress reduction techniques'
          },
          { 
            name: 'Critical Thinking', 
            icon: <Brain size={24} />,
            description: 'Enhance problem-solving and decision-making skills'
          },
          { 
            name: 'Time Management', 
            icon: <Clock size={24} />,
            description: 'Master techniques for prioritizing and focusing'
          },
        ];
      default:
        return [];
    }
  };
  
  const skills = getSkills(category);
  
  const handleStartLearning = (skillName: string) => {
    // Check if user already has this skill
    const userSkills = JSON.parse(localStorage.getItem('user_skills') || '[]');
    const existingSkill = userSkills.find((skill: any) => skill.name === skillName);
    
    if (existingSkill) {
      // If skill exists, navigate directly to its lesson page
      navigate(`/skills/${encodeURIComponent(skillName)}/lessons`);
      toast({
        title: "Continuing your learning",
        description: `Resuming your progress with ${skillName}`,
      });
    } else {
      // If it's a new skill, go to goal setting
      localStorage.setItem('selectedSkill', skillName);
      navigate(`/get-started?skill=${encodeURIComponent(skillName)}`);
      onStart();
    }
  };
  
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
            <p className="text-gray-500 text-sm mb-4">{skill.description}</p>
            <Button onClick={() => handleStartLearning(skill.name)}>
              Start Learning
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillGrid;
