
import { Link } from 'react-router-dom';
import { BookOpen, Plus } from 'lucide-react';
import SkillCard, { SkillCardProps } from '@/components/SkillCard';
import { Button } from '@/components/ui/button';

interface SkillsSectionProps {
  skills: SkillCardProps[];
  loading: boolean;
  onAddSkill: () => void;
}

const SkillsSection = ({ skills, loading, onAddSkill }: SkillsSectionProps) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <BookOpen size={18} className="mr-2 text-primary" />
          Your Skills
        </h2>
        <Button variant="ghost" onClick={onAddSkill} className="text-primary flex items-center">
          <Plus size={16} className="mr-1" />
          Add New
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          Array(2).fill(0).map((_, i) => (
            <div key={i} className="h-48 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
          ))
        ) : skills.length === 0 ? (
          <div className="col-span-2 p-10 text-center border border-dashed rounded-xl border-gray-200 dark:border-gray-700">
            <BookOpen size={40} className="mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium mb-2">No skills added yet</h3>
            <p className="text-gray-500 mb-4">Get started by adding a new skill to track your learning progress</p>
            <Button onClick={onAddSkill}>
              <Plus size={16} className="mr-2" />
              Add Your First Skill
            </Button>
          </div>
        ) : (
          skills.map((skill) => (
            <SkillCard key={skill.id} {...skill} />
          ))
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
