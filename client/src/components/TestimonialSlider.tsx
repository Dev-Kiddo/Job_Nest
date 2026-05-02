import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

const TestimonialList = [
  {
    id: 1,
    title: "Smooth Career Transition",
    quote: "Switching industries was daunting, but the layout and resource guides here made it seamless. I landed a role in tech within three weeks!",
    avatar: "https://i.pravatar.cc/150?img=1",
    name: "David Chen",
    desigination: "Software Engineer",
  },
  {
    id: 2,
    title: "Stress-Free Job Hunting",
    quote: "The automated matching system is incredible. I stopped scrolling through irrelevant listings and started getting interviews that actually fit my skillset.",
    avatar: "https://i.pravatar.cc/150?img=2",
    name: "Sarah Jenkins",
    desigination: "Marketing Specialist",
  },
  {
    id: 3,
    title: "Sleek and Intuitive",
    quote: "Finally, a job portal that doesn't feel like a cluttered spreadsheet. The UI is clean, making the application process feel productive rather than exhausting.",
    avatar: "https://i.pravatar.cc/150?img=3",
    name: "Elena Rodriguez",
    desigination: "UX Designer",
  },
  {
    id: 4,
    title: "Dream Job Secured",
    quote: "I’ve tried the big-name sites, but I found my current dream role here. The direct communication with recruiters set this platform apart from the rest.",
    avatar: "https://i.pravatar.cc/150?img=4",
    name: "Marcus Thorne",
    desigination: "Project Manager",
  },
  {
    id: 5,
    title: "Perfect for New Grads",
    quote: "As a recent graduate, I was struggling to find entry-level roles. This portal highlighted opportunities I hadn’t seen anywhere else. Highly recommend!",
    avatar: "https://i.pravatar.cc/150?img=5",
    name: "Priya Kapoor",
    desigination: "Junior Analyst",
  },
  {
    id: 6,
    title: "One-Click Wonder",
    quote: "The quick-apply feature saved me hours. I could tailor my profile once and reach top-tier companies instantly. It’s a total productivity hack.",
    avatar: "https://i.pravatar.cc/150?img=6",
    name: "James Wilson",
    desigination: "Operations Lead",
  },
];

export default function TestimonialSlider() {
  return (
    <section className="mt-24">
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 60 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <h2 className="text-3xl font-bold text-gray-700 mb-2"> Trusted by Talent Everywhere</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">From first jobs to C-suite roles—hear why they chose us.</p>
      </motion.div>

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        className="mySwiper"
      >
        {TestimonialList.map((testimonial) => (
          <SwiperSlide>
            <div className="bg-gray-50 p-6 rounded-xl h-full flex flex-col border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">{testimonial.title}</h3>
              <blockquote className="text-gray-600 mb-6 flex-grow text-base">{testimonial.quote}</blockquote>
              <div className="flex items-center mt-auto">
                <img alt="Sara Ahmed, UI/UX Designer" className="w-10 h-10 rounded-full object-cover mr-4" loading="lazy" src={testimonial.avatar} />
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.desigination}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
