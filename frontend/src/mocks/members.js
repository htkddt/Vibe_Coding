const inactiveMemberIds = new Set(['bao-tran', 'quynh-anh', 'phuc-nguyen', 'vinh-pham']);
const onlineMemberIds = new Set(['minh-khoa', 'an-pham', 'duy-nguyen', 'tuan-kiet', 'gia-huy', 'linh-nguyen', 'thanh-binh', 'nhat-minh', 'khanh-linh', 'my-duyen', 'trung-kien']);

const memberData = [
  { id: 'minh-khoa', initials: 'MK', tone: 'red', team: 'First Team', name: 'Minh Khoa', role: 'Head coach', email: 'minh.khoa@179fc.vn', location: 'Ho Chi Minh City', joined: 'Jan 2021', bio: 'Builds a disciplined, high-energy first team on and off the pitch.' },
  { id: 'thu-le', initials: 'TL', tone: 'orange', team: 'Management', name: 'Thu Le', role: 'Operations Lead', email: 'thu.le@179fc.vn', location: 'Ho Chi Minh City', joined: 'Mar 2021', bio: 'Keeps people, match days, and club operations moving in sync.' },
  { id: 'an-pham', initials: 'AP', tone: 'green', team: 'Media', name: 'An Pham', role: 'Content Creator', email: 'an.pham@179fc.vn', location: 'Ho Chi Minh City', joined: 'Jun 2022', bio: 'Turns club moments into stories the whole community can share.' },
  { id: 'duy-nguyen', initials: 'DN', tone: 'black', team: 'First Team', name: 'Duy Nguyen', role: 'Captain', email: 'duy.nguyen@179fc.vn', location: 'Ho Chi Minh City', joined: 'Feb 2020', bio: 'Leads by example and helps the squad stay connected.' },
  { id: 'tuan-kiet', initials: 'TK', tone: 'orange', team: 'Management', name: 'Tuan Kiet', role: 'Club Admin', email: 'tuan.kiet@179fc.vn', location: 'Ho Chi Minh City', joined: 'Jan 2020', bio: 'Supports the club with thoughtful systems and a member-first approach.' },
  { id: 'bao-tran', initials: 'BT', tone: 'red', team: 'First Team', name: 'Bao Tran', role: 'Goalkeeper', email: 'bao.tran@179fc.vn', location: 'Ho Chi Minh City', joined: 'Aug 2023', bio: 'A calm presence in goal with a sharp eye for the game.' },
  { id: 'gia-huy', initials: 'GH', tone: 'black', team: 'First Team', name: 'Gia Huy', role: 'Defender', email: 'gia.huy@179fc.vn', location: 'Ho Chi Minh City', joined: 'Sep 2023', bio: 'Brings composure and consistency to the defensive line.' },
  { id: 'linh-nguyen', initials: 'LN', tone: 'green', team: 'Women’s Team', name: 'Linh Nguyen', role: 'Team Manager', email: 'linh.nguyen@179fc.vn', location: 'Thu Duc City', joined: 'Apr 2022', bio: 'Creates the conditions for the women’s team to thrive together.' },
  { id: 'quynh-anh', initials: 'QA', tone: 'orange', team: 'Women’s Team', name: 'Quynh Anh', role: 'Midfielder', email: 'quynh.anh@179fc.vn', location: 'Ho Chi Minh City', joined: 'May 2023', bio: 'Connects play in the middle of the park with tireless energy.' },
  { id: 'duc-hoang', initials: 'DH', tone: 'red', team: 'Academy', name: 'Duc Hoang', role: 'Youth Coach', email: 'duc.hoang@179fc.vn', location: 'District 7', joined: 'Jul 2022', bio: 'Helps young players develop confidence, technique, and teamwork.' },
  { id: 'mai-phuong', initials: 'MP', tone: 'green', team: 'Media', name: 'Mai Phuong', role: 'Photographer', email: 'mai.phuong@179fc.vn', location: 'Ho Chi Minh City', joined: 'Oct 2024', bio: 'Captures the energy and emotion behind every club occasion.' },
  { id: 'thanh-binh', initials: 'TB', tone: 'black', team: 'First Team', name: 'Thanh Binh', role: 'Midfielder', email: 'thanh.binh@179fc.vn', location: 'Binh Thanh', joined: 'Nov 2021', bio: 'A reliable playmaker who keeps the tempo of the team.' },
  { id: 'nhat-minh', initials: 'NM', tone: 'orange', team: 'Academy', name: 'Nhat Minh', role: 'Fitness Coach', email: 'nhat.minh@179fc.vn', location: 'Tan Binh', joined: 'Jan 2024', bio: 'Designs inclusive training plans that help members progress safely.' },
  { id: 'hai-dang', initials: 'HD', tone: 'red', team: 'First Team', name: 'Hai Dang', role: 'Forward', email: 'hai.dang@179fc.vn', location: 'Ho Chi Minh City', joined: 'Feb 2024', bio: 'Brings movement, pace, and a positive presence to every match.' },
  { id: 'khanh-linh', initials: 'KL', tone: 'green', team: 'Partnerships', name: 'Khanh Linh', role: 'Partnerships Lead', email: 'khanh.linh@179fc.vn', location: 'District 1', joined: 'May 2021', bio: 'Builds meaningful relationships that strengthen the club community.' },
  { id: 'quoc-bao', initials: 'QB', tone: 'black', team: 'First Team', name: 'Quoc Bao', role: 'Defender', email: 'quoc.bao@179fc.vn', location: 'Go Vap', joined: 'Mar 2023', bio: 'A determined defender who values clear communication.' },
  { id: 'yen-nhi', initials: 'YN', tone: 'orange', team: 'Community', name: 'Yen Nhi', role: 'Volunteer Coordinator', email: 'yen.nhi@179fc.vn', location: 'Ho Chi Minh City', joined: 'Jun 2024', bio: 'Welcomes new volunteers and helps everyone find a way to contribute.' },
  { id: 'hoang-nam', initials: 'HN', tone: 'red', team: 'First Team', name: 'Hoang Nam', role: 'Winger', email: 'hoang.nam@179fc.vn', location: 'District 3', joined: 'Aug 2022', bio: 'Makes an impact with direct runs and a team-first attitude.' },
  { id: 'thao-vy', initials: 'TV', tone: 'green', team: 'Medical', name: 'Thao Vy', role: 'Physiotherapist', email: 'thao.vy@179fc.vn', location: 'Phu Nhuan', joined: 'Apr 2023', bio: 'Helps members recover well and stay ready for the next session.' },
  { id: 'tien-dat', initials: 'TD', tone: 'black', team: 'Academy', name: 'Tien Dat', role: 'Youth Coach', email: 'tien.dat@179fc.vn', location: 'Thu Duc City', joined: 'Sep 2022', bio: 'Makes training fun, challenging, and welcoming for every young player.' },
  { id: 'my-duyen', initials: 'MD', tone: 'orange', team: 'Media', name: 'My Duyen', role: 'Social Media Manager', email: 'my.duyen@179fc.vn', location: 'District 4', joined: 'Jan 2023', bio: 'Keeps the community close to the club through timely, human updates.' },
  { id: 'phuc-nguyen', initials: 'PN', tone: 'red', team: 'First Team', name: 'Phuc Nguyen', role: 'Goalkeeper', email: 'phuc.nguyen@179fc.vn', location: 'Binh Tan', joined: 'Oct 2022', bio: 'A vocal organizer with a passion for supporting the whole squad.' },
  { id: 'nhu-quynh', initials: 'NQ', tone: 'green', team: 'Women’s Team', name: 'Nhu Quynh', role: 'Defender', email: 'nhu.quynh@179fc.vn', location: 'Ho Chi Minh City', joined: 'Nov 2023', bio: 'Brings resilience, focus, and a calm head to the back line.' },
  { id: 'long-vu', initials: 'LV', tone: 'black', team: 'Community', name: 'Long Vu', role: 'Events Coordinator', email: 'long.vu@179fc.vn', location: 'District 7', joined: 'Feb 2022', bio: 'Creates friendly gatherings that help members feel at home.' },
  { id: 'kieu-anh', initials: 'KA', tone: 'orange', team: 'Management', name: 'Kieu Anh', role: 'Finance Coordinator', email: 'kieu.anh@179fc.vn', location: 'Ho Chi Minh City', joined: 'Mar 2024', bio: 'Keeps club finances clear, practical, and ready for the next idea.' },
  { id: 'trung-kien', initials: 'TK', tone: 'red', team: 'First Team', name: 'Trung Kien', role: 'Midfielder', email: 'trung.kien@179fc.vn', location: 'Tan Phu', joined: 'Aug 2024', bio: 'A versatile teammate who thrives on quick, connected football.' },
  { id: 'hanh-nguyen', initials: 'HN', tone: 'green', team: 'Medical', name: 'Hanh Nguyen', role: 'Sports Therapist', email: 'hanh.nguyen@179fc.vn', location: 'Ho Chi Minh City', joined: 'Sep 2024', bio: 'Supports members with practical recovery and mobility guidance.' },
  { id: 'vinh-pham', initials: 'VP', tone: 'black', team: 'Academy', name: 'Vinh Pham', role: 'Academy Assistant', email: 'vinh.pham@179fc.vn', location: 'District 2', joined: 'Jan 2025', bio: 'Helps every academy session run smoothly and feel encouraging.' },
  { id: 'kim-chi', initials: 'KC', tone: 'orange', team: 'Partnerships', name: 'Kim Chi', role: 'Community Partner', email: 'kim.chi@179fc.vn', location: 'District 1', joined: 'Feb 2025', bio: 'Connects local partners with the club’s community initiatives.' },
  { id: 'anh-tuan', initials: 'AT', tone: 'red', team: 'First Team', name: 'Anh Tuan', role: 'Forward', email: 'anh.tuan@179fc.vn', location: 'Ho Chi Minh City', joined: 'Mar 2025', bio: 'Brings a high work rate and a generous spirit to the front line.' },
];

export const members = memberData.map((member, index) => ({
  ...member,
  membership: inactiveMemberIds.has(member.id) ? 'inactive' : 'active',
  availability: onlineMemberIds.has(member.id) ? 'online' : 'offline',
  dateOfBirth: `${1985 + (index % 16)}-${String(((index * 5) % 12) + 1).padStart(2, '0')}-${String(((index * 7) % 27) + 1).padStart(2, '0')}`,
  phone: `+84 9${String(12000000 + (index * 17391)).padStart(8, '0')}`,
}));
