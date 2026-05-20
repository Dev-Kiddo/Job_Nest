import { BriefcaseBusiness, Building2, ClockPlus, MapPin, Search, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchJobs } from "../features/jobSlice";
import { useNavigate } from "react-router-dom";

const heroIconBoxes = [
  {
    label: "Live jobs",
    count: "1,75,323",
    icon: BriefcaseBusiness,
  },
  {
    label: "Companies",
    count: "2,05,964",
    icon: Building2,
  },
  {
    label: "Candidates",
    count: "2,75,323",
    icon: Users,
  },
  {
    label: "New jobs",
    count: "75,323",
    icon: ClockPlus,
  },
];

function HeroSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    title: "",
    location: "",
  });

  const onChangeHandler = function (e) {
    const { id, value } = e.target;
    setPayload((payload) => ({ ...payload, [id]: value }));
  };

  const onSubmitHandler = function (e) {
    e.preventDefault();

    navigate(`/jobs?search=${payload.title}&location=${payload.location || ""}`);

    // dispatch(fetchJobs({ label: "search", data: payload })).then((result) => {
    //   if (fetchJobs.fulfilled.match(result)) {
    //     navigate("/jobs");
    //   }
    // });
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-orange-100 rounded-lg py-16 px-6 mt-8 md:px-20">
      <motion.div className="text-center max-w-2xl mx-auto" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">Unlock Your Potential, Thousands of Jobs Await</h1>
        <p className="text-gray-600 text-sm mb-8 lg:text-base">
          Job nest is a dynamic online platform that bridges the gap between employers and job seekers. It streamlines recruitment by allowing employers to post vacancies and
          search resumes, while job hunters can create profiles, browse jobs, and apply, often featuring advanced filters and instant alerts to secure ideal opportunities.
        </p>

        <form className="bg-white rounded-lg shadow p-2 flex gap-2 w-full lg:gap-4 lg:p-3" onSubmit={onSubmitHandler}>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white flex-grow">
            <Search className="mr-2" />
            <input
              id="title"
              placeholder="Job title, Keyword..."
              className="w-full outline-none text-xs bg-transparent placeholder-gray-500 lg:text-sm"
              type="text"
              value={payload.title}
              onChange={onChangeHandler}
              autoComplete="off"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white flex-grow">
            <MapPin className="mr-2" />
            <input
              id="location"
              placeholder="Preferred location"
              className="w-full outline-none text-xs bg-transparent placeholder-gray-500 lg:text-sm"
              type="text"
              value={payload.location}
              onChange={onChangeHandler}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium py-2.5 px-4 rounded-md transition text-xs cursor-pointer flex-none hover:bg-blue-700 lg:px-6 lg:font-semibold lg:text-sm"
          >
            Find Job
          </button>
        </form>

        <p className="text-gray-500 text-xs mt-3">Suggestions: Developer, Designer, Digital Maraketing, Video Editor</p>
      </motion.div>

      <motion.div
        className="w-full mx-auto grid grid-cols-2 place-items-center gap-5 mt-8 md:grid-cols-4 md:gap-2 lg:max-w-6xl lg:gap-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {heroIconBoxes.map((box) => (
          <div className="w-full bg-white flex items-center rounded-lg p-4 hover:shadow-xl hover:-translate-y-1 transition group" key={box.label}>
            <div className="min-w-12 w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mr-2 transition group-hover:bg-blue-700 lg:mr-4">
              <box.icon className="lucide-big transition group-hover:bg-blue-700" />
            </div>
            <div>
              <h3 className="font-semibold text-xs text-gray-900 lg:text-base">{box.count}</h3>
              <p className="text-gray-500 text-[10px] mt-1 font-medium lg:text-xs">{box.label}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default HeroSection;
