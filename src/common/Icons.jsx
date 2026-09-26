export const Icon = ({ name, size = 20 }) => {

  const paths = {
    check: <path d="m5 12 4 4L19 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    search: <>
        <circle cx="11" cy="11" r="7"/>
        <path d="m20 20-4-4"/>
    </>,
    sun: <>
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>
    </>,
    moon: <path d="M20 15.2A8 8 0 1 1 8.8 4 6.5 6.5 0 0 0 20 15.2Z" />,
    edit: <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />,
    trash: <>
        <path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7"/>
        <path d="M10 11v6m4-6v6"/>
    </>,
    calendar: <>
        <rect x="3" y="5" width="18" height="16" rx="2"/>
        <path d="M16 3v4M8 3v4M3 10h18"/>
    </>,
    bell: <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>
        <path d="M10 21h4"/>
    </>,
    logout: <>
        <path d="M10 17l5-5-5-5M15 12H3"/>
        <path d="M15 3h6v18h-6"/>
    </>,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    chart: <path d="M4 19V9m6 10V5m6 14v-7m4 7H2" />,
    grid: <>
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
    </>
  };

  return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            aria-hidden="true"
        >
            {paths[name]}
        </svg>
    );
};