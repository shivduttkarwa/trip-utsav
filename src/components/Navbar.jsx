import { useEffect, useRef, useState } from "react";
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

const DESKTOP_MENUS = [
  {
    id: "destinations",
    label: "Destinations",
    eyebrow: "Explore the world",
    title: "Where will the celebration take you?",
    description: "Hand-picked places, local insight and journeys shaped around the way you love to travel.",
    cta: { to: "/destinations", label: "View every destination" },
    groups: [
      {
        title: "India",
        links: ["Kashmir", "Kerala", "Goa", "Rajasthan", "Ladakh", "Andaman"].map((label) => ({
          label,
          to: `/packages?search=${encodeURIComponent(label)}`,
        })),
      },
      {
        title: "Beyond India",
        links: ["Bali", "Dubai", "Thailand", "Singapore", "Maldives", "Europe"].map((label) => ({
          label,
          to: `/packages?search=${encodeURIComponent(label)}`,
        })),
      },
    ],
    spotlight: {
      kicker: "Trending escape",
      title: "Maldives, made effortless",
      copy: "Private villas, blue lagoons and every detail arranged.",
      to: "/packages?search=Maldives",
      image: "/images/hero/hero-maldives-4k.webp",
    },
  },
  {
    id: "packages",
    label: "Packages",
    eyebrow: "Travel your way",
    title: "A trip for every kind of traveller.",
    description: "Start with one of our most-loved collections, then make every detail completely yours.",
    cta: { to: "/packages", label: "Browse all packages" },
    groups: [
      {
        title: "By travel style",
        links: [
          { label: "Weekend Escapes", to: "/packages?search=weekend" },
          { label: "Honeymoons", to: "/packages?search=honeymoon" },
          { label: "Family Holidays", to: "/packages?search=family" },
          { label: "Adventure Trips", to: "/packages?search=adventure" },
        ],
      },
      {
        title: "Popular collections",
        links: [
          { label: "Domestic Getaways", to: "/packages?category=domestic" },
          { label: "International Tours", to: "/packages?category=international" },
          { label: "Luxury Journeys", to: "/packages?search=luxury" },
          { label: "Nature & Mountains", to: "/packages?search=mountain" },
        ],
      },
    ],
    spotlight: {
      kicker: "Indian favourite",
      title: "The valleys of Kashmir",
      copy: "Alpine mornings, river trails and stays full of warmth.",
      to: "/packages?search=Kashmir",
      image: "/images/hero/hero-kashmir-4k.webp",
    },
  },
  {
    id: "services",
    label: "Services",
    eyebrow: "Travel, beautifully handled",
    title: "From the first idea to the flight home.",
    description: "One thoughtful team for planning, booking and support throughout your journey.",
    cta: { to: "/services", label: "Explore our services" },
    groups: [
      {
        title: "We arrange",
        links: [
          { label: "Custom Itineraries", to: "/services" },
          { label: "Flights & Transfers", to: "/services" },
          { label: "Hotels & Villas", to: "/services" },
          { label: "Visa Assistance", to: "/services" },
        ],
      },
      {
        title: "Plan with confidence",
        links: [
          { label: "Talk to a Travel Expert", to: "/contact" },
          { label: "Group Travel", to: "/contact" },
          { label: "Corporate Journeys", to: "/contact" },
          { label: "24/7 Trip Support", to: "/services" },
        ],
      },
    ],
    spotlight: {
      kicker: "Made for you",
      title: "Your trip, not a template",
      copy: "Tell us your pace, passions and budget. We will shape the rest.",
      to: "/contact",
      image: "/images/hero/hero-bali-4k.webp",
    },
  },
  {
    id: "company",
    label: "Company",
    eyebrow: "Meet Trip Utsav",
    title: "Travel planned with the care of a friend.",
    description: "Discover the people, principles and personal service behind every Trip Utsav journey.",
    cta: { to: "/about", label: "Read our story" },
    groups: [
      {
        title: "Discover",
        links: [
          { label: "About Trip Utsav", to: "/about" },
          { label: "Why Travel With Us", to: "/about#why-us" },
          { label: "Our Services", to: "/services" },
          { label: "Contact Us", to: "/contact" },
        ],
      },
      {
        title: "Speak with us",
        links: [
          { label: SITE.phone, href: SITE.phoneHref },
          { label: SITE.email, href: `mailto:${SITE.email}` },
          { label: "Chat on WhatsApp", href: SITE.whatsapp, external: true },
        ],
      },
    ],
    spotlight: {
      kicker: "Our promise",
      title: "Personal from hello to home",
      copy: "Real experts, honest advice and support whenever you need it.",
      to: "/about",
      image: "/images/hero/hero-kerala-4k.webp",
    },
  },
];

/* Pages whose first element sits behind the transparent bar. Anywhere else
   (e.g. 404) the bar has to be solid from the top, or the white logo and
   burger land on white. */
const HERO_SELECTOR = ".hero, .page-hero, .detail-hero";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [noHero, setNoHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [desktopPanel, setDesktopPanel] = useState(null);
  const closeTimer = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close the overlay on every route change */
  useEffect(() => {
    setOpen(false);
    setDesktopPanel(null);
  }, [location.pathname]);

  /* after the route's markup is committed, see if anything dark is behind us */
  useEffect(() => {
    setNoHero(!document.querySelector(HERO_SELECTOR));
  }, [location.pathname]);

  /* lock body scroll while the overlay is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1021px)");
    const syncNavigationMode = () => {
      if (desktop.matches) setOpen(false);
      else setDesktopPanel(null);
    };
    syncNavigationMode();
    desktop.addEventListener("change", syncNavigationMode);
    return () => desktop.removeEventListener("change", syncNavigationMode);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setDesktopPanel(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  const close = () => setOpen(false);
  const showDesktopPanel = (id) => {
    window.clearTimeout(closeTimer.current);
    setDesktopPanel(id);
  };
  const queueDesktopClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setDesktopPanel(null), 150);
  };
  const closeDesktopPanel = () => {
    window.clearTimeout(closeTimer.current);
    setDesktopPanel(null);
  };

  const renderMegaLink = (item) => {
    const content = <><span>{item.label}</span><span aria-hidden="true">↗</span></>;
    if (item.href) {
      return (
        <a
          key={item.label}
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          onClick={closeDesktopPanel}
        >
          {content}
        </a>
      );
    }
    return <Link key={item.label} to={item.to} onClick={closeDesktopPanel}>{content}</Link>;
  };

  return (
    <>
      <nav className={`navbar${scrolled || noHero ? " scrolled" : ""}${open ? " menu-open" : ""}`}>
        <div className="container">
          <Link
            className="brand"
            to="/"
            aria-label="Trip Utsav home"
            onClick={() => {
              close();
              /* already home — the route won't change, so scroll instead */
              if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img src="/trip-utsav-logo.svg" alt="Trip Utsav" />
          </Link>

          <div
            className="desktop-nav-wrap"
            onMouseEnter={() => window.clearTimeout(closeTimer.current)}
            onMouseLeave={queueDesktopClose}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) closeDesktopPanel();
            }}
          >
            <div className="desktop-nav" aria-label="Main navigation">
              <Link
                className={`desktop-nav-link${location.pathname === "/" ? " is-current" : ""}`}
                to="/"
                onMouseEnter={closeDesktopPanel}
                onFocus={closeDesktopPanel}
                onClick={closeDesktopPanel}
              >
                Home
              </Link>
              {/* Links, not buttons: hover/focus still opens the panel, but a
                  click now goes to the section's own landing page rather than
                  just toggling the panel shut. */}
              {DESKTOP_MENUS.map((menu) => (
                <Link
                  key={menu.id}
                  to={menu.cta.to}
                  className={
                    `desktop-nav-link desktop-nav-trigger` +
                    `${desktopPanel === menu.id ? " is-open" : ""}` +
                    `${location.pathname === menu.cta.to ? " is-current" : ""}`
                  }
                  aria-expanded={desktopPanel === menu.id}
                  aria-controls={`mega-${menu.id}`}
                  onMouseEnter={() => showDesktopPanel(menu.id)}
                  onFocus={() => showDesktopPanel(menu.id)}
                  onClick={closeDesktopPanel}
                >
                  {menu.label}
                  <span className="desktop-nav-chevron" aria-hidden="true" />
                </Link>
              ))}
              <Link
                className={`desktop-nav-link${location.pathname === "/contact" ? " is-current" : ""}`}
                to="/contact"
                onMouseEnter={closeDesktopPanel}
                onFocus={closeDesktopPanel}
                onClick={closeDesktopPanel}
              >
                Contact
              </Link>
            </div>

            <div className={`mega-layer${desktopPanel ? " has-open" : ""}`}>
              {DESKTOP_MENUS.map((menu) => (
                <section
                  id={`mega-${menu.id}`}
                  key={menu.id}
                  className={`mega-panel${desktopPanel === menu.id ? " is-open" : ""}`}
                  aria-hidden={desktopPanel !== menu.id}
                  onMouseEnter={() => showDesktopPanel(menu.id)}
                >
                  <div className="container mega-grid">
                    <div className="mega-intro">
                      <span className="mega-eyebrow">{menu.eyebrow}</span>
                      <h2>{menu.title}</h2>
                      <p>{menu.description}</p>
                      <Link className="mega-intro-link" to={menu.cta.to} onClick={closeDesktopPanel}>
                        {menu.cta.label} <Icon name="arrow" />
                      </Link>
                    </div>

                    {menu.groups.map((group) => (
                      <div className="mega-group" key={group.title}>
                        <h3>{group.title}</h3>
                        <div className="mega-links">
                          {group.links.map(renderMegaLink)}
                        </div>
                      </div>
                    ))}

                    <Link
                      className="mega-spotlight"
                      style={{ "--spotlight-image": `url("${menu.spotlight.image}")` }}
                      to={menu.spotlight.to}
                      onClick={closeDesktopPanel}
                    >
                      <span>{menu.spotlight.kicker}</span>
                      <strong>{menu.spotlight.title}</strong>
                      <p>{menu.spotlight.copy}</p>
                      <i aria-hidden="true"><Icon name="arrow" /></i>
                    </Link>
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Outside .desktop-nav-wrap so the nav can centre between the brand
              and this, rather than the whole group hugging the right edge. */}
          <Link
            className="desktop-nav-cta"
            to="/contact"
            onMouseEnter={closeDesktopPanel}
            onFocus={closeDesktopPanel}
            onClick={closeDesktopPanel}
          >
            Plan my trip <Icon name="arrow" />
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
