import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  category: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const delayedSearch = window.setTimeout(() => {
      if (query.length > 2) {
        performSearch();
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => window.clearTimeout(delayedSearch);
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`);
      const data = await response.json();
      
      if (data.success) {
        setResults(data.data);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (postId: string) => {
    setShowResults(false);
    setQuery('');
    router.push(`/blog/${postId}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowResults(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <i className="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        {loading && (
          <i className="bi bi-hourglass-split absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin"></i>
        )}
      </form>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result.id)}
              className="w-full text-left p-4 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-primary-500 mb-1 line-clamp-1">
                    {result.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {result.excerpt}
                  </p>
                  <span className="inline-block bg-accent-100 text-accent-600 px-2 py-1 rounded-full text-xs">
                    {result.category}
                  </span>
                </div>
                <i className="bi bi-arrow-right text-gray-400 ml-3 mt-1"></i>
              </div>
            </button>
          ))}
          
          {query && (
            <button
              onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
              className="w-full text-left p-4 bg-primary-50 hover:bg-primary-100 transition-colors duration-200 text-primary-600 font-medium"
            >
              <i className="bi bi-search mr-2"></i>
              View all results for "{query}"
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
