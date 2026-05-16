import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import JobShowCard from "../components/JobShowCard";
// import { jobs } from "../data/jobsSampleData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, fetchSingleJob } from "../features/jobSlice";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

function Jobs() {
  const dispatch = useDispatch();
  const { jobs, loading, messageType, selectedJob } = useSelector((state) => state.job);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSelect = async function (id) {
    // console.log("clicked");

    if (currentUser) {
      const result = await dispatch(fetchSingleJob(id));

      if (fetchSingleJob.fulfilled.match(result)) {
        navigate("/job-preview", { replace: true });
      }
    } else {
      navigate("/login", { state: { from: "/jobs" }, replace: true });
    }

    // if (currentUser) {
    //   const result = await dispatch(fetchSingleJob(id));

    // console.log("RESULT", result);
    // console.log("RESULT2", fetchSingleJob.fulfilled.match(result));

    //   if (fetchSingleJob.fulfilled.match(result)) {
    //     navigate("/job-preview", { replace: true });
    //   }
    // }
  };

  // This code might cause bug. once we enter into job preview we wont return back to jobs because the condition tht we have given  is still true

  // useEffect(() => {
  //   if (!loading && messageType === "success" && currentUser && selectedJob) {
  //   }
  // }, [loading, messageType, navigate, selectedJob, currentUser]);

  // useToastMessage("job");

  useEffect(() => {
    dispatch(fetchJobs({ label: "getJobs", data: null }));
  }, [dispatch]);

  return (
    <>
      <div className="border border-gray-300 rounded-lg">
        <form className="rounded-lg shadow p-2 flex gap-4 w-full">
          <div className="flex items-center px-3 py-2 flex-grow border-r-2 border-gray-300">
            <Search className="mr-2" color="#2563eb" />
            <input placeholder="Search by job title..." className="w-full outline-none text-sm bg-transparent placeholder-gray-500" type="text" />
          </div>

          <div className="flex items-center px-3 py-2 flex-grow border-r-2 border-gray-300">
            <MapPin className="mr-2" color="#2563eb" />
            <input placeholder="City, state or zip code" className="w-full outline-none text-sm bg-transparent placeholder-gray-500" type="text" />
          </div>

          <div className="flex gap-x-2">
            <button className="bg-gray-300 text-gray-900 font-semibold py-2.5 px-6 rounded-sm transition text-sm cursor-pointer flex gap-x-2 hover:bg-gray-400" disabled={true}>
              <SlidersHorizontal color="#000" />
              Filters
            </button>

            <button type="submit" className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-sm transition text-sm cursor-pointer flex-none hover:bg-blue-700">
              Find Job
            </button>
          </div>
        </form>
      </div>

      <div className="text-gray-500 text-xs mt-4 flex gap-x-2">
        Popular searches: <p className="text-gray-700 font-medium">Front-end, Back-end, Developer, Designer, Team Lead, Digital Maraketing, Video Editor</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center mt-10 p-4">
          <Loader colour="text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 mt-8">
          {jobs?.map((job) => (
            <JobShowCard job={job} key={job?._id} onSelect={handleSelect} />
          ))}
        </div>
      )}
    </>
  );
}

export default Jobs;
