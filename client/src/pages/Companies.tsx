import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { CircleChevronRight } from "lucide-react";
import CompanyShowCard from "../components/CompanyShowCard";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const companySliderList = [
  { id: 1, companyType: "MNCs", companyList: 204 },
  { id: 2, companyType: "Edtech", companyList: 167 },
  { id: 3, companyType: "Healthcare", companyList: 736 },
  { id: 4, companyType: "B2C", companyList: 206 },
  { id: 5, companyType: "Manufacturing", companyList: 103 },
  { id: 6, companyType: "Product", companyList: 118 },
  { id: 7, companyType: "Banking", companyList: 455 },
  { id: 8, companyType: "Hospitality", companyList: 111 },
];
const companyShowList = [
  {
    name: "altinvest",
    rating: "3.6",
    reviews: "19",
    tags: ["startup", "financial services", "minicorn"],
    icon: "",
  },
  {
    name: "mamaearth",
    rating: "3.8",
    reviews: "259",
    tags: ["startup", "Beauty & Personal Care"],
    icon: "",
  },
  {
    name: "zerodha",
    rating: "4.4",
    reviews: "512",
    tags: ["fintech", "stock trading", "startup"],
    icon: "",
  },
  {
    name: "cred",
    rating: "4.1",
    reviews: "187",
    tags: ["fintech", "credit card", "startup"],
    icon: "",
  },
  {
    name: "swiggy",
    rating: "4.0",
    reviews: "934",
    tags: ["food delivery", "startup", "unicorn"],
    icon: "",
  },
  {
    name: "zomato",
    rating: "4.2",
    reviews: "1102",
    tags: ["food tech", "restaurant", "startup"],
    icon: "",
  },
  {
    name: "boat",
    rating: "3.9",
    reviews: "421",
    tags: ["electronics", "audio products", "startup"],
    icon: "",
  },
  {
    name: "paytm",
    rating: "3.7",
    reviews: "842",
    tags: ["payments", "fintech", "digital wallet"],
    icon: "",
  },
  {
    name: "ola",
    rating: "3.5",
    reviews: "678",
    tags: ["ride sharing", "mobility", "startup"],
    icon: "",
  },
  {
    name: "byjus",
    rating: "3.3",
    reviews: "950",
    tags: ["edtech", "learning platform", "startup"],
    icon: "",
  },
  {
    name: "meesho",
    rating: "4.0",
    reviews: "303",
    tags: ["ecommerce", "reselling", "startup"],
    icon: "",
  },
  {
    name: "razorpay",
    rating: "4.5",
    reviews: "276",
    tags: ["payments", "fintech", "saas"],
    icon: "",
  },
];

function Companies() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <h1 className="mt-8 text-center font-semibold capitalize text-gray-900">Top companies hiring now</h1>

      <motion.div className="mx-auto px-8 py-6 bg-gray-200 mt-8 rounded-xl" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          modules={[Autoplay]}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },

            768: {
              slidesPerView: 3,
            },

            1024: {
              slidesPerView: 4,
            },
            1400: {
              slidesPerView: 6,
            },
          }}
          className="mySwiper"
          onBreakpoint={(swiper) => {
            console.log(swiper.params.slidesPerView);
          }}
        >
          {companySliderList.map((company) => (
            <SwiperSlide>
              <div className="p-6 rounded-xl h-full flex flex-col bg-gray-100">
                <h3 className="text-md font-semibold text-gray-900 mb-2 capitalize">{company.companyType}</h3>

                <div className="flex gap-x-2 cursor-pointer hover:underline">
                  <h5 className="text-xs font-medium text-blue-600 capitalize">{company.companyList} Companies</h5>
                  <CircleChevronRight className="lucide-sm" color="#2563eb" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center mt-10 p-4">
          <Loader colour="text-blue-600" size="16" />
        </div>
      ) : (
        <>
          <h1 className="mt-8 text-xs capitalize">Showing Top companies (12)</h1>

          <motion.div
            className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {companyShowList.map((company) => (
              <CompanyShowCard company={company} key={company.name} />
            ))}
          </motion.div>
        </>
      )}
    </>
  );
}

export default Companies;
