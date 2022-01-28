import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import HelpIcon from '@material-ui/icons/Help';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import PrintIcon from '@material-ui/icons/Print';
import HeadsetIcon from '@material-ui/icons/Headset';
import ReactLoading from "react-loading";

function Modal(props) {
    const { loading } = props;

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        setOpen(loading);
    }, [loading]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"></DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <ReactLoading type='spin' color="blue" style={{ width: '50px' }} />
                    <DialogContentText id="alert-dialog-description">
                        Check map from template...
                    </DialogContentText>
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>
        </div>
    );
}
function UpgradeModal(props) {
    const { upgrade } = props;

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        setOpen(upgrade);
    }, [upgrade]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div id="alert-dialog-title" style={{ padding: 12, fontSize: 25, width: 400, display: 'flex', justifyContent: 'space-start', alignItems: 'center', backgroundImage: 'linear-gradient(90deg, rgb(255, 187, 51), rgb(255, 170, 0))', color: 'white' }}>
                    <HelpIcon />
                    Personal
                </div>
                <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 30, fontWeight: 'bold' }}>
                        Upgrade Now
                    </div>
                    <div style={{ color: '#c3c3c3' }}>
                        for unlimited mind maps
                    </div>
                </div>
                <div style={{ padding: 20 }}>
                    <div>
                        Going persona also gives you:
                    </div>
                    <div style={{ color: '#c3c3c3', padding: 5, textDecoration: 'underline', display: 'flex', alignItems: 'center' }}>
                        <AttachFileIcon />
                        File and Image attachments
                    </div>
                    <div style={{ color: '#c3c3c3', padding: 5, textDecoration: 'underline', display: 'flex', alignItems: 'center' }}>
                        <CloudDownloadIcon />
                        Image export
                    </div>
                    <div style={{ color: '#c3c3c3', padding: 5, textDecoration: 'underline', display: 'flex', alignItems: 'center' }}>
                        <PictureAsPdfIcon />
                        PDF export
                    </div>
                    <div style={{ color: '#c3c3c3', padding: 5, textDecoration: 'underline', display: 'flex', alignItems: 'center' }}>
                        <PrintIcon />
                        Mind Map printing
                    </div>
                    <div style={{ color: '#c3c3c3', padding: 5, textDecoration: 'underline', display: 'flex', alignItems: 'center' }}>
                        <HeadsetIcon />
                        Priority support
                    </div>
                </div>
                <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button style={{ boxShadow: 'none', backgroundColor: 'rgb(255, 187, 51)', color: 'white' }}>Go Personal</Button>
                        <a href='' style={{ textTransform: 'capitalize', color: '#c3c3c3' }}>Maybe Later</a>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export { Modal, UpgradeModal }