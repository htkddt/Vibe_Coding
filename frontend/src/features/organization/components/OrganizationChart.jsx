import { organization } from '../../../mocks/organization.js';
import { OrganizationNode } from './OrganizationNode.jsx';

function Branch({ member }) {
  return <li><OrganizationNode member={member} />{member.children?.length > 0 && <ul>{member.children.map(child => <Branch key={child.name} member={child} />)}</ul>}</li>;
}
export function OrganizationChart() {
  return <div className="organization-chart-scroll"><section className="organization-tree" aria-label="179FC organization chart"><ul><Branch member={organization} /></ul></section></div>;
}
