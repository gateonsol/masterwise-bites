
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

interface LevelStepProps {
  level: SkillLevel;
  setLevel: (level: SkillLevel) => void;
  skill: string;
}

const LevelStep = ({ level, setLevel, skill }: LevelStepProps) => {
  return (
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
  );
};

export default LevelStep;
