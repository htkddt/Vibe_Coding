import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../../components/ui/Card.jsx';
import { Icon } from '../../../components/ui/Icon.jsx';
import { getHelp } from '../api/helpApi.js';

export function HelpPage() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => { let active = true; setError(false); getHelp().then(result => { if (active) setData(result); }).catch(() => { if (active) setError(true); }); return () => { active = false; }; }, [attempt]);
  const normalized = query.trim().toLowerCase();
  const visibleGuides = useMemo(() => (data?.guides || []).filter(guide => (guide.title + guide.description).toLowerCase().includes(normalized)), [data, normalized]);
  const visibleArticles = useMemo(() => (data?.articles || []).filter(article => article.title.toLowerCase().includes(normalized)), [data, normalized]);
  return <section className="help-page"><label className="help-search" htmlFor="help-search"><Icon name="search" size={27} /><span className="sr-only">Search help articles</span><input id="help-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search help articles..." /></label>
    {error ? <p role="alert">Could not load help content. <button onClick={() => setAttempt(value => value + 1)}>Retry</button></p> : !data ? <p role="status">Loading help content?</p> : <><section className="help-guides-section"><h2>Quick guides</h2><div className="help-guides">{visibleGuides.map(guide => <Card className="help-guide-card" key={guide.title}><span className="help-guide-card__icon"><Icon name={guide.icon} size={31} /></span><h3>{guide.title}</h3><p>{guide.description}</p><Link className="help-guide-card__action" aria-label={guide.title} to={guide.to}><Icon name="arrow" size={21} /></Link></Card>)}</div></section><section className="help-lower-grid"><Card className="popular-articles"><h2>Popular articles</h2><div>{visibleArticles.map(article => <Link className="popular-article-link" key={article.id} to={'/help/articles/' + article.id}><span><Icon name="file" size={21} /></span><strong>{article.title}</strong><Icon name="chevronDown" className="popular-articles__arrow" size={23} /></Link>)}</div></Card><section className="support-card"><Icon name="headset" size={39} /><h2>Still need help?</h2><p>Our support team is here to help you get the most from 179FC.</p><Link className="button" to="/help/support">Contact support</Link></section></section>{!visibleGuides.length && !visibleArticles.length && <p className="help-empty" role="status">No help articles match your search.</p>}</>}
  </section>;
}
