import { useEffect, useRef, useState } from 'react';
import { Link, useBlocker } from 'react-router-dom';
import { Avatar } from '../../../components/ui/Avatar.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { Icon } from '../../../components/ui/Icon.jsx';
import { Tabs } from '../../../components/ui/Tabs.jsx';
import { useUrlTab } from '../../../hooks/useUrlTab.js';
import { getSettings, saveSettings } from '../api/settingsApi.js';

const tabs = [{ value: 'general', label: 'General' }, { value: 'notifications', label: 'Notifications' }, { value: 'security', label: 'Security' }];
const keys = { general: ['clubName', 'language', 'timeZone', 'compactNavigation'], notifications: ['assistant', 'summary'], security: ['twoFactor'] };
function Switch({ label, checked, onChange }) { return <button className={'switch' + (checked ? ' switch--on' : '')} type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)}><span /></button>; }
function PreferenceRow({ icon, tone = 'pink', title, description, children, highlighted = false }) { return <div className={'settings-preference settings-preference--divider' + (highlighted ? ' settings-preference--highlighted' : '')}><span className={'settings-preference__icon settings-preference__icon--' + tone}><Icon name={icon} size={25} /></span><div className="settings-preference__copy"><h3>{title}</h3><p>{description}</p></div>{children}</div>; }
export function SettingsPage() {
  const allowSignOut = useRef(false);
  const [tab, setTab] = useUrlTab(tabs.map(item => item.value), 'general');
  const [saved, setSaved] = useState(null);
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => { let active = true; setLoadError(false); getSettings().then(data => { if (active) { setSaved(data); setForm(data); } }).catch(() => { if (active) setLoadError(true); }); return () => { active = false; }; }, [attempt]);
  const dirty = !!form && !!saved && Object.keys(form).some(key => form[key] !== saved[key]);
  const tabDirty = !!form && !!saved && keys[tab].some(key => form[key] !== saved[key]);
  const blocker = useBlocker(({ currentLocation, nextLocation }) => dirty && !allowSignOut.current && (currentLocation.pathname !== nextLocation.pathname || currentLocation.search !== nextLocation.search));
  useEffect(() => { if (blocker.state === 'blocked') { if (window.confirm('You have unsaved changes. Continue?')) blocker.proceed(); else blocker.reset(); } }, [blocker]);
  useEffect(() => { const warn = event => { if (dirty) { event.preventDefault(); event.returnValue = ''; } }; window.addEventListener('beforeunload', warn); return () => window.removeEventListener('beforeunload', warn); }, [dirty]);
  useEffect(() => { const guard = event => { if (dirty && !window.confirm('You have unsaved changes. Log out anyway?')) event.preventDefault(); else allowSignOut.current = true; }; window.addEventListener('179fc-before-signout', guard); return () => window.removeEventListener('179fc-before-signout', guard); }, [dirty]);
  function update(key, value) { setForm(current => ({ ...current, [key]: value })); setMessage(''); }
  async function save(event) { event.preventDefault(); if (!form.clubName.trim() && tab === 'general') { setMessage('Club name is required.'); return; } setSaving(true); setMessage(''); try { const changes = Object.fromEntries(keys[tab].filter(key => form[key] !== saved[key]).map(key => [key, form[key]])); const result = await saveSettings(changes); setSaved(result); setForm(current => ({ ...current, ...Object.fromEntries(keys[tab].map(key => [key, result[key]])) })); setMessage('Changes saved.'); } catch (error) { setMessage(error.message || 'Unable to save changes. Please try again.'); } finally { setSaving(false); } }
  return <section className="settings-page"><Tabs items={tabs} value={tab} onChange={setTab} label="Settings sections" /><div className="settings-layout"><Card className="settings-card" id={'panel-' + tab} role="tabpanel" aria-labelledby={'tab-' + tab}>
    {loadError ? <div role="alert">Could not load settings. <button onClick={() => setAttempt(value => value + 1)}>Retry</button></div> : !form ? <div role="status">Loading settings?</div> : <form onSubmit={save}>
      {tab === 'general' && <><h2>General settings</h2><div className="settings-group"><h3>Workspace</h3><label className="settings-field"><span>Club name</span><input value={form.clubName} onChange={event => update('clubName', event.target.value)} aria-invalid={!form.clubName.trim()} required /></label><label className="settings-field"><span>Workspace language</span><select value={form.language} onChange={event => update('language', event.target.value)}><option>English</option><option>Vietnamese</option></select></label></div><div className="settings-group"><h3>Preferences</h3><label className="settings-field"><span>Time zone</span><select value={form.timeZone} onChange={event => update('timeZone', event.target.value)}><option value="Asia/Ho_Chi_Minh">(GMT+07:00) Ho Chi Minh City</option><option value="UTC">(GMT+00:00) UTC</option></select></label><div className="settings-field"><span><strong>Compact navigation</strong><small>Use a condensed sidebar layout.</small></span><Switch label="Compact navigation" checked={form.compactNavigation} onChange={value => update('compactNavigation', value)} /></div></div></>}
      {tab === 'notifications' && <><h2>Notification preferences</h2><PreferenceRow icon="bell" title="Assistant notifications" description="Receive relevant reminders from 179 Assist."><Switch label="Assistant notifications" checked={form.assistant} onChange={value => update('assistant', value)} /></PreferenceRow><PreferenceRow icon="chart" tone="gray" title="Weekly activity summary" description="Get a weekly update about your club."><Switch label="Weekly activity summary" checked={form.summary} onChange={value => update('summary', value)} /></PreferenceRow></>}
      {tab === 'security' && <><h2>Security</h2><p className="security-demo-note">Demo only: these settings do not change account security.</p><PreferenceRow icon="lock" title="Password" description="Use a strong password to keep your account secure."><Link className="button button--outline" to="/settings/password">Change password</Link></PreferenceRow><PreferenceRow icon="shield" tone="gray" title="Two-factor authentication" description="Add an extra layer of protection to your account."><Switch label="Two-factor authentication" checked={form.twoFactor} onChange={value => update('twoFactor', value)} /></PreferenceRow><PreferenceRow icon="monitor" title="Active sessions" description="Chrome on Windows ? Ho Chi Minh City" highlighted><Link className="button button--outline" to="/settings/sessions">Manage sessions</Link></PreferenceRow></>}
      <div className="settings-card__footer"><span role="status">{message}</span><Button type="submit" className="button--primary settings-save" disabled={!tabDirty || saving}>{saving ? 'Saving?' : 'Save changes'}</Button></div>
    </form>}
  </Card><Card className="account-card"><h2>Account</h2><div className="account-card__profile"><Avatar initials="TK" tone="orange" size="xl" /><div><strong>Tuan Kiet</strong><span>Club Admin</span></div></div><div className="account-card__email">tuankiet@179fc.com</div></Card></div></section>;
}
