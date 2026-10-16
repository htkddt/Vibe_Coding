import { Icon } from './Icon.jsx';

export function Button({ children, icon, className = '', type = 'button', ...props }) {
  return <button className={'button ' + className} type={type} {...props}>{icon ? <Icon name={icon} size={16} /> : null}{children}</button>;
}
