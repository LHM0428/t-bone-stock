import CONSENSUS_KEY from './_consensusKey';
import STOCK_KEY from './_stockKey';
import COLUMN_MAPPER from './_columnMapper';

export const CONSTANTS = {
    GRID_ICON : 'grid_icon',
    NAME_MAPPER : {
        ...COLUMN_MAPPER
    },
    ...CONSENSUS_KEY,
    ...STOCK_KEY,
}