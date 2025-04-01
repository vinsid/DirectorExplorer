import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { Film, Github, Code, Heart } from 'lucide-react';

const About: React.FC = () => {
  useEffect(() => {
    document.title = 'About - Director Explorer';
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Film className="h-16 w-16 mx-auto text-cinema mb-4" />
            <h1 className="text-4xl font-bold mb-4">About Director Explorer</h1>
            <p className="text-xl text-muted-foreground">
              Your gateway to discovering the visionaries behind cinema
            </p>
          </div>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4 text-director-light">Our Mission</h2>
            <p className="text-muted-foreground mb-8">
              Director Explorer was created to celebrate the art of filmmaking by providing a 
              comprehensive resource for film enthusiasts to discover and learn about directors 
              from around the world. Our goal is to highlight the creative minds behind the camera 
              and showcase their filmographies in an elegant, easy-to-navigate platform.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 text-director-light">How It Works</h2>
            <p className="text-muted-foreground mb-8">
              We leverage the TMDb (The Movie Database) API to provide up-to-date information about 
              directors and their films. Our application allows you to search for directors, explore 
              their filmographies, and learn about their lives and contributions to cinema. The data 
              is presented in a clean, modern interface designed to enhance your browsing experience.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 text-director-light">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Code className="h-5 w-5 mr-2 text-cinema" />
                  Frontend
                </h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• React</li>
                  <li>• TypeScript</li>
                  <li>• React Router</li>
                  <li>• TanStack Query</li>
                  <li>• Tailwind CSS</li>
                  <li>• Shadcn UI</li>
                </ul>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Film className="h-5 w-5 mr-2 text-cinema" />
                  API & Data
                </h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• TMDb API</li>
                  <li>• REST API</li>
                  <li>• JSON Data</li>
                  <li>• Fetch API</li>
                </ul>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4 text-director-light">Acknowledgments</h2>
            <p className="text-muted-foreground mb-4">
              This product uses the TMDb API but is not endorsed or certified by TMDb. We are grateful 
              for their comprehensive database that makes this application possible.
            </p>
            
            <div className="border-t pt-8 mt-8 text-center">
              <p className="flex items-center justify-center text-muted-foreground">
                Made with <Heart className="h-4 w-4 mx-2 text-red-500" /> for cinema enthusiasts
              </p>
              <div className="flex items-center justify-center mt-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-cinema transition-colors"
                >
                  <Github className="h-5 w-5 mr-2" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;