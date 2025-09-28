import { NextRequest, NextResponse } from 'next/server';

interface SearchResult {
  url: string;
  name: string;
  snippet: string;
  host_name: string;
  rank: number;
  date: string;
  favicon: string;
}

// Mock search results for demo purposes
const mockSearchResults: SearchResult[] = [
  {
    url: "https://example.com/cyberpunk-tech",
    name: "Cyberpunk Technology Trends 2024",
    snippet: "Explore the latest cyberpunk technology trends including neural interfaces, holographic displays, and AI-powered cybernetics.",
    host_name: "example.com",
    rank: 1,
    date: "2024-01-15",
    favicon: ""
  },
  {
    url: "https://technews.com/neon-cities",
    name: "Neon Cities: The Future of Urban Lighting",
    snippet: "Discover how neon lighting is transforming modern cities into cyberpunk metropolises with smart lighting systems.",
    host_name: "technews.com",
    rank: 2,
    date: "2024-01-12",
    favicon: ""
  },
  {
    url: "https://airesearch.com/ai-cyberpunk",
    name: "AI and Cyberpunk: From Fiction to Reality",
    snippet: "How artificial intelligence is bringing cyberpunk concepts to life in the real world.",
    host_name: "airesearch.com",
    rank: 3,
    date: "2024-01-10",
    favicon: ""
  },
  {
    url: "https://futuretech.com/vr-gaming",
    name: "Virtual Reality Gaming: The Next Frontier",
    snippet: "Dive into the world of VR gaming and explore how it's shaping the future of entertainment.",
    host_name: "futuretech.com",
    rank: 4,
    date: "2024-01-08",
    favicon: ""
  },
  {
    url: "https://digitalart.com/cyberpunk-art",
    name: "Digital Art in the Cyberpunk Era",
    snippet: "Explore the evolution of digital art and its influence on cyberpunk aesthetics and culture.",
    host_name: "digitalart.com",
    rank: 5,
    date: "2024-01-05",
    favicon: ""
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const method = searchParams.get('method') || 'mock';

    if (!query || query.trim() === '') {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    let results: SearchResult[] = [];

    switch (method) {
      case 'mock':
        // Return mock results for demo
        results = mockSearchResults.map((result, index) => ({
          ...result,
          rank: index + 1,
          snippet: result.snippet.replace(/cyberpunk|technology|ai/gi, (match) => {
            const keywords = query.toLowerCase().split(' ');
            return keywords.includes(match.toLowerCase()) ? `<strong>${match}</strong>` : match;
          })
        }));
        break;

      case 'google':
        // Google Custom Search API (would need API key)
        results = await googleSearch(query);
        break;

      case 'duckduckgo':
        // DuckDuckGo API
        results = await duckDuckGoSearch(query);
        break;

      default:
        results = mockSearchResults;
    }

    return NextResponse.json({
      results,
      query: query.trim(),
      method,
      totalResults: results.length
    });

  } catch (error) {
    console.error('Search API Error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to perform search',
        results: []
      },
      { status: 500 }
    );
  }
}

// Google Custom Search API implementation
async function googleSearch(query: string): Promise<SearchResult[]> {
  try {
    const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
    
    if (!apiKey || !searchEngineId) {
      console.log('Google API credentials not found, using mock data');
      return mockSearchResults.map((result, index) => ({
        ...result,
        rank: index + 1,
        name: `${result.name} (Mock - No Google API)`,
        snippet: `Mock result for: ${query}. ${result.snippet}`
      }));
    }

    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&num=10`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.items) {
      return data.items.map((item: any, index: number) => ({
        url: item.link || '',
        name: item.title || 'Untitled',
        snippet: item.snippet || 'No description available',
        host_name: item.displayLink || new URL(item.link || 'https://example.com').hostname,
        rank: index + 1,
        date: new Date().toISOString().split('T')[0],
        favicon: `https://www.google.com/s2/favicons?domain=${item.displayLink || ''}`
      }));
    }
  } catch (error) {
    console.error('Google search error:', error);
  }
  
  // Fallback to mock results if Google search fails
  return mockSearchResults.map((result, index) => ({
    ...result,
    rank: index + 1,
    name: `${result.name} (Google Fallback)`,
    snippet: `Fallback result for: ${query}. ${result.snippet}`
  }));
}

// DuckDuckGo API implementation
async function duckDuckGoSearch(query: string): Promise<SearchResult[]> {
  // DuckDuckGo doesn't require API key for basic usage
  try {
    const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&pretty=1`);
    const data = await response.json();
    
    if (data.RelatedTopics) {
      return data.RelatedTopics.slice(0, 10).map((topic: any, index: number) => ({
        url: topic.FirstURL || '',
        name: topic.Text || 'Untitled',
        snippet: topic.Text || 'No description available',
        host_name: topic.FirstURL ? new URL(topic.FirstURL).hostname : 'Unknown',
        rank: index + 1,
        date: new Date().toISOString().split('T')[0],
        favicon: ""
      }));
    }
  } catch (error) {
    console.error('DuckDuckGo search error:', error);
  }
  
  // Fallback to mock results
  return mockSearchResults.map((result, index) => ({
    ...result,
    rank: index + 1,
    name: `${result.name} (DuckDuckGo)`,
    snippet: `DuckDuckGo search result for: ${query}. ${result.snippet}`
  }));
}