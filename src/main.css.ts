/**
 *  Media queries reference:
 *      Mobile: (max-width: 425px)
 *      Tablet: (min-width: 425px) and (max-width: 1024px)
 *      Desktop: (min-width: 1024px)
 */

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
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '1rem',

    height: '0px',
    visibility: 'hidden',
    transition: 'all 80ms linear',
    selectors: {
        '&[data-visible="true"]': {
            height: '2rem',
            visibility: 'visible',
        },
    },
});

export const expendableSearchListBoxGroupStyle = style({
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
    '@media': {
        'screen and (max-width: 425px)': {
            flexDirection: 'column',
            gap: '1rem',
        },
    },
});

export const mainStyle = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    columnGap: '3rem',
    rowGap: '3rem',

    '@media': {
        'screen and (max-width: 425px)': {
            gridTemplateColumns: 'repeat(1, 1fr)',
        },
        'screen and (min-width: 425px) and (max-width: 1024px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
    },
});

export const noResultStyle = style({
    gridColumn: '1 / span 3',
    margin: 'auto',
    fontSize: '2rem',
    fontWeight: 'bold',
});
