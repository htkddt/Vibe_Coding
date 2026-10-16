import { dashboardStats, teamPost, upcomingEvents } from '../../../mocks/dashboard.js';
import { StatCard } from '../components/StatCard.jsx';
import { TeamFeed } from '../components/TeamFeed.jsx';
import { UpcomingPanel } from '../components/UpcomingPanel.jsx';

export function DashboardPage() {
  return <div className="dashboard-layout"><div><div className="stats-grid">{dashboardStats.map((stat) => <StatCard key={stat.label} {...stat} />)}</div><TeamFeed post={teamPost} /></div><UpcomingPanel events={upcomingEvents} /></div>;
}
