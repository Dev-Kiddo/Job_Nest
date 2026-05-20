import { Bookmark, MapPin } from "lucide-react";
import { useSelector } from "react-redux";

function JobShowCard({ bg = "bg-transparent", job, onSelect }) {
  const { currentUser, loading } = useSelector((state) => state.user);
  return (
    <div
      className={`${bg} p-4 rounded-lg border border-gray-300 shadow-sm cursor-pointer`}
      // to={`${currentUser && currentUser.role === "candidate" ? "/job-preview" : "/login"}`}
      onClick={() => onSelect(job._id)}
    >
      <div>
        <h1 className="text-xs font-semibold text-center sm:text-left lg:text-sm">{job?.title}</h1>

        <div className="flex flex-col gap-1 mt-1 sm:flex-row sm:items-center sm:gap-2">
          <span className="py-0.5 px-1 bg-green-200 text-center text-[7px] uppercase font-semibold text-green-800 rounded-sm lg:text-[10px] sm:text-start">{job?.jobType}</span>

          <div className="text-gray-500 text-[10px] text-center sm:text-left lg:text-xs">
            Salary: <span>${job?.salary.min}</span> - <span>${job?.salary.max}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-x-2 mt-3 sm:justify-between lg:gap-x-4">
          <div className="bg-gray-200 p-2 rounded-md">
            <img
              className="w-8 rounded-md"
              src={job?.company?.logo?.url || "https://res.cloudinary.com/dnbswhvko/image/upload/v1779247826/icon-google_bvkudi.svg"}
              alt="company-logo"
            />
          </div>

          <div className="sm:flex-1">
            <h2 className="text-[10px] font-semibold text-gray-700 capitalize sm:xs md:text-sm">{job?.company?.name}</h2>
            <div className="text-[10px] text-gray-500 gap-x-0.5 hidden sm:flex">
              <MapPin className="lucide-xs" color="gray" />
              {job?.location.city}, {job?.location.state}
            </div>
          </div>

          <div className="hidden sm:block">
            <Bookmark />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobShowCard;
