import { BriefcaseBusiness, Building2, ClockPlus, MapPin, Search, Users } from "lucide-react";
import { motion } from "framer-motion";

const heroIconBoxes = [
  {
    label: "Live jobs",
    count: "1,75,323",
  },
  {
    label: "Companies",
    count: "2,05,964",
  },
  {
    label: "Candidates",
    count: "2,75,323",
  },
  {
    label: "New jobs",
    count: "75,323",
  },
];

function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-orange-100 rounded-lg py-16 px-6 md:px-20">
      <motion.div className="text-center max-w-2xl mx-auto" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">Unlock Your Potential, Thousands of Jobs Await</h1>
        <p className="text-gray-600 mb-8">
          Job nest is a dynamic online platform that bridges the gap between employers and job seekers. It streamlines recruitment by allowing employers to post vacancies and
          search resumes, while job hunters can create profiles, browse jobs, and apply, often featuring advanced filters and instant alerts to secure ideal opportunities.
        </p>

        <form className="bg-white rounded-lg shadow p-3 flex gap-4 w-full">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white flex-grow">
            <Search className="mr-2" />
            <input placeholder="Job title, Keyword..." className="w-full outline-none text-sm bg-transparent placeholder-gray-500" type="text" />
          </div>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white flex-grow">
            <MapPin className="mr-2" />
            <input placeholder="Preferred location" className="w-full outline-none text-sm bg-transparent placeholder-gray-500" type="text" />
          </div>
          <button type="submit" className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-md transition text-sm cursor-pointer flex-none hover:bg-blue-700">
            Find Job
          </button>
        </form>

        <p className="text-gray-500 text-xs mt-3">Suggestions: Developer, Designer, Digital Maraketing, Video Editor</p>
      </motion.div>

      <motion.div className="flex justify-center gap-x-5 mt-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
        {heroIconBoxes.map((box) => (
          <div className="w-60 bg-white flex items-center rounded-lg p-4 hover:shadow-xl hover:-translate-y-1 transition group">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mr-4 transition group-hover:bg-blue-700 ">
              <BriefcaseBusiness className="lucide-big transition group-hover:bg-blue-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{box.count}</h3>
              <p className="text-gray-500 text-xs mt-3 font-medium">{box.label}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default HeroSection;
