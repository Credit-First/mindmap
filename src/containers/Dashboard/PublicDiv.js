import * as React from 'react';
import {
    Button
} from '@material-ui/core';

export default function PublicDiv() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 150px)', justifyContent: 'center', alignItems: 'center', color: 'rgb(138, 148, 153)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '100%', width: '100px', height: '100px', backgroundColor: '#dfdfdf', padding: 20 }}>
                <img src='/assets/images/public.png' />
            </div>
            <h4>
                No Public Maps
            </h4>
            <div>
                You can make maps public via the context menu. Share your creation with the world.
            </div>
            <Button variant='contained' color='primary' style={{ marginTop: 20 }}>
                Browse the Public Maps Universe
            </Button>
        </div>
    )
}