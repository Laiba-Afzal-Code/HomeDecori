export default function StatsCard({ title, value, icon }) {
  return (
    <div className="stats-card">
      <div className="stats-icon">{icon}</div>
      <div>
        <p className="stats-title">{title}</p>
        <h2 className="stats-value">{value}</h2>
      </div>
    </div>
  );
}
