import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon";
import "../styles/select.css";

/* Custom select, replacing every native <select> on the site.
 *
 * The listbox is PORTALLED to <body> and positioned fixed rather than rendered
 * next to its trigger. That is not decoration: .modal sets `overflow: auto`, so
 * an in-flow popup would be clipped by the modal's own scroll box, and
 * .filter-bar is a sticky z-index:500 layer that a sibling popup would have to
 * fight. Positioning against the trigger's viewport rect sidesteps both, and
 * means one component works unchanged in the hero card, the filter bar and the
 * modal.
 *
 * Focus never leaves the trigger — the button owns `aria-activedescendant` and
 * the options are only ever pointed at, which is the standard combobox pattern
 * and keeps Escape/Tab behaviour predictable.
 *
 * Variants: "field" (bordered box, forms), "pill" (filter bar),
 * "bare" (hero search card, where .control already draws the box). */

const MAX_POP = 260;   // px; keep in step with .tu-select-pop max-height

export default function Select({
  value,
  onChange,
  options,
  ariaLabel,
  placeholder = "Select",
  variant = "field",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [pos, setPos] = useState(null);
  const btnRef = useRef(null);
  const popRef = useRef(null);
  const typed = useRef({ buf: "", at: 0 });
  const uid = useId();

  const selected = options.findIndex((o) => o.value === value);
  const label = selected >= 0 ? options[selected].label : placeholder;
  const listId = `${uid}-list`;
  const optId = (i) => `${uid}-opt-${i}`;

  /* Flip above the trigger when the space below can't hold the list. */
  const place = useCallback(() => {
    const b = btnRef.current?.getBoundingClientRect();
    if (!b) return;
    const below = window.innerHeight - b.bottom;
    const drop = below >= Math.min(MAX_POP, options.length * 42 + 12) || below >= b.top;
    setPos({
      left: b.left,
      width: b.width,
      ...(drop ? { top: b.bottom + 6 } : { bottom: window.innerHeight - b.top + 6 }),
      maxHeight: Math.min(MAX_POP, (drop ? below : b.top) - 16),
    });
  }, [options.length]);

  useLayoutEffect(() => {
    if (!open) return;
    place();
    // Capture phase so scrolling ANY ancestor (the modal, the page) re-places it.
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open, place]);

  // Dismiss on a press anywhere outside the trigger or the list.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!btnRef.current?.contains(e.target) && !popRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the highlighted row in view while arrowing.
  useEffect(() => {
    if (!open || active < 0) return;
    popRef.current?.querySelector(`#${CSS.escape(optId(active))}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const commit = (i) => {
    onChange(options[i].value);
    setOpen(false);
    btnRef.current?.focus();
  };

  const openAt = (i) => {
    setActive(i);
    setOpen(true);
  };

  const onKeyDown = (e) => {
    const last = options.length - 1;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openAt(selected >= 0 ? selected : 0);
      }
      return;
    }
    switch (e.key) {
      case "Escape":   e.preventDefault(); setOpen(false); break;
      case "Tab":      setOpen(false); break;
      case "ArrowDown":e.preventDefault(); setActive((i) => (i >= last ? 0 : i + 1)); break;
      case "ArrowUp":  e.preventDefault(); setActive((i) => (i <= 0 ? last : i - 1)); break;
      case "Home":     e.preventDefault(); setActive(0); break;
      case "End":      e.preventDefault(); setActive(last); break;
      case "Enter":
      case " ":        e.preventDefault(); if (active >= 0) commit(active); break;
      default:
        // Type-ahead: letters within 700ms build one search string.
        if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return;
        {
          const now = Date.now();
          typed.current.buf = now - typed.current.at > 700 ? e.key : typed.current.buf + e.key;
          typed.current.at = now;
          const hit = options.findIndex((o) =>
            o.label.toLowerCase().startsWith(typed.current.buf.toLowerCase())
          );
          if (hit >= 0) setActive(hit);
        }
    }
  };

  return (
    <div className={`tu-select tu-select--${variant}${open ? " is-open" : ""} ${className}`.trim()}>
      <button
        ref={btnRef}
        type="button"
        className={`tu-select-btn${selected < 0 ? " is-placeholder" : ""}`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        aria-activedescendant={open && active >= 0 ? optId(active) : undefined}
        onClick={() => (open ? setOpen(false) : openAt(selected >= 0 ? selected : 0))}
        onKeyDown={onKeyDown}
      >
        <span>{label}</span>
        <i className="tu-select-caret" aria-hidden="true" />
      </button>

      {open && pos && createPortal(
        <ul ref={popRef} id={listId} role="listbox" aria-label={ariaLabel} className="tu-select-pop" style={pos}>
          {options.map((o, i) => (
            <li
              key={o.value}
              id={optId(i)}
              role="option"
              aria-selected={i === selected}
              className={
                `tu-select-opt${i === active ? " is-active" : ""}` +
                `${i === selected ? " is-selected" : ""}`
              }
              onMouseEnter={() => setActive(i)}
              onClick={() => commit(i)}
            >
              <span>{o.label}</span>
              {i === selected && <Icon name="check" />}
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
}
