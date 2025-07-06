import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { movieTitle } = await req.json();

    if (!movieTitle) {
      throw new Error('Movie title is required');
    }

    const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    if (!deepseekApiKey) {
      throw new Error('DeepSeek API key not configured');
    }

    console.log(`Generating recommendations for: ${movieTitle}`);

    const prompt = `You are a movie recommendation expert. Based on the movie/TV series "${movieTitle}", recommend exactly 10 similar movies or TV series that the user would enjoy.

For each recommendation, provide the following information in JSON format:
- title: The exact title of the movie/TV series
- year: Release year (number)
- rating: IMDb rating (number between 1-10, realistic ratings)
- genre: Genre(s) as a string (e.g., "Action, Thriller")
- description: A brief, engaging description (2-3 sentences) that explains why someone who liked "${movieTitle}" would enjoy this, without major spoilers

Return ONLY a valid JSON array with exactly 10 recommendations. No additional text or formatting.

Example format:
[
  {
    "title": "Movie Title",
    "year": 2020,
    "rating": 8.2,
    "genre": "Action, Thriller",
    "description": "A gripping thriller that combines intense action with psychological depth, similar to ${movieTitle} in its complex character development and suspenseful plot."
  }
]`;

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error:', errorText);
      throw new Error(`DeepSeek API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const recommendationsText = data.choices[0].message.content;

    console.log('Raw DeepSeek response:', recommendationsText);

    // Parse the JSON response
    let recommendations;
    try {
      // Clean the response in case there's extra formatting
      const cleanedText = recommendationsText.replace(/```json\n?|\n?```/g, '').trim();
      recommendations = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw text:', recommendationsText);
      throw new Error('Failed to parse recommendations from DeepSeek response');
    }

    // Validate the response structure
    if (!Array.isArray(recommendations) || recommendations.length !== 10) {
      throw new Error('Invalid recommendations format or count');
    }

    // Add IDs and validate each recommendation
    const processedRecommendations = recommendations.map((rec, index) => {
      if (!rec.title || !rec.year || !rec.rating || !rec.genre || !rec.description) {
        throw new Error(`Invalid recommendation structure at index ${index}`);
      }
      
      return {
        id: index + 1,
        title: rec.title,
        year: parseInt(rec.year),
        rating: parseFloat(rec.rating),
        genre: rec.genre,
        description: rec.description,
        poster: null // We'll use placeholder for now
      };
    });

    console.log(`Successfully generated ${processedRecommendations.length} recommendations`);

    return new Response(
      JSON.stringify({ recommendations: processedRecommendations }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in get-movie-recommendations function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate recommendations', 
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});