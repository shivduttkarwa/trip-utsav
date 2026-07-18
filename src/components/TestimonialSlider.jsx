import { useCallback, useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "../data/packages";
import Icon from "./Icon";

function perView() {
  if (typeof window === "undefined") return 3;
  return window.innerWidth >= 1180 ? 3 : window.innerWidth >= 821 ? 2 : 1;
}

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [view, setView] = useState(perView);
  const touchX = useRef(0);
  const maxIndex = Math.max(0, TESTIMONIALS.length - view);

  useEffect(() => {
    const onResize = () => setView(perView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const go = useCallback(
    (i) => setIndex(Math.max(0, Math.min(i, maxIndex))),
    [maxIndex]
  );

  /* autoplay */
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(t);
  }, [paused, maxIndex]);

  return (
    <div
      className="testi-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="testi-viewport">
        <div
          className="testi-track"
          style={{ transform: `translateX(-${index * (100 / view)}%)` }}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
          }}
        >
          {TESTIMONIALS.map((t) => (
            <div className="testi-slide" key={t.name}>
              <div className="testi-card">
                <span className="quote-mark">“</span>
                <p>{t.text}</p>
                <div className="testi-author">
                  <span className="avatar">{t.name.charAt(0)}</span>
                  <div>
                    <strong>{t.name}</strong>
                    <small>{t.trip}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="slider-dots">
        {TESTIMONIALS.slice(0, maxIndex + 1).map((_, i) => (
          <button
            key={i}
            className={i === index ? "active" : ""}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
          />
        ))}
      </div>

      <div className="slider-nav" style={{ position: "absolute", top: "-86px", right: 0 }}>
        <button className="slider-btn" onClick={() => go(index - 1)} aria-label="Previous">
          <Icon name="arrowLeft" />
        </button>
        <button className="slider-btn" onClick={() => go(index + 1)} aria-label="Next">
          <Icon name="arrow" />
        </button>
      </div>
    </div>
  );
}
