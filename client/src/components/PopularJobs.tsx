import { DatabaseZap, FileUser, LaptopMinimalCheck, LassoSelect, ShieldPlus, TicketCheck, Waypoints } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const populatJobCategories = [
  { name: "Programming", icon: LaptopMinimalCheck },
  { name: "Data Science", icon: DatabaseZap },
  { name: "Designing", icon: LassoSelect },
  { name: "Networking", icon: Waypoints },
  { name: "Management", icon: FileUser },
  { name: "Marketing", icon: TicketCheck },
  { name: "Cybersecurity", icon: ShieldPlus },
];

function PopularJobs() {
  return (
    <section className="mt-24">
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-3xl font-bold text-gray-600 mb-2">Popular Job Categories</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Discover top job categories tailored to your skills and career goals.</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {populatJobCategories.map((job) => (
          <div
            key={job.name}
            role="button"
            className="group bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-200 flex flex-col items-center text-center"
          >
            <div className="bg-blue-50 p-3 rounded-full mb-3 transition-transform group-hover:scale-110">
              <job.icon />
            </div>
            <span className="font-medium text-gray-600 text-sm">{job.name}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default PopularJobs;
