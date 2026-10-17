import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PAGE_META, ROUTES } from '../../app/routes.js';
import { useAuth } from '../../features/auth/authStore.jsx';
import { Avatar } from '../ui/Avatar.jsx';
import { Icon } from '../ui/Icon.jsx';

export function TopBar({ onMenuClick }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const outside = event => { if (!menuRef.current?.contains(event.target)) setMenuOpen(false); };
    const escape = event => { if (event.key === 'Escape') { setMenuOpen(false); menuRef.current?.querySelector('button')?.focus(); } };
    document.addEventListener('pointerdown', outside); document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [menuOpen]);
  const meta = PAGE_META[pathname] || (pathname === '/posts/new' ? { title: 'Create post', subtitle: 'Post creation' }
    : pathname.startsWith('/posts/') ? { title: pathname.endsWith('/edit') ? 'Edit draft' : 'Post details', subtitle: 'Club updates' }
    : pathname === '/settings/password' ? { title: 'Change password', subtitle: 'Account security' }
    : pathname === '/settings/sessions' ? { title: 'Manage sessions', subtitle: 'Account security' }
    : pathname.startsWith('/help/') ? { title: pathname === '/help/support' ? 'Contact support' : 'Help article', subtitle: 'Help Center' }
    : { title: 'Employee profile', subtitle: 'Member details' });
  const go = (to) => { setMenuOpen(false); navigate(to); };

  return (
    <header className={'top-bar top-bar--' + (pathname.split('/')[1] || 'dashboard')}>
      <div className="top-bar__title"><button className="menu-toggle" aria-label="Open navigation" onClick={onMenuClick}><Icon name="menu" /></button><div><h1>{meta.title}</h1>{meta.subtitle && <p>{meta.subtitle}</p>}</div></div>
      <div className="top-bar__actions">{pathname === ROUTES.posts && <Link className="button button--primary top-bar__create" to="/posts/new"><Icon name="plus" size={16} />Create post</Link>}
      <div className="user-menu-wrap" ref={menuRef}>
        <button className="user-trigger" aria-expanded={menuOpen} aria-label="Open user menu" onClick={() => setMenuOpen((current) => !current)}><Avatar initials="TK" tone="orange" size="sm" label="Tuan Kiet" /><Icon name="chevronDown" size={14} /></button>
        {menuOpen ? <div className="user-menu">
          <div className="user-menu__identity"><Avatar initials="TK" tone="orange" size="sm" /><span><strong>Tuan Kiet</strong><small>Club Admin</small></span></div>
          <div className="user-menu__divider" />
          <button onClick={() => go('/employees/tuan-kiet')}>Profile</button>
          <button onClick={() => go(ROUTES.settings)}>Settings</button>
          <button onClick={() => go(ROUTES.help)}>Help center</button>
          <button className="user-menu__logout" onClick={() => { if (!window.dispatchEvent(new Event('179fc-before-signout', { cancelable: true }))) return; signOut(); navigate(ROUTES.signIn); }}>Log out</button>
        </div> : null}
      </div></div>
    </header>
  );
}
