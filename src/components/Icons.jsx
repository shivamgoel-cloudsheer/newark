// Inline SVG icon set — stroke inherits currentColor so every theme tints them.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function Icon({ name, size = 26 }) {
  const paths = {
    install: (
      <>
        <path d="M12 3v4" />
        <circle cx="12" cy="9.5" r="2.5" />
        <path d="M7 21c1-4 2.6-6 5-6s4 2 5 6" />
        <path d="M4 7h16" />
      </>
    ),
    wrench: (
      <>
        <path d="M14.7 6.3a4.5 4.5 0 0 0-6 5.6L3 17.6V21h3.4l5.7-5.7a4.5 4.5 0 0 0 5.6-6L14.5 12l-2.5-2.5 2.7-3.2z" />
      </>
    ),
    clipboard: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4.5V3h6v1.5" />
        <path d="M8.5 11l2.2 2.2L15.5 8.5" />
        <path d="M8.5 16.5h7" />
      </>
    ),
    blueprint: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <path d="M3 9.5h6.5V19" />
        <path d="M13 9.5h4M13 13h8M16.5 5v4.5" />
      </>
    ),
    flame: (
      <>
        <path d="M12 3c.5 3-1.5 4.5-2.8 6.2A6.5 6.5 0 1 0 18.5 14c0-3.5-2.7-4.6-3.5-7.5-1 .8-1.5 2-1.3 3.5C12.2 8.5 11.5 5.5 12 3z" />
      </>
    ),
    phone: (
      <>
        <path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a1.8 1.8 0 0 1-2 1.8A16.5 16.5 0 0 1 3.2 6 1.8 1.8 0 0 1 5 4z" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3l7.5 2.8v5.4c0 4.6-3 8.3-7.5 9.8-4.5-1.5-7.5-5.2-7.5-9.8V5.8z" />
        <path d="M8.8 11.6l2.3 2.3 4.1-4.4" />
      </>
    ),
    gamepad: (
      <>
        <rect x="3" y="8" width="18" height="9.5" rx="4.5" />
        <path d="M8 11v3.5M6.2 12.8h3.6" />
        <circle cx="15.5" cy="11.6" r="0.4" />
        <circle cx="17.8" cy="13.9" r="0.4" />
      </>
    ),
    chat: (
      <>
        <path d="M4 6a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 6v8a2.5 2.5 0 0 1-2.5 2.5H10L5.5 20.5V16.5H6.5A2.5 2.5 0 0 1 4 14z" />
        <path d="M8.5 9h7M8.5 12h4.5" />
      </>
    ),
    arrow: <path d="M4 12h15M13.5 6l6 6-6 6" />,
    check: <path d="M4.5 12.5l5 5L19.5 7" />,
    close: <path d="M6 6l12 12M18 6L6 18" />,
    send: <path d="M4 11.5L20 4l-4.5 16-3.7-6.3L4 11.5z" />,
    building: (
      <>
        <rect x="5" y="4" width="9" height="17" />
        <path d="M14 10h5v11H3.5" />
        <path d="M8 8h1.5M11 8h1.5M8 11.5h1.5M11 11.5h1.5M8 15h1.5M11 15h1.5M16.2 13h1.3M16.2 16h1.3" />
      </>
    ),
    droplet: (
      <>
        <path d="M12 3.5S6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5z" />
      </>
    ),
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      {paths[name] || paths.flame}
    </svg>
  )
}
