export function Avatar({ initials, tone = 'orange', size = 'md', image, label }) {
  return image ? <img className={'avatar avatar--' + size} src={image} alt={label || ''} /> : <span className={'avatar avatar--' + size + ' avatar--' + tone} aria-label={label}>{initials}</span>;
}
