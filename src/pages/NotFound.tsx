
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-900 p-4">
      <div className="w-full max-w-md text-center space-y-6 animate-fade-in">
        <div className="relative">
          <div className="text-9xl font-bold text-gray-100 dark:text-gray-800">404</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-gray-800 dark:text-gray-100">
            Oops!
          </div>
        </div>
        
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        
        <p className="text-gray-600 dark:text-gray-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="pt-4">
          <Button asChild className="px-6">
            <Link to="/">
              <Home size={18} className="mr-2" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
