import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJobHandler, fetchCategories } from "../features/jobSlice";
import { skilsList, expList, workMode, jobType } from "./profileDataInfo";
import { Country, State, City } from "country-state-city";
import { MoveRight } from "lucide-react";
import Loader from "./Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useToastMessage from "../hooks/useToastMessage";

const educationList = ["any", "high-school", "diploma", "bachelor", "master", "phd"];

function PostJob() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.job);
  const { company } = useSelector((state) => state.company);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const getCountry = Country.getAllCountries();
  const getState = State.getStatesOfCountry(country);
  const getCity = City.getCitiesOfState(country, state);

  const [isLoading, setIsLoading] = useState(true);

  const [payload, setPayload] = useState({
    title: "",
    description: "",
    category: "",
    companyId: company?._id,
    skillsRequired: [],
    experianceRequired: "",
    educationRequired: "",
    salary: {
      min: "",
      max: "",
    },
    location: {
      country,
      state,
      city,
    },
    workMode: "",
    jobtype: "",
    vacancies: 1,
    applicationDeadline: "",
  });

  const handleFormData = function (e) {
    e.preventDefault();

    const { id, value } = e.target;

    if (id === "skillsRequired") {
      setPayload((payload) => ({ ...payload, [id]: [...payload.skillsRequired, value] }));
      return;
    }

    if (id === "min" || id === "max") {
      setPayload((payload) => ({ ...payload, salary: { ...payload.salary, [id]: value } }));
      return;
    }

    if (id === "country" || id === "state" || id === "city") {
      setPayload((payload) => ({ ...payload, location: { ...payload.location, [id]: value } }));
      return;
    }

    setPayload((payload) => ({ ...payload, [id]: value }));
  };

  const deleteSkillsHandler = function (skill) {
    console.log("skill", skill);

    setPayload((payload) => ({ ...payload, skillsRequired: payload?.skillsRequired?.filter((ski) => ski !== skill) }));
  };

  const onSubmitHandler = function (e) {
    e.preventDefault();
    dispatch(createJobHandler(payload));
    // dispatch(createJobHandler(payload)).then(result => {
    //   if(createJobHandler.fulfilled.match(result)){
    // setPayload(payload => ({...payload, }))
    //   }
    // });
  };

  useEffect(() => {
    if (!categories) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useToastMessage("job");

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center mt-10 p-4">
          <Loader colour="text-blue-600" size="16" />
        </div>
      ) : (
        <div className="w-full py-10 pl-10 pr-2">
          <h1 className="text-xl">Post a Job</h1>

          <form onSubmit={onSubmitHandler}>
            <div className="mt-6">
              <div className="text-sm flex flex-col">
                <label htmlFor="title" className="text-gray-600 font-medium capitalize">
                  Job Title <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  id="title"
                  className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                  placeholder="Example: Full stack developer"
                  onChange={handleFormData}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm flex flex-col">
                <label htmlFor="description" className="text-gray-600 font-medium capitalize">
                  Job Description <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="description"
                  className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                  rows={4}
                  placeholder="Add your job description..."
                  onChange={handleFormData}
                ></textarea>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="text-sm w-full flex flex-col">
                <label htmlFor="category" className="text-gray-600 font-medium capitalize">
                  Job Category <span className="text-red-500">*</span>
                </label>

                {/* <input type="text" id="title" className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500" /> */}

                <select id="category" className="w-full py-3 px-2 text-md mt-2.5 bg-gray-200 rounded-md focus-visible:outline-gray-500" onChange={handleFormData}>
                  <option value="">Select Category</option>
                  {categories?.map((category) => (
                    <option value={category.name} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-sm w-full flex flex-col">
                <label htmlFor="jobtype" className="text-gray-600 font-medium capitalize">
                  Job type <span className="text-red-500">*</span>
                </label>

                <select id="jobtype" className="w-full py-3 px-2 text-md mt-2.5 bg-gray-200 rounded-md focus-visible:outline-gray-500" onChange={handleFormData}>
                  <option value="">Select Job Type</option>
                  {jobType?.map((type) => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm text-gray-600 font-medium capitalize" htmlFor="skillsRequired">
                Skills Required <span className="text-red-500">*</span>
              </label>

              <div className="flex flex-col items-center gap-2 text-sm">
                <select id="skillsRequired" className="w-full py-3 px-2 text-md mt-2.5 bg-gray-200 rounded-md focus-visible:outline-gray-500" onChange={handleFormData}>
                  <option value="">Select Skills</option>
                  {skilsList.map((skill: string) => (
                    <option className="capitalize" value={skill} key={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
                {payload.skillsRequired.length > 0 && (
                  <div className="w-full flex flex-wrap gap-2 p-2">
                    {payload?.skillsRequired.map((skill: string) => (
                      <div className="bg-gray-300 p-2 rounded-md" key={skill}>
                        <p className="text-gray-600 text-xs font-semibold">
                          {skill}{" "}
                          <span className="bg-red-500 px-1.5 py-0.5 rounded-sm text-white cursor-pointer" onClick={() => deleteSkillsHandler(skill)}>
                            &times;
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="text-sm w-full flex flex-col">
                <label htmlFor="min" className="text-gray-600 font-medium capitalize">
                  Salery Min <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  id="min"
                  placeholder="Min"
                  className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                  onChange={handleFormData}
                />
              </div>

              <div className="text-sm w-full flex flex-col">
                <label htmlFor="max" className="text-gray-600 font-medium capitalize">
                  Salery Max <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  placeholder="Max"
                  id="max"
                  className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                  onChange={handleFormData}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="text-sm w-full flex flex-col">
                <label htmlFor="experianceRequired" className="text-gray-600 font-medium capitalize">
                  experiance
                </label>

                <select id="experianceRequired" className="w-full py-3 px-2 text-md mt-2.5 bg-gray-200 rounded-md focus-visible:outline-gray-500" onChange={handleFormData}>
                  <option value="">Select Work Experiance</option>
                  {expList?.map((degree) => (
                    <option value={degree} key={degree}>
                      {degree}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-sm w-full flex flex-col">
                <label htmlFor="educationRequired" className="text-gray-600 font-medium capitalize">
                  Education
                </label>

                <select id="educationRequired" className="w-full py-3 px-2 text-md mt-2.5 bg-gray-200 rounded-md focus-visible:outline-gray-500" onChange={handleFormData}>
                  <option value="">Select Job Type</option>
                  {educationList?.map((degree) => (
                    <option value={degree} key={degree}>
                      {degree}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <div className="text-sm w-full flex flex-col">
                <label htmlFor="vacancies" className="text-gray-600 font-medium capitalize">
                  Vacancies
                </label>
                <input
                  type="number"
                  id="vacancies"
                  className="py-3 px-2 text-sm mt-3.5 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                  value={payload?.vacancies}
                  onChange={handleFormData}
                />
              </div>

              <div className="text-sm w-full flex flex-col">
                <label htmlFor="workMode" className="text-gray-600 font-medium capitalize">
                  Work mode <span className="text-red-500">*</span>
                </label>

                <select id="workMode" className="w-full py-3 px-2 text-md mt-3.5 bg-gray-200 rounded-md focus-visible:outline-gray-500" onChange={handleFormData}>
                  <option value="">Select Work Mode</option>
                  {workMode?.map((mode) => (
                    <option value={mode} key={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-sm w-full flex flex-col">
                <label htmlFor="applicationDeadline" className="text-gray-600 font-medium capitalize">
                  Application Deadline
                </label>

                <DatePicker
                  selected={payload.applicationDeadline}
                  onChange={(date) => setPayload((payload) => ({ ...payload, applicationDeadline: date }))}
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  placeholderText="Select Job Deadline"
                  className="w-full py-2.5 px-2 text-md bg-gray-200 rounded-md focus-visible:outline-gray-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-9 gap-4 mt-6">
              <div className="col-span-3 text-sm flex flex-col row-span-1">
                <label htmlFor="country" className="text-gray-600 font-medium capitalize">
                  Country <span className="text-red-500">*</span>
                </label>

                <select
                  id="country"
                  className="w-full py-3 px-2 text-md mt-2.5 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                  onChange={handleFormData}
                  onClick={(e) => setCountry(e.target.value)}
                >
                  <option value="">Select Country</option>
                  {getCountry?.map((country) => (
                    <option value={country?.isoCode} key={country?.isoCode}>
                      {country?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-3 text-sm flex flex-col row-span-1">
                <label htmlFor="state" className="text-gray-600 font-medium capitalize">
                  State <span className="text-red-500">*</span>
                </label>

                <select
                  id="state"
                  className="w-full py-3 px-2 text-md mt-2.5 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                  onChange={handleFormData}
                  onClick={(e) => setState(e.target.value)}
                >
                  <option value="">Select State</option>
                  {getState?.map((state) => (
                    <option value={state?.isoCode} key={state?.isoCode}>
                      {state?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-3 text-sm flex flex-col row-span-1">
                <label htmlFor="city" className="text-gray-600 font-medium capitalize">
                  City <span className="text-red-500">*</span>
                </label>

                <select
                  id="city"
                  className="w-full py-3 px-2 text-md mt-2.5 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                  onChange={handleFormData}
                  onClick={(e) => setCity(e.target.value)}
                >
                  <option value="">Select City</option>
                  {getCity?.map((city, i) => (
                    <option value={city?.isoCode} key={i}>
                      {city?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <hr className="my-5 border-gray-300" />

            <div className="flex mt-6 gap-4">
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer ">
                {loading ? "Creating" : "Create Job"} {loading ? <Loader size="4" margin="2" /> : <MoveRight color="#fff" />}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default PostJob;
