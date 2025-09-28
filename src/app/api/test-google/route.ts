import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
    
    return NextResponse.json({
      hasApiKey: !!apiKey,
      hasSearchEngineId: !!searchEngineId,
      apiKeyPreview: apiKey ? `${apiKey.substring(0, 10)}...` : 'Not found',
      searchEngineIdPreview: searchEngineId ? `${searchEngineId.substring(0, 10)}...` : 'Not found'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Test failed' }, { status: 500 });
  }
}