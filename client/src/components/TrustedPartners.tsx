import { motion } from "framer-motion";

const partners = [
  {
    name: "Facebook",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  },
  {
    name: "Slack",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
  },
  {
    name: "Linkedin",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
  },
  {
    name: "Instagram",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
  },
  {
    name: "Netflix",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "Google",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
];

function TrustedPartners() {
  return (
    <div className="py-7 px-4 max-w-6xl mx-auto mt-24">
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 60 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Our Trusted Partners</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Partnering with reliable companies to connect you with the right career opportunities.</p>
      </motion.div>

      <div className="flex flex-wrap justify-center items-center gap-10">
        {partners.map((partner) => (
          <div key={partner.name} className="group cursor-pointer">
            <div className="w-20 h-12 flex items-center justify-center">
              <img
                src={partner.imgUrl}
                alt={partner.name}
                className="max-h-full max-w-full filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrustedPartners;
