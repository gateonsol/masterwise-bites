
import { Input } from '@/components/ui/input';

interface SkillStepProps {
  skill: string;
  setSkill: (skill: string) => void;
}

const SkillStep = ({ skill, setSkill }: SkillStepProps) => {
  const popularSkills = ['Python', 'UX Design', 'Digital Marketing', 'Public Speaking', 'Graphic Design'];
  
  return (
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
            {popularSkills.map((suggestion) => (
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
  );
};

export default SkillStep;
