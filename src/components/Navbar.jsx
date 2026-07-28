import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SITE } from "../data/site";
import Icon from "./Icon";
import "../styles/navbar.css";

/* Destinations grouped by region — pills deep-link into the packages listing */
const DEST_GROUPS = [
  { region: "India", items: ["Kashmir", "Kerala", "Goa", "Rajasthan", "Ladakh", "Andaman"] },
  { region: "Asia", items: ["Bali", "Thailand", "Singapore", "Maldives"] },
  { region: "Middle East", items: ["Dubai"] },
  { region: "Europe", items: ["Europe"] },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close the overlay on every route change */
  useEffect(() => setOpen(false), [location.pathname]);

  /* lock body scroll while the overlay is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}${open ? " menu-open" : ""}`}>
        <div className="container">
          <Link className="brand" to="/" aria-label="Trip Utsav home" onClick={close}>
            <img src="/logo.svg" alt="Trip Utsav — Travel More, Celebrate Life" />
          </Link>
          <button
            className={`nav-burger${open ? " active" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`menu-overlay${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="menu-inner">
          <div className="menu-grid">
            <div className="menu-block menu-block--dest">
              <h3>Destinations</h3>
              <div className="menu-regions">
                {DEST_GROUPS.map((g) => (
                  <div className="menu-region" key={g.region}>
                    <p>{g.region}</p>
                    <div className="menu-pills">
                      {g.items.map((name) => (
                        <Link
                          key={name}
                          className="menu-pill"
                          to={`/packages?search=${encodeURIComponent(name)}`}
                          onClick={close}
                        >
                          {name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="menu-block">
              <h3>Plan Your Trip</h3>
              <ul>
                <li><Link to="/packages" onClick={close}>All Packages</Link></li>
                <li><Link to="/destinations" onClick={close}>Destinations</Link></li>
                <li><Link to="/services" onClick={close}>Services</Link></li>
                <li><Link to="/packages?category=international" onClick={close}>International Trips</Link></li>
              </ul>
            </div>

            <div className="menu-block">
              <h3>Company</h3>
              <ul>
                <li><Link to="/about" onClick={close}>Our Story</Link></li>
                <li><Link to="/contact" onClick={close}>Contact Us</Link></li>
                <li><a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></li>
              </ul>
              <div className="menu-contact">
                <a href={SITE.phoneHref}><Icon name="phone" /> {SITE.phone}</a>
                <a href={`mailto:${SITE.email}`}><Icon name="mail" /> {SITE.email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
