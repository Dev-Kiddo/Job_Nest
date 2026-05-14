import React, { useEffect } from "react";
import { getAllApplications } from "../features/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import JobListView from "./JobListView";
import Loader from "./Loader";

function AppliedJobs() {
  const { applications, loading } = useSelector((state) => state.application);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllApplications());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <>
          <div className="flex items-center justify-center mt-10 p-4">
            <Loader colour="text-blue-600" />
          </div>
        </>
      ) : (
        <JobListView applications={applications} />
      )}
    </>
  );
}

export default AppliedJobs;
