import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { MoveRight } from "lucide-react";
import { skilsList, expList, yearsArray, degreeList, fieldList, universitiesList, languagesList } from "./profileDataInfo";
import { updateCandidateProfile } from "../features/profileSlice";
import useToastMessage from "../hooks/useToastMessage";
import { motion } from "framer-motion";

function CandidateProfileInfo() {
  const dispatch = useDispatch();
  const { candidate, loading, messageType } = useSelector((state) => state?.profile);

  const [isEdit, setIsEdit] = useState(false);

  const [payload, setPayload] = useState({
    skills: candidate?.skills?.length > 0 ? candidate?.skills : [],
    languages: candidate?.languages?.length > 0 ? candidate?.languages : [],
    experience: {
      title: candidate?.experience?.title || "",
      company: candidate?.experience?.company || "",
      location: candidate?.experience?.location || "",
      companyExperience: candidate?.experience?.companyExperience || "",
    },
    education: {
      degree: candidate?.education?.degree || "",
      field: candidate?.education?.field || "",
      institution: candidate?.education?.institution || "",
      year: candidate?.education?.year || "",
    },
  });

  const handleFormData = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const { id, value } = e.target;

    if (id === "skills") {
      setPayload((payload) => ({ ...payload, [id]: [...payload.skills, value] }));
      return;
    }

    if (id === "languages") {
      setPayload((payload) => ({ ...payload, [id]: [...payload.languages, value] }));
      return;
    }

    if (id === "title" || id === "company" || id === "location" || id === "companyExperience") {
      setPayload((payload) => ({ ...payload, experience: { ...payload.experience, [id]: value } }));
    }

    if (id === "degree" || id === "field" || id === "institution" || id === "year") {
      setPayload((payload) => ({ ...payload, education: { ...payload.education, [id]: value } }));
    }
  };

  const handleSubmitHandler = function (e) {
    e.preventDefault();

    dispatch(updateCandidateProfile(payload));
  };

  useToastMessage("profile");

  useEffect(() => {
    if (!loading && messageType === "success") {
      setIsEdit(false);
    }
  }, [loading, messageType]);

  return (
    <div>
      <h1 className="text-md mb-4 capitalize">Profile Information</h1>

      <motion.form onSubmit={handleSubmitHandler} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-sm flex flex-col col-span-2">
            <label className="text-gray-500 capitalize" htmlFor="skills">
              Skills
            </label>

            <div className="text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500">
              {isEdit ? (
                <div className="flex flex-col items-center gap-2">
                  <select id="skills" className="w-full py-3 px-2 text-md mt-2.5 bg-gray-200 rounded-md capitalize" onChange={handleFormData}>
                    <option value="">Select Skills</option>
                    {skilsList.map((skill: string) => (
                      <option className="capitalize" value={skill} key={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                  {payload.skills.length > 0 && (
                    <div className="w-full flex flex-wrap gap-2 p-2">
                      {payload?.skills.map((skill: string) => (
                        <div className="bg-gray-300 p-2 rounded-md" key={skill}>
                          <p className="text-gray-600 text-xs font-semibold">
                            {skill} <span className="bg-red-500 px-1.5 py-0.5 rounded-sm text-white cursor-pointer">&times;</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={`${payload?.skills.length > 0 ? "text-gray-900" : "text-gray-500"} py-3 capitalize px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}
                >
                  {(payload?.skills.length > 0 &&
                    payload.skills.map((skill, index) => (
                      <p className="text-gray-800 text-sm inline pr-2" key={index}>
                        {skill}
                      </p>
                    ))) ||
                    "—"}
                </div>
              )}
            </div>
          </div>

          <div className="text-sm col-span-2">
            <label className="text-gray-500 capitalize" htmlFor="languages">
              Languages
            </label>

            <div className="text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500">
              {isEdit ? (
                <div className="flex flex-col items-center gap-2">
                  <select id="languages" className="w-full py-3 px-2 text-md mt-2.5 bg-gray-200 rounded-md capitalize" onChange={handleFormData}>
                    <option value="">Select Language</option>
                    {languagesList.map((lang: string) => (
                      <option className="capitalize" value={lang} key={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  {payload.languages.length > 0 && (
                    <div className="w-full flex flex-wrap gap-2 p-2">
                      {payload?.languages.map((lang: string) => (
                        <div className="bg-gray-300 p-2 rounded-md" key={lang}>
                          <p className="text-gray-600 text-xs font-semibold">
                            {lang} <span className="bg-red-500 px-1.5 py-0.5 rounded-sm text-white cursor-pointer">&times;</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={`${payload?.languages.length > 0 ? "text-gray-900" : "text-gray-500"} py-3 capitalize px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}
                >
                  {(payload?.languages.length > 0 &&
                    payload.languages.map((skill) => (
                      <p className="text-gray-800 text-sm inline pr-2" key={skill}>
                        {skill}
                      </p>
                    ))) ||
                    "—"}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className=" mt-4">
          <p className="text-white capitalize text-sm bg-gray-500 px-2 py-0.5 inline">Experience</p>

          <div className="grid grid-cols-4 gap-4 mt-1 items-center">
            <div className="text-sm flex flex-col row-span-1">
              <label className="text-gray-500 capitalize" htmlFor="title">
                Title
              </label>

              <div className="text-sm rounded-md focus-visible:outline-gray-500">
                {isEdit ? (
                  <input
                    type="text"
                    id="title"
                    value={payload?.experience?.title}
                    className="w-full py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                    onChange={handleFormData}
                    autoComplete="off"
                  />
                ) : (
                  <p className={`${payload?.experience?.title ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                    {payload?.experience?.title || "—"}
                  </p>
                )}
              </div>
            </div>

            <div className="text-sm flex flex-col row-span-1">
              <label className="text-gray-500 capitalize" htmlFor="company">
                Company
              </label>

              <div className="text-sm rounded-md focus-visible:outline-gray-500">
                {isEdit ? (
                  <input
                    type="text"
                    id="company"
                    value={payload?.experience?.company}
                    className="w-full py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                    onChange={handleFormData}
                    autoComplete="off"
                  />
                ) : (
                  <p className={`${payload?.experience?.company ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                    {payload?.experience?.company || "—"}
                  </p>
                )}
              </div>
            </div>

            <div className="text-sm flex flex-col row-span-1">
              <label className="text-gray-500 capitalize" htmlFor="location">
                Location
              </label>

              <div className="text-sm rounded-md focus-visible:outline-gray-500">
                {isEdit ? (
                  <input
                    type="text"
                    id="location"
                    value={payload?.experience?.location}
                    className="w-full py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                    onChange={handleFormData}
                    autoComplete="off"
                  />
                ) : (
                  <p
                    className={`${payload?.experience?.location ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}
                  >
                    {payload?.experience?.location || "—"}
                  </p>
                )}
              </div>
            </div>

            <div className="text-sm flex flex-col row-span-1">
              <label className="text-gray-500 capitalize" htmlFor="companyExperience">
                Experience
              </label>

              <div className="text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500">
                {isEdit ? (
                  <select
                    id="companyExperience"
                    className="w-full py-3 px-2 text-md bg-gray-200 rounded-md focus-visible:outline-gray-500"
                    value={payload?.experience?.companyExperience}
                    onChange={handleFormData}
                  >
                    <option value="">Select Experience</option>
                    {expList.map((exp) => (
                      <option value={exp} key={exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p
                    className={`${payload?.experience?.companyExperience ? "text-gray-900" : "text-gray-500"} py-3 capitalize px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}
                  >
                    {payload?.experience?.companyExperience || "—"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-4">
          <p className="text-white capitalize text-sm bg-gray-500 px-2 py-0.5 inline">Education</p>

          <div className="grid grid-cols-4 gap-4 mt-1 items-center">
            <div className="text-sm flex flex-col row-span-1">
              <label className="text-gray-500 capitalize" htmlFor="degree">
                Degree
              </label>

              <div className="text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500">
                {isEdit ? (
                  <select
                    id="degree"
                    className="w-full py-3 px-2 text-md bg-gray-200 rounded-md focus-visible:outline-gray-500"
                    onChange={handleFormData}
                    value={payload?.education?.degree}
                  >
                    <option value="">Select</option>
                    {degreeList.map((degree) => (
                      <option value={degree} key={degree}>
                        {degree}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p
                    className={`${payload?.education?.degree ? "text-gray-900" : "text-gray-500"} py-3 capitalize px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}
                  >
                    {payload?.education?.degree || "—"}
                  </p>
                )}
              </div>
            </div>

            <div className="text-sm flex flex-col row-span-1">
              <label className="text-gray-500 capitalize" htmlFor="field">
                Field
              </label>

              <div className="text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500">
                {isEdit ? (
                  <select
                    id="field"
                    className="w-full py-3 px-2 text-md bg-gray-200 rounded-md focus-visible:outline-gray-500"
                    onChange={handleFormData}
                    value={payload?.education?.field}
                  >
                    <option value="">Select</option>
                    {fieldList.map((field) => (
                      <option value={field} key={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p
                    className={`${payload?.education?.field ? "text-gray-900" : "text-gray-500"} py-3 capitalize px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}
                  >
                    {payload?.education?.field || "—"}
                  </p>
                )}
              </div>
            </div>

            <div className="text-sm flex flex-col row-span-1">
              <label className="text-gray-500 capitalize" htmlFor="institution">
                institution
              </label>

              <div className="text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500">
                {isEdit ? (
                  <select
                    id="institution"
                    className="w-full py-3 px-2 text-md bg-gray-200 rounded-md focus-visible:outline-gray-500"
                    onChange={handleFormData}
                    value={payload?.education?.institution}
                  >
                    <option value="">Select</option>
                    {universitiesList.map((university) => (
                      <option value={university} key={university}>
                        {university}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p
                    className={`${payload?.education?.institution ? "text-gray-900" : "text-gray-500"} py-3 capitalize px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}
                  >
                    {payload?.education?.institution || "—"}
                  </p>
                )}
              </div>
            </div>

            <div className="text-sm flex flex-col row-span-1">
              <label className="text-gray-500 capitalize" htmlFor="year">
                Year
              </label>

              <div className="text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500">
                {isEdit ? (
                  <select
                    id="year"
                    className="w-full py-3 px-2 text-md bg-gray-200 rounded-md focus-visible:outline-gray-500"
                    onChange={handleFormData}
                    value={payload?.education?.year}
                  >
                    <option value="">Select</option>
                    {yearsArray.map((year) => (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p
                    className={`${payload?.education?.year ? "text-gray-900" : "text-gray-500"} py-3 capitalize px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}
                  >
                    {payload?.education?.year || "—"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-5 border-gray-300" />

        <div className="flex gap-x-5">
          <button
            className={`${isEdit ? "bg-orange-600" : "bg-blue-600"} text-white py-2 px-4 rounded ${isEdit ? "hover:bg-orange-700" : "hover:bg-blue-700"} transition flex justify-center gap-2 cursor-pointer`}
            onClick={(e) =>
              setIsEdit((edit) => {
                e.preventDefault();
                return !edit;
              })
            }
          >
            {isEdit ? "Cancel" : "Update"}
          </button>

          {isEdit && (
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer">
              Update Profile {loading ? <Loader size="4" margin="2" /> : <MoveRight color="#fff" />}
            </button>
          )}
        </div>
      </motion.form>
    </div>
  );
}

export default CandidateProfileInfo;
