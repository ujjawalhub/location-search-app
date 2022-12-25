import React from 'react';
import Chip from '@material-ui/core/Chip';

import './Items.css';

function Items({ locations = [], isMore }) {
    
    return (
        <div className="searchOption">
            {locations && (
                <ul className="searchResult__items">
                    {locations.map((data, ind) => {
                        // show all items or partial based on show isMore
                        return ( !isMore ||  ind < 3 ?
                        <li key={data}>
                            <Chip
                                label={data}
                                style={{ maxWidth: 200 }}
                            />
                        </li> : ''
                        );
                    })}
                </ul>
            )}
            
        </div>
    )
}

export default Items;