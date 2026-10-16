const paths = {
  dashboard: <><rect x="3.5" y="3.5" width="7" height="7" rx="1" /><rect x="13.5" y="3.5" width="7" height="7" rx="1" /><rect x="3.5" y="13.5" width="7" height="7" rx="1" /><rect x="13.5" y="13.5" width="7" height="7" rx="1" /></>,
  posts: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5v9M7.5 12h9" /></>,
  employees: <><circle cx="12" cy="8" r="3.3" /><path d="M5.2 19.5c.7-3 3.25-5.1 6.8-5.1s6.1 2.1 6.8 5.1" /></>,
  organization: <><circle cx="7" cy="6.5" r="2.2" /><circle cx="17" cy="6.5" r="2.2" /><circle cx="12" cy="17.5" r="2.2" /><path d="M7 8.8v3.4h10V8.8M12 12.2v3.1" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.2 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06-2.04 2.04-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56v.09h-2.89v-.09a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06-2.04-2.04.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.04h-.09V9.62h.09A1.7 1.7 0 0 0 7.11 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.04-2.04.06.06a1.7 1.7 0 0 0 1.87.34 1.7 1.7 0 0 0 1.04-1.56v-.09h2.89v.09a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06 2.04 2.04-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03h.09v2.89h-.09a1.7 1.7 0 0 0-1.56 1.04Z" /></>,
  help: <path d="M9.25 9a2.8 2.8 0 1 1 4.92 1.84c-.87.92-2.17 1.38-2.17 3.03M12 18.2h.01" />,
  search: <><circle cx="10.5" cy="10.5" r="5.5" /><path d="m15 15 4.2 4.2" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  chevronDown: <path d="m8 10 4 4 4-4" />,
  arrow: <path d="M5 12h13M13 7l5 5-5 5" />,
  heart: <path d="M20 8.7c0 5-8 9.3-8 9.3s-8-4.3-8-9.3A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 8 .1v1.6Z" />,
  comment: <path d="M20 11.5a7.7 7.7 0 0 1-8 7.5 9 9 0 0 1-3.4-.7L4 20l1.4-3.4A7.2 7.2 0 0 1 4 12a7.7 7.7 0 0 1 8-7.5 7.7 7.7 0 0 1 8 7Z" />,
  sparkle: <path d="m12 3 1.75 5.25L19 10l-5.25 1.75L12 17l-1.75-5.25L5 10l5.25-1.75L12 3ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />,
  send: <path d="m4 12 16-8-5.4 16-3.1-5.1L4 12Zm7.5 2.9L20 4" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  logout: <><path d="M10 5H5v14h5M14 8l4 4-4 4M8 12h10" /></>,
  check: <path d="m5 12 4.2 4L19 6.5" />,
  bell: <><path d="M18 10a6 6 0 0 0-12 0c0 7-3 7-3 8h18c0-1-3-1-3-8M10 21h4" /></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  pen: <><path d="M13.5 6.5 17.5 10.5M4 20l4.2-1 10.9-10.9a2.8 2.8 0 1 0-4-4L4.2 15 4 20Z" /><path d="M14 4.9 19.1 10" /></>,
  users: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9.5" r="2.2" /><path d="M3.8 20c.5-3.3 2.8-5.4 5.2-5.4s4.7 2.1 5.2 5.4M15.5 15.2c2.4.2 4.2 1.8 4.7 4.3" /></>,
  file: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 12h6M9 16h6" /></>,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H5a1 1 0 0 1-1-1v-4ZM20 14h-3v5h2a1 1 0 0 0 1-1v-4ZM17 19c-.8 1.3-2.4 2-5 2" /></>,
};

export function Icon({ name, size = 18, className = '', strokeWidth = 1.7 }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.sparkle}</svg>;
}
