
import { BarChart, Clock, Award } from 'lucide-react';

const features = [
  'Daily learning streaks to build consistency',
  'Visual progress tracking across all your skills',
  'Achievement badges to celebrate milestones',
  'Personalized insights based on your learning patterns',
  'Adaptive difficulty that grows with your skill level'
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="rounded-2xl p-1 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 overflow-hidden shadow-sm">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 space-y-5">
                <div className="space-y-3">
                  <div className="h-4 w-24 rounded bg-gray-100 dark:bg-gray-800"></div>
                  <div className="h-8 w-48 rounded bg-gray-100 dark:bg-gray-800"></div>
                  <div className="h-3 w-40 rounded bg-gray-100 dark:bg-gray-800"></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30"></div>
                    <div className="h-3 w-32 rounded bg-gray-100 dark:bg-gray-800"></div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-full w-2/3 rounded-full bg-primary"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-20 rounded bg-gray-100 dark:bg-gray-800"></div>
                  <div className="h-20 rounded bg-gray-100 dark:bg-gray-800"></div>
                  <div className="h-20 rounded bg-gray-100 dark:bg-gray-800"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Track Your Progress,<br />Achieve Your Goals
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our intelligent progress tracking system helps you stay motivated and see your growth in real-time. Set goals, track your learning streaks, and earn achievements as you develop your skills.
            </p>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="mt-1 mr-3 p-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.33334 8.00002L7.33334 10L10.6667 6.00002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
