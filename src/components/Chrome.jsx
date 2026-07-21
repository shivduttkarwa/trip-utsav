import { useEffect, useState } from "react";
import { useUI } from "./UIContext";
import { SITE } from "../data/site";
import Icon from "./Icon";

/* Toast, WhatsApp float, back-to-top and the one-time preloader */

export function ToastHost() {
  const { toast } = useUI();
  return (
    <div className={`toast${toast.show ? " show" : ""}`} role="status">
      <Icon name="check" />
      <span>{toast.msg}</span>
    </div>
  );
}

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a className="wa-float" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <Icon name="whatsapp" />
      </a>
      <button
        className={`to-top${showTop ? " show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <Icon name="up" />
      </button>
    </>
  );
}

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`preloader${done ? " done" : ""}`} aria-hidden={done}>
      <div className="preloader-inner">
        <span className="preloader-kicker">Travel More · Celebrate Life</span>
        <div className="preloader-word">Trip <em>Utsav</em></div>
        <div className="preloader-line"><span></span></div>
      </div>
    </div>
  );
}
