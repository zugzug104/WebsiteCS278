import { musicData } from "@/data/musicData";

export default function ExplorationZones() {
  const zones = [
    { name: "Beach Zone", color: "from-[#F8E9CB] to-[#FFB740]", textColor: "text-gray-800" },
    { name: "Sunlight Zone", color: "from-[#FFB740] to-[#9370DB]", textColor: "text-gray-800" },
    { name: "Twilight Zone", color: "from-[#9370DB] to-[#1E3A8A]", textColor: "text-white" },
    { name: "Midnight Zone", color: "from-[#1E3A8A] to-[#0F172A]", textColor: "text-white" },
    { name: "Abyss", color: "bg-[#0F172A]", textColor: "text-white" },
  ];

  // Placing artists in zones (reversed for the visual)
  const zoneArtists = [
    [], // Beach Zone - empty
    [musicData.topArtists[4]], // Sunlight Zone - Mitski
    [musicData.topArtists[3]], // Twilight Zone - JORDY
    [musicData.topArtists[2], musicData.topArtists[1]], // Midnight Zone - Fred Again, Laufey
    [musicData.topArtists[0]], // Abyss - Beyonce
  ];

  return (
    <section>
      <h2 className="text-center text-xl font-semibold text-white mb-2">Top Exploration Zones</h2>
      <p className="text-center text-gray-400 text-sm mb-6">
        Showcasing the five artists you've explored most deeply—highlighting your journey beyond the hits into their full discographies. Tap to view leaderboard.
      </p>
      
      <div className="relative overflow-hidden rounded-xl" style={{ height: "450px" }}>
        {zones.map((zone, index) => (
          <div 
            key={zone.name}
            className={`absolute left-0 right-0 h-1/5 flex items-center justify-center bg-gradient-to-b ${zone.color} ${zone.textColor}`}
            style={{ top: `${index * 20}%` }}
          >
            <span className="font-semibold">{zone.name}</span>
            
            {zoneArtists[index].map((artist, artistIndex) => {
              // Dynamic positioning based on index
              const positionStyle = artistIndex % 2 === 0 
                ? { right: `${8 + artistIndex * 4}%` } 
                : { left: `${8 + (artistIndex-1) * 4}%` };
              
              // Size increases for deeper zones
              const size = index >= 4 ? "h-14 w-14" : "h-12 w-12";
              
              // Animation for the deepest artist
              const animation = index === 4 ? "animate-pulse" : "";
              
              return (
                <img 
                  key={artist.id}
                  src={artist.imageUrl}
                  alt={artist.name}
                  className={`absolute ${size} rounded-full top-1/2 transform -translate-y-1/2 border-2 border-white shadow-lg ${animation}`}
                  style={positionStyle}
                />
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
