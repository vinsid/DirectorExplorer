
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Clock, Calendar, Star } from 'lucide-react';
import Layout from '../components/Layout';
import { getFilmDetails, getImageUrl } from '../utils/api';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const FilmPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const filmId = parseInt(id || '0', 10);

  const { data: film, isLoading, error } = useQuery({
    queryKey: ['film', filmId],
    queryFn: () => getFilmDetails(filmId),
    enabled: !!filmId,
  });

  useEffect(() => {
    if (film) {
      document.title = `${film.title} - Director Explorer`;
    } else {
      document.title = 'Film Details - Director Explorer';
    }
  }, [film]);

  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return 'Unknown';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex mb-6">
            <Button variant="ghost" size="sm" className="mb-6" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Skeleton className="w-full h-[450px] rounded-lg" />
            </div>
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-40 w-full" />
              <div className="flex space-x-4 mt-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !film) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Film</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't load the film details. Please try again later.
          </p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" size="sm" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="rounded-lg overflow-hidden shadow-lg hover-scale transition-all">
              <img 
                src={getImageUrl(film.poster_path, 'w500')} 
                alt={film.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{film.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {film.genres.map((genre) => (
                <span 
                  key={genre.id} 
                  className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-6 mb-6 text-sm md:text-base">
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-1 text-yellow-500" />
                <span>{film.vote_average.toFixed(1)}/10</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1 text-cinema" />
                <span>{formatRuntime(film.runtime)}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-1 text-cinema" />
                <span>{formatDate(film.release_date)}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{film.overview || 'No overview available.'}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FilmPage;
