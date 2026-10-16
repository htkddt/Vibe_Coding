import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../app/routes.js';
import { Avatar } from '../ui/Avatar.jsx';
import { Icon } from '../ui/Icon.jsx';

function Brand() {
  return <div className="brand" aria-label="179FC member portal"><span className="brand__mark">179</span><span><strong>179FC</strong><small>MEMBER PORTAL</small></span></div>;
}

export function Sidebar({ open, onClose }) {
  return (
    <>
      <aside className={'sidebar' + (open ? ' sidebar--open' : '')}>
        <Brand />
        <nav className="sidebar__nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => 'nav-item' + (isActive ? ' nav-item--active' : '')} onClick={onClose}><Icon name={item.icon} size={15} /><span>{item.label}</span></NavLink>)}
        </nav>
        <div className="sidebar__user"><Avatar initials="TK" tone="orange" size="sm" label="Tuan Kiet" /><span><strong>Tuan Kiet</strong><small>Club Admin</small></span></div>
      </aside>
      {open ? <button className="sidebar-scrim" aria-label="Close navigation" onClick={onClose} /> : null}
    </>
  );
}
