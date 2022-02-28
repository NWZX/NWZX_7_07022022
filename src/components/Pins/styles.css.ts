import { createThemeContract, style } from '@vanilla-extract/css';

export const vars = createThemeContract({
    color: '#3282f7',
});

export const containerStyle = style({
    width: 'fit-content',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    backgroundColor: vars.color,
    color: '#fff',
    display: 'flex',
    visibility: 'hidden',
    opacity: 0,
    transition: 'opacity 0.2s linear',
    selectors: {
        '&[data-visible="true"]': {
            visibility: 'visible',
            opacity: 1,
        },
    },
});

export const buttonStyle = style({
    padding: '0',
    backgroundColor: 'transparent',
    border: 'none',
    marginLeft: '1rem',
});

export const iconStyle = style({
    color: '#fff',
    fontSize: '1.25rem',
});

export const textStyle = style({
    width: '100%',
});
