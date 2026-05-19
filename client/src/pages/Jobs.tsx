import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import JobShowCard from "../components/JobShowCard";
// import { jobs } from "../data/jobsSampleData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, fetchSingleJob } from "../features/jobSlice";
import Loader from "../components/Loader";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import EmptyState from "../components/EmptyState";

function Jobs() {
  const dispatch = useDispatch();
  const { jobs, loading, messageType, selectedJob } = useSelector((state) => state.job);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchPayload, setSearchPayload] = useState({
    search: "",
    location: "",
  });

  // console.log(searchParams.size);

  const searchTitle = searchParams.get("search");
  const searchLocation = searchParams.get("location");

  const handleFindJob = function (e) {
    e.preventDefault();

    dispatch(fetchJobs({ label: "search", data: { title: searchPayload.search, location: searchPayload.location } }));
  };

  const onChangeHandler = function (e) {
    const { id, value } = e.target;

    setSearchPayload((payload) => ({ ...payload, [id]: value }));
  };

  const handleSelect = async function (id) {
    // console.log("clicked");

    if (Object.keys(currentUser).length > 0) {
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
    if (searchParams.size !== 0) {
      dispatch(fetchJobs({ label: "search", data: { title: searchTitle, location: searchLocation } }));
      return;
    }
    dispatch(fetchJobs({ label: "getJobs", data: null }));
  }, [dispatch, searchParams.size]);

  console.log(jobs);

  return (
    <>
      <motion.div className="border border-gray-300 rounded-lg mt-8" initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <form className="rounded-lg shadow p-2 flex gap-4 w-full" onSubmit={handleFindJob}>
          <div className="flex items-center px-3 py-2 flex-grow border-r-2 border-gray-300">
            <Search className="mr-2" color="#2563eb" />
            <input
              placeholder="Search by job title..."
              className="w-full outline-none text-sm bg-transparent placeholder-gray-500"
              type="text"
              id="search"
              onChange={onChangeHandler}
              autoComplete="off"
            />
          </div>

          <div className="flex items-center px-3 py-2 flex-grow border-r-2 border-gray-300">
            <MapPin className="mr-2" color="#2563eb" />
            <input
              placeholder="City, state or zip code"
              className="w-full outline-none text-sm bg-transparent placeholder-gray-500"
              type="text"
              id="location"
              onChange={onChangeHandler}
              autoComplete="off"
            />
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
      </motion.div>

      <div className="text-gray-500 text-xs mt-8 flex gap-x-2">
        Popular searches: <p className="text-gray-700 font-medium">Front-end, Back-end, Developer, Designer, Team Lead, Digital Maraketing, Video Editor</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center mt-10 p-4">
          <Loader colour="text-blue-600" size="16" />
        </div>
      ) : (
        <>
          <h1 className="mt-8 text-xs capitalize">{searchParams.size !== 0 ? "Search Results" : "Recently Posted Jobs"}</h1>

          {jobs?.length === 0 ? (
            <EmptyState label="Job Not Found" description="We couldn't find any job postings matching your search criteria" />
          ) : (
            <motion.div className="grid grid-cols-3 gap-4 mt-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              {jobs?.map((job) => (
                <JobShowCard job={job} key={job?._id} onSelect={handleSelect} />
              ))}
            </motion.div>
          )}
        </>
      )}
    </>
  );
}

export default Jobs;
