
import { Trophy, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserProgressSummary from '@/components/UserProgressSummary';

interface DashboardHeaderProps {
  username: string;
  onAddSkill: () => void;
}

const DashboardHeader = ({ username, onAddSkill }: DashboardHeaderProps) => {
  return (
    <div className="mb-12">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {username}</h1>
          <p className="text-gray-500 mt-1">Track your progress and continue your personal learning journey</p>
        </div>
        
        <Button onClick={onAddSkill} className="inline-flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Add New Skill
        </Button>
      </div>
      
      <UserProgressSummary />
    </div>
  );
};

export default DashboardHeader;
