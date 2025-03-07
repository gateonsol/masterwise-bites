
import { Award } from 'lucide-react';
import { ReactNode } from 'react';

interface Achievement {
  icon: ReactNode;
  title: string;
  description: string;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
  loading: boolean;
}

const AchievementsSection = ({ achievements, loading }: AchievementsSectionProps) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Award size={18} className="mr-2 text-primary" />
          Recent Achievements
        </h2>
      </div>
      
      {loading ? (
        <div className="h-48 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm">
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {achievement.icon}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">{achievement.title}</h3>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AchievementsSection;
