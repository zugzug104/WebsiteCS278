import { useRoute, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { musicData } from "@/data/musicData";

// Sample data for top listeners (would come from API in real implementation)
const topListeners = [
  { id: 1, username: "@musiclover42", scrobbles: 2105 },
  { id: 2, username: "@beatmaster", scrobbles: 1876 },
  { id: 3, username: "@rhythmguru", scrobbles: 1654 },
  { id: 4, username: "@melodyqueen", scrobbles: 1432 },
  { id: 5, username: "@basshead", scrobbles: 1289 },
];

export default function ArtistDetail() {
  // Get the artist ID from the route
  const [, params] = useRoute<{ id: string }>("/artist/:id");
  const artistId = params?.id ? parseInt(params.id) : null;
  
  // Find the artist in our data
  const artist = artistId ? 
    musicData.topArtists.find(a => a.id === artistId) : null;
  
  if (!artist) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl">Artist not found</p>
        <Link href="/">
          <a className="mt-4 flex items-center text-purple-400 hover:text-purple-300">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </a>
        </Link>
      </div>
    );
  }
  
  // Generate random percentile between 80 and 99
  const percentile = Math.floor(Math.random() * 20) + 80;
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/">
          <a className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </a>
        </Link>
        
        <h1 className="text-2xl font-bold text-center mb-2">Top Listens Leaderboard</h1>
        <h2 className="text-xl text-center mb-8 text-purple-400">{artist.name}</h2>
        
        <div className="grid grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center">
            <p className="text-gray-400 mb-2">Your number of scrobbles</p>
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              {artist.scrobbles.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center">
            <p className="text-gray-400 mb-2">Percentile</p>
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              {percentile}%
            </p>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-medium">Top Listeners</h3>
          </div>
          
          {topListeners.map((listener, index) => (
            <div 
              key={listener.id} 
              className={`flex items-center p-4 ${index < topListeners.length - 1 ? 'border-b border-gray-700' : ''}`}
            >
              <div className="flex items-center w-8">
                <span className="font-bold text-white">{index + 1}</span>
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">{listener.username}</div>
                <div className="text-gray-400 text-sm">{listener.scrobbles.toLocaleString()} scrobbles</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}