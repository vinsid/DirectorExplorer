
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';

const Index: React.FC = () => {
  useEffect(() => {
    document.title = 'Director Explorer - Search for Film Directors';
  }, []);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            <span className="text-director-light">Director</span>
            <span className="text-cinema"> Explorer</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up">
            Type your favourite Director here
          </p>
          <div className="animate-slide-up">
            <SearchBar />
          </div>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-2xl font-semibold mb-4">Discover the World of Cinema</h2>
          <p className="text-muted-foreground">
            Explore detailed profiles, complete filmographies, and interesting facts about your favorite film directors.
            From classic cinema to contemporary masterpieces - find it all here.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
