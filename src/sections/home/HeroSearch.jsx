import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import Button from "../../components/Button";
import HeroSlides from "../../components/HeroSlides";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
      </div>
    </header>
  );
}
