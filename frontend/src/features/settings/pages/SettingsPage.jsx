import { useState } from 'react';
import { Avatar } from '../../../components/ui/Avatar.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { Icon } from '../../../components/ui/Icon.jsx';

const tabs = ['General', 'Notifications', 'Security'];

function PreferenceRow({ icon, iconTone, title, description, checked, onChange, divider }) {
  return (
    <div className={'settings-preference' + (divider ? ' settings-preference--divider' : '')}>
      <span className={'settings-preference__icon settings-preference__icon--' + iconTone}><Icon name={icon} size={25} /></span>
      <div className="settings-preference__copy"><h3>{title}</h3><p>{description}</p></div>
      <button className={'switch' + (checked ? ' switch--on' : '')} type="button" role="switch" aria-checked={checked} aria-label={'Toggle ' + title} onClick={onChange}><span /></button>
    </div>
  );
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Notifications');
  const [preferences, setPreferences] = useState({ assistant: true, summary: false });
  const [saved, setSaved] = useState(false);
  const setPreference = (key) => setPreferences((current) => ({ ...current, [key]: !current[key] }));

  return (
    <section className="settings-page">
      <nav className="settings-tabs" aria-label="Settings sections">
        {tabs.map((tab) => <button key={tab} className={activeTab === tab ? 'settings-tabs__item settings-tabs__item--active' : 'settings-tabs__item'} onClick={() => setActiveTab(tab)}>{tab}</button>)}
      </nav>
      <div className="settings-layout">
        <Card className="settings-card settings-card--preferences">
          <h2>Notification preferences</h2>
          <PreferenceRow icon="bell" iconTone="pink" title="Assistant notifications" description="Receive relevant reminders from 179 Assist." checked={preferences.assistant} onChange={() => setPreference('assistant')} divider />
          <PreferenceRow icon="chart" iconTone="gray" title="Weekly activity summary" description="Get a weekly update about your club." checked={preferences.summary} onChange={() => setPreference('summary')} />
          <div className="settings-card__footer"><span role="status">{saved ? 'Changes saved.' : ''}</span><Button className="button--primary settings-save" onClick={() => setSaved(true)}>Save changes</Button></div>
        </Card>
        <Card className="account-card">
          <h2>Account</h2>
          <div className="account-card__profile"><Avatar initials="TK" tone="orange" size="xl" /><div><strong>Tuan Kiet</strong><span>Club Admin</span></div></div>
          <div className="account-card__email">tuankiet@179fc.com</div>
        </Card>
      </div>
    </section>
  );
}
