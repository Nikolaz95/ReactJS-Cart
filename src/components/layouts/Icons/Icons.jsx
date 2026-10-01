import React from 'react'

const stroke = {
    width: '1em',
    height: '1em',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
};

const filled = {
    width: '1em',
    height: '1em',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true,
};

export const CartIcon = (props) => (
    <svg {...stroke} {...props}>
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="18" cy="20" r="1.4" />
        <path d="M2.5 3h2.6l2.3 11.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21.5 7H6" />
    </svg>
);

export const PlusIcon = (props) => (
    <svg {...stroke} strokeWidth={2.5} {...props}>
        <path d="M12 5v14M5 12h14" />
    </svg>
);

export const MinusIcon = (props) => (
    <svg {...stroke} strokeWidth={2.5} {...props}>
        <path d="M5 12h14" />
    </svg>
);

export const CloseIcon = (props) => (
    <svg {...stroke} strokeWidth={2.5} {...props}>
        <path d="M6 6l12 12M18 6 6 18" />
    </svg>
);

export const CheckIcon = (props) => (
    <svg {...stroke} strokeWidth={2.5} {...props}>
        <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
);

export const TrashIcon = (props) => (
    <svg {...stroke} {...props}>
        <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
    </svg>
);

export const ArrowUpIcon = (props) => (
    <svg {...stroke} strokeWidth={2.5} {...props}>
        <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
);

export const ArrowLeftIcon = (props) => (
    <svg {...stroke} strokeWidth={2.5} {...props}>
        <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
);

export const ArrowDownIcon = (props) => (
    <svg {...stroke} strokeWidth={2.5} {...props}>
        <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
);

export const HomeIcon = (props) => (
    <svg {...stroke} {...props}>
        <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" />
    </svg>
);

export const MapPinIcon = (props) => (
    <svg {...stroke} {...props}>
        <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
    </svg>
);

export const MailIcon = (props) => (
    <svg {...stroke} {...props}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
);

export const SparkleIcon = (props) => (
    <svg {...filled} {...props}>
        <path d="M12 2.5c.4 4.6 2.9 7.1 7.5 7.5-4.6.4-7.1 2.9-7.5 7.5-.4-4.6-2.9-7.1-7.5-7.5 4.6-.4 7.1-2.9 7.5-7.5Z" />
        <path d="M19 15.5c.2 2 1.3 3.1 3.3 3.3-2 .2-3.1 1.3-3.3 3.3-.2-2-1.3-3.1-3.3-3.3 2-.2 3.1-1.3 3.3-3.3Z" opacity=".6" />
    </svg>
);

export const LeafIcon = (props) => (
    <svg {...stroke} {...props}>
        <path d="M5 21c0-9 5-15 15-16-1 10-7 15-15 16Z" />
        <path d="M5 21 13 13" />
    </svg>
);

export const GithubIcon = (props) => (
    <svg {...filled} {...props}>
        <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
);

export const LinkedinIcon = (props) => (
    <svg {...filled} {...props}>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4V9.75Z" />
    </svg>
);

export const CupcakeIcon = (props) => (
    <svg width="1em" height="1em" viewBox="0 0 32 32" aria-hidden="true" {...props}>
        <path d="M8.5 16h15l-2 9a1.6 1.6 0 0 1-1.6 1.3h-7.8A1.6 1.6 0 0 1 10.5 25l-2-9Z" fill="currentColor" />
        <path d="M13 17.5l.8 7M19 17.5l-.8 7M16 17.5v7" stroke="rgba(0,0,0,.18)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M7.5 16a4 4 0 0 1 3-3.9 5.6 5.6 0 0 1 11 0 4 4 0 0 1 3 3.9h-17Z" fill="#fde3d6" />
        <circle cx="16" cy="7.2" r="2" fill="currentColor" />
    </svg>
);
