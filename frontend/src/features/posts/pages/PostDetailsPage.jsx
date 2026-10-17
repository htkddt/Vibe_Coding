import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Avatar } from '../../../components/ui/Avatar.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { Icon } from '../../../components/ui/Icon.jsx';
import { PostStatus } from '../../../mocks/posts.js';
import { getPosts } from '../api/postsApi.js';
import { formatPostDate } from '../postFormat.js';

export function PostDetailsPage() {
  const { postId } = useParams();
  const location = useLocation();
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const returnTo = typeof location.state?.returnTo === 'string' && /^\/posts(?:\?|$)/.test(location.state.returnTo) ? location.state.returnTo : '/posts';

  useEffect(() => {
    let active = true;
    setError(false);
    setPosts(null);
    getPosts().then(result => { if (active) setPosts(result); }).catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, [postId, attempt]);

  const post = posts?.find(item => item.id === postId);
  return <section className="post-detail">
    <Link className="post-detail__back" to={returnTo}><span aria-hidden="true">←</span> Back to posts</Link>
    {error ? <Card className="post-detail__card posts-state" role="alert">Could not load this post. <button onClick={() => setAttempt(value => value + 1)}>Retry</button></Card> : !posts ? <Card className="post-detail__card posts-state" role="status">Loading post…</Card> : !post ? <Card className="post-detail__card posts-state"><h2>Post not found</h2><p>This post may have been removed or the link may be incorrect.</p><Link to={returnTo}>Back to posts</Link></Card> : <Card className="post-detail__card">
      <div className="post-detail__top"><span className="posts-item__icon"><Icon name={post.type} size={24} /></span><span className={'post-status post-status--' + post.status}>{post.status === PostStatus.published ? 'Published' : 'Draft'}</span></div>
      <h2>{post.title}</h2>
      <div className="post-detail__meta"><Avatar initials={post.author.split(' ').map(name => name[0]).join('').slice(0, 2)} size="sm" /><span><strong>{post.author}</strong><small>Updated <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time></small></span></div>
      <div className="post-detail__content"><p>{post.content || post.excerpt}</p></div>
      {post.publishedAt && <p className="post-detail__published">Published <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time></p>}
      {post.status === PostStatus.draft && <Link className="button post-detail__edit" to={'/posts/' + post.id + '/edit'}><Icon name="pen" size={16} />Edit draft</Link>}
    </Card>}
  </section>;
}
