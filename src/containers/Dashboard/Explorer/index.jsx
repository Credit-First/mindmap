import React from "react";
import {
    Grid,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import DragList from "./DragList";
import DropList from "./DropList";
import { useDispatch, useSelector } from "react-redux";
import { actionGetFolders, actionGetFoldersById, actionDeleteFolder, actionDeleteMap } from "store/actions";
import { selectFolder, selectCurrentFolderName, selectCurrentFolderId } from "store/selectors";

const useStyles = makeStyles((theme) => ({
    root: {
        flexDirection: 'column'
    },
    main: {
        display: 'flex',
        cursor: 'pointer',
        marginTop: 10,
        marginTop: '20px',
        marginBottom: '20px',
        alignItems: 'center',
        padding: 10,
        borderTop: '1px solid rgb(128 128 128 / 12%)',
        borderBottom: '1px solid rgb(128 128 128 / 12%)'
    },
    item: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgb(10 10 10 / 2%)',
        borderRadius: 10,
        padding: '10px 20px',
        '&:hover': {
            backgroundColor: 'grey'
        },
        '& .icon': {
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
        },
    },
    folderTitle: {
        fontSize: 25,
        color: theme.palette.primary.main,
    }
}));

function FileExplorer() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const folders = useSelector(selectFolder);
    const currentFolderName = useSelector(selectCurrentFolderName);
    const currentFolderId = useSelector(selectCurrentFolderId);

    const handleClick = (_folderId) => {
        dispatch(actionGetFoldersById(_folderId));
    }
    const handleBack = () => {
        dispatch(actionGetFoldersById(null));
    }
    const handleDelete = (_folderId) => {
        dispatch(actionDeleteFolder(_folderId));
    }
    const handleDeleteMap = (_mapId) => {
        dispatch(actionDeleteMap(_mapId));
    }
    React.useEffect(() => {
        dispatch(actionGetFolders());
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.main} >
                {
                    currentFolderName !== 'All' && (
                        <div style={{ fontSize: 20, marginRight: 10 }}>
                            <DropList className={classes.item} moveType='BACK' title='Back' currentFolderName={currentFolderName} onClick={handleBack} />
                        </div>
                    )
                }
                <Grid container spacing={2} >
                    {
                        folders.map((item, index) => {
                            return (
                                <Grid key={index} item xs={12} xl={6} sm={4} md={4}>
                                    <DropList {...item} currentFolderName={currentFolderName} onClick={handleClick} onDelete={handleDelete} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
            <div>
                <div className={classes.folderTitle}>{currentFolderName !== 'All' && currentFolderName}</div>
                <DragList folderId={currentFolderId} onDeleteMap={handleDeleteMap} />
            </div>
        </div >
    );
}

export default FileExplorer;
