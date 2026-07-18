import { useEffect, useState } from "react";
import { useUI } from "./UIContext";
import Button from "./Button";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const EMPTY = { name: "", phone: "", email: "", destination: "", month: "", pax: "2", budget: "", message: "" };

export default function EnquiryModal() {
  const { enquiry, closeEnquiry, showToast } = useUI();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  /* pick up the package prefill each time the modal opens */
  useEffect(() => {
    if (enquiry.open) {
      setForm((f) => ({ ...f, destination: enquiry.prefill || f.destination }));
      setErrors({});
    }
  }, [enquiry.open, enquiry.prefill]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeEnquiry();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeEnquiry]);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: false }));
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = true;
    if (!/^[0-9+\s-]{10,15}$/.test(form.phone.trim())) er.phone = true;
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) er.email = true;
    setErrors(er);
    if (Object.keys(er).length) return;

    setForm(EMPTY);
    closeEnquiry();
    showToast("Enquiry sent! Our travel expert will call you within 30 minutes.");
  };

  return (
    <div
      className={`modal-overlay${enquiry.open ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiryTitle"
      onClick={(e) => e.target === e.currentTarget && closeEnquiry()}
    >
      <div className="modal">
        <div className="modal-head">
          <div>
            <h3 id="enquiryTitle">Plan My Trip</h3>
            <p>Tell us a little about your dream trip — our travel expert will call you back within 30 minutes.</p>
          </div>
          <button className="modal-close" onClick={closeEnquiry} aria-label="Close">✕</button>
        </div>

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
          <div className={`field full${errors.email ? " error" : ""}`}>
            <label>Email</label>
            <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
            <span className="error-msg">Enter a valid email</span>
          </div>
          <div className="field">
            <label>Destination / Package</label>
            <input type="text" value={form.destination} onChange={set("destination")} placeholder="e.g. Bali, Kashmir…" />
          </div>
          <div className="field">
            <label>Travel Month</label>
            <select value={form.month} onChange={set("month")}>
              <option value="">Flexible</option>
              {MONTHS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Travellers</label>
            <select value={form.pax} onChange={set("pax")}>
              {["1", "2", "3–4", "5–8", "Group (9+)"].map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Budget (per person)</label>
            <select value={form.budget} onChange={set("budget")}>
              <option value="">Not sure yet</option>
              <option>Under ₹20,000</option>
              <option>₹20,000 – ₹50,000</option>
              <option>₹50,000 – ₹1,00,000</option>
              <option>₹1,00,000+</option>
            </select>
          </div>
          <div className="field full">
            <label>Anything else?</label>
            <textarea value={form.message} onChange={set("message")} placeholder="Honeymoon? Kids? Veg meals? Tell us everything…" />
          </div>
          <div className="full">
            <Button type="submit" size="lg" block icon="arrow">Send Enquiry</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
