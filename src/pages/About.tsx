
import React, { useEffect } from 'react';
import Layout from '../components/Layout';

const About: React.FC = () => {
  useEffect(() => {
    document.title = 'About - Director Explorer';
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="text-director-light">About</span>
          <span className="text-cinema"> Director Explorer</span>
        </h1>
        
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p className="mb-6">
            Director Explorer is a comprehensive web application dedicated to film enthusiasts who 
            appreciate the art of direction. Our platform allows you to discover and explore the work 
            of your favorite film directors from around the world.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="mb-6">
            Our mission is to provide film enthusiasts with an easy-to-use platform to explore 
            the complete filmographies and career details of renowned directors. We believe that 
            understanding a director's body of work helps appreciate cinema as an art form.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Search for directors by name with auto-complete suggestions</li>
            <li>View detailed profiles with biographical information</li>
            <li>Explore complete filmographies with posters, release dates, and ratings</li>
            <li>Sort films by release date, popularity, or rating</li>
            <li>Responsive design for both desktop and mobile viewing</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Source</h2>
          <p className="mb-6">
            Director Explorer is powered by data from The Movie Database (TMDB). We're grateful 
            for their comprehensive API that allows us to provide up-to-date information about 
            directors and their films.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            Have suggestions or feedback? We'd love to hear from you! Reach out to us at 
            <a href="mailto:contact@directorexplorer.com" className="text-cinema ml-1 hover:underline">
              contact@directorexplorer.com
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
