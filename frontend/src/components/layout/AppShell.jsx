import { useEffect, useState } from 'react';
import { getSettings } from '../../features/settings/api/settingsApi.js';
import { Outlet } from 'react-router-dom';
import { AssistantLauncher } from '../assistant/AssistantLauncher.jsx';
import { Sidebar } from './Sidebar.jsx';
import { TopBar } from './TopBar.jsx';

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => { let active = true; const refresh = () => getSettings().then(settings => { if (active) setCompact(settings.compactNavigation); }); refresh(); window.addEventListener('179fc-settings-changed', refresh); return () => { active = false; window.removeEventListener('179fc-settings-changed', refresh); }; }, []);
  return <div className={'portal-shell' + (compact ? ' portal-shell--compact' : '')}><Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><main className="portal-main"><TopBar onMenuClick={() => setSidebarOpen(true)} /><div className="portal-content"><Outlet /></div></main><AssistantLauncher /></div>;
}
