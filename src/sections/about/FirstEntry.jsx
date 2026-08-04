import { FALLBACK_IMG } from "../../data/packages";
import asset from "../../asset";
import Button from "../../components/Button";
import Reveal from "../../components/Reveal";
import { useUI } from "../../components/UIContext";
import "./FirstEntry.css";

/* The founding story happens on a houseboat, so the photograph is one. */
const STORY = asset("images/packages/kerala-backwaters/02-alleppey-houseboat.webp");

const onImgError = (e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; };

/* THE FIRST ENTRY IS AN OPEN PASSPORT.
 *
 * The page's conceit is a passport, so its first section is the book itself,
 * open to its first spread. The left page carries the photograph, mounted
 * with paper corners like a print in a family album; the right page is the
 * entry record — a mono header, the port-of-entry fields, and the story in
 * prose, with the father's sentence written in hand. A dashed stitch runs
 * down the gutter, and the arrival stamp is inked ACROSS it, half on each
 * page, the way real stamps disrespect page boundaries. It presses down
 * (scale + settle) when the spread scrolls into view, and its ink multiplies
 * over whatever sits beneath — which is why everything under its landing
 * zone is decorative: the caption's tail, the MRZ, never the prose. */
export default function FirstEntry() {
  const { openEnquiry } = useUI();

  return (
    <section className="section">
      <div className="container">
        <Reveal className="fe-spread" variant="zoom">
          {/* verso — the photograph */}
          <div className="fe-leaf fe-leaf--photo">
            <figure className="fe-photo">
              <span className="fe-print">
                <img src={STORY} alt="A houseboat drifting through the Alleppey backwaters" onError={onImgError} />
              </span>
              <figcaption>All nineteen of us — Alleppey, December 2014</figcaption>
            </figure>
            <span className="fe-folio" aria-hidden="true">01</span>
          </div>

          {/* recto — the entry record */}
          <div className="fe-leaf fe-leaf--entry">
            <div className="fe-entry-head" aria-hidden="true">
              <span>Entry № 001</span>
              <span>Immigration of Joy</span>
            </div>

            <h2 className="display-2 fe-title">Nineteen People, One Houseboat</h2>

            <dl className="fe-facts">
              <div><dt>Port of entry</dt><dd>Alleppey, Kerala</dd></div>
              <div><dt>Date</dt><dd>December 2014</dd></div>
              <div><dt>Bearers</dt><dd>19 · three generations</dd></div>
              <div><dt>Occasion</dt><dd>A fortieth anniversary</dd></div>
            </dl>

            <p>
              Our founder's first clients were the hardest of his life: his own family. The
              week was beautiful chaos — a seasick uncle, a toddler's sandal overboard, a
              wheelchair coaxed up a gangway. Then, on the last evening, with everyone
              singing on deck, his father said the sentence this company is built on:
            </p>

            <blockquote className="fe-quote">
              "Forty years — and this is the first week the whole family has belonged to
              each other."
              <cite>his father · last evening aboard</cite>
            </blockquote>

            <p>
              VoyageNest was registered three months later and named for that evening: the
              <b> voyage</b> is the week away, the <b>nest</b> is what a family becomes on
              deck. We don't really sell travel — we sell the occasions hiding inside it.
            </p>

            <Button icon="arrow" onClick={() => openEnquiry()}>Plan a Trip With Us</Button>

            <span className="fe-mrz" aria-hidden="true">
              <span>{"P<VNEST<<FIRST<ENTRY<<ALLEPPEY<KERALA<<<<<<<"}</span>
              <span>{"DEC2014<<19<SOULS<<3<GENERATIONS<<<<<<<<<<01"}</span>
            </span>
            <span className="fe-folio" aria-hidden="true">02</span>
          </div>

          {/* the arrival stamp, inked across the gutter */}
          <span className="fe-stamp" aria-hidden="true">
            <b>First Entry</b>
            <i>Kerala · Dec 2014</i>
          </span>
        </Reveal>
      </div>
    </section>
  );
}
