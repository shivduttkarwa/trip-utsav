import { useState } from "react";
import { SITE } from "../../data/site";
import { useUI } from "../../components/UIContext";
import Icon from "../../components/Icon";
import Reveal from "../../components/Reveal";
import SectionHead from "../../components/SectionHead";
import Select from "../../components/Select";
import "./ContactPostcard.css";

/* THE ENQUIRY FORM IS A POSTCARD.
 *
 * Travellers' reviews arrive on this site as postcards home; the trip itself
 * starts with the first one — written to us. So the form is laid out as one:
 * an airmail-striped border, the message written by hand on ruled lines to
 * the left of the divider, the sender's details and our address on the
 * right, and where a postcard keeps its stamp, the submit button — a dashed
 * "affix to send" outline that inks itself into a proper stamp on hover.
 * Nothing on the card is chrome: every part of a real postcard is doing this
 * form's actual job. */

/* Value === label: the native <option>s had no value attribute, so the
   submitted string was the visible text. */
const SUBJECTS = [
  { value: "", label: "General enquiry" },
  ...["New trip enquiry", "Existing booking", "Visa assistance", "Group / corporate travel", "Feedback"]
    .map((l) => ({ value: l, label: l })),
];

const EMPTY = { name: "", phone: "", email: "", subject: "", message: "" };

export default function ContactPostcard() {
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
    showToast("Postcard sent! We'll write back within 4 working hours.");
  };

  return (
    <section className="section bg-surface">
      <div className="container">
        <SectionHead
          layout="center"
          eyebrow="The Enquiry"
          title="Write Us a Postcard"
          text="The more you share, the better the first draft of your itinerary."
        />
        <Reveal className="cp-card" variant="zoom">
          <form className="cp-grid" onSubmit={submit} noValidate>
            {/* the message half — written by hand, on ruled lines */}
            <div className={`cp-msg${errors.message ? " is-error" : ""}`}>
              <span className="cp-dear" aria-hidden="true">Dear VoyageNest,</span>
              <textarea
                value={form.message}
                onChange={set("message")}
                aria-label="Message"
                placeholder="Destination, dates, headcount, budget — anything and everything…"
              />
              <span className="cp-err">Please write a short message</span>
            </div>

            <div className="cp-divider" aria-hidden="true" />

            {/* the address half — stamp, sender, recipient */}
            <div className="cp-side">
              <button type="submit" className="cp-stamp">
                <Icon name="plane" />
                <b>Send</b>
                <small>affix to send</small>
              </button>

              <div className={`cp-field${errors.name ? " is-error" : ""}`}>
                <label htmlFor="cp-name">From <i className="req">*</i></label>
                <input id="cp-name" type="text" value={form.name} onChange={set("name")} placeholder="Your name" />
                <span className="cp-err">Please enter your name</span>
              </div>
              <div className={`cp-field${errors.phone ? " is-error" : ""}`}>
                <label htmlFor="cp-phone">Phone <i className="req">*</i></label>
                <input id="cp-phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="10-digit mobile" />
                <span className="cp-err">Enter a valid phone number</span>
              </div>
              <div className={`cp-field${errors.email ? " is-error" : ""}`}>
                <label htmlFor="cp-email">Email</label>
                <input id="cp-email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
                <span className="cp-err">Enter a valid email</span>
              </div>
              <div className="cp-field">
                <label>Subject</label>
                <Select ariaLabel="Subject" options={SUBJECTS} value={form.subject} onChange={setVal("subject")} />
              </div>

              <address className="cp-to">
                <b>To</b>
                <span>VoyageNest — Trip Designers</span>
                <span>{SITE.address}</span>
              </address>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
