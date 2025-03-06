
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import GoalSetting from '@/components/GoalSetting';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Laptop, Presentation, Brush, Code, Music, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [showGoalSetting, setShowGoalSetting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleGoalComplete = (data: any) => {
    toast({
      title: "Goal set successfully!",
      description: `We're creating your learning path for ${data.skill}.`,
    });
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {!showGoalSetting ? (
        <>
          <HeroSection />
          
          <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-900">
            <div className="container px-4 mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Explore Skills by Category
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Browse our curated learning paths across various disciplines
                </p>
              </div>
              
              <Tabs defaultValue="tech" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="grid grid-cols-3 md:grid-cols-6 bg-blue-50/50 dark:bg-gray-800/50 p-1">
                    <TabsTrigger value="tech" className="text-xs md:text-sm">Technology</TabsTrigger>
                    <TabsTrigger value="business" className="text-xs md:text-sm">Business</TabsTrigger>
                    <TabsTrigger value="design" className="text-xs md:text-sm">Design</TabsTrigger>
                    <TabsTrigger value="programming" className="text-xs md:text-sm">Programming</TabsTrigger>
                    <TabsTrigger value="music" className="text-xs md:text-sm">Music</TabsTrigger>
                    <TabsTrigger value="personal" className="text-xs md:text-sm">Personal</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="tech" className="animate-fade-in">
                  <SkillGrid category="tech" onStart={() => setShowGoalSetting(true)} />
                </TabsContent>
                
                <TabsContent value="business" className="animate-fade-in">
                  <SkillGrid category="business" onStart={() => setShowGoalSetting(true)} />
                </TabsContent>
                
                <TabsContent value="design" className="animate-fade-in">
                  <SkillGrid category="design" onStart={() => setShowGoalSetting(true)} />
                </TabsContent>
                
                <TabsContent value="programming" className="animate-fade-in">
                  <SkillGrid category="programming" onStart={() => setShowGoalSetting(true)} />
                </TabsContent>
                
                <TabsContent value="music" className="animate-fade-in">
                  <SkillGrid category="music" onStart={() => setShowGoalSetting(true)} />
                </TabsContent>
                
                <TabsContent value="personal" className="animate-fade-in">
                  <SkillGrid category="personal" onStart={() => setShowGoalSetting(true)} />
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          <section className="py-20 bg-white dark:bg-gray-900">
            <div className="container px-4 mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <div className="rounded-2xl p-1 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 overflow-hidden shadow-sm">
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 space-y-5">
                      <div className="space-y-3">
                        <div className="h-4 w-24 rounded bg-gray-100 dark:bg-gray-800"></div>
                        <div className="h-8 w-48 rounded bg-gray-100 dark:bg-gray-800"></div>
                        <div className="h-3 w-40 rounded bg-gray-100 dark:bg-gray-800"></div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30"></div>
                          <div className="h-3 w-32 rounded bg-gray-100 dark:bg-gray-800"></div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                          <div className="h-full w-2/3 rounded-full bg-primary"></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div className="h-20 rounded bg-gray-100 dark:bg-gray-800"></div>
                        <div className="h-20 rounded bg-gray-100 dark:bg-gray-800"></div>
                        <div className="h-20 rounded bg-gray-100 dark:bg-gray-800"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="order-1 md:order-2 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Track Your Progress,<br />Achieve Your Goals
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Our intelligent progress tracking system helps you stay motivated and see your growth in real-time. Set goals, track your learning streaks, and earn achievements as you develop your skills.
                  </p>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mt-1 mr-3 p-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.33334 8.00002L7.33334 10L10.6667 6.00002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-20 bg-blue-50 dark:bg-gray-800/50">
            <div className="container px-4 mx-auto max-w-3xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Set up your first skill goal and get personalized daily lessons in just a few minutes.
              </p>
              <Button size="lg" className="px-8" onClick={() => setShowGoalSetting(true)}>
                Get Started Now
              </Button>
            </div>
          </section>
        </>
      ) : (
        <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-900">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Set Your Learning Goal</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Tell us what you'd like to learn, and we'll create a personalized path for you
              </p>
            </div>
            
            <GoalSetting onComplete={handleGoalComplete} />
            
            <div className="mt-6 text-center">
              <Button variant="link" onClick={() => setShowGoalSetting(false)}>
                Back to home
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface SkillGridProps {
  category: string;
  onStart: () => void;
}

const SkillGrid = ({ category, onStart }: SkillGridProps) => {
  // Different skill examples for each category
  const getSkills = (category: string) => {
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

// Import icons
import { TrendingUp, Users, ClipboardList, Palette, Terminal, 
  Smartphone, Gamepad, Piano, FileText, Mic, Heart, BarChart, Cloud, Type } from 'lucide-react';

const features = [
  'Daily learning streaks to build consistency',
  'Visual progress tracking across all your skills',
  'Achievement badges to celebrate milestones',
  'Personalized insights based on your learning patterns',
  'Adaptive difficulty that grows with your skill level'
];

export default Index;
