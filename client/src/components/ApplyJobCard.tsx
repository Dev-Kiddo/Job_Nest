import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createApplication } from "../features/applicationSlice";

function ApplyJobCard({ setIsClicked }) {
  const { candidate } = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.user);
  const { selectedJob } = useSelector((state) => state.job);

  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    applicantId: currentUser?._id,
    jobId: selectedJob?._id,
    resume: {
      name: candidate?.resumeUrl?.fileName || "--Upload your resume before you apply jobs!--",
      url: candidate?.resumeUrl?.url || "",
    },
    coverLetter: "",
  });

  const onChangeHandler = function (e) {
    const { id, value } = e.target;

    setPayload((payload) => ({ ...payload, [id]: value }));
  };

  const onSubmitHandler = function (e) {
    e.preventDefault();

    dispatch(createApplication(payload));
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-screen bg-gray-900 flex opacity-50 items-center justify-center"></div>

      <div className="w-[760px] bg-white p-8 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          <div className="w-8 h-8 absolute -right-12 -top-12 bg-white p-4 rounded-full border border-blue-600 flex items-center justify-center">
            <button className="text-blue-600" onClick={() => setIsClicked(false)}>
              ✕
            </button>
          </div>
          <h2 className="text-md font-medium">
            Apply Job: <span>{selectedJob?.title}</span>
          </h2>

          <form onSubmit={onSubmitHandler}>
            <div className="mt-4">
              <label className="text-gray-700 text-sm font-medium capitalize" htmlFor="resume">
                Choose Resume
              </label>
              <select
                id="resume"
                className={`w-full py-3 px-2 text-sm ${candidate?.resumeUrl?.fileName ? "text-gray-600" : "text-red-600"}  rounded-sm border border-gray-300 capitalize`}
              >
                <option value={payload?.resume?.url}>{payload?.resume?.name}</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="text-gray-700 text-sm font-medium capitalize" htmlFor="cover">
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                className="w-full py-3 px-2 text-sm text-gray-600  rounded-sm border border-gray-300 capitalize"
                placeholder="Write down your biography here... Let the employer know who you are..."
                rows={6}
                onChange={onChangeHandler}
              ></textarea>
            </div>

            <div className="flex justify-between items-center mt-2">
              <button
                className="bg-blue-100 text-blue-600 font-semibold py-2.5 px-6 rounded-sm transition text-sm cursor-pointer flex-none hover:bg-blue-200"
                onClick={() => setIsClicked(false)}
              >
                Cancel
              </button>

              <button type="submit" className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-sm transition text-sm cursor-pointer flex-none hover:bg-blue-700">
                Apply Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ApplyJobCard;
