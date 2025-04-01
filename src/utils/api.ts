// Use the provided TMDB API key
const API_KEY = 'e4bccae285ae9612ecadc0525e7a4bf4';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Types for our API responses
export interface Director {
  id: number;
  name: string;
  profile_path: string | null;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  known_for_department: string;
}

export interface Film {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
  runtime: number | null;
  genres: { id: number; name: string }[];
}

export interface SearchResult {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
}

// Helper function to get image URL
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Search for directors (people)
export const searchDirectors = async (query: string): Promise<SearchResult[]> => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(
      `${BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`
    );
    
    if (!response.ok) throw new Error('Failed to fetch search results');
    
    const data = await response.json();
    
    // Filter for directors only
    return data.results.filter(
      (person: SearchResult) => person.known_for_department === 'Directing'
    );
  } catch (error) {
    console.error('Error searching directors:', error);
    return [];
  }
};

// Get director details
export const getDirectorDetails = async (id: number): Promise<Director | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US`
    );
    
    if (!response.ok) throw new Error('Failed to fetch director details');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching director details:', error);
    return null;
  }
};

// Get director's filmography as director
export const getDirectorFilmography = async (id: number): Promise<Film[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`
    );
    
    if (!response.ok) throw new Error('Failed to fetch filmography');
    
    const data = await response.json();
    
    // Only return films where they were the director
    return data.crew.filter((job: any) => job.job === 'Director');
  } catch (error) {
    console.error('Error fetching filmography:', error);
    return [];
  }
};

// Get film details
export const getFilmDetails = async (id: number): Promise<Film | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    
    if (!response.ok) throw new Error('Failed to fetch film details');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching film details:', error);
    return null;
  }
};
