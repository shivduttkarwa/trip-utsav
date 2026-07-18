import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal wrapper.
 * variant: up (default) | left | right | zoom
 * delay: seconds (use with index * 0.09 for stagger)
 * as: element/tag to render
 */
export default function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const variantCls = variant === "up" ? "" : ` reveal-${variant}`;
  return (
    <Tag
      ref={ref}
      className={`reveal${variantCls}${inView ? " in" : ""} ${className}`.trim()}
      style={delay ? { "--delay": `${delay}s` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
