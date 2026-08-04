import { FALLBACK_IMG, IMG } from "../../data/packages";
import Button from "../../components/Button";
import Reveal from "../../components/Reveal";
import { useUI } from "../../components/UIContext";
import "./FirstEntry.css";

/* The founder — same portrait the crew pass below carries. */
const FOUNDER = IMG("photo-1560250097-0b93528c311a", 900);

const onImgError = (e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; };

/* THE FOUNDING STORY, TWO COLUMNS, EDITORIAL.
 *
 * Photograph on one side, type on the other, and the hierarchy carried by
 * scale alone: the father's sentence is the biggest thing in the text
 * column, set as a pull-quote between two hairlines the way a magazine
 * would run it. The only mark on the photograph is a mono place-and-date
 * tag. No paper, no prop. */
export default function FirstEntry() {
  const { openEnquiry } = useUI();

  return (
    <section className="section">
      <div className="container fe2">
        <Reveal className="fe2-media" variant="left">
          <img src={FOUNDER} alt="James Carter, founder of VoyageNest" onError={onImgError} />
          <span className="fe2-tag" aria-hidden="true">James Carter · Founder & Chief Explorer</span>
        </Reveal>

        <Reveal className="fe2-body" variant="right">
          <span className="eyebrow">Page 01 · The First Entry</span>
          <h2 className="display-2 fe2-title">Nineteen People, One Houseboat</h2>
          <p className="lead">
            In December 2014, our founder took on the hardest clients of his life: his own
            family — nineteen people across three generations, one houseboat, his parents'
            fortieth wedding anniversary.
          </p>

          <blockquote className="fe2-quote">
            "Forty years — and this is the first week the whole family has belonged to
            each other."
            <cite>his father · the last evening aboard</cite>
          </blockquote>

          <p className="fe2-close">
            VoyageNest was registered three months later and named for that evening: the
            <b> voyage</b> is the week away, the <b>nest</b> is what a family becomes on
            deck.
          </p>

          <Button icon="arrow" onClick={() => openEnquiry()}>Plan a Trip With Us</Button>
        </Reveal>
      </div>
    </section>
  );
}
