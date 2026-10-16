import { Link } from 'react-router-dom';
import { Avatar } from '../../../components/ui/Avatar.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { Icon } from '../../../components/ui/Icon.jsx';

export function EmployeeCard({ member }) {
  return <Card className="employee-card"><Avatar initials={member.initials} tone={member.tone} size="lg" /><span className="employee-card__team">{member.team}</span><h2>{member.name}</h2><p>{member.role}</p><Link to={'/employees/' + member.id}>View profile <Icon name="arrow" size={14} /></Link></Card>;
}
