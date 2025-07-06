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
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/30 hover:bg-card/70 transition-all duration-300 group">
      <div className="flex gap-0">
        {/* Movie Poster */}
        <div className="flex-shrink-0">
          <img
            src={poster}
            alt={`${title} poster`}
            className="w-32 h-48 object-cover bg-muted"
          />
        </div>

        {/* Movie Details */}
        <div className="flex-1 p-6 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary/90 transition-colors">
                {title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="font-medium">{year}</span>
                <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                <span>{genre}</span>
              </div>
            </div>
            
            {/* IMDb Rating */}
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg border border-primary/20">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <div className="text-right">
                <div className="text-lg font-bold text-primary">
                  {rating.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground">
                  IMDb
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed line-clamp-3 text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;