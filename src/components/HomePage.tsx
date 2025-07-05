import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-primary">MovieMatch</h1>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6 text-foreground">
          Discover Your Next
          <span className="text-primary block">Favorite Movie</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Enter any movie or TV series you love, and we'll recommend 10 similar titles 
          that match your taste. From hidden gems to popular blockbusters, find your next binge-worthy experience.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Enter a movie or TV series name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 text-lg px-6 bg-card border-border focus:border-primary focus:ring-primary"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Get Recommendations
            </Button>
          </div>
        </form>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Smart Matching</h3>
            <p className="text-muted-foreground">
              Our algorithm analyzes genres, themes, and styles to find perfect matches
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">10</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Curated Lists</h3>
            <p className="text-muted-foreground">
              Get exactly 10 handpicked recommendations with ratings and descriptions
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-primary">★</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Quality Ratings</h3>
            <p className="text-muted-foreground">
              See ratings, descriptions, and key details for informed viewing choices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;