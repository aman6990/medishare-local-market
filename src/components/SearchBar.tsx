
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch suggestions if query is at least 2 characters
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, batch_number, category')
        .ilike('name', `%${query}%`)
        .limit(5);
      
      if (error) {
        console.error('Error fetching suggestions:', error);
        return;
      }
      
      setSuggestions(data || []);
    };

    const timer = setTimeout(() => {
      fetchSuggestions();
    }, 300); // Debounce searches

    return () => clearTimeout(timer);
  }, [query]);

  const handleClickOutside = (e: MouseEvent) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (id: string) => {
    navigate(`/product/${id}`);
    setIsFocused(false);
    setQuery('');
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search for medicines" 
          className="w-full p-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-medishare-blue"
        />
        <Search className="absolute top-3 right-4 text-gray-400" size={20} />
      </div>
      
      {isFocused && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 w-full bg-white mt-1 rounded-md shadow-lg border border-gray-200 max-h-72 overflow-y-auto"
        >
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => handleSuggestionClick(suggestion.id)}
            >
              <div className="font-medium">{suggestion.name}</div>
              <div className="text-sm text-gray-600">
                {suggestion.category}{suggestion.batch_number ? ` • Batch: ${suggestion.batch_number}` : ''}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
