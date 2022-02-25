import { style } from '@vanilla-extract/css';

export const inputStyle = style({
    width: '100%',
    height: '3.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.25rem',
    paddingLeft: '1rem',

    fontSize: '1.2rem',
});
export const iconStyle = style({
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: '1.2rem',
    paddingRight: '1rem',
});

export const formStyle = style({
    display: 'flex',
    width: '100%',
    backgroundColor: '#e7e7e7',
    border: 'none',
    borderRadius: '0.25rem',
});
