import { PostCard } from './PostCard.jsx';

export function TeamFeed({ post }) {
  return <section className="team-feed"><h2>Team feed</h2><PostCard post={post} /></section>;
}
