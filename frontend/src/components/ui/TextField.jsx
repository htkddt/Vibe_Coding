import { Icon } from './Icon.jsx';

export function TextField({ id, label, icon, error, ...props }) {
  return <label className="field" htmlFor={id}><span className="field__label">{label}</span><span className={'field__control' + (error ? ' field__control--error' : '')}>{icon ? <Icon name={icon} size={15} /> : null}<input id={id} {...props} /></span>{error ? <span className="field__error">{error}</span> : null}</label>;
}
