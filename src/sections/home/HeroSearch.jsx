import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import Button from "../../components/Button";
import Select from "../../components/Select";
import HeroSlides from "../../components/HeroSlides";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const TRIP_TYPES = [
  { value: "", label: "Any" },
  { value: "domestic", label: "Domestic" },
  { value: "international", label: "International" },
];
const MONTH_OPTIONS = [{ value: "", label: "Flexible" }, ...MONTHS.map((m) => ({ value: m, label: m }))];
const BUDGET_OPTIONS = [
  { value: "", label: "Any budget" },
  { value: "0-20000", label: "Under ₹20k" },
  { value: "20000-50000", label: "₹20k – ₹50k" },
  { value: "50000-100000", label: "₹50k – ₹1L" },
  { value: "100000-9999999", label: "₹1L+" },
];

/* Homepage hero: cinematic slider + the floating search card. */
export default function HeroSearch() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ q: "", category: "", month: "", budget: "" });

  const onSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.q) params.set("search", search.q);
    if (search.category) params.set("category", search.category);
    if (search.budget) params.set("budget", search.budget);
    navigate(`/packages?${params.toString()}`);
  };

  return (
    <header className="hero">
      <HeroSlides />
      <div className="hero-foot">
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
                <Select
                  variant="bare"
                  ariaLabel="Trip type"
                  options={TRIP_TYPES}
                  value={search.category}
                  onChange={(v) => setSearch({ ...search, category: v })}
                />
              </div>
            </div>
            <div className="search-field">
              <label>Travel Month</label>
              <div className="control">
                <Icon name="calendar" />
                <Select
                  variant="bare"
                  ariaLabel="Travel month"
                  options={MONTH_OPTIONS}
                  value={search.month}
                  onChange={(v) => setSearch({ ...search, month: v })}
                />
              </div>
            </div>
            <div className="search-field">
              <label>Budget / Person</label>
              <div className="control">
                <Icon name="wallet" />
                <Select
                  variant="bare"
                  ariaLabel="Budget per person"
                  options={BUDGET_OPTIONS}
                  value={search.budget}
                  onChange={(v) => setSearch({ ...search, budget: v })}
                />
              </div>
            </div>
            <Button size="lg" icon="search" type="submit">Search</Button>
          </form>
        </div>
      </div>
    </header>
  );
}
