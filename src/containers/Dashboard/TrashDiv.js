import * as React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

export default function TrashDiv() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 150px)', justifyContent: 'center', alignItems: 'center', color: 'rgb(138, 148, 153)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '100%', width: '100px', height: '100px', backgroundColor: '#dfdfdf', padding: 20 }}>
                <DeleteOutlineIcon style={{ fontSize: 40 }} />
            </div>
            <h4>
                Trash Empty
            </h4>
            <div>
                There are no deleted items.
            </div>
        </div>
    )
}