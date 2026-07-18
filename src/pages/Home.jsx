import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PACKAGES, FALLBACK_IMG, IMG } from "../data/packages";
import { DESTINATIONS } from "../data/destinations";
import { useUI } from "../components/UIContext";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import PackageCard from "../components/PackageCard";
import Stat from "../components/Stat";
import TestimonialSlider from "../components/TestimonialSlider";

const HERO_IMG = IMG("photo-1476514525535-07fb3b4ae5f1", 2000);
const WHYUS_IMG = IMG("photo-1488646953014-85cb44e25828", 1000);

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const SERVICES_PREVIEW = [
  { icon: "plane", title: "Flights & Hotels", text: "Best-fare flight bookings and hand-checked hotels, from budget to ultra-luxury." },
  { icon: "globe", title: "Visa Assistance", text: "Documentation, appointments and follow-ups for tourist visas across 40+ countries." },
  { icon: "heart", title: "Honeymoon Specials", text: "Candlelit dinners, room décor and slow itineraries designed for two." },
  { icon: "users", title: "Group & Corporate Tours", text: "College batches, family reunions and MICE — we move groups of 10 to 500." }
];

const STEPS = [
  { title: "Tell Us Your Dream", text: "Share destination ideas, dates and budget — or just a vibe. We'll take it from there." },
  { title: "Get a Crafted Plan", text: "A travel expert designs a day-by-day itinerary with transparent pricing in 24 hours." },
  { title: "Book & Relax", text: "Pay securely in easy instalments. Flights, stays, visas — every detail handled." },
  { title: "Travel & Celebrate", text: "Fly out with 24×7 on-trip support one WhatsApp message away." }
];

export default function Home() {
  const navigate = useNavigate();
  const { openEnquiry } = useUI();
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState({ q: "", category: "", month: "", budget: "" });

  const featured = useMemo(() => {
    const byTab = tab === "all" ? PACKAGES.filter((p) => p.featured) : PACKAGES.filter((p) => p.category === tab);
    return byTab.slice(0, 6);
  }, [tab]);

  const onSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.q) params.set("search", search.q);
    if (search.category) params.set("category", search.category);
    if (search.budget) params.set("budget", search.budget);
    navigate(`/packages?${params.toString()}`);
  };

  return (
    <>
      {/* ---------- HERO ---------- */}
      <header className="hero">
        <div className="hero-media">
          <img src={HERO_IMG} alt="" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }} />
        </div>
        <div className="container hero-inner">
          <Reveal as="span" className="eyebrow">Travel More, Celebrate Life</Reveal>
          <Reveal as="h1" className="display-1" delay={0.12}>
            Every Trip is a <em>Festival</em> Waiting to Happen
          </Reveal>
          <Reveal as="p" delay={0.24}>
            From Himalayan passes to Maldivian lagoons — hand-crafted domestic and international
            holidays, planned by real experts and backed by 24×7 on-trip support.
          </Reveal>
          <Reveal className="hero-actions" delay={0.36}>
            <Button size="lg" icon="arrow" to="/packages">Explore Packages</Button>
            <Button variant="white" size="lg" onClick={() => openEnquiry()}>Get Free Itinerary</Button>
          </Reveal>
          <Reveal className="hero-badges" delay={0.5}>
            <span className="hero-badge"><Icon name="shield" /> 100% Customisable Trips</span>
            <span className="hero-badge"><Icon name="star" /> 4.8★ Rated by 2,000+ Travellers</span>
            <span className="hero-badge"><Icon name="headset" /> 24×7 On-trip Support</span>
          </Reveal>
        </div>
        <div className="scroll-hint" aria-hidden="true"></div>
      </header>

      {/* ---------- SEARCH CARD ---------- */}
      <div className="container">
        <form className="search-card" onSubmit={onSearch}>
          <div className="search-field">
            <label>Where to?</label>
            <div className="control">
              <Icon name="pin" />
              <input
                type="text"
                placeholder="Bali, Kashmir, Europe…"
                value={search.q}
                onChange={(e) => setSearch({ ...search, q: e.target.value })}
              />
            </div>
          </div>
          <div className="search-field">
            <label>Trip Type</label>
            <div className="control">
              <Icon name="globe" />
              <select value={search.category} onChange={(e) => setSearch({ ...search, category: e.target.value })}>
                <option value="">Any</option>
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </div>
          </div>
          <div className="search-field">
            <label>Travel Month</label>
            <div className="control">
              <Icon name="calendar" />
              <select value={search.month} onChange={(e) => setSearch({ ...search, month: e.target.value })}>
                <option value="">Flexible</option>
                {MONTHS.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <div className="search-field">
            <label>Budget / Person</label>
            <div className="control">
              <Icon name="wallet" />
              <select value={search.budget} onChange={(e) => setSearch({ ...search, budget: e.target.value })}>
                <option value="">Any budget</option>
                <option value="0-20000">Under ₹20k</option>
                <option value="20000-50000">₹20k – ₹50k</option>
                <option value="50000-100000">₹50k – ₹1L</option>
                <option value="100000-9999999">₹1L+</option>
              </select>
            </div>
          </div>
          <Button size="lg" icon="search" type="submit">Search</Button>
        </form>
      </div>

      {/* ---------- MARQUEE ---------- */}
      <div className="section-tight">
        <div className="marquee">
          <div className="marquee-track">
            {[...DESTINATIONS, ...DESTINATIONS].map((d, i) => (
              <span className="marquee-item" key={i}><Icon name="pin" /> {d.name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- FEATURED PACKAGES ---------- */}
      <section className="section bg-surface" id="featured">
        <div className="container">
          <SectionHead
            layout="split"
            eyebrow="Curated For You"
            title="Trending Trips, Loved by Travellers"
            text="Our most-booked packages this season — every one of them customisable to your dates and budget."
            aside={
              <div className="tabs">
                {[["all", "Featured"], ["domestic", "Domestic"], ["international", "International"]].map(([val, label]) => (
                  <button key={val} className={`tab${tab === val ? " active" : ""}`} onClick={() => setTab(val)}>
                    {label}
                  </button>
                ))}
              </div>
            }
          />
          <div className="grid grid-3">
            {featured.map((p, i) => <PackageCard key={p.id} pkg={p} delay={i * 0.09} />)}
          </div>
          <Reveal className="center mt-4">
            <Button variant="outline" icon="arrow" to="/packages">View All Packages</Button>
          </Reveal>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="section-tight">
        <div className="container">
          <div className="stats">
            <Stat value={12} label="Years of Craft" />
            <Stat value={25000} label="Happy Travellers" />
            <Stat value={120} label="Destinations Covered" />
            <Stat value={4.8} suffix="★" label="Average Rating" decimals={1} />
          </div>
        </div>
      </section>

      {/* ---------- DESTINATIONS ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            layout="split"
            eyebrow="Wander-list"
            title="Destinations That Steal Hearts"
            aside={<Button variant="ghost" icon="arrow" to="/destinations">All destinations</Button>}
          />
          <div className="grid grid-4">
            {DESTINATIONS.slice(0, 8).map((d, i) => (
              <Reveal key={d.name} delay={i * 0.07}>
                <Link className="dest-card" to={`/packages?search=${encodeURIComponent(d.query)}`}>
                  <img src={d.image} alt={d.name} loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }} />
                  <div className="dest-body">
                    <h3>{d.name}</h3>
                    <p>{d.blurb}</p>
                    <span className="dest-cta">Explore trips <Icon name="arrow" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SERVICES PREVIEW ---------- */}
      <section className="section bg-surface">
        <div className="container">
          <SectionHead
            layout="center"
            eyebrow="Beyond Packages"
            title="Every Travel Service, One Roof"
            text="Trip Utsav is a full-service agency — whatever moves you, we arrange it."
          />
          <div className="grid grid-4">
            {SERVICES_PREVIEW.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.09}>
                <div className="icon-card">
                  <div className="icon"><Icon name={s.icon} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <Link className="link-more" to="/services">Learn more <Icon name="arrow" /></Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY US ---------- */}
      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: "center", gap: "60px" }}>
          <Reveal variant="left">
            <div className="split-media">
              <img src={WHYUS_IMG} alt="Traveller planning a journey with a map" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }} />
              <div className="float-card" style={{ bottom: "26px", left: "-24px" }}>
                <div className="icon"><Icon name="shield" /></div>
                <div><strong>Zero Hidden Costs</strong><small>What you see is what you pay</small></div>
              </div>
              <div className="float-card" style={{ top: "26px", right: "-18px", animationDelay: "1.2s" }}>
                <div className="icon"><Icon name="star" /></div>
                <div><strong>4.8★ Rated</strong><small>2,000+ verified reviews</small></div>
              </div>
            </div>
          </Reveal>
          <Reveal variant="right">
            <span className="eyebrow">Why Trip Utsav</span>
            <h2 className="display-2" style={{ margin: "14px 0 18px" }}>
              We Don't Sell Tours.<br />We Craft <span className="text-grad">Celebrations.</span>
            </h2>
            <p className="lead mb-3">
              Anyone can book a hotel. We obsess over the sunrise slot at the Taj, the window seat
              over the Himalayas, the candle-lit surprise on your anniversary night.
            </p>
            <ul className="check-list">
              <li>
                <span className="tick"><Icon name="check" /></span>
                <div><strong>Human experts, not algorithms</strong><p>A dedicated trip designer from first call to touchdown home.</p></div>
              </li>
              <li>
                <span className="tick"><Icon name="check" /></span>
                <div><strong>Fully customisable itineraries</strong><p>Every package is a starting point — stretch, swap and season to taste.</p></div>
              </li>
              <li>
                <span className="tick"><Icon name="check" /></span>
                <div><strong>24×7 on-trip support</strong><p>Missed connection at 2 AM? One WhatsApp and we're on it.</p></div>
              </li>
            </ul>
            <div className="mt-3">
              <Button icon="arrow" onClick={() => openEnquiry()}>Start Planning Free</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="section bg-surface">
        <div className="container">
          <SectionHead layout="center" eyebrow="Simple as 1-2-3-4" title="How Your Trip Comes Together" />
          <div className="grid grid-4 steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.09}>
                <div className="step">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Traveller Stories"
            title="25,000+ Celebrations and Counting"
          />
          <TestimonialSlider />
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section-tight" style={{ paddingBottom: "90px" }}>
        <div className="container">
          <Reveal variant="zoom">
            <div className="cta-banner">
              <span className="badge badge-glass mb-2">Limited Season Offers Live</span>
              <h2 className="display-2">Your Next Story Begins With One Click</h2>
              <p>Get a free, no-obligation itinerary crafted by our experts within 24 hours.</p>
              <div className="flex" style={{ justifyContent: "center" }}>
                <Button size="lg" icon="arrow" onClick={() => openEnquiry()}>Plan My Trip Free</Button>
                <Button variant="white" size="lg" to="/packages">Browse Packages</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
