import { useState } from "react";
import { Link } from "react-router-dom";
import { FALLBACK_IMG, IMG } from "../data/packages";
import { SITE } from "../data/site";
import { useUI } from "../components/UIContext";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import Select from "../components/Select";

/* Value === label: the native <option>s had no value attribute, so the
   submitted string was the visible text. */
const SUBJECTS = [
  { value: "", label: "General enquiry" },
  ...["New trip enquiry", "Existing booking", "Visa assistance", "Group / corporate travel", "Feedback"]
    .map((l) => ({ value: l, label: l })),
];

const HERO = IMG("photo-1521295121783-8a321d551ad2", 2000);

const CARDS = [
  { icon: "phone", title: "Call Us", line1: SITE.phone, line2: "Mon–Sat, 9:30 AM – 7:30 PM", href: SITE.phoneHref, cta: "Call now" },
  { icon: "whatsapp", title: "WhatsApp", line1: "Fastest replies, 24×7", line2: "Trip support & quick quotes", href: SITE.whatsapp, cta: "Start chat" },
  { icon: "mail", title: "Email", line1: SITE.email, line2: "Replies within 4 working hours", href: `mailto:${SITE.email}`, cta: "Write to us" }
];

const EMPTY = { name: "", phone: "", email: "", subject: "", message: "" };

export default function Contact() {
  const { showToast } = useUI();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  /* Custom <Select> hands back a raw value, native inputs hand back an event —
     one setter, two adapters, so both clear the field's error the same way. */
  const setVal = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: false }));
  };
  const set = (key) => (e) => setVal(key)(e.target.value);

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = true;
    if (!/^[0-9+\s-]{10,15}$/.test(form.phone.trim())) er.phone = true;
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) er.email = true;
    if (!form.message.trim()) er.message = true;
    setErrors(er);
    if (Object.keys(er).length) return;
    setForm(EMPTY);
    showToast("Message sent! We'll get back to you within 4 working hours.");
  };

  return (
    <>
      <header className="page-hero">
        <div className="hero-media">
          <img src={HERO} alt="" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <nav className="breadcrumb"><Link to="/">Home</Link><span>/</span> Contact</nav>
          <Reveal as="h1" className="display-2">Say Hello, Start a Journey</Reveal>
          <Reveal as="p" delay={0.15}>
            A real human answers — usually within minutes.
          </Reveal>
        </div>
      </header>

      {/* ---------- QUICK CONTACT CARDS ---------- */}
      <section className="section-tight">
        <div className="container contact-cards">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="icon-card center">
                <div className="icon" style={{ marginInline: "auto" }}><Icon name={c.icon} /></div>
                <h3>{c.title}</h3>
                <p><b>{c.line1}</b><br />{c.line2}</p>
                <a className="link-more" style={{ justifyContent: "center", width: "100%" }} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {c.cta} <Icon name="arrow" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- FORM + ASIDE ---------- */}
      <section className="section bg-surface">
        <div className="container contact-form-wrap">
          <Reveal>
            <SectionHead
              eyebrow="Enquiry Form"
              title="Tell Us About Your Trip"
              text="The more you share, the better the first draft of your itinerary."
            />
            <form className="form-grid" onSubmit={submit} noValidate>
              <div className={`field${errors.name ? " error" : ""}`}>
                <label>Full Name <span className="req">*</span></label>
                <input type="text" value={form.name} onChange={set("name")} placeholder="Your name" />
                <span className="error-msg">Please enter your name</span>
              </div>
              <div className={`field${errors.phone ? " error" : ""}`}>
                <label>Phone <span className="req">*</span></label>
                <input type="tel" value={form.phone} onChange={set("phone")} placeholder="10-digit mobile" />
                <span className="error-msg">Enter a valid phone number</span>
              </div>
              <div className={`field${errors.email ? " error" : ""}`}>
                <label>Email</label>
                <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
                <span className="error-msg">Enter a valid email</span>
              </div>
              <div className="field">
                <label>Subject</label>
                <Select ariaLabel="Subject" options={SUBJECTS} value={form.subject} onChange={setVal("subject")} />
              </div>
              <div className={`field full${errors.message ? " error" : ""}`}>
                <label>Message <span className="req">*</span></label>
                <textarea value={form.message} onChange={set("message")} placeholder="Destination, dates, headcount, budget — anything and everything…" />
                <span className="error-msg">Please write a short message</span>
              </div>
              <div className="full">
                <Button type="submit" size="lg" icon="arrow">Send Message</Button>
              </div>
            </form>
          </Reveal>

          <Reveal variant="right">
            <div className="contact-aside">
              <h3>Visit the Studio</h3>
              <p>Walk in for chai and a whiteboard session — we love planning in person.</p>
              <ul className="footer-contact">
                <li><Icon name="pin" /><span>{SITE.address}</span></li>
                <li><Icon name="phone" /><a href={SITE.phoneHref}>{SITE.phone}</a></li>
                <li><Icon name="mail" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              </ul>
              <ul className="hours">
                <li><span>Mon – Fri</span> 9:30 AM – 7:30 PM</li>
                <li><span>Saturday</span> 10:00 AM – 6:00 PM</li>
                <li><span>Sunday</span> On-trip support only</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- MAP ---------- */}
      <section className="section-tight">
        <div className="container">
          <Reveal>
            <iframe
              className="map-frame"
              title="Trip Utsav office location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=75.83%2C22.70%2C75.90%2C22.75&layer=mapnik&marker=22.7196%2C75.8577"
              loading="lazy"
            ></iframe>
          </Reveal>
        </div>
      </section>
    </>
  );
}
