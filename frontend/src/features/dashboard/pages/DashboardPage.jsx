import { useEffect, useState } from 'react';
import { dashboardStats } from '../../../mocks/dashboard.js';
import { addFeedPost, addPostComment, addUpcomingSession, loadDashboard, saveDashboard, togglePostLike } from '../dashboardStore.js';
import { StatCard } from '../components/StatCard.jsx';
import { TeamFeed } from '../components/TeamFeed.jsx';
import { UpcomingPanel } from '../components/UpcomingPanel.jsx';

const newId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const getStorage = () => { try { return window.localStorage; } catch { return null; } };

export function DashboardPage() {
  const [dashboard, setDashboard] = useState(() => loadDashboard(getStorage()));
  useEffect(() => { saveDashboard(getStorage(), dashboard); }, [dashboard]);

  function addPost(content) {
    const id = newId();
    setDashboard(current => ({ ...current, posts: addFeedPost(current.posts, content, id) }));
  }

  function addEvent(event) {
    const id = newId();
    setDashboard(current => ({ ...current, events: addUpcomingSession(current.events, event, id) }));
  }

  function likePost(id) {
    setDashboard(current => ({ ...current, posts: togglePostLike(current.posts, id) }));
  }

  function commentOnPost(id, text) {
    const comment = { id: newId(), author: 'Tuan Kiet', text };
    setDashboard(current => ({ ...current, posts: addPostComment(current.posts, id, comment) }));
  }

  return (
    <div className="dashboard-layout">
      <div>
        <div className="stats-grid">{dashboardStats.map(stat => <StatCard key={stat.label} {...stat} />)}</div>
        <TeamFeed posts={dashboard.posts} events={dashboard.events} onAddPost={addPost} onLike={likePost} onComment={commentOnPost} />
      </div>
      <UpcomingPanel events={dashboard.events} onAddEvent={addEvent} />
    </div>
  );
}
