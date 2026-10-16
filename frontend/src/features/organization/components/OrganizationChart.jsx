import { organization } from '../../../mocks/organization.js';
import { OrganizationNode } from './OrganizationNode.jsx';

export function OrganizationChart() {
  return (
    <div className="organization-chart-scroll">
      <section className="organization-chart" aria-label="179FC organization chart">
        <div className="org-root"><OrganizationNode member={organization.root} /></div>
        <div className="org-connector org-connector--root" />
        <div className="org-level org-level--leaders">{organization.leaders.map((leader) => <div className="org-branch" key={leader.name}><OrganizationNode member={leader} /></div>)}</div>
        <div className="org-level org-level--reports">{organization.leaders.map((leader) => <div className="org-branch" key={leader.report.name}><OrganizationNode member={leader.report} /></div>)}</div>
      </section>
    </div>
  );
}
