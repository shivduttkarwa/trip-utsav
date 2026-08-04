import { SITE } from "../../data/site";
import Icon from "../../components/Icon";
import Reveal from "../../components/Reveal";
import "./ContactChannels.css";

/* Three lines into the studio, each with its honest response time — the
   status row is the promise, the card is just where it is written down. */
const CHANNELS = [
  { icon: "phone", tone: "call", tag: "Line 01", status: "Answering now", title: "Call Us", line1: SITE.phone, line2: "Mon–Sat, 9:30 AM – 7:30 PM", href: SITE.phoneHref, cta: "Call now" },
  { icon: "whatsapp", tone: "wa", tag: "Line 02", status: "Replies in minutes", title: "WhatsApp", line1: "Fastest replies, 24×7", line2: "Trip support & quick quotes", href: SITE.whatsapp, cta: "Start chat" },
  { icon: "mail", tone: "mail", tag: "Line 03", status: "Within 4 working hours", title: "Email", line1: SITE.email, line2: "For documents & detailed briefs", href: `mailto:${SITE.email}`, cta: "Write to us" }
];

export default function ContactChannels() {
  return (
    <section className="section-tight">
      <div className="container cc-grid">
        {CHANNELS.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1}>
            <a
              className={`cc-card cc--${c.tone}`}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              <div className="cc-head" aria-hidden="true">
                <span>{c.tag}</span>
                <span className="cc-status">{c.status}</span>
              </div>
              <div className="cc-body">
                <span className="cc-ico"><Icon name={c.icon} /></span>
                <div>
                  <h3>{c.title}</h3>
                  <p><b>{c.line1}</b><br />{c.line2}</p>
                </div>
              </div>
              <span className="cc-cta">{c.cta} <Icon name="arrow" /></span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
