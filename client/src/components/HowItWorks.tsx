import React from "react";
import { motion } from "framer-motion";
import { UserRoundPlus, ScanSearch, FilePen, Rabbit } from "lucide-react";

const features = [
  {
    title: "Create Your Profile",
    description: "Sign up and build your profile by adding your skills, experience, and resume to stand out to recruiters.",
    icon: UserRoundPlus,
  },
  {
    title: "Explore Job Opportunities",
    description: "Browse and search for jobs that match your skills, interests, and career goals.",
    icon: ScanSearch,
  },
  {
    title: "Apply with Ease",
    description: "Submit applications quickly with just a few clicks and track your application status in real-time.",
    icon: FilePen,
  },
  {
    title: "Get Hired Faster",
    description: "Connect with employers, attend interviews, and land your dream job efficiently.",
    icon: Rabbit,
  },
];

function HowItWorks() {
  return (
    <section className="mt-24">
      <motion.div className="text-center" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Everything You Need to Get Hired</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">JobNest brings together powerful tools to help you discover jobs, apply instantly, and track your progress.</p>
      </motion.div>

      <div className="max-w-7xl mx-auto mt-6">
        <div className="flex gap-16 items-stretch border p-6 rounded-xl">
          <div className="p-6 rounded-lg bg-gray-200">
            <video autoPlay muted loop className="rounded-xl" style={{ width: "100%", height: "200px", objectFit: "cover", objectPosition: "top center" }}>
              <source src="https://res.cloudinary.com/dnbswhvko/video/upload/v1777795590/large-thumbnail20250212-319023-1lsvk4m_kttwk4.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <h2 className="text-gray-700 text-3xl font-bold mt-4">A Smarter Way to Get Hired</h2>
            <p className="text-base text-gray-600 mt-2">
              Unlock a world of possibilities with our features. Explore how our unique offerings can transform your journey and empower you to achieve more.
            </p>

            <button className="bg-blue-600 mt-4 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors">Learn more</button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12">
            {features.map((feature, index) => (
              <div key={index} className="p-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg p-2.5 bg-blue-600 mb-4">{<feature.icon color="#fff" />}</div>

                <h3 className="text-gray-900 text-lg font-semibold mb-3">{feature.title}</h3>

                <p className="text-gray-600 text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
