import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS, SITE } from "../data/site";
import { useUI } from "./UIContext";
import Icon from "./Icon";
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
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar-group">
            <a href={SITE.phoneHref}><Icon name="phone" /> {SITE.phone}</a>
            <a href={`mailto:${SITE.email}`} className="hide-mobile"><Icon name="mail" /> {SITE.email}</a>
          </div>
          <div className="topbar-group">
            <span className="hide-mobile"><Icon name="clock" /> Mon–Sat · 9:30 AM – 7:30 PM</span>
            <Link to="/contact"><Icon name="headset" /> 24×7 Trip Support</Link>
          </div>
        </div>
      </div>

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
    </>
  );
}
