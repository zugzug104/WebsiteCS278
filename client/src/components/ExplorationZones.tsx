import { musicData } from "@/data/musicData";
import { useLocation } from "wouter";

// Define types for future API integration
type Artist = {
  id: number;
  name: string;
  scrobbles: number;
  imageUrl: string;
};

type ExplorationZone = {
  name: string;
  color: string;
  textColor: string;
  artists: Artist[];
};

export default function ExplorationZones() {
  const [, setLocation] = useLocation();
  
  const zones = [
    { name: "Beach Zone", color: "from-[#F8E9CB] to-[#FFB740]", textColor: "text-gray-800" },
    { name: "Sunlight Zone", color: "from-[#FFB740] to-[#9370DB]", textColor: "text-gray-800" },
    { name: "Twilight Zone", color: "from-[#9370DB] to-[#1E3A8A]", textColor: "text-white" },
    { name: "Midnight Zone", color: "from-[#1E3A8A] to-[#0F172A]", textColor: "text-white" },
    { name: "Abyss", color: "bg-[#0F172A]", textColor: "text-white" },
  ];

  // Hardcoded for now, but structure is ready for API data
  const zoneArtists = [
    [], // Beach Zone - empty
    [musicData.topArtists[4]], // Sunlight Zone - Mitski
    [musicData.topArtists[3]], // Twilight Zone - JORDY
    [musicData.topArtists[2], musicData.topArtists[1]], // Midnight Zone - Fred Again, Laufey
    [musicData.topArtists[0]], // Abyss - Beyonce
  ];

  return (
    <section className="mb-12">
      <h2 className="text-center text-xl font-semibold text-white mb-2">Top Exploration Zones</h2>
      <p className="text-center text-gray-400 text-sm mb-6">
        Showcasing the five artists you've explored most deeply—highlighting your journey beyond the hits into their full discographies. Tap to view leaderboard.
      </p>
      
      <div className="relative overflow-hidden rounded-xl" style={{ height: "600px" }}>
        {zones.map((zone, index) => (
          <div 
            key={zone.name}
            className={`absolute left-0 right-0 h-1/5 flex items-center justify-center bg-gradient-to-b ${zone.color} ${zone.textColor}`}
            style={{ top: `${index * 20}%` }}
          >
            <span className="font-semibold text-lg">{zone.name}</span>
            
            {(zoneArtists[index] || []).map((artist, artistIndex) => {
              if (!artist) return null;
              
              // Position artists to the sides and bottom of each zone
              // This ensures they don't overlap with zone titles in the center
              const positions = [
                { right: '15%', top: '65%' },
                { left: '15%', top: '65%' },
                { right: '30%', top: '65%' },
                { left: '30%', top: '65%' }
              ];
              
              // Use one of the predefined positions 
              const positionStyle = positions[artistIndex % positions.length];
              
              // Size increases for deeper zones
              const size = index >= 4 ? "h-16 w-16" : "h-14 w-14";
              
              // Animation for the deepest artist
              const animation = index === 4 ? "animate-pulse" : "";
              
              return (
                <img 
                  key={artist.id}
                  src={artist.imageUrl}
                  alt={artist.name}
                  className={`absolute ${size} rounded-full border-2 border-white shadow-lg ${animation} cursor-pointer`}
                  style={positionStyle}
                  title={artist.name}
                  onClick={() => setLocation(`/exploration/${artist.id}`)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
