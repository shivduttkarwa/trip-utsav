import Icon from "../../components/Icon";
import Reveal from "../../components/Reveal";
import SectionHead from "../../components/SectionHead";
import "./CustomsDeclaration.css";

/* The company's values, sworn on a customs declaration form. */
const DECLARATIONS = [
  { title: "People Before Margins", text: "If the cheaper hotel is the better hotel, that is the one in your quote. Commission has never chosen a room for us." },
  { title: "The Whole Truth, On Paper", text: "Line-item pricing, real photographs, honest trade-offs. Surprises belong in trips, never in invoices." },
  { title: "Every Trip Is an Occasion", text: "Birthdays get cake, anniversaries get décor on the bed, first flights get the window seat. Always have." },
  { title: "We Stay On the Hook", text: "When something breaks mid-journey we fix it first and settle the paperwork later. Your holiday outranks our ledger." }
];

export default function CustomsDeclaration() {
  return (
    <section className="section bg-surface">
      <div className="container">
        <SectionHead
          layout="center"
          eyebrow="Customs"
          title="Nothing to Declare, Except…"
          text="Four things we carry through every border, and have never once paid duty on."
        />
        <Reveal className="ab-form">
          <div className="ab-form-head">
            <span>Customs Declaration</span>
            <span>Form TU-04 · Rev. 2026</span>
          </div>
          <p className="ab-form-intro">
            The undersigned, travelling on behalf of 25,000 guests, declares the following —
            and nothing else:
          </p>
          <div className="ab-form-rows">
            {DECLARATIONS.map((d) => (
              <div className="ab-decl" key={d.title}>
                <span className="ab-box" aria-hidden="true"><Icon name="check" /></span>
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ab-form-foot">
            <div className="ab-sign">
              <span className="ab-sign-name">James Carter</span>
              <small>Signature of the undersigned</small>
            </div>
            <span className="ab-form-seal" aria-hidden="true">VoyageNest · Est. 2014 · Indore</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
