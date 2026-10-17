import { googleMapsUrl } from '../dashboardStore.js';

export function SessionDetails({ event, compact = false }) {
  const date = new Date(`${event.date}T12:00:00`);
  const mapUrl = googleMapsUrl(event);

  return (
    <div className={'session-details' + (compact ? ' session-details--compact' : '')}>
      {event.imageUrl && <figure className="session-details__photo">
        <img src={event.imageUrl} alt={`View of ${event.location}`} loading="lazy" onError={e => { e.currentTarget.hidden = true; }} />
        {event.imageCredit && <figcaption>Photo: <a href={event.imageCredit.sourceUrl} target="_blank" rel="noreferrer">{event.imageCredit.author}</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a> · cropped</figcaption>}
      </figure>}
      <div className="session-details__body">
        <strong>{event.title}</strong>
        <span className="session-details__date">{compact ? event.time : `${date.toLocaleDateString('en', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} · ${event.time}`}</span>
        <span className="session-details__venue">{event.location}</span>
        {event.address && <span className="session-details__address">{event.address}</span>}
        {mapUrl && <a className="session-details__map" href={mapUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${event.location} in Google Maps (opens in a new tab)`}>View on Google Maps ↗</a>}
      </div>
    </div>
  );
}
