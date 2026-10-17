import { PostStatus } from '../../mocks/posts.js';
export function filterPosts(posts, tab, query, sort) {
  return posts.filter(post => (tab === 'all' || post.status === (tab === 'drafts' ? PostStatus.draft : PostStatus.published)) && [post.title, post.excerpt, post.author].join(' ').toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => (new Date(b.updatedAt) - new Date(a.updatedAt)) * (sort === 'newest' ? 1 : -1));
}
