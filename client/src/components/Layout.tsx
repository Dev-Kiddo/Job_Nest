import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <main className="w-[90%] m-auto overflow-hidden">
        <NavBar />
        <section className="w-[80%] m-auto overflow-hidden">
          <Outlet />
        </section>
        <Footer />
      </main>
    </>
  );
}

export default Layout;
