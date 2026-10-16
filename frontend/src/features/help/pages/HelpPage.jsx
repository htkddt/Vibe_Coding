import { useMemo, useState } from 'react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { Icon } from '../../../components/ui/Icon.jsx';

const guides = [
  { icon: 'pen', title: 'Create a post', description: 'Publish updates and keep your club informed.', message: 'Open Posts to draft and publish an update.' },
  { icon: 'users', title: 'Find a member', description: 'Search and manage club members.', message: 'Use Employees to search by name, team, or role.' },
  { icon: 'settings', title: 'Manage your account', description: 'Update your profile and preferences.', message: 'Open Settings to manage workspace preferences.' },
];

const articles = [
  'How to invite new members',
  'How to update your club profile',
  'Understanding member roles',
];

export function HelpPage() {
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const visibleGuides = useMemo(() => guides.filter((guide) => (guide.title + guide.description).toLowerCase().includes(normalizedQuery)), [normalizedQuery]);
  const visibleArticles = useMemo(() => articles.filter((article) => article.toLowerCase().includes(normalizedQuery)), [normalizedQuery]);

  return (
    <section className="help-page">
      <label className="help-search" htmlFor="help-search"><Icon name="search" size={27} /><input id="help-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search help articles..." /></label>
      <section className="help-guides-section"><h2>Quick guides</h2><div className="help-guides">{visibleGuides.map((guide) => <Card className="help-guide-card" key={guide.title}><span className="help-guide-card__icon"><Icon name={guide.icon} size={31} /></span><h3>{guide.title}</h3><p>{guide.description}</p><button className="help-guide-card__action" aria-label={guide.title} onClick={() => setMessage(guide.message)}><Icon name="arrow" size={21} /></button></Card>)}</div></section>
      <section className="help-lower-grid">
        <Card className="popular-articles"><h2>Popular articles</h2><div>{visibleArticles.map((article) => <button key={article} onClick={() => setMessage(article + ' is ready to open when its article content is connected.')}><span><Icon name="file" size={21} /></span><strong>{article}</strong><Icon name="chevronDown" className="popular-articles__arrow" size={23} /></button>)}</div></Card>
        <section className="support-card"><Icon name="headset" size={39} /><h2>Still need help?</h2><p>Our support team is here to help you get the most from 179FC.</p><Button onClick={() => setMessage('Support contact is ready to connect when the support channel is available.')}>Contact support</Button></section>
      </section>
      {message ? <p className="help-message" role="status">{message}</p> : null}
      {!visibleGuides.length && !visibleArticles.length ? <p className="help-empty" role="status">No help articles match your search.</p> : null}
    </section>
  );
}
