import { Facebook, Instagram, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-20 py-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <a href="/" data-discover="true">
            <img className="w-[40px] object-contain" alt="Company Logo" src="/src/assets/nest_logo/nest.svg" />
          </a>
          <span className="hidden sm:block text-gray-500 h-6 lg:flex items-center">|</span>
          <p className="text-gray-600 text-sm sm:text-base text-center sm:text-left">Copyright @2026 Prasanth | All rights reserved.</p>
        </div>
        <div className="flex items-center gap-6 mt-4 sm:mt-0">
          <a href="#" className="transition-transform hover:scale-110" aria-label="Facebook">
            <Facebook />
          </a>
          <a href="#" className="transition-transform hover:scale-110" aria-label="Twitter">
            <Twitter />
          </a>
          <a href="#" className="transition-transform hover:scale-110" aria-label="Instagram">
            <Instagram />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
