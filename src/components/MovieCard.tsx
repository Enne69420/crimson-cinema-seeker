import { Star } from "lucide-react";

interface MovieCardProps {
  title: string;
  rating: number;
  description: string;
  poster: string;
  year: number;
  genre: string;
}

const MovieCard = ({ title, rating, description, poster, year, genre }: MovieCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors duration-200">
      <div className="flex gap-6">
        {/* Movie Poster */}
        <div className="flex-shrink-0">
          <img
            src={poster}
            alt={`${title} poster`}
            className="w-24 h-36 object-cover rounded-md bg-muted"
          />
        </div>

        {/* Movie Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-1 line-clamp-2">
                {title}
              </h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{year}</span>
                <span>•</span>
                <span>{genre}</span>
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-primary">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;