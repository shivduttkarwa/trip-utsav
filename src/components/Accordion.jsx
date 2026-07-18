import { useState } from "react";

/**
 * Reusable accordion.
 * items: [{ title, body, day? }] — `day` renders the itinerary "Day N" chip.
 * One item open at a time; first open by default when defaultOpen=0.
 */
export default function Accordion({ items, defaultOpen = -1 }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`acc-item${isOpen ? " open" : ""}`} key={i}>
            <button
              className="acc-head"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span>
                {item.day && <span className="tl-day" style={{ display: "block" }}>{item.day}</span>}
                {item.title}
              </span>
              <span className="acc-icon">+</span>
            </button>
            <div className="acc-body" style={{ maxHeight: isOpen ? "400px" : 0 }}>
              <div className="acc-body-inner">{item.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
