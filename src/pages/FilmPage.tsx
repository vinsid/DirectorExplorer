import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, MapPin, Film as FilmIcon } from 'lucide-react';
import Layout from '../components/Layout';
import { getDirectorDetails, getDirectorFilmography, getImageUrl } from '../utils/api';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar } from '@/components/ui/avatar';

const DirectorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const directorId = parseInt(id || '0', 10);

  const { data: director, isLoading: directorLoading } = useQuery({
    queryKey: ['director', directorId],
    queryFn: () => getDirectorDetails(directorId),
    enabled: !!directorId,
  });

  const { data: films, isLoading: filmsLoading } = useQuery({
    queryKey: ['director-films', directorId],
    queryFn: () => getDirectorFilmography(directorId),
    enabled: !!directorId,
  });

  useEffect(() => {
    if (director) {
      document.title = `${director.name} - Director Explorer`;
    } else {
      document.title = 'Director Profile - Director Explorer';
    }
  }, [director]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isLoading = directorLoading || filmsLoading;

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex mb-6">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="flex flex-col items-center">
                <Skeleton className="w-48 h-48 rounded-full" />
                <Skeleton className="h-8 w-40 mt-4" />
              </div>
            </div>
            <div className="lg:col-span-3 space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-8 w-48" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!director) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Director Not Found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't find the director you're looking for. They may not be in our database.
          </p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Return Home
          </Button>
        </div>
      </Layout>
    );
  }

  // Sort films by release date, newest first
  const sortedFilms = [...(films || [])].sort((a, b) => {
    return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" size="sm" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Director Profile */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center sticky top-24">
              <Avatar className="w-48 h-48 border-4 border-cinema shadow-lg hover-scale transition-all">
                <img 
                  src={getImageUrl(director.profile_path, 'w500')} 
                  alt={director.name}
                  className="object-cover w-full h-full"
                />
              </Avatar>
              <h1 className="text-2xl font-bold mt-4 text-center">{director.name}</h1>
              
              <div className="flex flex-col space-y-4 mt-6 w-full text-sm">
                {director.birthday && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-cinema" />
                    <span>Born: {formatDate(director.birthday)}</span>
                  </div>
                )}
                
                {director.deathday && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-cinema" />
                    <span>Died: {formatDate(director.deathday)}</span>
                  </div>
                )}
                
                {director.place_of_birth && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-cinema" />
                    <span>{director.place_of_birth}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Biography and Filmography */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="text-director-light">Biography</span>
              </h2>
              <div className="prose max-w-none text-muted-foreground leading-relaxed">
                {director.biography ? (
                  <p>{director.biography}</p>
                ) : (
                  <p className="italic">No biography available for this director.</p>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <FilmIcon className="h-5 w-5 mr-2 text-cinema" />
                <span className="text-director-light">Filmography</span>
                <span className="ml-2 text-base font-normal text-muted-foreground">
                  ({sortedFilms.length} films)
                </span>
              </h2>
              
              {sortedFilms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedFilms.map((film) => (
                    <Link 
                      key={film.id} 
                      to={`/film/${film.id}`}
                      className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all hover-scale group"
                    >
                      <div className="aspect-[2/3] relative overflow-hidden">
                        <img 
                          src={getImageUrl(film.poster_path, 'w500')} 
                          alt={film.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <span className="text-white font-medium">
                            {new Date(film.release_date).getFullYear() || 'Unknown'}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold group-hover:text-cinema transition-colors">{film.title}</h3>
                        <div className="flex items-center mt-2">
                          <span className="flex items-center text-yellow-500 text-sm">
                            ★ {film.vote_average.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-muted rounded-lg">
                  <p className="text-muted-foreground">No films found for this director.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DirectorPage;