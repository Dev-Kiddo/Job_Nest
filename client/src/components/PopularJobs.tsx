import { DatabaseZap, FileUser, LaptopMinimalCheck, LassoSelect, ShieldPlus, TicketCheck, Waypoints } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const populatJobCategories = [
  { name: "Programming", icon: LaptopMinimalCheck, positionOpen: 312 },
  { name: "Data Science", icon: DatabaseZap, positionOpen: 422 },
  { name: "Design", icon: LassoSelect, positionOpen: 333 },
  { name: "Networking", icon: Waypoints, positionOpen: 476 },
  { name: "Management", icon: FileUser, positionOpen: 231 },
  { name: "Marketing", icon: TicketCheck, positionOpen: 288 },
  { name: "Cybersecurity", icon: ShieldPlus, positionOpen: 189 },
  { name: "Health&Care", icon: ShieldPlus, positionOpen: 99 },
  { name: "Music&audio", icon: ShieldPlus, positionOpen: 121 },
  { name: "Finance", icon: ShieldPlus, positionOpen: 245 },
];

function PopularJobs() {
  return (
    <section className="mt-24">
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-3xl font-bold text-gray-600 mb-2">Popular Job Categories</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Discover top job categories tailored to your skills and career goals.</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {populatJobCategories.map((job) => (
          <div className="group h-20 flex gap-x-4 items-center justify-center cursor-pointer">
            <div className="w-20 h-full bg-gray-200 flex items-center justify-center p-3 rounded-md transition-transform group-hover:scale-110">
              <job.icon className="lucide-big" color="#2563eb" />
            </div>

            <div className="transition-all duration-200 flex flex-col">
              <h2 className="font-medium text-gray-600 text-base">{job.name}</h2>
              <p className="text-gray-500 text-xs mt-3 font-medium">{job.positionOpen} Open Position</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default PopularJobs;
