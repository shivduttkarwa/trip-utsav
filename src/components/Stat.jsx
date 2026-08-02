import useCountUp from "./useCountUp";

/* Animated counter block, used on the About page. The homepage renders the same
   figures with its own markup — the counting itself is shared. */
export default function Stat({ value, suffix = "+", label, decimals = 0 }) {
  const [ref, display] = useCountUp(value, decimals);

  return (
    <div className="stat" ref={ref}>
      <div className="stat-num">
        {display}
        <span className="suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
