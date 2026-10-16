import { EmployeeCard } from './EmployeeCard.jsx';

export function EmployeeGrid({ members }) {
  return <div className="employee-grid">{members.map((member) => <EmployeeCard key={member.id} member={member} />)}</div>;
}
