
// Use the provided TMDB API key as a bearer token
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmFkMzcxZWI4MzAzMjM4ZjNmZTY0YWI4ZGU4NjU0YiIsIm5iZiI6MTc0MzQ4MzQzNC4wOCwic3ViIjoiNjdlYjcyMmFiNmRjOWUwYTg3N2E5NmRiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.-Bv4zDNXWzVvLeim2a7XRtZbLuvZdp7K79EvxGFC8is';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Common fetch options with authorization header
const fetchOptions = {
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  }
};

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

// Helper function to get image URL - ensure export is maintained
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Helper function to handle API errors
const handleApiError = (error: any, context: string) => {
  console.error(`Error ${context}:`, error);
  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  }
  throw error;
};

// Search for directors (people)
export const searchDirectors = async (query: string): Promise<SearchResult[]> => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(
      `${BASE_URL}/search/person?query=${encodeURIComponent(query)}&language=en-US&page=1`,
      fetchOptions
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch search results: ${errorData.status_message || response.statusText}`);
    }
    
    const data = await response.json();
    
    // Filter for directors only
    return data.results.filter(
      (person: SearchResult) => person.known_for_department === 'Directing'
    );
  } catch (error) {
    handleApiError(error, 'searching directors');
    return [];
  }
};

// Get director details
export const getDirectorDetails = async (id: number): Promise<Director | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/person/${id}?language=en-US`,
      fetchOptions
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch director details: ${errorData.status_message || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    handleApiError(error, 'fetching director details');
    return null;
  }
};

// Get director's filmography as director
export const getDirectorFilmography = async (id: number): Promise<Film[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/person/${id}/movie_credits?language=en-US`,
      fetchOptions
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch filmography: ${errorData.status_message || response.statusText}`);
    }
    
    const data = await response.json();
    
    // Only return films where they were the director
    return data.crew.filter((job: any) => job.job === 'Director');
  } catch (error) {
    handleApiError(error, 'fetching filmography');
    return [];
  }
};

// Get film details
export const getFilmDetails = async (id: number): Promise<Film | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?language=en-US`,
      fetchOptions
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch film details: ${errorData.status_message || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    handleApiError(error, 'fetching film details');
    return null;
  }
};

// Get similar films
export const getSimilarFilms = async (id: number): Promise<Film[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/similar?language=en-US&page=1`,
      fetchOptions
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch similar films: ${errorData.status_message || response.statusText}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    handleApiError(error, 'fetching similar films');
    return [];
  }
};
