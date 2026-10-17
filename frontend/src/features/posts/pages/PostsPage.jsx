import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '../../../components/ui/Avatar.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { Icon } from '../../../components/ui/Icon.jsx';
import { Tabs } from '../../../components/ui/Tabs.jsx';
import { useUrlTab } from '../../../hooks/useUrlTab.js';
import { PostStatus } from '../../../mocks/posts.js';
import { getPosts } from '../api/postsApi.js';
import { filterPosts } from '../postFilters.js';

const tabs = [{ value: 'all', label: 'All posts' }, { value: 'published', label: 'Published' }, { value: 'drafts', label: 'Drafts' }];
const headings = { all: 'Recent posts', published: 'Published posts', drafts: 'Draft posts' };
function formatDate(value) { return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value)).replace(',', ' at'); }
export function PostsPage() {
  const [tab, setTab] = useUrlTab(tabs.map(item => item.value), 'all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [menu, setMenu] = useState(null);
  useEffect(() => { let active = true; setError(false); setData(null); getPosts().then(result => { if (active) setData(result); }).catch(() => { if (active) setError(true); }); return () => { active = false; }; }, [attempt]);
  const visible = useMemo(() => filterPosts(data || [], tab, query, sort), [data, tab, query, sort]);
  const published = data?.filter(post => post.status === PostStatus.published).length;
  const drafts = data?.filter(post => post.status === PostStatus.draft).length;
  return <section className="posts-page">
    <div className="posts-toolbar"><label className="posts-search"><Icon name="search" /><input aria-label="Search posts" placeholder="Search posts..." value={query} onChange={event => setQuery(event.target.value)} /></label><Tabs items={tabs} value={tab} onChange={setTab} label="Post status" /><label className="posts-sort"><span className="sr-only">Sort posts</span><select value={sort} onChange={event => setSort(event.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></label></div>
    <div className="posts-layout"><Card className="posts-results" id={'panel-' + tab} role="tabpanel" aria-labelledby={'tab-' + tab}><h2>{headings[tab]}</h2>
      {error ? <div className="posts-state" role="alert">Could not load posts. <button onClick={() => setAttempt(value => value + 1)}>Retry</button></div> : !data ? <div className="posts-state" role="status">Loading posts?</div> : !visible.length ? <div className="posts-state"><p>{query ? 'No posts match your search.' : tab === 'drafts' ? 'You have no drafts yet.' : 'There are no posts to show.'}</p><Link to="/posts/new">Create post</Link></div> : <div className="posts-list">{visible.map(post => <article className="posts-item" key={post.id}><div className="posts-item__icon"><Icon name={post.type} size={24} /></div><div className="posts-item__body"><h3>{post.title}</h3><p>{post.excerpt}</p><div className="posts-item__author"><Avatar initials="TK" size="sm" /><strong>{post.author}</strong><span>?</span><time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></div></div><div className="posts-item__actions"><span className={'post-status post-status--' + post.status}>{post.status === PostStatus.published ? 'Published' : 'Draft'}</span><div className="post-overflow"><button className="post-icon-button" aria-label={'Actions for ' + post.title} aria-expanded={menu === post.id} onClick={() => setMenu(menu === post.id ? null : post.id)}>???</button>{menu === post.id && <div className="post-overflow__menu"><Link to={'/posts/' + post.id}>{post.status === PostStatus.draft ? 'View draft' : 'View post'}</Link></div>}</div>{post.status === PostStatus.draft && <Link className="post-icon-button post-edit" to={'/posts/' + post.id + '/edit'} aria-label={'Edit ' + post.title}><Icon name="pen" size={18} /></Link>}</div></article>)}</div>}
    </Card><aside className="posts-rail"><Card className="posts-overview"><h2>Post overview</h2><div className="posts-overview__counts"><div><span className="overview-icon overview-icon--green"><Icon name="file" /></span><span><strong>{published ?? '?'}</strong><small>Published</small></span></div><div><span className="overview-icon overview-icon--orange"><Icon name="file" /></span><span><strong>{drafts ?? '?'}</strong><small>Drafts</small></span></div></div></Card><section className={'posts-campaign' + (tab === 'drafts' ? ' posts-campaign--drafts' : '')}><Icon name="file" size={48} /><h2>{tab === 'drafts' ? 'Ready to publish?' : 'Share an update'}</h2><p>{tab === 'drafts' ? 'Review your draft, then share it with your members.' : 'Keep your members informed with timely posts.'}</p>{tab === 'drafts' ? <button className="button button--primary" onClick={() => document.getElementById('panel-drafts')?.scrollIntoView({ behavior: 'smooth' })}>Review drafts</button> : <Link className="button" to="/posts/new"><Icon name="plus" size={16} />Create post</Link>}</section></aside></div>
  </section>;
}
