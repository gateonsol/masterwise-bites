
import { Link } from 'react-router-dom';
import { Plus, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotificationsPopover from '@/components/NotificationsPopover';
import UserProgressSummary from '@/components/UserProgressSummary';

interface DashboardHeaderProps {
  username: string;
}

const DashboardHeader = ({ username }: DashboardHeaderProps) => {
  return (
    <header className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {username}</h1>
          <p className="text-gray-500 mt-1">Continue your learning journey</p>
        </div>
        
        <div className="flex items-center gap-3">
          <NotificationsPopover />
          
          <Button asChild variant="outline" className="gap-1">
            <Link to="/stats">
              <BarChart2 size={18} className="mr-1" />
              Stats
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="/get-started">
              <Plus size={18} className="mr-1" />
              Add New Skill
            </Link>
          </Button>
        </div>
      </div>
      
      <UserProgressSummary />
    </header>
  );
};

export default DashboardHeader;
