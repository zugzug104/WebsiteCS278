import { useRoute, useLocation } from "wouter";
import { ArrowLeft, ChevronRightIcon } from "lucide-react";
import { musicData } from "@/data/musicData";
import { getArtistById } from "@/data/musicData";

const currentUser = musicData.user;
const sortedListeners = [...musicData.topListeners].sort((a, b) => b.scrobbles - a.scrobbles);

// Check if user is in the sorted list (could be via username or id depending on your structure)
const userIndex = sortedListeners.findIndex(l => l.username === currentUser.username);

let listenersToShow;

if (userIndex >= 0 && userIndex < 5) {
  // User is in top 5, show top 5 only
  listenersToShow = sortedListeners.slice(0, 5);
} else {
  // User is not in top 5
  const top5 = sortedListeners.slice(0, 5);
  const userData = sortedListeners[userIndex];
  listenersToShow = [...top5, { id: -1, username: "...", scrobbles: 0, profileImage: "" }, userData];
}

export default function ArtistDetail() {
  // Get the artist ID from the route
  const [, params] = useRoute<{ id: string }>("/artist/:id");
  const [, setLocation] = useLocation();
  const artistId = params?.id ? parseInt(params.id) : null;
  
  
  // Find the artist in our data
  const artist = artistId ? getArtistById(artistId) : null;
  const userArtist = musicData.topArtists.find(a => a.id === artist?.id);
  const userScrobbles = userArtist?.scrobbles ?? 0;
  
  if (!artist) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl">Artist not found</p>
        <div 
          className="mt-4 flex items-center text-purple-400 hover:text-purple-300 cursor-pointer"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </div>
      </div>
    );
  }
  
  // Generate random percentile between 80 and 99
  const percentile = Math.floor(Math.random() * 20) + 80;
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div 
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6 cursor-pointer"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">Top Listens Leaderboard</h1>
        <h2 className="text-xl text-center mb-8 text-purple-400">{artist.name}</h2>
        
        <div className="grid grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center">
            <p className="text-gray-400 mb-2">Your number of scrobbles</p>
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
  {userScrobbles.toLocaleString()}
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
            <h3 className="text-lg font-medium">Top Listeners for Stanford</h3>
          </div>
          
		  {listenersToShow.map((listener, index) => {
			if (listener.username === "...") {
				return (
				<div key="ellipsis" className="flex-1 flex items-center justify-center">
					<div className="text-white text-4xl font-bold">...</div>
				</div>
				);
			}

			return (
			<div 
			key={listener.id} 
			className={`flex items-center p-4 ${
				index < listenersToShow.length - 1 ? 'border-b border-gray-700' : ''
			} ${
				listener.username === currentUser.username ? 'bg-sky-700/50' : ''
			}`}
			>
				<div className="flex items-center w-8">
					<span className="font-bold text-white">{index + 1}</span>
				</div>
				<div className="flex-1 flex items-center">
					<img 
					src={listener.profileImage}
					alt={listener.username} 
					className="h-10 w-10 rounded-full mr-3 object-cover"
					/>
					<div className="flex-1">
					<div className="text-white font-medium">{listener.username}</div>
					<div className="text-gray-400 text-sm">{listener.scrobbles.toLocaleString()} scrobbles</div>
					</div>
				<button
                    className="text-gray-400 hover:text-white"
                    onClick={() => setLocation(`/profile/${listener.id}`)}
                    aria-label={`View ${listener.username} profile`}
                >
                <ChevronRightIcon className="h-5 w-5" />
                </button>
				</div>
				</div>
			);
			})}
		
        </div>
      </div>
    </div>
  );
}