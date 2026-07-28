import { Link } from "react-router-dom";
import Icon from "./Icon";

/* Reusable icon feature card.
   Pass `to` for a route link, or `onClick` for a button action (e.g. enquiry).
   `center` applies the centered variant. */
export default function IconCard({ icon, title, text, to, onClick, linkLabel = "Learn more", center = false }) {
  const link = onClick ? (
    <button className="link-more" onClick={onClick}>{linkLabel} <Icon name="arrow" /></button>
  ) : to ? (
    <Link className="link-more" to={to}>{linkLabel} <Icon name="arrow" /></Link>
  ) : null;

  return (
    <div className={`icon-card${center ? " center" : ""}`}>
      <div className="icon"><Icon name={icon} /></div>
      <h3>{title}</h3>
      <p>{text}</p>
      {link}
    </div>
  );
}
