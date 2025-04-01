import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Film } from 'lucide-react';
import Layout from '../components/Layout';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Page Not Found - Director Explorer';
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center flex flex-col items-center">
          <Film className="h-24 w-24 text-muted-foreground mb-6 animate-pulse" />
          
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          
          <p className="text-muted-foreground mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <Button 
            onClick={() => navigate('/')}
            className="bg-cinema hover:bg-cinema/90"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> 
            Return to Home
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;