import { ICONS } from "./icons";

/* Renders an inline SVG from the icon set.
   display:contents keeps the wrapper out of layout so CSS like
   `.btn svg` keeps working exactly as designed. */
export default function Icon({ name }) {
  const svg = ICONS[name];
  if (!svg) return null;
  return (
    <span
      style={{ display: "contents" }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
