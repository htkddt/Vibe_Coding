import { Avatar } from '../../../components/ui/Avatar.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { Icon } from '../../../components/ui/Icon.jsx';

export function PostCard({ post }) {
  return <Card className="post-card"><div className="post-card__author"><Avatar initials={post.initials} tone={post.tone} size="sm" /><span><strong>{post.author}</strong><small>{post.time} · {post.team}</small></span></div><p className="post-card__content">{post.content}</p><div className="post-card__footer"><span className="post-card__tag">{post.tag}</span><span className="post-card__metrics"><Icon name="heart" size={14} /> {post.likes}<Icon name="comment" size={14} /> {post.comments} comments</span></div></Card>;
}
