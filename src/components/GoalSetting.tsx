
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import StepIndicator from './goal-setting/StepIndicator';
import SkillStep from './goal-setting/SkillStep';
import TimeframeStep from './goal-setting/TimeframeStep';
import LevelStep from './goal-setting/LevelStep';
import StepNavigation from './goal-setting/StepNavigation';
import { GoalData, SkillLevel } from './goal-setting/types';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface GoalSettingProps {
  onComplete: (data: GoalData) => void;
  initialSkill?: string;
}

const GoalSetting = ({ onComplete, initialSkill = '' }: GoalSettingProps) => {
  const [step, setStep] = useState(1);
  const [skill, setSkill] = useState(initialSkill);
  const [timeframe, setTimeframe] = useState(30); // days
  const [level, setLevel] = useState<SkillLevel>('beginner');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Update skill if initialSkill changes
  useEffect(() => {
    if (initialSkill) {
      setSkill(initialSkill);
    }
  }, [initialSkill]);
  
  const handleSubmit = async () => {
    if (step === 1 && !skill.trim()) {
      toast({
        title: "Skill is required",
        description: "Please enter the skill you want to learn",
        variant: "destructive",
      });
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Check if user is authenticated
      if (!user) {
        toast({
          title: "Login required",
          description: "Please sign in or create an account to save your learning goal",
          variant: "destructive",
        });
        return;
      }
      
      const goalData = { skill, timeframe, level };
      
      try {
        // Save user skill to localStorage to persist across sessions
        const existingSkills = JSON.parse(localStorage.getItem('user_skills') || '[]');
        
        // Check if this skill already exists
        const skillExists = existingSkills.some((s: any) => s.name === skill);
        
        if (!skillExists) {
          // Create a new skill entry
          const newSkill = {
            id: `skill-${Date.now()}`,
            name: skill,
            level: level,
            progress: 0,
            streak: 0,
            estimatedTimeLeft: `${timeframe} days`,
            badgesEarned: 0,
            totalBadges: 10,
            todayLessonCompleted: false,
            startDate: new Date().toISOString().split('T')[0]
          };
          
          // Add to existing skills
          const updatedSkills = [...existingSkills, newSkill];
          localStorage.setItem('user_skills', JSON.stringify(updatedSkills));
          
          // Save goal data
          onComplete(goalData);
          
          // Navigate to the skill lessons page
          navigate(`/skills/${encodeURIComponent(skill)}/lessons`);
          
          toast({
            title: "Learning path created!",
            description: `Your personalized learning path for ${skill} has been created.`,
          });
        } else {
          // Skill already exists, just navigate to it
          toast({
            title: "Learning path exists",
            description: `You're already learning ${skill}. Redirecting to your existing path.`,
          });
          navigate(`/skills/${encodeURIComponent(skill)}/lessons`);
        }
      } catch (error) {
        console.error("Error saving skill:", error);
        toast({
          title: "Error saving skill",
          description: "There was a problem saving your learning goal.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <StepIndicator currentStep={step} totalSteps={3} />
      
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 animate-scale-in">
        {step === 1 && (
          <SkillStep skill={skill} setSkill={setSkill} />
        )}
        
        {step === 2 && (
          <TimeframeStep timeframe={timeframe} setTimeframe={setTimeframe} skill={skill} />
        )}
        
        {step === 3 && (
          <LevelStep level={level} setLevel={setLevel} skill={skill} />
        )}
        
        <StepNavigation 
          step={step} 
          totalSteps={3}
          onBack={handleBack} 
          onContinue={handleSubmit}
          isLastStep={step === 3}
        />
      </div>
    </div>
  );
};

export default GoalSetting;
