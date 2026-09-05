import { useEffect, useState, useCallback } from "react";
import StatCard from "../components/StatCard.jsx";
import { fetchStats } from "../services/userService.js";
import { onUsersChanged } from "../services/userEvents.js";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const loadStats = useCallback(async () => {
    try {
      const data = await fetchStats();
      setStats(data);
      setError("");
    } catch (err) {
      setError(err.message || "Could not load dashboard stats");
    }
  }, []);

  useEffect(() => {
    loadStats();
   
    const unsubscribe = onUsersChanged(loadStats);
    const interval = setInterval(loadStats, 20000);
    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [loadStats]);

  const activePct = stats?.totalUsers ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0;

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="page-subtitle">A live snapshot of everyone in the system.</p>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {stats && (
        <>
          <div className="stat-grid">
            <StatCard label="Total users" value={stats.totalUsers} />
            <StatCard label="Active" value={stats.activeUsers} />
            <StatCard label="Inactive" value={stats.inactiveUsers} />
            <StatCard label="Added this week" value={stats.addedThisWeek} />
          </div>

          <div className="breakdown-card">
            <h3>Active vs inactive</h3>
            <div className="breakdown-bar">
              <div className="breakdown-bar-segment active" style={{ width: `${activePct}%` }} />
              <div className="breakdown-bar-segment inactive" style={{ width: `${100 - activePct}%` }} />
            </div>
            <div className="breakdown-legend">
              <span>
                <span className="legend-dot active" />
                {stats.activeUsers} active
              </span>
              <span>
                <span className="legend-dot inactive" />
                {stats.inactiveUsers} inactive
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
