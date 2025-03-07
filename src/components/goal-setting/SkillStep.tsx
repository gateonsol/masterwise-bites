
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap } from 'lucide-react';

interface SkillStepProps {
  skill: string;
  setSkill: (skill: string) => void;
}

const SkillStep = ({ skill, setSkill }: SkillStepProps) => {  
  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary">
          <GraduationCap size={32} />
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-1">What do you want to learn?</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Enter the skill or subject you'd like to master
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="skill">Skill or subject</Label>
        <Input
          id="skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="e.g. JavaScript, Photography, Guitar"
          className="w-full"
        />
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-300">
        <p>
          <strong>Tip:</strong> Be specific to get the best personalized learning experience. Instead of "Language", try "Spanish for Beginners".
        </p>
      </div>
    </div>
  );
};

export default SkillStep;
