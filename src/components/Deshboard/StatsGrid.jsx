export function StatsGrid({ stats }) {

  const completionRate = stats.total
    ? Math.round(
        (stats.completed / stats.total) * 100
      )
    : 0;

    return (
        <div className="stats-grid">
            <div className="stat-card purple-card">
                <span>Total tasks</span>
                <strong>{stats.total}</strong>
                <small>All your plans</small>
            </div>

            <div className="stat-card green-card">
                <span>Completed</span>
                <strong>{stats.completed}</strong>
                <small>{completionRate}% completion rate</small>
            </div>

            <div className="stat-card orange-card">
                <span>In progress</span><strong>{stats.pending}</strong>
                <small>Keep going</small>
            </div>

            <div className="stat-card red-card">
                <span>High priority</span>
                <strong>{stats.high}</strong>
                <small>Needs attention</small>
            </div>

        </div>
    );
}