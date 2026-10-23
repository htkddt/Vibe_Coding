import { EmployeeCard } from './EmployeeCard.jsx';

export function EmployeeGrid({ members }) {
  return <div className="employee-grid">{members.map((member, index) => <EmployeeCard key={member.id} member={member} index={index} />)}</div>;
}
