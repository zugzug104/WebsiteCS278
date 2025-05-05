import { ChevronRightIcon } from "lucide-react";
import { musicData } from "@/data/musicData";
import { useLocation } from "wouter";

// Define types for future API integration
type Artist = {
  id: number;
  name: string;
  scrobbles: number;
  imageUrl: string;
};

type Props = {
  artists?: Artist[];
};

export default function TopArtists({ artists }: Props) {
  const topArtists = (artists ?? musicData.topArtists)
  .slice()
  .sort((a, b) => b.scrobbles - a.scrobbles);
  const [, navigate] = useLocation();

  return (
    <section className="mb-10">
      <h2 className="text-center text-xl font-semibold text-white mb-2">Top Artists</h2>
      <p className="text-center text-gray-400 text-sm mb-6">
        Your most-played artists—the soundtrack to your life, ranked by total listens. Tap to view leaderboard
      </p>
      
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        {topArtists.map((artist, index) => (
          <div key={artist.id} className={`flex items-center p-4 ${index < topArtists.length - 1 ? 'border-b border-gray-700' : ''}`}>
            <div className="flex items-center w-8">
              <span className="font-bold text-white">{index + 1}</span>
            </div>
            <div className="flex-1 flex items-center">
              <img 
                src={artist.imageUrl}
                alt={artist.name} 
                className="h-10 w-10 rounded-full mr-3 object-cover"
              />
              <div className="flex-1">
                <div className="text-white font-medium">{artist.name}</div>
                <div className="text-gray-400 text-sm">{artist.scrobbles.toLocaleString()} scrobbles</div>
              </div>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => navigate(`/artist/${artist.id}`)}
                aria-label={`View ${artist.name} details`}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
