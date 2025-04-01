
import React, { useState } from 'react';
import { Film, getImageUrl } from '../utils/api';
import { Calendar, Clock, Star } from 'lucide-react';

interface FilmCardProps {
  film: Film;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  const [showDetails, setShowDetails] = useState(false);

  const releaseYear = film.release_date 
    ? new Date(film.release_date).getFullYear() 
    : 'Unknown';

  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return 'Unknown';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div 
      className="rounded-lg overflow-hidden border bg-white card-hover"
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="md:flex">
        <div className="md:w-1/3 flex-shrink-0">
          <img 
            src={getImageUrl(film.poster_path)} 
            alt={film.title}
            className="w-full h-full object-cover object-center"
            style={{ maxHeight: showDetails ? '100%' : '200px' }}
          />
        </div>
        <div className="p-4 md:w-2/3">
          <h3 className="film-title mb-1">{film.title}</h3>
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{releaseYear}</span>
            </div>
            {film.runtime && (
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatRuntime(film.runtime)}</span>
              </div>
            )}
            <div className="flex items-center text-muted-foreground">
              <Star className="h-4 w-4 mr-1 text-yellow-500" />
              <span>{film.vote_average.toFixed(1)}</span>
            </div>
          </div>
          
          {film.genres && film.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {film.genres.map(genre => (
                <span 
                  key={genre.id}
                  className="px-2 py-1 rounded-full bg-gray-100 text-xs"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
          
          {showDetails ? (
            <p className="text-sm mt-3">{film.overview}</p>
          ) : (
            <p className="text-sm mt-3 line-clamp-2">{film.overview}</p>
          )}
          
          <button 
            className="mt-3 text-sm text-cinema hover:underline"
          >
            {showDetails ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
