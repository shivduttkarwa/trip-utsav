import Button from "../components/Button";

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      <div className="empty-state">
        <div className="icon">🛫</div>
        <h2 className="display-2">Looks like this page took a detour</h2>
        <p className="lead mb-3">The page you're after doesn't exist — but plenty of great trips do.</p>
        <div className="flex" style={{ justifyContent: "center" }}>
          <Button icon="arrow" to="/">Back to Home</Button>
          <Button variant="outline" to="/packages">Browse Packages</Button>
        </div>
      </div>
    </section>
  );
}
