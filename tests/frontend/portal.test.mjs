import test from 'node:test';
import assert from 'node:assert/strict';
import { posts } from '../../frontend/src/mocks/posts.js';
import { filterPosts } from '../../frontend/src/features/posts/postFilters.js';
import { getSettings, saveSettings } from '../../frontend/src/features/settings/api/settingsApi.js';

test('post filters combine status, search and ordering without mutating the collection', () => {
  const original = posts.map(post => post.id);
  assert.deepEqual(filterPosts(posts, 'drafts', '', 'newest').map(post => post.id), ['volunteer', 'match', 'events']);
  assert.deepEqual(filterPosts(posts, 'published', 'TUAN KIET', 'oldest').map(post => post.id), ['welcome', 'training']);
  assert.deepEqual(filterPosts(posts, 'all', 'upcoming club', 'newest').map(post => post.id), ['volunteer']);
  assert.deepEqual(posts.map(post => post.id), original);
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
