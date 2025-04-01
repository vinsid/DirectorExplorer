import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Info, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../hooks/use-theme';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Film className="h-6 w-6 text-cinema" />
              <span className="font-bold text-xl hidden sm:inline-block">
                <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-director-light'}`}>Director</span>
                <span className="text-cinema">Explorer</span>
              </span>
            </Link>
            
            <div className="flex items-center space-x-1">
              <Link to="/">
                <Button 
                  variant={isActive('/') ? "default" : "ghost"} 
                  size="sm"
                  className={isActive('/') ? "bg-cinema hover:bg-cinema/90" : ""}
                >
                  Home
                </Button>
              </Link>
              
              <Link to="/about">
                <Button 
                  variant={isActive('/about') ? "default" : "ghost"} 
                  size="sm"
                  className={isActive('/about') ? "bg-cinema hover:bg-cinema/90" : ""}
                >
                  <Info className="h-4 w-4 mr-1" />
                  About
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="ml-2"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center mb-4 md:mb-0">
              <Film className="h-4 w-4 mr-2 text-cinema" />
              <span>
                <span className="font-medium">Director Explorer</span> &copy; {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex space-x-4">
              <Link to="/" className="hover:text-cinema transition-colors">Home</Link>
              <Link to="/about" className="hover:text-cinema transition-colors">About</Link>
              <a href="#" className="hover:text-cinema transition-colors">Privacy</a>
              <a href="#" className="hover:text-cinema transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;