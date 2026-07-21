import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../data/site";
import { useUI } from "./UIContext";
import Button from "./Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openEnquiry } = useUI();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close the drawer on route change */
  useEffect(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, [location.pathname]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <Link className="brand" to="/" aria-label="Trip Utsav home">
            <img src="/logo.svg" alt="Trip Utsav — Travel More, Celebrate Life" />
          </Link>

          <div className={`nav-links${open ? " open" : ""}`}>
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === "/"}>
                {label}
              </NavLink>
            ))}
          </div>

          <div className="nav-cta">
            <Button size="sm" icon="arrow" onClick={() => openEnquiry()}>
              Plan My Trip
            </Button>
            <button
              className={`nav-toggle${open ? " open" : ""}`}
              onClick={toggle}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>
  );
}
