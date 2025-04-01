
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import { Film } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';

const Index: React.FC = () => {
  const { theme } = useTheme();
  
  useEffect(() => {
    document.title = 'Director Explorer - Search for Film Directors';
  }, []);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/50">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Film className="h-12 w-12 mr-3 text-cinema" />
            <h1 className="text-4xl md:text-6xl font-bold animate-fade-in">
              <span className="text-director-light">Director</span>
              <span className="text-cinema"> Explorer</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up">
            Discover the visionaries behind your favorite films
          </p>
          <SearchBar />
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto text-center animate-fade-in space-y-8">
          <h2 className="text-2xl font-semibold mb-4">Discover the World of Cinema</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-md hover-scale">
              <h3 className="text-xl font-medium mb-2 text-director-light">Search</h3>
              <p className="text-muted-foreground">
                Find detailed information about your favorite directors with our powerful search feature.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md hover-scale">
              <h3 className="text-xl font-medium mb-2 text-director-light">Explore</h3>
              <p className="text-muted-foreground">
                Browse complete filmographies, from early works to latest masterpieces.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md hover-scale">
              <h3 className="text-xl font-medium mb-2 text-director-light">Learn</h3>
              <p className="text-muted-foreground">
                Discover biographical details and interesting facts about influential filmmakers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
