import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobListView from "./JobListView";
import Loader from "./Loader";
import { fetchJobs } from "../features/jobSlice";
import EmptyState from "./EmptyState";
import MyJobsListView from "./MyJobsListView";

function MyJobs() {
  const { applications, loading } = useSelector((state) => state.application);
  const { jobs } = useSelector((state) => state.job);
  const { company } = useSelector((state) => state.company);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs({ label: "companyJobs", data: company?._id }));
  }, [dispatch, company?._id]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center mt-8 p-4">
          <Loader colour="text-blue-600" />
        </div>
      ) : jobs?.length > 0 ? (
        <MyJobsListView data={jobs} />
      ) : (
        <EmptyState label="No Jobs Yet!" description="You have not created any jobs." />
      )}
    </>
  );
}

export default MyJobs;
