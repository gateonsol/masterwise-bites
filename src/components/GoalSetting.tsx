
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, ChevronRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

interface GoalSettingProps {
  onComplete: (data: {
    skill: string;
    timeframe: number;
    level: SkillLevel;
  }) => void;
}

const GoalSetting = ({ onComplete }: GoalSettingProps) => {
  const [step, setStep] = useState(1);
  const [skill, setSkill] = useState('');
  const [timeframe, setTimeframe] = useState(30); // days
  const [level, setLevel] = useState<SkillLevel>('beginner');
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNumber) => (
            <div 
              key={stepNumber}
              className="flex flex-col items-center"
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step === stepNumber
                    ? 'bg-primary text-white shadow-md'
                    : step > stepNumber
                    ? 'bg-primary/20 text-primary'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step > stepNumber ? <Check size={16} /> : stepNumber}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {stepNumber === 1 && 'Skill'}
                {stepNumber === 2 && 'Timeframe'}
                {stepNumber === 3 && 'Level'}
              </div>
            </div>
          ))}
        </div>
        
        <div className="relative mt-2">
          <div className="absolute top-0 left-[10%] right-[10%] h-1 bg-gray-100">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${(step - 1) * 50}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 animate-scale-in">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-center">What do you want to learn?</h2>
                <p className="text-gray-500 text-center text-sm">Enter a skill or subject area you're interested in mastering</p>
              </div>
              
              <div className="space-y-4">
                <Input
                  placeholder="e.g., Python, Public Speaking, Digital Marketing..."
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  className="text-center"
                />
                
                <div className="text-xs text-gray-500">
                  <div className="font-medium mb-1">Popular skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'UX Design', 'Digital Marketing', 'Public Speaking', 'Graphic Design'].map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-xs"
                        onClick={() => setSkill(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-center">Set your learning timeframe</h2>
                <p className="text-gray-500 text-center text-sm">How long do you want to spend learning {skill}?</p>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>30 days</span>
                    <span>90 days</span>
                    <span>180 days</span>
                  </div>
                  <Slider
                    defaultValue={[timeframe]}
                    min={30}
                    max={180}
                    step={30}
                    onValueChange={(values) => setTimeframe(values[0])}
                    className="w-full"
                  />
                  <div className="text-center font-medium text-primary">
                    {timeframe} days
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  <div className="font-medium mb-1">Estimated commitment:</div>
                  <div className="text-xs">
                    Based on your selection, you'll need to spend just 5-10 minutes per day to make meaningful progress.
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-center">What's your current level?</h2>
                <p className="text-gray-500 text-center text-sm">Select your current proficiency in {skill}</p>
              </div>
              
              <RadioGroup 
                value={level} 
                onValueChange={(value) => setLevel(value as SkillLevel)}
                className="space-y-3"
              >
                <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <div className="flex-1">
                    <Label htmlFor="beginner" className="text-base font-medium">Beginner</Label>
                    <p className="text-gray-500 text-sm">Little to no prior knowledge of {skill}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <div className="flex-1">
                    <Label htmlFor="intermediate" className="text-base font-medium">Intermediate</Label>
                    <p className="text-gray-500 text-sm">Some experience with {skill}, but looking to improve</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <div className="flex-1">
                    <Label htmlFor="advanced" className="text-base font-medium">Advanced</Label>
                    <p className="text-gray-500 text-sm">Significant experience, seeking to master {skill}</p>
                  </div>
                </div>
              </RadioGroup>
            </div>
          )}
          
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}
            
            <Button type="submit" className="group">
              {step < 3 ? 'Continue' : 'Create My Learning Path'}
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalSetting;
