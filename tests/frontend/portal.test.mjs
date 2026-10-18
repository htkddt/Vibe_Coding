import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { posts } from '../../frontend/src/mocks/posts.js';
import { filterPosts } from '../../frontend/src/features/posts/postFilters.js';
import { getPosts, restorePost, savePost, unpublishPost } from '../../frontend/src/features/posts/api/postsApi.js';
import { getSettings, saveSettings } from '../../frontend/src/features/settings/api/settingsApi.js';
import { addFeedPost, addPostComment, addUpcomingSession, googleMapsUrl, initialDashboard, loadDashboard, saveDashboard, togglePostLike } from '../../frontend/src/features/dashboard/dashboardStore.js';

test('post workflow persists drafts, publishes, unpublishes and restores discarded changes', async () => {
  const values = new Map();
  globalThis.localStorage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  try {
    const draft = await savePost({ id: 'test-post', title: 'Club update', content: 'A useful update', author: 'Tuan Kiet', type: 'file', status: 'draft' });
    assert.equal((await getPosts()).find(post => post.id === draft.id).status, 'draft');
    await savePost({ ...draft, title: 'Changed title' });
    await restorePost(draft);
    assert.equal((await getPosts()).find(post => post.id === draft.id).title, 'Club update');
    const published = await savePost({ ...draft, status: 'published' });
    assert.ok(published.publishedAt);
    assert.equal((await unpublishPost(draft.id)).status, 'draft');
    assert.equal((await getPosts()).find(post => post.id === draft.id).publishedAt, null);
    await assert.rejects(savePost({ ...draft, title: ' ' }), /title/i);
    await assert.rejects(savePost({ ...draft, content: '', status: 'published' }), /update/i);
  } finally { delete globalThis.localStorage; }
});

test('scheduled posts become published when the browser next loads posts after their due time', async () => {
  const values = new Map();
  globalThis.localStorage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  try {
    const future = new Date(Date.now() + 3600000).toISOString();
    await savePost({ id: 'scheduled', title: 'Later', content: 'Future update', author: 'Tuan Kiet', type: 'file', status: 'draft', scheduledAt: future });
    assert.equal((await getPosts()).find(post => post.id === 'scheduled').status, 'draft');
    const stored = JSON.parse(values.get('179fc-posts-v1'));
    stored.find(post => post.id === 'scheduled').scheduledAt = new Date(Date.now() - 1000).toISOString();
    values.set('179fc-posts-v1', JSON.stringify(stored));
    const published = (await getPosts()).find(post => post.id === 'scheduled');
    assert.equal(published.status, 'published');
    assert.equal(published.scheduledAt, null);
    assert.ok(published.publishedAt);
    await assert.rejects(savePost({ ...published, status: 'draft', scheduledAt: new Date(Date.now() - 1000).toISOString() }), /future/i);
  } finally { delete globalThis.localStorage; }
});

test('post filters combine status, search and ordering without mutating the collection', () => {
  const original = posts.map(post => post.id);
  assert.deepEqual(filterPosts(posts, 'drafts', '', 'newest').map(post => post.id), ['volunteer', 'match', 'events']);
  assert.deepEqual(filterPosts(posts, 'published', 'TUAN KIET', 'oldest').map(post => post.id), ['welcome', 'training']);
  assert.deepEqual(filterPosts(posts, 'all', 'upcoming club', 'newest').map(post => post.id), ['volunteer']);
  assert.deepEqual(posts.map(post => post.id), original);
});

test('post sorting supports title, author and status with predictable ties', () => {
  const sample = [
    { id: 'b', title: 'Beta', excerpt: '', author: 'Zoe', status: 'published', updatedAt: '2026-01-02' },
    { id: 'a', title: 'Alpha', excerpt: '', author: 'Ana', status: 'draft', updatedAt: '2026-01-01' },
    { id: 'c', title: 'Charlie', excerpt: '', author: 'Ana', status: 'draft', updatedAt: '2026-01-03' },
  ];
  assert.deepEqual(filterPosts(sample, 'all', '', 'title-asc').map(post => post.id), ['a', 'b', 'c']);
  assert.deepEqual(filterPosts(sample, 'all', '', 'title-desc').map(post => post.id), ['c', 'b', 'a']);
  assert.deepEqual(filterPosts(sample, 'all', '', 'author-asc').map(post => post.id), ['c', 'a', 'b']);
  assert.deepEqual(filterPosts(sample, 'all', '', 'status').map(post => post.id), ['c', 'a', 'b']);
  assert.deepEqual(filterPosts(sample, 'published', 'zoe', 'title-asc').map(post => post.id), ['b']);
  assert.deepEqual(sample.map(post => post.id), ['b', 'a', 'c']);
});

test('settings adapter validates and persists only supplied changes', async () => {
  const values = new Map();
  globalThis.localStorage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  globalThis.window = { dispatchEvent() {} };
  const before = await getSettings();
  await assert.rejects(saveSettings({ clubName: '  ' }), /required/);
  const saved = await saveSettings({ clubName: '179FC Test', compactNavigation: true });
  assert.equal(saved.clubName, '179FC Test');
  assert.equal(saved.assistant, before.assistant);
  assert.equal((await getSettings()).compactNavigation, true);
  delete globalThis.localStorage;
  delete globalThis.window;
});

test('dashboard updates, likes and comments stay independent and survive a reload', () => {
  const values = new Map();
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  const initial = initialDashboard();
  const otherPost = initial.posts[1];
  let posts = addFeedPost(initial.posts, 'Extra training on Friday', 'new-post');
  posts = togglePostLike(posts, 'new-post');
  posts = addPostComment(posts, 'new-post', { id: 'comment', author: 'Tuan Kiet', text: 'See you there!' });
  assert.equal(posts[0].likes, 1);
  assert.equal(posts[0].liked, true);
  assert.deepEqual(posts[0].comments.map(comment => comment.text), ['See you there!']);
  assert.deepEqual(posts[2], otherPost);
  assert.equal(togglePostLike(posts, 'new-post')[0].likes, 0);
  assert.equal(initial.posts.length, posts.length - 1);

  const events = addUpcomingSession(initial.events, { title: 'New session', date: '2026-01-01', time: '09:00', location: 'Pitch' }, 'new-session');
  assert.equal(events.find(event => event.id === 'new-session').title, 'New session');
  assert.deepEqual(events.map(event => `${event.date} ${event.time}`), events.map(event => `${event.date} ${event.time}`).sort());
  saveDashboard(storage, { posts, events });
  assert.deepEqual(loadDashboard(storage), { posts, events });
  assert.deepEqual(loadDashboard({ getItem: () => '{invalid' }), initialDashboard());
  assert.doesNotThrow(() => saveDashboard({ setItem() { throw new Error('storage unavailable'); } }, { posts, events }));
});

test('dashboard upgrades older samples while preserving saved posts and sessions', () => {
  const old = {
    posts: [{ id: 'personal-post', content: 'My update', likes: 3, liked: true, comments: [] }],
    events: [
      { id: 'weekly-training', title: 'Weekly training', date: '2026-10-20', time: '19:00', location: 'Main pitch' },
      { id: 'friendly-match', title: 'Friendly match', date: '2026-10-22', time: '16:00', location: 'Stadium 7' },
      { id: 'personal-session', title: 'My session', date: '2026-10-23', time: '18:00', location: 'Local pitch' },
    ],
  };
  const values = new Map();
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  saveDashboard(storage, old);
  const dashboard = loadDashboard(storage);
  assert.deepEqual(dashboard.posts.find(post => post.id === 'personal-post'), old.posts[0]);
  assert.deepEqual(dashboard.events.find(event => event.id === 'personal-session'), old.events[2]);
  assert.equal(dashboard.events[0].date, old.events[0].date);
  assert.equal(dashboard.events[0].time, old.events[0].time);
  for (const id of ['weekly-training', 'friendly-match']) {
    const event = dashboard.events.find(item => item.id === id);
    assert.ok(event.address);
    assert.ok(existsSync(new URL(`../../frontend/public${event.imageUrl}`, import.meta.url)));
    const map = new URL(googleMapsUrl(event));
    assert.equal(map.hostname, 'www.google.com');
    assert.equal(map.searchParams.get('query'), `${event.location}, ${event.address}`);
    assert.ok(dashboard.posts.some(post => post.eventId === id));
  }
  assert.equal(googleMapsUrl(old.events[2]), '');
  saveDashboard(storage, dashboard);
  assert.deepEqual(loadDashboard(storage), dashboard);
});
