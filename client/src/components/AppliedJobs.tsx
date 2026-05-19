import React, { useEffect } from "react";
import { getAllApplications } from "../features/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import JobListView from "./JobListView";
import Loader from "./Loader";
import EmptyState from "./EmptyState";

function AppliedJobs() {
  const { applications, loading } = useSelector((state) => state.application);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllApplications({ label: "candidate", id: currentUser?._id }));
  }, [dispatch, currentUser?._id]);

  // console.log(applications);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center mt-10 p-4">
          <Loader colour="text-blue-600" size="16" />
        </div>
      ) : applications?.length > 0 ? (
        <JobListView data={applications} />
      ) : (
        <EmptyState label="No Applications Yet!" description="You have not submitted any job applications." />
      )}
    </>
  );
}

export default AppliedJobs;
