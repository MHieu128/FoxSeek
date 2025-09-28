"use client";

import { useState } from "react";
import { Search, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchResult {
  url: string;
  name: string;
  snippet: string;
  host_name: string;
  rank: number;
  date: string;
  favicon: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sample search suggestions
  const searchSuggestions = [
    "cyberpunk technology",
    "neon city nightlife",
    "artificial intelligence",
    "virtual reality gaming",
    "future tech trends",
    "digital art",
    "cybersecurity",
    "quantum computing"
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError("");
    setResults([]);
    setShowSuggestions(false);

    try {
      // Try ZAI search first if available, fallback to Google search
      let response;
      try {
        response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('ZAI search failed');
        }
      } catch (zaiError) {
        // Fallback to Google Custom Search API
        console.log('ZAI search failed, using Google Custom Search');
        response = await fetch(`/api/search/alternatives?q=${encodeURIComponent(query)}&method=google`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed");
      }

      setResults(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 p-4">
        {/* Logo and title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Search className="w-12 h-12 text-cyan-400 animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 bg-cyan-400 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              FOXSEEK
            </h1>
            <div className="relative">
              <Zap className="w-12 h-12 text-pink-400 animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 bg-pink-400 rounded-full blur-lg opacity-50"></div>
            </div>
          </div>
          <p className="text-lg md:text-xl text-gray-300 font-light tracking-wider">
            CYBERPUNK SEARCH ENGINE
          </p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <div className="relative group">
            {/* Outer glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-300"></div>
            
            {/* Main search container */}
            <div className="relative flex items-center bg-gray-900/90 backdrop-blur-md border-2 border-gray-700 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-2xl group-hover:shadow-cyan-400/20 focus-within:border-cyan-400/50 focus-within:shadow-2xl focus-within:shadow-cyan-400/20">
              
              {/* Left icon with animated border */}
              <div className="flex items-center justify-center pl-6 pr-4 py-4 border-r border-gray-600">
                <div className="relative">
                  <Search className="w-6 h-6 text-cyan-400" />
                  <div className="absolute inset-0 w-6 h-6 bg-cyan-400 rounded-full blur-sm opacity-50 animate-pulse"></div>
                </div>
              </div>
              
              {/* Search input */}
              <div className="relative flex-1">
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Enter the digital void..."
                  className="w-full px-4 py-4 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-lg font-light tracking-wide"
                  disabled={isLoading}
                />
                
                {/* Search suggestions dropdown */}
                {showSuggestions && query.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden suggestions-dropdown">
                    <div className="p-3 border-b border-gray-700">
                      <p className="text-xs text-cyan-400 font-mono uppercase tracking-wider">Trending Searches</p>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-800/50 transition-colors duration-200 border-b border-gray-800 last:border-b-0 group"
                        >
                          <div className="flex items-center gap-3">
                            <Zap className="w-4 h-4 text-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                            <span className="text-gray-300 group-hover:text-cyan-400 transition-colors">
                              {suggestion}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Search button */}
              <Button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="relative mx-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-cyan-400/25"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">SCANNING...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    <span className="text-sm">SEARCH</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
          
          {/* Search hint text */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400 font-mono opacity-70">
              Press ENTER to search the digital realm
            </p>
          </div>
        </form>

        {/* Error message */}
        {error && (
          <div className="w-full max-w-2xl p-4 bg-red-900/50 border border-red-500 rounded-lg backdrop-blur-sm">
            <p className="text-red-300 text-center">⚠️ {error}</p>
          </div>
        )}

        {/* Search results */}
        {results.length > 0 && (
          <div className="w-full max-w-4xl mt-8 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <p className="text-gray-300">
                Found {results.length} results in the digital realm
              </p>
            </div>
            {results.map((result, index) => (
              <div
                key={index}
                className="p-6 bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-cyan-400">
                      {result.rank}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <h3 className="text-lg font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200 truncate">
                        {result.name}
                      </h3>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200 truncate">
                        {result.url}
                      </p>
                    </a>
                    <p className="mt-2 text-gray-300 leading-relaxed">
                      {result.snippet}
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        {result.host_name}
                      </span>
                      <span>{result.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <p className="text-xs text-gray-500 font-mono">
            © 2024 FOXSEEK SEARCH • ENTERING THE DIGITAL FRONTIER
          </p>
        </div>
      </div>
    </div>
  );
}