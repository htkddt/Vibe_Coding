import { Card } from '../../../components/ui/Card.jsx';

export function StatCard({ value, label, tone }) {
  return <Card className="stat-card"><strong className={'stat-card__value stat-card__value--' + tone}>{value}</strong><span>{label}</span></Card>;
}
