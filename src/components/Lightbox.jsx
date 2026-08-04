import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon";
import "../styles/lightbox.css";

/* Full-screen image slider, hand-built like the rest of the site's controls.
 *
 * Controlled: the parent owns which image is open (`index`, null = closed)
 * and hands over `onIndex`/`onClose`. Arrow keys and swipes navigate with
 * wrap-around, Escape and the backdrop close, the body stops scrolling while
 * it is up, and focus returns to whatever opened it. Neighbours are
 * pre-fetched so the next slide never arrives as a blur. */
export default function Lightbox({ images, index, onIndex, onClose }) {
  const boxRef = useRef(null);
  const touchX = useRef(null);
  const count = images.length;

  const go = (dir) => onIndex((index + dir + count) % count);

  /* Scroll lock + focus: trap attention while open, hand it back after. */
  useEffect(() => {
    const opener = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    boxRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  /* Pre-fetch both neighbours so arrowing never waits on the network. */
  useEffect(() => {
    if (count < 2) return;
    [1, count - 1].forEach((d) => {
      const img = new Image();
      img.src = images[(index + d) % count].src;
    });
  }, [index, images, count]);

  const onKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  };

  const { src, alt } = images[index];

  return createPortal(
    <div
      ref={boxRef}
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${count}`}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <span className="lb-count" aria-hidden="true">{index + 1} / {count}</span>
      <button className="lb-close" onClick={onClose} aria-label="Close gallery">✕</button>

      {count > 1 && (
        <button className="lb-nav lb-nav--prev" onClick={() => go(-1)} aria-label="Previous photo">
          <Icon name="arrowLeft" />
        </button>
      )}

      {/* keyed so each slide re-runs the entrance fade */}
      <figure className="lb-stage" key={src}>
        <img src={src} alt={alt || ""} />
        {alt && <figcaption>{alt}</figcaption>}
      </figure>

      {count > 1 && (
        <button className="lb-nav lb-nav--next" onClick={() => go(1)} aria-label="Next photo">
          <Icon name="arrow" />
        </button>
      )}
    </div>,
    document.body
  );
}
