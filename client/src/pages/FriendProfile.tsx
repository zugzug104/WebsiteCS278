import { useRoute, useLocation } from "wouter";
import { musicData } from "@/data/musicData";
import ProfileHeader from "@/components/ProfileHeader";
import TopArtists from "@/components/TopArtists";
import ExplorationZones from "@/components/ExplorationZones"; // optional
import DropDownMenu from "@/components/DropDownMenu";


export default function FriendProfile() {
  const [, params] = useRoute<{ id: string }>("/profile/:id");
  const [, setLocation] = useLocation();
  const friendId = params?.id ? parseInt(params.id) : null;

  const friend = musicData.friends.find(f => f.id === friendId);
  console.log("friend.topArtists", friend?.topArtists);
  console.log("Friend ID from URL:", friendId);

  if (!friend) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Friend not found.</p>
        <div
          className="mt-4 flex items-center text-purple-400 hover:text-purple-300 cursor-pointer"
          onClick={() => setLocation("/friends")}
        >
          ← Back to Friends
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
    <DropDownMenu />
      <ProfileHeader
        username={friend.username}
        profileImage={friend.profileImage}
        swag={friend.swag}
        showActions={true} // adds Message + Spotify Profile buttons
      />
      <main className="max-w-md mx-auto px-4 pb-16">
        <TopArtists artists={friend.topArtists} />
        <ExplorationZones artists={friend.topArtists} />
      </main>
    </div>
  );
}
