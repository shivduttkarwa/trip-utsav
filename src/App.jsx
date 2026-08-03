import { useLayoutEffect } from "react";
import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { UIProvider } from "./components/UIContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EnquiryModal from "./components/EnquiryModal";
import { ToastHost, FloatingButtons, Preloader } from "./components/Chrome";
import MagicFX from "./components/MagicFX";

import Home from "./pages/Home";
import Packages from "./pages/Packages";
import PackageDetail from "./pages/PackageDetail";
import Destinations from "./pages/Destinations";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

/* Keep disabled during the testing phase; switch to true for launch. */
const ENABLE_PRELOADER = false;

/* Jump to top when a link is followed — and only then. */
function ScrollToTop() {
  const { pathname, search } = useLocation();
  const navType = useNavigationType();

  /* Two things here are deliberate, and both are why this used to fail.
   *
   * `behavior: "instant"` rather than the two-argument scrollTo: base.css sets
   * `html { scroll-behavior: smooth }`, and that governs PROGRAMMATIC scrolls
   * as well as user ones — so `window.scrollTo(0, 0)` animated. An animated
   * scroll launched at the moment one route unmounts and another mounts is
   * racing the layout it is travelling through, and the document changing
   * height under it cancels it outright. Landing part-way down a new page was
   * the visible result, and it showed up worst on links in the footer, the one
   * place you click from the very bottom of a long page.
   *
   * useLayoutEffect rather than useEffect: this runs before the browser paints
   * the new route, so the page is never shown scrolled and then corrected.
   * It matters more with `v7_startTransition` on in main.jsx, which lets the
   * route render be deferred.
   *
   * Keyed on the QUERY as well as the path. Half the links on this site differ
   * only after the `?` — the footer index is all /packages?search=…, the
   * Explore column is /packages?category=… — so going from one to the next
   * never changes the pathname, and a pathname-only dependency left you
   * standing in the footer of a page that had silently re-filtered above you.
   *
   * PUSH only, which is what makes keying on the query safe. Packages.jsx
   * writes its own filter changes with { replace: true }, so tightening a
   * search from inside the page is a REPLACE and is left alone — otherwise
   * every keystroke of filtering would yank the visitor to the top, away from
   * the controls they are using. POP is back/forward, where the browser's own
   * restored position is the right answer and better than ours. */
  useLayoutEffect(() => {
    if (navType !== "PUSH") return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search, navType]);

  return null;
}

export default function App() {
  return (
    <UIProvider>
      {ENABLE_PRELOADER && <Preloader />}
      <ScrollToTop />
      <MagicFX />
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
