import { style } from '@vanilla-extract/css';

export const appStyle = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
    marginLeft: '5%',
    marginRight: '5%',
});

export const headerStyle = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
});

export const pinsGroupStyle = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gap: '3rem',
});

export const expendableSearchListBoxGroupStyle = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '3rem',
});

export const mainStyle = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    columnGap: '3rem',
    rowGap: '3rem',
});
