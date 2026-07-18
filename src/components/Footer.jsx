import { Link } from "react-router-dom";
import { SITE } from "../data/site";
import { useUI } from "./UIContext";
import Icon from "./Icon";
import Button from "./Button";

const EXPLORE = [
  { to: "/packages?category=domestic", label: "Domestic Packages" },
  { to: "/packages?category=international", label: "International Packages" },
  { to: "/destinations", label: "Destinations" },
  { to: "/services", label: "Our Services" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" }
];

const POPULAR = [
  { to: "/package/kashmir-paradise", label: "Kashmir Paradise" },
  { to: "/package/bali-bliss", label: "Bali Bliss" },
  { to: "/package/maldives-luxury", label: "Maldives Luxury" },
  { to: "/package/europe-highlights", label: "European Highlights" },
  { to: "/package/ladakh-expedition", label: "Leh–Ladakh" }
];

export default function Footer() {
  const { showToast } = useUI();

  const onNewsletter = (e) => {
    e.preventDefault();
    const email = e.target.elements.email;
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      email.focus();
      showToast("Please enter a valid email address");
      return;
    }
    e.target.reset();
    showToast("You're in! Deals landing in your inbox soon ✈️");
  };

  return (
    <footer className="footer">
      <div className="footer-cta">
        <div className="container">
          <div>
            <h3>Get deals before everyone else ✈️</h3>
            <p>Join 25,000+ travellers receiving hand-picked offers every week.</p>
          </div>
          <form className="newsletter" onSubmit={onNewsletter} noValidate>
            <input type="email" name="email" placeholder="Enter your email address" aria-label="Email address" />
            <Button size="sm" icon="arrow" type="submit">Subscribe</Button>
          </form>
        </div>
      </div>

      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/logo.svg" alt="Trip Utsav" />
            <p>
              Travel More, Celebrate Life. We craft journeys across India and the world — from
              weekend escapes to grand honeymoons — with the care of a friend and the precision
              of a pro.
            </p>
            <div className="socials">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7h2.4l.5-3h-2.9V9.1c0-.9.3-1.6 1.7-1.6H16V4.8c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9V11H7.5v3H10v7z" /></svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.5.4 7.8.4 7.8.4s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8l5.2 3.2Z" /></svg>
              </a>
              <a href={SITE.whatsapp} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" />
              </a>
            </div>
          </div>

          <div>
            <h4>Explore</h4>
            <ul className="footer-links">
              {EXPLORE.map((l) => (
                <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Popular Trips</h4>
            <ul className="footer-links">
              {POPULAR.map((l) => (
                <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Get in Touch</h4>
            <ul className="footer-contact">
              <li><Icon name="pin" /><span>{SITE.address}</span></li>
              <li><Icon name="phone" /><a href={SITE.phoneHref}>{SITE.phone}</a></li>
              <li><Icon name="mail" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <span>© {new Date().getFullYear()} Trip Utsav. All rights reserved. Travel More, Celebrate Life.</span>
          <div className="legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
