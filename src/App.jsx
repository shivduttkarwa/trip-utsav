import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { UIProvider } from "./components/UIContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EnquiryModal from "./components/EnquiryModal";
import { ToastHost, FloatingButtons, Preloader } from "./components/Chrome";

import Home from "./pages/Home";
import Packages from "./pages/Packages";
import PackageDetail from "./pages/PackageDetail";
import Destinations from "./pages/Destinations";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

/* Jump to top on every route change (browser back/forward keeps native behaviour) */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <UIProvider>
      <Preloader />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/package/:id" element={<PackageDetail />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <EnquiryModal />
      <ToastHost />
      <FloatingButtons />
    </UIProvider>
  );
}
