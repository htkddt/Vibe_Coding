import { posts, PostStatus } from '../../../mocks/posts.js';

const storageKey = '179fc-posts-v1';

function readPosts() {
  const saved = globalThis.localStorage?.getItem(storageKey);
  if (!saved) return structuredClone(posts);
  const parsed = JSON.parse(saved);
  if (!Array.isArray(parsed)) throw new Error('Invalid post data.');
  return parsed;
}

function writePosts(items) {
  if (!globalThis.localStorage) throw new Error('Browser storage is unavailable.');
  globalThis.localStorage.setItem(storageKey, JSON.stringify(items));
}

export async function getPosts() {
  const items = readPosts();
  let changed = false;
  const result = items.map(post => {
    if (post.status === PostStatus.draft && post.scheduledAt && new Date(post.scheduledAt).getTime() <= Date.now()) {
      changed = true;
      return { ...post, status: PostStatus.published, publishedAt: post.scheduledAt, scheduledAt: null };
    }
    return post;
  });
  if (changed) writePosts(result);
  return result;
}

export async function savePost(input) {
  if (!input.title?.trim()) throw new Error('Please add a post title.');
  if (input.status === PostStatus.published && !input.content?.trim()) throw new Error('Please write an update before publishing.');
  if (input.scheduledAt && (Number.isNaN(new Date(input.scheduledAt).getTime()) || new Date(input.scheduledAt).getTime() <= Date.now())) throw new Error('Please choose a future date and time.');
  const items = await getPosts();
  const existing = items.find(post => post.id === input.id);
  const now = new Date().toISOString();
  const post = { ...existing, ...input, title: input.title.trim(), excerpt: (input.content || '').replace(/\s+/g, ' ').trim().slice(0, 150), updatedAt: now, publishedAt: input.status === PostStatus.published ? (existing?.publishedAt || now) : null };
  const index = items.findIndex(item => item.id === post.id);
  if (index < 0) items.unshift(post); else items[index] = post;
  writePosts(items);
  return post;
}

export async function unpublishPost(id) {
  const post = (await getPosts()).find(item => item.id === id);
  if (!post) throw new Error('Post not found.');
  return savePost({ ...post, status: PostStatus.draft, scheduledAt: null });
}

export async function restorePost(post) {
  const items = await getPosts();
  const index = items.findIndex(item => item.id === post.id);
  if (index < 0) throw new Error('Post not found.');
  items[index] = post;
  writePosts(items);
}
