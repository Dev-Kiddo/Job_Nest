import { BriefcaseBusiness, Calendar, Package, Timer, WalletCards } from "lucide-react";

export const jobs = [
  {
    title: "Software Engineer",
    salary: {
      min: 25000,
      max: 45000,
    },
    logo: "https://logo.clearbit.com/google.com",
    companyName: "Google",
    jobType: "Full Time",
    location: {
      state: "Karnataka",
      city: "Bangalore",
    },
  },

  {
    title: "Frontend Developer",
    salary: {
      min: 30000,
      max: 50000,
    },
    logo: "https://logo.clearbit.com/microsoft.com",
    companyName: "Microsoft",
    jobType: "Part Time",
    location: {
      state: "Telangana",
      city: "Hyderabad",
    },
  },

  {
    title: "Backend Developer",
    salary: {
      min: 35000,
      max: 60000,
    },
    logo: "https://logo.clearbit.com/amazon.com",
    companyName: "Amazon",
    jobType: "Remote",
    location: {
      state: "Tamil Nadu",
      city: "Chennai",
    },
  },

  {
    title: "Full Stack Developer",
    salary: {
      min: 40000,
      max: 70000,
    },
    logo: "https://logo.clearbit.com/netflix.com",
    companyName: "Netflix",
    jobType: "Hybrid",
    location: {
      state: "Maharashtra",
      city: "Mumbai",
    },
  },

  {
    title: "React Developer",
    salary: {
      min: 28000,
      max: 48000,
    },
    logo: "https://logo.clearbit.com/meta.com",
    companyName: "Meta",
    jobType: "Internship",
    location: {
      state: "Karnataka",
      city: "Bangalore",
    },
  },

  {
    title: "Node.js Developer",
    salary: {
      min: 32000,
      max: 55000,
    },
    logo: "https://logo.clearbit.com/adobe.com",
    companyName: "Adobe",
    jobType: "Contract",
    location: {
      state: "Delhi",
      city: "New Delhi",
    },
  },

  {
    title: "MERN Stack Developer",
    salary: {
      min: 30000,
      max: 65000,
    },
    logo: "https://logo.clearbit.com/spotify.com",
    companyName: "Spotify",
    jobType: "Freelance",
    location: {
      state: "Kerala",
      city: "Kochi",
    },
  },

  {
    title: "Java Developer",
    salary: {
      min: 27000,
      max: 52000,
    },
    logo: "https://logo.clearbit.com/oracle.com",
    companyName: "Oracle",
    jobType: "Walk-In",
    location: {
      state: "Karnataka",
      city: "Mysore",
    },
  },

  {
    title: "Python Developer",
    salary: {
      min: 35000,
      max: 75000,
    },
    logo: "https://logo.clearbit.com/ibm.com",
    companyName: "IBM",
    jobType: "Temporary",
    location: {
      state: "Maharashtra",
      city: "Pune",
    },
  },

  {
    title: "DevOps Engineer",
    salary: {
      min: 50000,
      max: 90000,
    },
    logo: "https://logo.clearbit.com/intel.com",
    companyName: "Intel",
    jobType: "Night Shift",
    location: {
      state: "Tamil Nadu",
      city: "Coimbatore",
    },
  },

  {
    title: "UI/UX Designer",
    salary: {
      min: 22000,
      max: 40000,
    },
    logo: "https://logo.clearbit.com/figma.com",
    companyName: "Figma",
    jobType: "Work From Home",
    location: {
      state: "West Bengal",
      city: "Kolkata",
    },
  },

  {
    title: "Cloud Engineer",
    salary: {
      min: 45000,
      max: 85000,
    },
    logo: "https://logo.clearbit.com/salesforce.com",
    companyName: "Salesforce",
    jobType: "On Site",
    location: {
      state: "Gujarat",
      city: "Ahmedabad",
    },
  },
];

export const relatedJobs = [
  {
    title: "Full Stack Developer",
    salary: {
      min: 40000,
      max: 70000,
    },
    logo: "https://logo.clearbit.com/netflix.com",
    company: {
      name: "Netflix",
    },
    jobType: "Hybrid",
    location: {
      state: "Maharashtra",
      city: "Mumbai",
    },
  },

  {
    title: "React Developer",
    salary: {
      min: 28000,
      max: 48000,
    },
    logo: "https://logo.clearbit.com/meta.com",
    company: {
      name: "Netflix",
    },
    jobType: "Internship",
    location: {
      state: "Karnataka",
      city: "Bangalore",
    },
  },

  {
    title: "Node.js Developer",
    salary: {
      min: 32000,
      max: 55000,
    },
    logo: "https://logo.clearbit.com/adobe.com",
    company: {
      name: "Netflix",
    },
    jobType: "Contract",
    location: {
      state: "Delhi",
      city: "New Delhi",
    },
  },
];

export const skillsRequired = ["MongoDB", "Express", "React", "Node.js", "TypeScript"];

export const benefitsList = [
  "Equity Compensation",
  "Flexible Work ",
  "Free gym membership",
  "Comprehensive Insurance",
  "Parental Leave",
  "Wellness Programs",
  "Flexible PTO/Vacation",
];

export const requirementList = [
  "Possession of any degree or a related discipline, supplemented by a minimum of 5 years of progressive experience deep understanding of core principles.",
  "Demonstrated mastery including the ability to leverage advanced features such as to drive efficiency",
  "Exceptional verbal and written communication skills, technical information into actionable insights for diverse audiences and executive leadership.",
  "A strong aptitude for critical thinking and data-driven ability to identify systemic bottlenecks and implement innovative, scalable solutions.",
  "Proven ability to lead cross-functional initiatives from conception to completion, ensuring projects are delivered on time and within scope and teamwork.",
  "A proactive mindset with the agility to navigate rapidly changing priorities and a commitment to continuous learning.",
];

export const benefits = [
  "Full coverage for medical, dental, and vision insurance for employees and their families.",
  "Competitive 401(k) or pension plans with employer matching contributions to support retirement goals.",
  "Generous vacation days, sick leave, and paid public holidays to ensure a healthy work-life balance.",
  "Options for remote work, flexible scheduling, or a hybrid office model.",
  "Annual stipends or tuition reimbursement for courses, certifications, and attending industry conferences.",
  " One-time or recurring allowances to help remote employees set up ergonomic home workspaces or cover internet costs.",
  "Benefits like pet insurance, travel vouchers, and subsidies for public transit or ridesharing.",
];

export const jobOverview = [
  { icon: Calendar, label: "Job posted", value: "14 May, 2026" },
  { icon: Timer, label: "Job Expire in", value: "08 July, 2026" },
  { icon: Package, label: "Job level", value: "Mid-level" },
  { icon: WalletCards, label: "Experience", value: "3 Years" },
  { icon: BriefcaseBusiness, label: "Education", value: "Any" },
];
