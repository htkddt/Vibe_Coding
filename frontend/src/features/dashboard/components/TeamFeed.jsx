import { useState } from 'react';
import { Icon } from '../../../components/ui/Icon.jsx';
import { PostCard } from './PostCard.jsx';

export function TeamFeed({ posts, events, onAddPost, onLike, onComment }) {
  const [adding, setAdding] = useState(false);
  const [content, setContent] = useState('');

  function submit(event) {
    event.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    onAddPost(trimmed);
    setContent('');
    setAdding(false);
  }

  return (
    <section className="team-feed" aria-labelledby="team-feed-title">
      <div className="dashboard-section-heading">
        <h2 id="team-feed-title">Team feed</h2>
        <button className="button dashboard-add-button" type="button" aria-expanded={adding} aria-controls="feed-form" onClick={() => setAdding(value => !value)}><Icon name="plus" size={15} /> Add update</button>
      </div>
      {adding && <form id="feed-form" className="dashboard-form" onSubmit={submit}>
        <label htmlFor="feed-content">Share a team update</label>
        <textarea id="feed-content" value={content} onChange={event => setContent(event.target.value)} placeholder="What would you like the team to know?" maxLength={1000} required />
        <div className="dashboard-form__actions"><button className="button" type="button" onClick={() => { setAdding(false); setContent(''); }}>Cancel</button><button className="button button--primary" type="submit" disabled={!content.trim()}>Post update</button></div>
      </form>}
      <div className="team-feed__list">{posts.map(post => <PostCard key={post.id} post={post} session={events.find(event => event.id === post.eventId)} onLike={onLike} onComment={onComment} />)}</div>
    </section>
  );
}
