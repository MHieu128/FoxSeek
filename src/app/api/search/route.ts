import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

interface SearchFunctionResultItem {
  url: string;
  name: string;
  snippet: string;
  host_name: string;
  rank: number;
  date: string;
  favicon: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim() === '') {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Initialize ZAI SDK
    const zai = await ZAI.create();

    // Perform web search
    const searchResult = await zai.functions.invoke("web_search", {
      query: query.trim(),
      num: 10 // Limit to 10 results
    });

    // Type guard to ensure searchResult is an array
    if (!Array.isArray(searchResult)) {
      throw new Error('Invalid search response format');
    }

    // Transform results to match expected format
    const results: SearchFunctionResultItem[] = searchResult.map((item: any, index: number) => ({
      url: item.url || '',
      name: item.name || 'Untitled',
      snippet: item.snippet || 'No description available',
      host_name: item.host_name || 'Unknown',
      rank: item.rank || index + 1,
      date: item.date || new Date().toISOString().split('T')[0],
      favicon: item.favicon || ''
    }));

    return NextResponse.json({
      results,
      query: query.trim(),
      totalResults: results.length
    });

  } catch (error) {
    console.error('Search API Error:', error);
    
    // If ZAI fails, suggest using fallback
    console.log('ZAI search failed. Client should fallback to Google Custom Search.');
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to perform search',
        results: [],
        suggestion: 'Try fallback search method'
      },
      { status: 500 }
    );
  }
}