import { Bookmark, MapPin } from "lucide-react";
import { useSelector } from "react-redux";

function JobShowCard({ bg = "bg-transparent", job, onSelect }) {
  const { currentUser, loading } = useSelector((state) => state.user);
  return (
    <div
      className={`${bg} p-4 rounded-lg border-2 border-gray-300 shadow-sm cursor-pointer`}
      // to={`${currentUser && currentUser.role === "candidate" ? "/job-preview" : "/login"}`}
      onClick={() => onSelect(job._id)}
    >
      <div>
        <h1 className="text-sm font-semibold">{job?.title}</h1>

        <div className="flex gap-x-2 items-center mt-1">
          <span className="py-0.5 px-1 bg-green-200 text-[10px] uppercase font-semibold text-green-800 rounded-sm">{job?.jobType}</span>

          <div className="text-gray-500 text-xs">
            Salary: <span>${job?.salary.min}</span> - <span>${job?.salary.max}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-x-4 mt-3">
          <div className="bg-gray-200 p-2 rounded-md">
            <img className="w-6" src="/src/assets/img/icon-google.svg" alt="company-logo" />
          </div>

          <div className="flex-1">
            <h2 className="text-sm font-semibold text-gray-700">{job?.company.name}</h2>
            <div className="flex text-[11px] text-gray-500 gap-x-0.5">
              <MapPin className="lucide-xs" color="gray" />
              {job?.location.city}, {job?.location.state}
            </div>
          </div>

          <div>
            <Bookmark />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobShowCard;
