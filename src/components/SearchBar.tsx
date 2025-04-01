
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchResult, searchDirectors } from '../utils/api';
import { Search, X, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [searchRef]);

  // Search directors as user types
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setLoading(true);
        try {
          const searchResults = await searchDirectors(query);
          setResults(searchResults);
          setShowResults(true);
          
          if (searchResults.length === 0 && query.trim().length > 3) {
            toast({
              description: "No directors found matching your search.",
              duration: 3000,
            });
          }
        } catch (error) {
          console.error("Search error:", error);
          toast({
            variant: "destructive",
            title: "Search failed",
            description: "There was a problem with your search. Please try again.",
          });
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, toast]);

  const handleDirectorSelect = (id: number) => {
    navigate(`/director/${id}`);
    setQuery('');
    setShowResults(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto relative" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {loading ? (
            <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-10 py-3 rounded-full border border-input bg-background focus:ring-2 focus:ring-cinema focus:border-transparent transition-all outline-none"
          placeholder="Search for a director..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setShowResults(true)}
        />
        {query && (
          <button 
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={clearSearch}
          >
            <X className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute mt-2 w-full bg-card shadow-lg rounded-lg border animate-fade-in z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">
              <Loader2 className="h-5 w-5 mx-auto mb-2 animate-spin" />
              Searching...
            </div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((director) => (
                <li 
                  key={director.id}
                  className="border-b last:border-b-0 p-3 hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => handleDirectorSelect(director.id)}
                >
                  <div className="font-medium">{director.name}</div>
                  <div className="text-sm text-muted-foreground">Director</div>
                </li>
              ))}
            </ul>
          ) : query.trim().length >= 2 ? (
            <div className="p-4 text-center text-muted-foreground">No directors found</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
