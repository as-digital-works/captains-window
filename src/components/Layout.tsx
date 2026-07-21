import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { FacilityModal } from "./FacilityModal";
import { FacilityModalProvider } from "../context/FacilityModalContext";

export function Layout() {
  return (
    <FacilityModalProvider>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FacilityModal />
    </FacilityModalProvider>
  );
}
