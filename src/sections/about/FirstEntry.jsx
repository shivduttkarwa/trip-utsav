import { FALLBACK_IMG } from "../../data/packages";
import asset from "../../asset";
import Button from "../../components/Button";
import Reveal from "../../components/Reveal";
import { useUI } from "../../components/UIContext";
import "./FirstEntry.css";

/* The founding story happens on a houseboat, so the photograph is one. */
const STORY = asset("images/packages/kerala-backwaters/02-alleppey-houseboat.webp");

const onImgError = (e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; };

export default function FirstEntry() {
  const { openEnquiry } = useUI();

  return (
    <section className="section">
      <div className="container ab-story">
        <Reveal variant="left" className="ab-story-media">
          <img src={STORY} alt="A houseboat drifting through the Alleppey backwaters" onError={onImgError} />
          <span className="ab-story-stamp" aria-hidden="true">
            <b>First Entry</b>
            <i>Kerala · Dec 2014</i>
          </span>
        </Reveal>

        <Reveal variant="right">
          <span className="eyebrow">Page 01 · The First Entry</span>
          <h2 className="display-2 ab-story-title">Nineteen People, One Houseboat</h2>
          <p className="lead mb-2">
            In December 2014, our founder took on the hardest clients of his life: his own
            family. Nineteen people across three generations, one houseboat in Alleppey, for
            his parents' fortieth wedding anniversary.
          </p>
          <p className="mb-2">
            The week was beautiful chaos — a seasick uncle, a toddler's sandal overboard, a
            wheelchair coaxed up a gangway. But on the last evening, with everyone singing on
            deck, his father said the sentence this company is built on: <em>"Forty years —
            and this is the first week the whole family has belonged to each other."</em>
          </p>
          <p className="mb-3">
            VoyageNest was registered three months later and named for that evening: the
            <b> voyage</b> is the week away, the <b>nest</b> is what a family becomes on
            deck — because we don't really sell travel. We sell the occasions hiding
            inside it.
          </p>
          <Button icon="arrow" onClick={() => openEnquiry()}>Plan a Trip With Us</Button>
        </Reveal>
      </div>
    </section>
  );
}
