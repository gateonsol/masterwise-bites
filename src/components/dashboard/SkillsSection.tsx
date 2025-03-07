
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import SkillCard, { SkillCardProps } from '@/components/SkillCard';

interface SkillsSectionProps {
  skills: SkillCardProps[];
  loading: boolean;
}

const SkillsSection = ({ skills, loading }: SkillsSectionProps) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <BookOpen size={18} className="mr-2 text-primary" />
          Your Skills
        </h2>
        <Link to="/skills" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          Array(2).fill(0).map((_, i) => (
            <div key={i} className="h-48 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
          ))
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
