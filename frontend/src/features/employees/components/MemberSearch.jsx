import { TextField } from '../../../components/ui/TextField.jsx';

export function MemberSearch({ value, onChange }) {
  return <div className="member-search"><TextField id="member-search" icon="search" label="Search members" aria-label="Search member by name or role" placeholder="Search member by name or role" value={value} onChange={(event) => onChange(event.target.value)} /></div>;
}
