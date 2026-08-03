import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PACKAGES, FALLBACK_IMG } from "../data/packages";
import asset from "../asset";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import PackageCard from "../components/PackageCard";
import CtaBanner from "../components/CtaBanner";
import Select from "../components/Select";
import { useUI } from "../components/UIContext";

const HERO = asset("images/hero/hero-packages.webp");

const DURATIONS = [
  { value: "", label: "Any duration" },
  { value: "1-4", label: "Up to 4 days" },
  { value: "5-6", label: "5 – 6 days" },
  { value: "7-8", label: "7 – 8 days" },
  { value: "9-99", label: "9+ days" }
];

const BUDGETS = [
  { value: "", label: "Any budget" },
  { value: "0-20000", label: "Under ₹20k" },
  { value: "20000-50000", label: "₹20k – ₹50k" },
  { value: "50000-100000", label: "₹50k – ₹1L" },
  { value: "100000-9999999", label: "₹1L+" }
];

const SORTS = [
  { value: "popular", label: "Most popular" },
  { value: "price-asc", label: "Price: low → high" },
  { value: "price-desc", label: "Price: high → low" },
  { value: "duration", label: "Duration" },
  { value: "rating", label: "Top rated" }
];

const inRange = (val, range) => {
  if (!range) return true;
  const [min, max] = range.split("-").map(Number);
  return val >= min && val <= max;
};

export default function Packages() {
  const [params, setParams] = useSearchParams();
  const { openEnquiry } = useUI();
  const [sort, setSort] = useState("popular");

  const search = params.get("search") || "";
  const category = params.get("category") || "";
  const budget = params.get("budget") || "";
  const duration = params.get("duration") || "";

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = PACKAGES.filter((p) => {
      const matchesQ =
        !q ||
        [p.title, p.location, p.region, p.summary, ...p.tags].join(" ").toLowerCase().includes(q);
      return (
        matchesQ &&
        (!category || p.category === category) &&
        inRange(p.price, budget) &&
        inRange(p.days, duration)
      );
    });
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "duration": list = [...list].sort((a, b) => a.days - b.days); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      default: list = [...list].sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [search, category, budget, duration, sort]);

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });
  const hasFilters = search || category || budget || duration;

  return (
    <>
      <header className="page-hero">
        <div className="hero-media">
          <img src={HERO} alt="" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal as="span" className="eyebrow">Domestic &amp; International</Reveal>
          <Reveal as="h1" className="display-2" delay={0.1}>Holiday Packages</Reveal>
          <Reveal as="p" delay={0.2}>
            {PACKAGES.length} hand-crafted itineraries — every single one customisable to your
            dates, pace and budget.
          </Reveal>
        </div>
      </header>

      {/* ---------- FILTER BAR ---------- */}
      <div className="filter-bar">
        <div className="container">
          <div className="filter-search">
            <Icon name="search" />
            <input
              type="text"
              placeholder="Search destination, package or vibe…"
              value={search}
              onChange={(e) => setParam("search", e.target.value)}
            />
          </div>
          <div className="chip-row">
            {[["", "All"], ["domestic", "Domestic"], ["international", "International"]].map(([val, label]) => (
              <button
                key={label}
                className={`chip${category === val ? " active" : ""}`}
                onClick={() => setParam("category", val)}
              >
                {label}
              </button>
            ))}
          </div>
          <Select variant="pill" ariaLabel="Budget" options={BUDGETS} value={budget} onChange={(v) => setParam("budget", v)} />
          <Select variant="pill" ariaLabel="Duration" options={DURATIONS} value={duration} onChange={(v) => setParam("duration", v)} />
          <Select variant="pill" ariaLabel="Sort" options={SORTS} value={sort} onChange={setSort} />
        </div>
      </div>

      {/* ---------- RESULTS ---------- */}
      <section className="section-tight bg-surface" style={{ minHeight: "60vh" }}>
        <div className="container">
          <div className="flex between mb-3">
            <span className="results-count">
              Showing <b>{results.length}</b> {results.length === 1 ? "package" : "packages"}
              {search && <> for “<b>{search}</b>”</>}
            </span>
            {hasFilters && (
              <button className="chip" onClick={clearAll}>✕ Clear filters</button>
            )}
          </div>

          {results.length > 0 ? (
            <div className="grid grid-3">
              {results.map((p, i) => <PackageCard key={p.id} pkg={p} delay={(i % 3) * 0.09} />)}
            </div>
          ) : (
            <div className="empty-state">
              <div className="icon">🧭</div>
              <h3>No trips match those filters</h3>
              <p className="mb-3">Try widening the budget or clearing a filter — or let us build a custom trip for you.</p>
              <div className="flex" style={{ justifyContent: "center" }}>
                <Button variant="outline" onClick={clearAll}>Clear Filters</Button>
                <Button icon="arrow" onClick={() => openEnquiry(search)}>Request Custom Trip</Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Secondary points at destinations: someone on this page has been
          reading trips, so the useful next step is places. The empty state
          above already offers the same modal, but only when there is nothing
          to show — the two never appear together. */}
      <CtaBanner
        compact
        image="images/hero/hero-bali.webp"
        focal="50% 48%"
        badge="Every trip here is customisable"
        title="None of These Quite Right?"
        text="Each package is a starting point. Tell us your dates, budget and pace — we'll reshape any of them around you."
        cta="Request Custom Trip"
        secondary={{ label: "See Destinations", to: "/destinations" }}
      />
    </>
  );
}
