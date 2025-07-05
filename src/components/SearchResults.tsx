import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieCard from "./MovieCard";
import poster1 from "@/assets/poster-1.jpg";
import poster2 from "@/assets/poster-2.jpg";
import poster3 from "@/assets/poster-3.jpg";
import poster4 from "@/assets/poster-4.jpg";

// Mock data for recommendations
const generateMockRecommendations = (query: string) => [
  {
    id: 1,
    title: "The Dark Knight",
    rating: 9.0,
    year: 2008,
    genre: "Action, Crime, Drama",
    description: "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    poster: poster2
  },
  {
    id: 2,
    title: "Inception",
    rating: 8.8,
    year: 2010,
    genre: "Action, Sci-Fi, Thriller",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: poster1
  },
  {
    id: 3,
    title: "Interstellar",
    rating: 8.6,
    year: 2014,
    genre: "Adventure, Drama, Sci-Fi",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: poster1
  },
  {
    id: 4,
    title: "The Matrix",
    rating: 8.7,
    year: 1999,
    genre: "Action, Sci-Fi",
    description: "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
    poster: poster1
  },
  {
    id: 5,
    title: "Pulp Fiction",
    rating: 8.9,
    year: 1994,
    genre: "Crime, Drama",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    poster: poster2
  },
  {
    id: 6,
    title: "Fight Club",
    rating: 8.8,
    year: 1999,
    genre: "Drama",
    description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into an anarchist organization.",
    poster: poster3
  },
  {
    id: 7,
    title: "The Shawshank Redemption",
    rating: 9.3,
    year: 1994,
    genre: "Drama",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: poster4
  },
  {
    id: 8,
    title: "Goodfellas",
    rating: 8.7,
    year: 1990,
    genre: "Crime, Drama",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
    poster: poster2
  },
  {
    id: 9,
    title: "The Godfather",
    rating: 9.2,
    year: 1972,
    genre: "Crime, Drama",
    description: "An aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster: poster4
  },
  {
    id: 10,
    title: "Seven",
    rating: 8.6,
    year: 1995,
    genre: "Crime, Drama, Mystery",
    description: "Two detectives hunt a serial killer who uses the seven deadly sins as his motives.",
    poster: poster3
  }
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const recommendations = generateMockRecommendations(query);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            MovieMatch
          </Link>
          <Link to="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </Link>
        </div>
      </nav>

      {/* Results Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Recommendations for "{query}"
          </h1>
          <p className="text-muted-foreground">
            Here are 10 movies and TV series similar to your search
          </p>
        </div>

        {/* Results Grid */}
        <div className="space-y-6">
          {recommendations.map((movie, index) => (
            <div key={movie.id} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">{index + 1}</span>
              </div>
              <div className="flex-1">
                <MovieCard
                  title={movie.title}
                  rating={movie.rating}
                  description={movie.description}
                  poster={movie.poster}
                  year={movie.year}
                  genre={movie.genre}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;