import { Outlet } from "react-router-dom";

import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";
import Topbar from "../../components/Layout/Topbar";
import ModalOverlay from "../../components/ui/ModalOverlay";

const RootLayout = () => {
  return (
    <>
      <ModalOverlay />
      <Navbar />
      <Topbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
