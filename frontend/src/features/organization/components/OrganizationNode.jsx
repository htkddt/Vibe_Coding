import { Avatar } from '../../../components/ui/Avatar.jsx';

export function OrganizationNode({ member }) {
  return <article className="organization-node"><Avatar initials={member.initials} tone={member.tone} size="sm" /><strong>{member.name}</strong></article>;
}
