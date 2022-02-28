import { style, createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
    color: '#3282f7',
});

export const containerStyle = style({
    position: 'relative',
    backgroundColor: vars.color,
    borderRadius: '0.25rem',

    height: 'fit-content',

    display: 'flex',
    flexDirection: 'column',

    width: '20%',
    transition: 'all 0.2s linear',
    selectors: {
        '&[data-expanded="true"]': {
            width: '40%',
            gridColumn: '3 span',
            borderRadius: '0.25rem 0.25rem 0 0',
        },
    },
    '@media': {
        'screen and (max-width: 425px)': {
            width: '100%',
            selectors: {
                '&[data-expanded="true"]': {
                    width: '100%',
                },
            },
        },
        'screen and (min-width: 425px) and (max-width: 1024px)': {
            width: '100%',
            selectors: {
                '&[data-expanded="true"]': {
                    width: '100%',
                },
            },
        },
    },
});
export const inputStyle = style({
    backgroundColor: 'transparent',
    border: 'none',
    width: '100%',
    height: '2.5rem',

    fontSize: '1.2rem',
    color: '#fff',
    gridColumn: '1 / span 11',

    '::placeholder': {
        color: '#e7e7e7',
        opacity: '0.8',
    },
    selectors: {
        '[data-expanded="false"] &::placeholder': {
            opacity: '0',
        },
    },
});
export const iconStyle = style({
    fontSize: '1.2rem',
    color: '#fff',
    transform: 'rotate(0deg)',
    selectors: {
        '[data-expanded="true"] button &': {
            transform: 'rotate(180deg)',
            transition: 'transform 0.3s ease-in-out',
        },
    },
});
export const buttonStyle = style({
    backgroundColor: 'transparent',
    border: 'none',
});

export const topContainerStyle = style({
    display: 'flex',
    padding: '0.5rem',
});

export const listboxStyle = style({
    position: 'absolute',
    top: '3rem',
    padding: '0.5rem',
    borderRadius: '0 0 0.25rem 0.25rem',

    backgroundColor: vars.color,

    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 1rem)',
    maxHeight: '20vh',
    overflowY: 'auto',

    visibility: 'hidden',
    opacity: '0',
    transition: 'all 200ms linear',
    '::-webkit-scrollbar': {
        width: '5px',
    },
    '::-webkit-scrollbar-thumb': {
        backgroundColor: '#f1f1f1',
        borderRadius: '5px',
    },
    selectors: {
        '[data-expanded="true"] &': {
            top: '3.5rem',
            visibility: 'visible',
            opacity: '1',
            zIndex: '1',
        },
        '[data-expanded="false"] &': {
            zIndex: '-1',
        },
    },
});

export const listboxUlStyle = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    margin: '0.1rem',
    padding: 0,
});

export const listboxLiStyle = style({
    color: '#fff',
    listStyle: 'none',
    fontSize: '1.1rem',
    ':hover': {
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    '@media': {
        'screen and (max-width: 425px)': {
            gridColumn: '3 span',
            textAlign: 'center',
            fontSize: '1.25rem',
        },
        'screen and (min-width: 425px) and (max-width: 1024px)': {
            gridColumn: '3 span',
            textAlign: 'center',
            fontSize: '1.25rem',
        },
    },
});
