
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import GoalSetting from '@/components/GoalSetting';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturesSection from '@/components/FeaturesSection';
import CallToActionSection from '@/components/CallToActionSection';
import { useToast } from '@/components/ui/use-toast';
import { GoalData } from '@/components/goal-setting/types';

const Index = () => {
  const [showGoalSetting, setShowGoalSetting] = useState(false);
  const [preselectedSkill, setPreselectedSkill] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if a skill was selected from the grid
    const selectedSkill = localStorage.getItem('selectedSkill');
    if (selectedSkill) {
      setPreselectedSkill(selectedSkill);
      localStorage.removeItem('selectedSkill');
    }
  }, []);
  
  const handleGoalComplete = (data: GoalData) => {
    toast({
      title: "Goal set successfully!",
      description: `We're creating your learning path for ${data.skill}.`,
    });
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };
  
  const handleStartLearning = () => {
    setShowGoalSetting(true);
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {!showGoalSetting ? (
        <>
          <HeroSection />
          <CategoriesSection onStartLearning={handleStartLearning} />
          <FeaturesSection />
          <CallToActionSection onStartLearning={handleStartLearning} />
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
            
            <GoalSetting 
              onComplete={handleGoalComplete} 
              initialSkill={preselectedSkill}
            />
            
            <div className="mt-6 text-center">
              <button 
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                onClick={() => setShowGoalSetting(false)}
              >
                Back to home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
