import { style } from '@vanilla-extract/css';

export const headingStyle = style({
    textAlign: 'center',
    margin: 0,
});

export const imageStyle = style({
    width: '20%',
    height: '100%',
    '@media': {
        'screen and (max-width: 425px)': {
            width: '50%',
        },
    },
});
