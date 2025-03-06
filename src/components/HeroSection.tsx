
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Zap, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-0 w-full h-full overflow-hidden -z-10 opacity-60">
        <div className="absolute top-0 left-[10%] w-[20rem] h-[20rem] bg-blue-100 rounded-full filter blur-[8rem]"></div>
        <div className="absolute bottom-0 right-[10%] w-[20rem] h-[20rem] bg-blue-100 rounded-full filter blur-[8rem]"></div>
      </div>
      
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-8 max-w-xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-2 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
              Master Any Skill in Minutes a Day
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance animate-fade-up">
              Learn Smarter, <span className="text-primary">Not Harder</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 sm:text-2xl max-w-md text-balance animate-fade-up" style={{ animationDelay: '100ms' }}>
              Personalized bite-sized lessons crafted from the best content online, delivered daily.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <Button size="lg" className="group" asChild>
                <Link to="/get-started" className="flex items-center">
                  Start Learning
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild>
                <Link to="/explore">Explore Skills</Link>
              </Button>
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-start space-x-2">
                <div className="p-2 rounded-full bg-blue-50 text-primary">
                  <Clock size={16} />
                </div>
                <div>
                  <h3 className="font-medium">5-10 Minutes</h3>
                  <p className="text-sm text-gray-500">Daily micro-lessons</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="p-2 rounded-full bg-blue-50 text-primary">
                  <Zap size={16} />
                </div>
                <div>
                  <h3 className="font-medium">AI-Powered</h3>
                  <p className="text-sm text-gray-500">Tailored content</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="p-2 rounded-full bg-blue-50 text-primary">
                  <BarChart size={16} />
                </div>
                <div>
                  <h3 className="font-medium">Track Progress</h3>
                  <p className="text-sm text-gray-500">Visual insights</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Visual element */}
          <div className="relative lg:ml-auto">
            <div 
              className="p-2 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 transition-all duration-500"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="aspect-video overflow-hidden rounded-lg">
                <div className="glass-panel p-8 relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/20 dark:from-blue-950/20 dark:to-blue-900/10"></div>
                  
                  <div className="relative flex flex-col h-full">
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-xl font-bold">SC</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-xl">Your Daily Learning Path</h3>
                        <p className="text-sm text-gray-500">Curated just for you</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 staggered-fade-in">
                      {dailyLessons.map((lesson, index) => (
                        <div 
                          key={index}
                          className={`p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-800/80 flex transition-all duration-300 ${
                            isHovered && index === 0 ? 'transform -translate-y-1 shadow-md' : ''
                          }`}
                        >
                          <div className="w-12 h-12 rounded bg-gray-100 dark:bg-gray-700 flex-shrink-0"></div>
                          <div className="ml-4 flex-1">
                            <div className="h-4 w-2/3 rounded bg-gray-100 dark:bg-gray-700 mb-2"></div>
                            <div className="h-3 w-1/2 rounded bg-gray-100 dark:bg-gray-700"></div>
                          </div>
                          <div className="ml-2 self-start">
                            <div className="h-6 w-16 rounded-full bg-blue-100 dark:bg-blue-900"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-auto flex justify-between items-center pt-4">
                      <div className="text-sm font-medium text-gray-500">3/5 lessons completed today</div>
                      <div className="h-2 w-28 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full w-3/5 bg-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-100 rounded-full filter blur-xl opacity-70 animate-pulse-subtle"></div>
            <div className="absolute -top-8 -right-8 w-20 h-20 bg-blue-100 rounded-full filter blur-xl opacity-70 animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const dailyLessons = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

export default HeroSection;
