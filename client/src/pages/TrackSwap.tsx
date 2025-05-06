import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function TrackSwap() {
  const [, setLocation] = useLocation();

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

        <h1 className="text-2xl font-bold text-center mb-4">Track Swap</h1>
        <p className="text-center text-gray-400">
          This is a placeholder page for track sharing and music recommendations between friends.
        </p>
      </div>
    </div>
  );
}
