import { teamPosts, upcomingEvents } from '../../mocks/dashboard.js';

export const dashboardStorageKey = '179fc-dashboard-v1';

export function initialDashboard() {
  return { posts: structuredClone(teamPosts), events: structuredClone(upcomingEvents) };
}

export function loadDashboard(storage) {
  try {
    const saved = JSON.parse(storage.getItem(dashboardStorageKey));
    if (Array.isArray(saved?.posts) && Array.isArray(saved?.events)) {
      const legacyLocations = { 'weekly-training': 'Main pitch', 'friendly-match': 'Stadium 7' };
      const events = saved.events.map(event => {
        const sample = upcomingEvents.find(item => item.id === event.id);
        return sample && !event.address && event.location === legacyLocations[event.id]
          ? { ...event, location: sample.location, address: sample.address, imageUrl: sample.imageUrl, imageCredit: sample.imageCredit }
          : event;
      });
      const posts = [...saved.posts];
      for (const sample of teamPosts.slice(0, 2).reverse()) {
        if (!posts.some(post => post.id === sample.id) && events.some(event => event.id === sample.eventId)) posts.unshift(structuredClone(sample));
      }
      return { ...saved, posts, events };
    }
  } catch { /* Use the demo data when storage is unavailable or invalid. */ }
  return initialDashboard();
}

export function googleMapsUrl(event) {
  return event.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.location}, ${event.address}`)}` : '';
}

export function saveDashboard(storage, dashboard) {
  try { storage.setItem(dashboardStorageKey, JSON.stringify(dashboard)); } catch { /* Keep the dashboard usable without browser storage. */ }
}

export function togglePostLike(posts, id) {
  return posts.map(post => post.id === id ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) } : post);
}

export function addPostComment(posts, id, comment) {
  return posts.map(post => post.id === id ? { ...post, comments: [...post.comments, comment] } : post);
}

export function addFeedPost(posts, content, id) {
  return [{ id, author: 'Tuan Kiet', initials: 'TK', tone: 'orange', team: 'Club Admin', time: 'Just now', content, tag: 'Update', likes: 0, liked: false, comments: [] }, ...posts];
}

export function addUpcomingSession(events, session, id) {
  return [...events, { ...session, id }].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
}
