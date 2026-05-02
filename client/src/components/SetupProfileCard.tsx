import { MoveRight } from "lucide-react";
import React from "react";

function SetupProfileCard({ currentUser }) {
  return (
    <div className={`bg-[#E05151] bg-opacity-90 flex flex-1 items-center justify-between rounded-lg p-5 mt-5 space-x-5`}>
      <div className="flex items-center gap-5">
        <img className="rounded-full h-14" src={currentUser.avatar.url} />

        <div>
          <h4 className="text-md text-gray-200 mb-2">Your profile setup is not completed.</h4>
          <p className="text-xs text-gray-200">Your profile is not complete. Finish it now and get noticed 3x faster.</p>
        </div>
      </div>

      <button className="flex items-center gap-x-2 text-sm text-[#E05151] bg-white px-6 py-2 rounded-md cursor-pointer hover:bg-gray-100">
        Setup Profile <MoveRight color="#E05151" />
      </button>
    </div>
  );
}

export default SetupProfileCard;
