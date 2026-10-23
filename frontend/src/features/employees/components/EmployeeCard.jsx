import { Link } from 'react-router-dom';
import { Avatar } from '../../../components/ui/Avatar.jsx';
import { Icon } from '../../../components/ui/Icon.jsx';

export function EmployeeCard({ member, index }) {
  return <Link className="card employee-card" style={{ '--member-index': index }} to={'/employees/' + member.id} aria-label={`View ${member.name}'s profile`}>
    <div className="employee-card__header"><Avatar initials={member.initials} tone={member.tone} size="lg" label={member.name} /><span className="employee-card__team">{member.team}</span></div>
    <div className="employee-card__body"><h2>{member.name}</h2><p>{member.role}</p></div>
    <span className="employee-card__link">View profile <Icon name="arrow" size={16} /></span>
  </Link>;
}
