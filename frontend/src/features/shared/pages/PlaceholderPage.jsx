import { Card } from '../../../components/ui/Card.jsx';

export function PlaceholderPage({ title, description }) {
  return <Card className="profile-placeholder"><h2>{title}</h2><p>{description}</p><p>This area is intentionally held for its approved design and feature specification.</p></Card>;
}
