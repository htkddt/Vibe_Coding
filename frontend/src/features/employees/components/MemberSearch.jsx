import { TextField } from '../../../components/ui/TextField.jsx';

export function MemberSearch({ value, onChange }) {
  return <div className="member-search"><TextField id="member-search" icon="search" label="Search members" aria-label="Search members by name, role, team, or email" placeholder="Search by name, role, team, or email..." value={value} autoComplete="off" onChange={(event) => onChange(event.target.value)} /></div>;
}
