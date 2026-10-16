import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AssistantLauncher } from '../assistant/AssistantLauncher.jsx';
import { Sidebar } from './Sidebar.jsx';
import { TopBar } from './TopBar.jsx';

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <div className="portal-shell"><Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><main className="portal-main"><TopBar onMenuClick={() => setSidebarOpen(true)} /><div className="portal-content"><Outlet /></div></main><AssistantLauncher /></div>;
}
