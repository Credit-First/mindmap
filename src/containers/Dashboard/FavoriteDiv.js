import * as React from 'react';
import {
    Button
} from '@material-ui/core';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

export default function FavoriteDiv() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 150px)', justifyContent: 'center', alignItems: 'center', color: 'rgb(138, 148, 153)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '100%', width: '100px', height: '100px', backgroundColor: '#dfdfdf', padding: 20 }}>
                <StarOutlineIcon style={{ fontSize: 40 }} />
            </div>
            <h4>
                No Favorite Maps
            </h4>
            <div>
                You can favorite maps via the context menu, or simply drag them onto the sidebar item.
            </div>
        </div>
    )
}