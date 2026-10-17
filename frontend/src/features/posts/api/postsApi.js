import { posts } from '../../../mocks/posts.js';
export async function getPosts() { return posts.map(post => ({ ...post })); }
