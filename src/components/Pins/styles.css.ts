import { createThemeContract, style } from '@vanilla-extract/css';

export const vars = createThemeContract({
    color: '#3282f7',
});

export const containerStyle = style({
    width: '100%',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    backgroundColor: vars.color,
    color: '#fff',
    display: 'flex',
});

export const buttonStyle = style({
    padding: '0',
    backgroundColor: 'transparent',
    border: 'none',
});

export const iconStyle = style({
    color: '#fff',
    fontSize: '1.25rem',
});

export const textStyle = style({
    width: '100%',
});
