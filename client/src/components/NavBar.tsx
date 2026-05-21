import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function NavBar() {
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHamburger = function (e) {
    e.preventDefault();

    console.log("Clicked");
    setIsMenuOpen((menu) => !menu);
  };

  return (
    <header className="border-b border-gray-300">
      <nav>
        <div className="h-16 flex items-center justify-between gap-x-5">
          <Link className="flex-1 items-center md:flex-initial" to="/">
            <img className="w-[40px]" alt="job-nest" src="https://res.cloudinary.com/dnbswhvko/image/upload/v1779207605/nest_lwdfi3.svg" />
          </Link>

          {/* <ul className="hidden lg:flex items-center gap-4"> */}
          <motion.ul
            className={`${
              isMenuOpen
                ? "absolute top-16 right-[5%] flex flex-col gap-y-2 bg-gray-200 border border-gray-300 p-3 rounded-md font-medium z-10 drop-shadow-neutral-300 md:border-0 md:flex-row"
                : "hidden"
            } md:relative md:bg-transparent md:right-0 md:top-0 md:inline-flex md:space-x-8 md:mt-0`}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <li>
              <NavLink
                className={`block px-3 py-1 rounded-md text-xs font-medium transition-colors text-gray-600 hover:bg-white active:bg-white focus:white [&.active]:bg-white [&.active]:text-orange-600 lg:px-3 lg:py-2 lg:text-sm md:inline`}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block px-3 py-1 rounded-md text-xs font-medium transition-colors text-gray-600 hover:text-blue-600 hover:bg-white [&.active]:bg-white [&.active]:text-orange-600 lg:px-3 lg:py-2 lg:text-sm md:inline"
                to="/jobs"
              >
                Jobs
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block px-2 py-1 rounded-md text-xs font-medium transition-colors text-gray-600 hover:text-blue-600 hover:hover:bg-white active:bg-white focus:white [&.active]:bg-white [&.active]:text-orange-600 lg:px-3 lg:py-2 lg:text-sm md:inline"
                to="/companies"
              >
                Companies
              </NavLink>
            </li>
          </motion.ul>

          <div className="flex lg:flex items-center gap-2 md:gap-3">
            {currentUser?.avatar ? (
              <Link to="/dashboard">
                <img
                  className="w-12 h-12 p-0.5 border-2 border-blue-600 rounded-full"
                  src={currentUser.avatar.url || "/src/assets/img/default-avatar.png"}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                />
              </Link>
            ) : (
              <>
                <NavLink className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs  hover:bg-blue-700 transition-colors font-medium lg:text-sm" to="/register">
                  Register
                </NavLink>
                {/* <NavLink className="bg-orange-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors" to="/recruiter-login">
              Post a jobs
            </NavLink> */}
                <NavLink className="bg-orange-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-orange-700 transition-colors lg:text-sm" to="/login">
                  Sign in
                </NavLink>
              </>
            )}
          </div>

          <button aria-label="Toggle menu" aria-expanded="false" className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none" onClick={handleHamburger}>
            {isMenuOpen ? <X color="#374151" /> : <Menu color="#374151" />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
