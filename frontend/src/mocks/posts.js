export const PostStatus = Object.freeze({ published: 'published', draft: 'draft' });
export const posts = [
  { id: 'training', status: PostStatus.published, type: 'calendar', title: 'October training schedule', excerpt: 'Training sessions for October are now available. Please check the updated calendar.', author: 'Tuan Kiet', updatedAt: '2026-10-13T10:24:00', publishedAt: '2026-10-13T10:24:00' },
  { id: 'welcome', status: PostStatus.published, type: 'users', title: 'Welcome our new members', excerpt: 'Let’s give a warm welcome to the newest members of 179FC.', author: 'Tuan Kiet', updatedAt: '2026-10-10T14:32:00', publishedAt: '2026-10-10T14:32:00' },
  { id: 'volunteer', status: PostStatus.draft, type: 'users', title: 'Volunteer recruitment plan', excerpt: 'Invite members to support our upcoming club activities.', author: 'Tuan Kiet', updatedAt: '2026-10-09T10:24:00' },
  { id: 'match', status: PostStatus.draft, type: 'calendar', title: 'Match day information', excerpt: 'Prepare the key details for the next match day.', author: 'Tuan Kiet', updatedAt: '2026-10-08T14:32:00' },
  { id: 'events', status: PostStatus.draft, type: 'file', title: 'November events calendar', excerpt: 'Draft the upcoming events and save for review.', author: 'Tuan Kiet', updatedAt: '2026-10-07T09:17:00' },
];
