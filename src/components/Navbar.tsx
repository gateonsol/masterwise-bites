
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
      isScrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold flex items-center transition-transform duration-300 hover:scale-[1.02]"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              SkillCraft
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" isActive={isActive('/')}>
              Home
            </NavLink>
            <NavLink to="/dashboard" isActive={isActive('/dashboard')}>
              Dashboard
            </NavLink>
            <NavLink to="/explore" isActive={isActive('/explore')}>
              Explore
            </NavLink>
            <ThemeToggle />
            <div className="ml-4">
              <Button variant="default" size="sm" asChild>
                <Link to="/get-started">
                  Get Started
                </Link>
              </Button>
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button 
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <MobileNavLink to="/" isActive={isActive('/')} onClick={() => setMobileMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/dashboard" isActive={isActive('/dashboard')} onClick={() => setMobileMenuOpen(false)}>
              Dashboard
            </MobileNavLink>
            <MobileNavLink to="/explore" isActive={isActive('/explore')} onClick={() => setMobileMenuOpen(false)}>
              Explore
            </MobileNavLink>
            <div className="pt-2">
              <Button className="w-full" variant="default" asChild>
                <Link to="/get-started" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ children, to, isActive }: { children: React.ReactNode, to: string, isActive: boolean }) => (
  <Link
    to={to}
    className={cn(
      "px-3 py-2 text-sm font-medium rounded-md transition-all",
      isActive 
        ? "text-primary" 
        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
    )}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ 
  children, 
  to, 
  isActive, 
  onClick 
}: { 
  children: React.ReactNode, 
  to: string, 
  isActive: boolean,
  onClick: () => void
}) => (
  <Link
    to={to}
    className={cn(
      "px-3 py-3 text-base font-medium rounded-md",
      isActive 
        ? "text-primary bg-blue-50 dark:bg-blue-900/20" 
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    )}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
