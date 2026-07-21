import { useEffect, useRef, useState } from "react";

/**
 * Hero headline word that cycles through synonyms with a modern two-way swap:
 * the outgoing word blurs up and out while the incoming word springs in from
 * below. A hidden sizer reserves the width of the longest word so surrounding
 * copy never reflows. Honours prefers-reduced-motion (stays on first word).
 */
export default function RotatingWord({ words, interval = 2600 }) {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState(null);
  const iRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      const next = (iRef.current + 1) % words.length;
      setPrev(iRef.current);
      iRef.current = next;
      setI(next);
    }, interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className="rotator-wrap">
      <span className="rotator-sizer" aria-hidden="true">{longest}</span>
      {prev !== null && prev !== i && (
        <em className="rotator rotator-out" key={`out-${prev}`} aria-hidden="true">{words[prev]}</em>
      )}
      <em className="rotator rotator-in" key={`in-${i}`}>{words[i]}</em>
    </span>
  );
}
