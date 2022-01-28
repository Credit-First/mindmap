import * as React from 'react';

export default function UpgradeDiv() {
    return (
        <div style={{ width: '30%', marginTop: 100, height: '100%', paddingLeft: '35px' }}>
            <div style={{ fontSize: 25, marginBottom: 15 }}>Activity</div>
            <div style={{ color: 'grey' }}>
                <div>Today</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
                    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', padding: 10, border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: 10 }}>
                        <div>7 minutes ago</div>
                        <div style={{ paddingTop: 5, paddingBottom: 5, color: 'black' }}>You are missing out!</div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', backgroundColor: 'rgb(230, 247, 255)', borderRadius: 20 }}>
                            <img src='/assets/images/svg/upgradeEmail.png' style={{ width: 80, height: 80 }} />
                        </div>
                        <div style={{ marginTop: 10 }}>
                            Be the first to learn about our latest updates, feature releases, and MindMeister tips!
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}