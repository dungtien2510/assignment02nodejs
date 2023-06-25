import { Outlet } from "react-router";
import NavBar from "../component/navbar/NavBar";
import Footer from "../component/home/homePage/footer/Footer";

function RootPage() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
export default RootPage;
