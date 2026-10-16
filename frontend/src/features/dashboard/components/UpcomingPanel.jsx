import { Card } from '../../../components/ui/Card.jsx';

export function UpcomingPanel({ events }) {
  return <Card className="upcoming-panel"><h2>Upcoming</h2>{events.map((event) => <article className="upcoming-event" key={event.date + event.title}><time>{event.date}</time><div><strong>{event.title}</strong><small>{event.meta}</small></div></article>)}</Card>;
}
