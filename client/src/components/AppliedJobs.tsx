import React, { useEffect } from "react";
import { getAllApplications } from "../features/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import JobListView from "./JobListView";
import Loader from "./Loader";
import EmptyState from "./EmptyState";

function AppliedJobs() {
  const { applications, loading } = useSelector((state) => state.application);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllApplications({ label: "applications" }));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <>
          <div className="flex items-center justify-center mt-10 p-4">
            <Loader colour="text-blue-600" />
          </div>
        </>
      ) : applications?.length > 0 ? (
        <JobListView data={applications} />
      ) : (
        <EmptyState label="No Applications Yet!" description="You have not submitted any job applications." />
      )}
    </>
  );
}

export default AppliedJobs;
