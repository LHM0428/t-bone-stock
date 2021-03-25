import React from 'react';

const GridIcon = ( {items, onClickGridItem, ...props} ) => {

    return (
        <>
            {items.map(item => 
                <div className="p-4" key={item.key}>
                    <span style={{"cursor":"pointer"}} onClick={() => onClickGridItem(item)}>
                        <img src={item.default} />
                        {item.sectorName}
                    </span>
                </div>
            )}
        </>
    )
}



export default GridIcon;