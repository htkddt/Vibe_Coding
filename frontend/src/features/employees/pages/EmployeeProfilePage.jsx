import { Link, useParams } from 'react-router-dom';
import { Card } from '../../../components/ui/Card.jsx';
import { members } from '../../../mocks/members.js';

export function EmployeeProfilePage() {
  const { memberId } = useParams();
  const member = members.find((item) => item.id === memberId);
  return <Card className="profile-placeholder"><h2>{member ? member.name : 'Member profile'}</h2><p>The member profile design has not been supplied yet. This route is ready for the detailed profile experience.</p><Link to="/employees">Back to employees</Link></Card>;
}
