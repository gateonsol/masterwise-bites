
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import StepIndicator from './goal-setting/StepIndicator';
import SkillStep from './goal-setting/SkillStep';
import TimeframeStep from './goal-setting/TimeframeStep';
import LevelStep from './goal-setting/LevelStep';
import StepNavigation from './goal-setting/StepNavigation';
import { GoalData, SkillLevel } from './goal-setting/types';

interface GoalSettingProps {
  onComplete: (data: GoalData) => void;
}

const GoalSetting = ({ onComplete }: GoalSettingProps) => {
  const [step, setStep] = useState(1);
  const [skill, setSkill] = useState('');
  const [timeframe, setTimeframe] = useState(30); // days
  const [level, setLevel] = useState<SkillLevel>('beginner');
  const { toast } = useToast();
  
  const handleSubmit = () => {
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
      onComplete({ skill, timeframe, level });
      toast({
        title: "Goal set successfully!",
        description: "Your personalized learning path is being created.",
      });
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
