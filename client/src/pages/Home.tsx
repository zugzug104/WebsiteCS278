import ProfileHeader from "@/components/ProfileHeader";
import TopArtists from "@/components/TopArtists";
import ExplorationZones from "@/components/ExplorationZones";

export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <ProfileHeader />
      <main className="max-w-md mx-auto px-4 pb-16">
        <TopArtists />
        <ExplorationZones />
      </main>
    </div>
  );
}
