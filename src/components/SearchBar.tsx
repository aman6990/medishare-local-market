
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="px-4 py-2">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search for medicines" 
          className="w-full p-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-medishare-blue"
        />
        <Search className="absolute top-3 right-4 text-gray-400" size={20} />
      </div>
    </div>
  );
};

export default SearchBar;
