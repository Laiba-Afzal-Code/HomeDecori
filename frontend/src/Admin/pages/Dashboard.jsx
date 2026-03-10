import { useEffect, useState } from "react";
import AnalyticsChart from "../components/AnalyticsChart.jsx";
import StatsCard from "../components/StatsCard.jsx";
import "../styles/dashboard.css";
import adminAxios from "../api/adminAxios.js";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    active: 0,
    chart: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminAxios.get("/admin/dashboard-stats");

        const chartData = res.data.chart.map((item) => ({
          date: item._id,
          posts: item.count,
          user: item.count,
        }));

        setStats({
          users: res.data.users,
          posts: res.data.posts,
          active: res.data.posts,
          chart: chartData,
        });

        setLoading(false);
      } catch (error) {
        console.error("Dashboard error:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="loading">Loading dashboard...</p>;

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome to Homedecorim admin Dashboard</p>
        <p>Overview of your platform activity</p>
      </div>

      {/* Stats */}
      <div className="dashboard-grid">
        <StatsCard title="Total Users" value={stats.users} icon="👤" />
        <StatsCard title="Total Posts" value={stats.posts} icon="📝" />
        <StatsCard title="Active Today" value={stats.active} icon="⚡" />
      </div>

      {/* Analytics */}

      <div className="chart-box">
        <h3>Posts Activity</h3>
        <AnalyticsChart data={stats.chart} />
      </div>
    </div>
  );
}
