import { Facebook, Instagram, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-gray-300 mt-20 py-5">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <a href="/" data-discover="true">
            <img className="w-[40px] object-contain" alt="Company Logo" src="https://res.cloudinary.com/dnbswhvko/image/upload/v1779207605/nest_lwdfi3.svg" />
          </a>
          <span className="hidden text-gray-500 h-6 items-center">|</span>
          <p className="text-gray-600 text-sm text-center">
            Copyright @2026{" "}
            <a href="https://prasanthx.com/" className="underline text-blue-600">
              Prasanth S
            </a>{" "}
            All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-6 mt-4">
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
