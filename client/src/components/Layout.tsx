import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import PreLoader from "./PreLoader";

function Layout() {
  const [preLoading, setPreLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPreLoading(false);
    }, 2000);
  }, []);
  return preLoading ? (
    <PreLoader />
  ) : (
    <>
      <main className="w-[90%] m-auto overflow-hidden lg:w-[80%]">
        <NavBar />
        <section className=" m-auto overflow-hidden">
          <Outlet />
        </section>
        <Footer />
      </main>
    </>
  );
}

export default Layout;
