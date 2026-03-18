import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header className="border-b border-gray-200 mb-10">
      <nav>
        <div className="h-16 flex items-center justify-between">
          <Link className="flex items-center" to="/">
            <img className="w-[40px]" alt="job-nest" src="/src/assets/nest_logo/nest.svg" />
          </Link>

          <ul className="hidden lg:flex items-center gap-4">
            <li>
              <NavLink
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:bg-white active:bg-white focus:white [&.active]:bg-white [&.active]:text-orange-600`}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-blue-500 hover:bg-white [&.active]:bg-white [&.active]:text-orange-600"
                to="/jobs"
              >
                Jobs
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-blue-500 hover:hover:bg-white [&.active]:bg-white [&.active]: text-blue-600"
                to="/"
              >
                About
              </NavLink>
            </li> */}
            <li>
              <NavLink
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-blue-500 hover:hover:bg-white active:bg-white focus:white [&.active]:bg-white [&.active]:text-orange-600"
                to="/companies"
              >
                Companies
              </NavLink>
            </li>
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <NavLink className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm  hover:bg-blue-700 transition-colors font-medium" to="/candidate-login">
              Find Jobs
            </NavLink>
            <NavLink className="bg-orange-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors" to="/recruiter-login">
              Post Jobs
            </NavLink>
          </div>

          <button aria-label="Toggle menu" aria-expanded="false" className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
