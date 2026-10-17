export const dashboardStats = [
  { value: '48', label: 'Active members', tone: 'red' },
  { value: '12', label: 'Posts this week', tone: 'green' },
  { value: '4', label: 'Teams', tone: 'orange' },
];

export const teamPosts = [
  {
    id: 'training-preview', author: 'Minh Le', initials: 'ML', tone: 'green', team: 'First Team', time: 'Today',
    content: 'Our next weekly training session is coming up. Check the pitch details and join us!', tag: 'Training', eventId: 'weekly-training', likes: 9, liked: false,
    comments: [{ id: 'training-preview-1', author: 'Linh Tran', text: 'See you there!' }],
  },
  {
    id: 'friendly-preview', author: 'Linh Tran', initials: 'LT', tone: 'orange', team: 'First Team', time: 'Today',
    content: 'Save the date for our next friendly match. Bring your teammates and come cheer us on!', tag: 'Match day', eventId: 'friendly-match', likes: 15, liked: false,
    comments: [{ id: 'friendly-preview-1', author: 'Minh Le', text: 'Looking forward to it!' }],
  },
  {
    id: 'training-update', author: 'Minh Le', initials: 'ML', tone: 'green', team: 'First Team', time: '2 hours ago',
    content: 'Training session moved to Wednesday, 19:00. Please confirm availability before noon.', tag: 'Training', likes: 12, liked: false,
    comments: [{ id: 'training-1', author: 'Bao Nguyen', text: 'Confirmed, see you on the pitch!' }, { id: 'training-2', author: 'Linh Tran', text: 'Thanks for the update. I will be there.' }],
  },
  {
    id: 'match-recap', author: 'Linh Tran', initials: 'LT', tone: 'orange', team: 'First Team', time: '5 hours ago',
    content: 'Great teamwork in yesterday’s friendly! Thank you to everyone who came out to support the team.', tag: 'Match recap', likes: 18, liked: false,
    comments: [{ id: 'match-1', author: 'Minh Le', text: 'What a performance from the whole squad!' }],
  },
  {
    id: 'volunteers', author: 'Tuan Kiet', initials: 'TK', tone: 'red', team: 'Club Admin', time: 'Yesterday',
    content: 'We are looking for volunteers to help welcome new members at our next club event. Let us know if you can join.', tag: 'Community', likes: 8, liked: false,
    comments: [{ id: 'volunteer-1', author: 'An Pham', text: 'Happy to help with the welcome desk.' }, { id: 'volunteer-2', author: 'Minh Le', text: 'Count me in too!' }],
  },
  {
    id: 'youth-session', author: 'An Pham', initials: 'AP', tone: 'black', team: 'Youth Team', time: '2 days ago',
    content: 'The youth team will focus on passing and movement this week. Remember to bring water and arrive 15 minutes early.', tag: 'Youth team', likes: 6, liked: false,
    comments: [],
  },
];

function dateInDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export const upcomingEvents = [
  { id: 'weekly-training', date: dateInDays(1), title: 'Weekly training', time: '19:00', location: 'Sân vận động Quân khu 7', address: '202 Hoàng Văn Thụ, TP. Hồ Chí Minh', imageUrl: '/images/dashboard/quan-khu-7.jpg', imageCredit: { author: 'ThoseDaysAreGone', sourceUrl: 'https://commons.wikimedia.org/wiki/File:S%C3%A2n_v%E1%BA%ADn_%C4%91%E1%BB%99ng_Qu%C3%A2n_khu_7.jpg' } },
  { id: 'board-sync', date: dateInDays(3), title: 'Board sync', time: '18:30', location: 'Online' },
  { id: 'friendly-match', date: dateInDays(7), title: 'Friendly match', time: '16:00', location: 'Sân vận động Thống Nhất', address: '138 Đào Duy Từ, TP. Hồ Chí Minh', imageUrl: '/images/dashboard/thong-nhat.jpg', imageCredit: { author: 'Yanee134', sourceUrl: 'https://commons.wikimedia.org/wiki/File:20180909_Th%E1%BB%91ng_Nh%E1%BA%A5t_Stadium.jpg' } },
];
