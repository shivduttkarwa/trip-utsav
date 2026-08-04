import { useEffect, useState } from "react";
import { useUI } from "./UIContext";
import Button from "./Button";
import Select from "./Select";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

/* Value === label for these: the native <option>s carried no value attribute,
   so the submitted string was the visible text. Kept identical so nothing
   downstream of the form has to change. */
const asOptions = (labels) => labels.map((l) => ({ value: l, label: l }));
const MONTH_OPTIONS = [{ value: "", label: "Flexible" }, ...asOptions(MONTHS)];
const PAX_OPTIONS = asOptions(["1", "2", "3–4", "5–8", "Group (9+)"]);
const BUDGET_OPTIONS = [
  { value: "", label: "Not sure yet" },
  ...asOptions(["Under ₹20,000", "₹20,000 – ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000+"]),
];

const EMPTY = { name: "", phone: "", destination: "", month: "", pax: "2", budget: "", message: "" };

export default function EnquiryModal() {
  const { enquiry, closeEnquiry, showToast } = useUI();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  /* The trip-shape fields are optional and start folded away: the promise is
     a call-back, so name + phone is the whole ask. Keen planners can open
     the rest; everyone else sends a three-field form. */
  const [more, setMore] = useState(false);

  /* pick up the package prefill each time the modal opens */
  useEffect(() => {
    if (enquiry.open) {
      setForm((f) => ({ ...f, destination: enquiry.prefill || f.destination }));
      setErrors({});
      setMore(false);
    }
  }, [enquiry.open, enquiry.prefill]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeEnquiry();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeEnquiry]);

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
            <p>A travel expert calls you back within 30 minutes.</p>
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
          <div className="field full">
            <label>Destination</label>
            <input type="text" value={form.destination} onChange={set("destination")} placeholder="e.g. Bali, Kashmir…" />
          </div>

          <button
            type="button"
            className="form-more full"
            onClick={() => setMore((m) => !m)}
            aria-expanded={more}
          >
            <i aria-hidden="true" /> {more ? "Hide trip details" : "Add trip details"} <small>(optional)</small>
          </button>

          {/* Kept mounted so the 0fr → 1fr row can animate the growth; when
              closed it is invisible AND unfocusable (visibility, not display). */}
          <div className={`form-details full${more ? " open" : ""}`}>
            <div className="form-grid form-details-inner">
              <div className="field third">
                <label>Month</label>
                <Select ariaLabel="Travel month" options={MONTH_OPTIONS} value={form.month} onChange={setVal("month")} />
              </div>
              <div className="field third">
                <label>Travellers</label>
                <Select ariaLabel="Travellers" options={PAX_OPTIONS} value={form.pax} onChange={setVal("pax")} />
              </div>
              <div className="field third">
                <label>Budget / person</label>
                <Select ariaLabel="Budget per person" options={BUDGET_OPTIONS} value={form.budget} onChange={setVal("budget")} />
              </div>
              <div className="field full">
                <label>Anything else?</label>
                <textarea value={form.message} onChange={set("message")} placeholder="Honeymoon? Kids? Veg meals? Tell us everything…" />
              </div>
            </div>
          </div>

          <div className="full">
            <Button type="submit" block icon="arrow">Send Enquiry</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
