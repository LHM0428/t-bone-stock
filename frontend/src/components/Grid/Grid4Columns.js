import React from 'react';
import { CONSTANTS } from '../../common/Constant';
import GridIcon from './GridItem/GridIcon';


const Grid4Columns = ({ items, gridItemComponentType, ...props }) => {
    
    
    const getGridItemComponent = ( items, props ) => ({
        [CONSTANTS.GRID_ICON] : <GridIcon items={items} {...props} />
    });
    

    return (
    <>
        <div className="grid grid-cols-4 grid-flow-row gap-4">
            {getGridItemComponent(items, props)[gridItemComponentType]}
        </div>
    </>
    )
}

export default Grid4Columns;