import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import MovieCard from "./MovieCard";
import poster1 from "@/assets/poster-1.jpg";
import poster2 from "@/assets/poster-2.jpg";
import poster3 from "@/assets/poster-3.jpg";
import poster4 from "@/assets/poster-4.jpg";

// Placeholder posters for variety
const placeholderPosters = [poster1, poster2, poster3, poster4];

interface Recommendation {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  description: string;
  poster: string;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!query.trim()) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error: supabaseError } = await supabase.functions.invoke('get-movie-recommendations', {
          body: { movieTitle: query }
        });

        if (supabaseError) {
          throw supabaseError;
        }

        if (data?.recommendations) {
          // Add placeholder posters to recommendations
          const recommendationsWithPosters = data.recommendations.map((rec: any, index: number) => ({
            ...rec,
            poster: placeholderPosters[index % placeholderPosters.length]
          }));
          setRecommendations(recommendationsWithPosters);
        } else {
          throw new Error('No recommendations received');
        }

      } catch (err: any) {
        console.error('Error fetching recommendations:', err);
        setError(err.message || 'Failed to fetch recommendations');
        toast({
          title: "Error",
          description: "Failed to generate recommendations. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [query, toast]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-3xl font-bold text-primary">
            MovieMatch
          </Link>
          <Link to="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-card/50 rounded-xl px-6 py-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </Link>
        </div>
      </nav>

      {/* Results Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Recommendations for <span className="text-primary">"{query}"</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Here are 10 movies and TV series with similar themes and styles, rated by IMDb
          </p>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                Generating personalized recommendations...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-destructive text-lg mb-4">
              Failed to generate recommendations
            </p>
            <p className="text-muted-foreground mb-8">
              {error}
            </p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              className="text-primary border-primary hover:bg-primary/10"
            >
              Try Again
            </Button>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg">
              No recommendations found. Try searching for a different movie or TV series.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                rating={movie.rating}
                description={movie.description}
                poster={movie.poster}
                year={movie.year}
                genre={movie.genre}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;