import { Link } from "react-router-dom";
import Icon from "./Icon";

/**
 * Reusable button.
 * variant: primary | secondary | outline | ghost | white
 * size: sm | md | lg
 * to → renders a router <Link>; href → renders <a>; else <button>
 * icon: name from the icon set (rendered after the label)
 */
export default function Button({
  variant = "primary",
  size = "md",
  to,
  href,
  icon,
  block = false,
  className = "",
  children,
  ...rest
}) {
  const cls = [
    "btn",
    `btn-${variant}`,
    size !== "md" && `btn-${size}`,
    block && "btn-block",
    className
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {icon && <Icon name={icon} />}
    </>
  );

  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{content}</a>;
  return <button className={cls} {...rest}>{content}</button>;
}
