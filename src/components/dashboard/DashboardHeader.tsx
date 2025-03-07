
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  username: string;
}

const DashboardHeader = ({ username }: DashboardHeaderProps) => {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {username}</h1>
          <p className="text-gray-500 mt-1">Continue your learning journey</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild>
            <Link to="/get-started">
              <Plus size={18} className="mr-2" />
              Add New Skill
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
