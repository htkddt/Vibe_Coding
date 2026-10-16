import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PAGE_META, ROUTES } from '../../app/routes.js';
import { useAuth } from '../../features/auth/authStore.jsx';
import { Avatar } from '../ui/Avatar.jsx';
import { Icon } from '../ui/Icon.jsx';

export function TopBar({ onMenuClick }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const meta = PAGE_META[pathname] || { title: 'Employee profile', subtitle: 'Member details' };
  const go = (to) => { setMenuOpen(false); navigate(to); };

  return (
    <header className={'top-bar top-bar--' + (pathname.split('/')[1] || 'dashboard')}>
      <div className="top-bar__title"><button className="menu-toggle" aria-label="Open navigation" onClick={onMenuClick}><Icon name="menu" /></button><div><h1>{meta.title}</h1><p>{meta.subtitle}</p></div></div>
      <div className="user-menu-wrap">
        <button className="user-trigger" aria-expanded={menuOpen} aria-label="Open user menu" onClick={() => setMenuOpen((current) => !current)}><Avatar initials="TK" tone="orange" size="sm" label="Tuan Kiet" /><Icon name="chevronDown" size={14} /></button>
        {menuOpen ? <div className="user-menu">
          <div className="user-menu__identity"><Avatar initials="TK" tone="orange" size="sm" /><span><strong>Tuan Kiet</strong><small>Club Admin</small></span></div>
          <div className="user-menu__divider" />
          <button onClick={() => go('/employees/tuan-kiet')}>Profile</button>
          <button onClick={() => go(ROUTES.settings)}>Settings</button>
          <button onClick={() => go(ROUTES.help)}>Help center</button>
          <button className="user-menu__logout" onClick={() => { signOut(); navigate(ROUTES.signIn); }}>Log out</button>
        </div> : null}
      </div>
    </header>
  );
}
