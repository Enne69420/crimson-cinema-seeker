import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star } from "lucide-react";

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
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-primary">MovieMatch</h1>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl font-bold mb-8 text-foreground leading-tight">
          Find Your Next
          <span className="text-primary block mt-2">Great Watch</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed">
          Discover movies and TV series perfectly tailored to your taste. Simply enter a title you love, 
          and our AI will recommend 10 similar titles with IMDb ratings and detailed descriptions.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-20">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search for a movie or TV series..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-16 text-lg px-8 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl"
              />
              <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="h-16 px-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-lg"
            >
              Get Recommendations
            </Button>
          </div>
        </form>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
              <Search className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">AI-Powered Matching</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Advanced algorithms analyze genres, themes, and viewer preferences to find your perfect match
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
              <span className="text-3xl font-bold text-primary">10</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Curated Recommendations</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Receive exactly 10 handpicked suggestions with IMDb ratings and comprehensive details
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
              <Star className="h-10 w-10 text-primary fill-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">IMDb Integration</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Access official IMDb ratings and detailed plot summaries for informed viewing decisions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;