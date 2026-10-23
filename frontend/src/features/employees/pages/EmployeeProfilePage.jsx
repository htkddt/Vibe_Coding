import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar } from '../../../components/ui/Avatar.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { Icon } from '../../../components/ui/Icon.jsx';
import { members } from '../../../mocks/members.js';
import { applyMemberProfile, loadMemberProfileOverrides, saveMemberProfile } from '../memberProfileStore.js';

const teamOptions = [...new Set(members.map((member) => member.team))].sort();
const avatarSizeLimit = 1_500_000;

function profileValues(member) {
  return { avatar: member.avatar || '', team: member.team, dateOfBirth: member.dateOfBirth || '', phone: member.phone || '' };
}

export function EmployeeProfilePage() {
  const { memberId } = useParams();
  const baseMember = members.find((item) => item.id === memberId);
  const member = useMemo(() => baseMember ? applyMemberProfile(baseMember, loadMemberProfileOverrides()) : null, [baseMember]);
  const [profile, setProfile] = useState(() => member ? profileValues(member) : null);
  const [notice, setNotice] = useState('');
  const fileInput = useRef(null);

  useEffect(() => { setProfile(member ? profileValues(member) : null); setNotice(''); }, [memberId]);

  if (!member || !profile) return <Card className="profile-placeholder"><h2>Member not found</h2><p>This profile is unavailable or may have been removed from the directory.</p><Link to="/employees">Back to employees</Link></Card>;

  function updateProfile(field, value) { setProfile((current) => ({ ...current, [field]: value })); setNotice(''); }

  function uploadAvatar(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { setNotice('Please choose an image file for the avatar.'); return; }
    if (file.size > avatarSizeLimit) { setNotice('Choose an image smaller than 1.5 MB.'); return; }
    const reader = new FileReader();
    reader.onload = () => updateProfile('avatar', typeof reader.result === 'string' ? reader.result : '');
    reader.onerror = () => setNotice('The avatar could not be loaded. Please try another image.');
    reader.readAsDataURL(file);
  }

  function saveProfile(event) {
    event.preventDefault();
    saveMemberProfile(member.id, profile);
    setNotice('Profile changes saved.');
  }

  return <section className="employee-profile">
    <Link className="employee-profile__back" to="/employees"><Icon name="arrow" size={16} />Back to members</Link>
    <Card className="employee-profile__hero">
      <div className="employee-profile__identity"><Avatar image={profile.avatar || undefined} initials={member.initials} tone={member.tone} size="xl" label={member.name} /><div><span className="employee-profile__team">{profile.team}</span><h2>{member.name}</h2><p>{member.role}</p></div></div>
      <span className={'employee-profile__status' + (member.membership === 'inactive' ? ' employee-profile__status--inactive' : '')}><i />{member.membership === 'inactive' ? 'Inactive member' : 'Active member'}</span>
    </Card>
    <Card className="profile-editor"><form onSubmit={saveProfile}><header className="profile-editor__header"><div><span className="employees-eyebrow">PROFILE SETTINGS</span><h3>Personal information</h3><p>Update details that help teammates recognize and contact this member.</p></div></header><div className="profile-editor__layout"><section className="profile-avatar-editor" aria-labelledby="avatar-heading"><h4 id="avatar-heading">Avatar</h4><Avatar image={profile.avatar || undefined} initials={member.initials} tone={member.tone} size="xl" label={member.name} /><input ref={fileInput} className="sr-only" id="member-avatar" type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadAvatar} /><div className="profile-avatar-editor__actions"><Button className="button--outline" type="button" onClick={() => fileInput.current?.click()}>Upload photo</Button>{profile.avatar ? <button type="button" className="profile-link-button" onClick={() => updateProfile('avatar', '')}>Remove photo</button> : null}</div><small>PNG, JPG or WebP up to 1.5 MB.</small></section><section className="profile-editor__fields" aria-label="Personal information fields"><label>Team<select value={profile.team} onChange={(event) => updateProfile('team', event.target.value)}>{teamOptions.map((team) => <option key={team} value={team}>{team}</option>)}</select></label><label>Date of birth<input type="date" value={profile.dateOfBirth} onChange={(event) => updateProfile('dateOfBirth', event.target.value)} /></label><label>Phone number<input type="tel" value={profile.phone} onChange={(event) => updateProfile('phone', event.target.value)} placeholder="+84 900 000 000" /></label><label>Email<input type="email" value={member.email} readOnly aria-readonly="true" /></label></section></div><footer className="profile-editor__footer"><span role="status" aria-live="polite">{notice}</span><Button className="button--primary" type="submit">Save changes</Button></footer></form></Card>
    <div className="employee-profile__content"><Card className="employee-profile__about"><span className="employees-eyebrow">ABOUT</span><h3>Part of the 179FC community</h3><p>{member.bio}</p></Card><Card className="employee-profile__details"><h3>Member details</h3><dl><div><dt>Email</dt><dd><a href={`mailto:${member.email}`}>{member.email}</a></dd></div><div><dt>Location</dt><dd>{member.location}</dd></div><div><dt>Member since</dt><dd>{member.joined}</dd></div></dl></Card></div>
  </section>;
}
