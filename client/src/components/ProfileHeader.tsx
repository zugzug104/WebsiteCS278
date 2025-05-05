import { LightningBoltIcon } from "@/lib/icons";

export default function ProfileHeader() {
  return (
    <header className="flex flex-col items-center pt-10 pb-4">
      <div className="w-28 h-28 rounded-full bg-gray-800 overflow-hidden mb-3 border-2 border-[#7C3AED]">
        <img 
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=200&h=200" 
          alt="User profile" 
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-xl font-bold text-white">@daniel123</h1>
      
      <div className="flex items-center mt-3 px-4 py-2 bg-[#7C3AED] rounded-full">
        <LightningBoltIcon className="h-5 w-5 mr-1 text-yellow-300" />
        <span className="text-white font-medium">240 Swag</span>
      </div>
    </header>
  );
}
