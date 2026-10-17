import { PostStatus } from '../../mocks/posts.js';
export function filterPosts(posts, tab, query, sort) {
  const compareText = (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true });
  const compareDate = (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt);
  const comparators = {
    newest: compareDate,
    oldest: (a, b) => -compareDate(a, b),
    'title-asc': (a, b) => compareText(a.title, b.title),
    'title-desc': (a, b) => compareText(b.title, a.title),
    'author-asc': (a, b) => compareText(a.author, b.author),
    status: (a, b) => compareText(a.status, b.status),
  };
  return posts
    .filter(post => (tab === 'all' || post.status === (tab === 'drafts' ? PostStatus.draft : PostStatus.published)) && [post.title, post.excerpt, post.author].join(' ').toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => (comparators[sort] || compareDate)(a, b) || compareDate(a, b) || compareText(a.title, b.title));
}
