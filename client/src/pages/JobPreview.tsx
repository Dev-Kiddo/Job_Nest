import { Bookmark, Map } from "lucide-react";
import React, { useState } from "react";
import JobShowCard from "../components/JobShowCard";
import ApplyJobCard from "../components/ApplyJobCard";
import { requirementList, benefits, benefitsList, jobOverview, relatedJobs } from "../data/jobsSampleData";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

function JobPreview() {
  const [isClicked, setIsClicked] = useState(false);
  const { jobs, selectedJob, loading } = useSelector((state) => state.job);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center mt-10 p-5">
          <Loader colour="text-blue-600" size="16" />
        </div>
      ) : (
        <>
          <div className="max-w-7xl mx-auto mt-8">
            <div className="flex items-center justify-between gap-x-2">
              <img className="w-16" src="/src/assets/img/icon-google.svg" alt="" />

              <div className="flex-1">
                <h1 className="text-md font-medium capitalize">{selectedJob?.title}</h1>
                <p className="text-xs font-medium text-gray-600 capitalize">
                  at <span>{selectedJob?.company.name}</span>
                  <span className="ml-2 py-0.5 px-1 bg-green-200 text-[10px] uppercase font-bold text-green-800 rounded-sm">{selectedJob?.jobType}</span>
                </p>
              </div>

              <div className="flex items-center gap-x-3">
                <div className="bg-blue-100 p-3 rounded-sm">
                  <Bookmark color="#2563eb" />
                </div>

                <div>
                  <button
                    className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-sm transition text-sm cursor-pointer flex-none hover:bg-blue-700"
                    onClick={() => setIsClicked((click) => !click)}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-7 gap-8 grid-rows-2">
              <div className="col-span-4 row-span-2">
                {/* Job Description */}
                <h2 className="text-sm font-medium">Job description</h2>

                <div className="text-sm text-gray-500 mt-3 text-justify">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae amet hi. exercitationem vero nam ratione atque similique, incidunt eos laboriosam officiis.
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident labore asperiores soluta, quasi laboriosam temporibus est. Explicabo cupiditate minus quis
                    voluptatum voluptate omnis perspiciatis adipisci maiores! Nihil consequatur vel ea!
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et odit labore molestias ad ex sed facere fugiat, at, animi commodi amet, adipisci obcaecati ducimus
                    inventore numquam dicta eveniet similique illum. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium, excepturi nostrum libero minima, a,
                    adipisci voluptates corrupti unde eligendi voluptatum qui sed blanditiis? Incidunt esse nulla corrupti labore et possimus.
                    <br />
                    <br />
                    want to work with us? You're in good company!
                  </p>
                </div>

                <div className="mt-4">
                  <h2 className="text-sm font-medium">Requirements</h2>

                  <div className="text-sm text-gray-500 mt-2 text-justify">
                    <ul className="list-disc list-inside">
                      {requirementList.map((requirement) => (
                        <li key={requirement}>{requirement}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-sm font-medium">Benefits</h2>

                  <div className="text-sm text-gray-500 mt-2 text-justify">
                    <ul className="list-disc list-inside">
                      {benefits.map((requirement) => (
                        <li key={requirement}>{requirement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-span-3 row-span-2">
                <div className="gap-2 items-center border border-gray-300 rounded-md mt-4 p-4">
                  <h3 className="text-xs ">Skills Required</h3>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                    {selectedJob?.skillsRequired.map((skill, index) => (
                      <div className="bg-blue-100 flex gap-x-1" key={index}>
                        <span className="py-0.5 px-2 text-[10px] font-bold text-blue-600" key={index}>
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 items-center justify-evenly border border-gray-300 rounded-md mt-4">
                  <div className="text-center p-4">
                    <h3 className="text-xs">Salary(INR)</h3>
                    <p className="text-xs text-orange-700 font-medium mt-2">
                      ${selectedJob?.salary.min} - ${selectedJob?.salary.max}
                    </p>
                    <p className="text-[10px] text-gray-500">Yearly salary</p>
                  </div>

                  <div className="w-0.5 h-10 bg-gray-300"></div>

                  <div className="flex flex-col items-center gap-y-1">
                    <Map color="#2563eb" />
                    <p className="text-xs">Job location</p>
                    <p className="text-[10px] text-gray-500">
                      {selectedJob?.location?.city}, {selectedJob?.location?.state}
                    </p>
                  </div>
                </div>

                <div className="gap-2 items-center border border-gray-300 rounded-md mt-4 p-4">
                  <h3 className="text-xs ">Job Benifits</h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {benefitsList.map((benefit, index) => (
                      <span className="py-0.5 px-2 bg-blue-100 text-[10px] uppercase font-bold text-blue-600 rounded-sm" key={index}>
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="gap-2 items-center border border-gray-300 rounded-md mt-4 p-4">
                  <h3 className="text-xs ">Job Overview</h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {jobOverview.map((overview) => (
                      <div key={overview.label} className="p-2 bg-gray-200 rounded-md w-[100px]">
                        <overview.icon color="#2563eb" />
                        <h3 className="text-gray text-[11px] text-gray-500 mt-2">{overview.label}</h3>
                        <p className="text-gray-800 text-[12px] font-medium">{overview.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div></div>
              </div>
            </div>

            <hr className="my-5 border-gray-300" />

            <div>
              <h2 className="text-md font-medium">Related Jobs</h2>

              <div className="grid grid-cols-3 gap-4 mt-4">
                {relatedJobs.map((job, index) => (
                  <JobShowCard job={job} key={index} bg="bg-gradient-to-r from-orange-100 to-transpatent" />
                ))}
              </div>
            </div>
          </div>

          {isClicked && (
            <div>
              <ApplyJobCard setIsClicked={setIsClicked} />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default JobPreview;
