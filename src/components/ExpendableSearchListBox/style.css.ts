import { style, createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
    color: '#3282f7',
});

export const containerStyle = style({
    backgroundColor: vars.color,
    borderRadius: '0.25rem',

    height: 'fit-content',
    padding: '0.5rem',

    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    selectors: {
        '&[aria-expanded="true"]': {
            gridColumn: '3 span',
        },
        '&[aria-expanded="false"]': {
            gridColumn: '1 span',
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
        '[aria-expanded="false"] &::placeholder': {
            opacity: '0',
        },
    },
});
export const iconStyle = style({
    fontSize: '1.2rem',
    color: '#fff',
});
export const buttonStyle = style({
    backgroundColor: 'transparent',
    border: 'none',
});

export const listboxStyle = style({
    gridColumn: '1 / span 12',
    flexDirection: 'column',
    selectors: {
        '[aria-expanded="true"] &': {
            display: 'flex',
        },
        '[aria-expanded="false"] &': {
            display: 'none',
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
});
