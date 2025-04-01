
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDirectorDetails, Director } from '../utils/api';
import Layout from '../components/Layout';
import DirectorDetail from '../components/DirectorDetail';
import { ArrowLeft } from 'lucide-react';

const DirectorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [director, setDirector] = useState<Director | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDirector = async () => {
      if (!id) {
        setError('No director ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const directorData = await getDirectorDetails(parseInt(id));
        
        if (!directorData) {
          setError('Director not found');
        } else {
          setDirector(directorData);
          // Set document title
          document.title = `${directorData.name} - Director Explorer`;
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching director:', err);
        setError('Failed to load director details');
        setLoading(false);
      }
    };

    fetchDirector();
  }, [id]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-cinema hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to search
        </button>

        {loading ? (
          <div className="text-center py-12">
            <p>Loading director details...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : director ? (
          <DirectorDetail director={director} />
        ) : (
          <div className="text-center py-12">
            <p>Director not found</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DirectorPage;
