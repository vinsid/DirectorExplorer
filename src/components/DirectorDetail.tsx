
import React, { useState, useEffect } from 'react';
import { Director, Film, getImageUrl, getDirectorFilmography, getFilmDetails } from '../utils/api';
import { Calendar, MapPin } from 'lucide-react';
import FilmCard from './FilmCard';

interface DirectorDetailProps {
  director: Director;
}

type SortOption = 'date' | 'popularity' | 'rating';

const DirectorDetail: React.FC<DirectorDetailProps> = ({ director }) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>('date');
  const [expandBio, setExpandBio] = useState(false);

  useEffect(() => {
    const fetchFilmography = async () => {
      try {
        setLoading(true);
        const filmography = await getDirectorFilmography(director.id);
        
        // Fetch additional details for each film
        const detailedFilms = await Promise.all(
          filmography.map(async (film) => {
            const details = await getFilmDetails(film.id);
            return details ? { ...film, ...details } : film;
          })
        );
        
        setFilms(detailedFilms.filter((film): film is Film => film !== null));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching filmography:', error);
        setLoading(false);
      }
    };

    fetchFilmography();
  }, [director.id]);

  const sortFilms = (films: Film[]): Film[] => {
    switch (sortOption) {
      case 'date':
        return [...films].sort((a, b) => 
          new Date(b.release_date || '').getTime() - new Date(a.release_date || '').getTime()
        );
      case 'popularity':
        return [...films].sort((a, b) => b.vote_average - a.vote_average);
      case 'rating':
        return [...films].sort((a, b) => b.vote_average - a.vote_average);
      default:
        return films;
    }
  };

  const formattedBirthday = director.birthday 
    ? new Date(director.birthday).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : null;

  const formattedDeathday = director.deathday 
    ? new Date(director.deathday).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : null;

  const sortedFilms = sortFilms(films);

  return (
    <div className="animate-fade-in">
      <div className="md:flex md:space-x-8 mb-8">
        <div className="md:w-1/3 mb-6 md:mb-0">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={getImageUrl(director.profile_path, 'w780')} 
              alt={director.name}
              className="w-full object-cover"
            />
          </div>
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{director.name}</h1>
          
          <div className="flex flex-wrap gap-4 mb-4 text-muted-foreground">
            {formattedBirthday && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Born: {formattedBirthday}</span>
                {formattedDeathday && <span> — Died: {formattedDeathday}</span>}
              </div>
            )}
            {director.place_of_birth && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{director.place_of_birth}</span>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Biography</h2>
            <div className={expandBio ? '' : 'line-clamp-5'}>
              <p>{director.biography || 'No biography available.'}</p>
            </div>
            {director.biography && director.biography.length > 300 && (
              <button 
                onClick={() => setExpandBio(!expandBio)}
                className="mt-2 text-cinema hover:underline"
              >
                {expandBio ? 'Show Less' : 'Read More'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-2xl font-bold mb-2 md:mb-0">Filmography</h2>
          <div className="flex items-center">
            <span className="mr-2">Sort by:</span>
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="border rounded p-1"
            >
              <option value="date">Release Date</option>
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p>Loading filmography...</p>
          </div>
        ) : sortedFilms.length > 0 ? (
          <div className="grid gap-6">
            {sortedFilms.map(film => (
              <FilmCard key={film.id} film={film} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p>No films found for this director.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectorDetail;
