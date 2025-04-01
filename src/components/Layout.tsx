
import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-montserrat font-bold text-director-light hover:text-cinema transition-colors">
            Director Explorer
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:text-cinema transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cinema transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Director Explorer. Powered by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-cinema hover:underline">TMDB</a>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
