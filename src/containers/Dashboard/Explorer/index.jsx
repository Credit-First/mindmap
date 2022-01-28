import React from "react";
import {
    Grid,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import DragList from "./DragList";
import DropList from "./DropList";
import { useDispatch, useSelector } from "react-redux";
import { actionGetFolder } from "store/actions";
import { selectFolder } from "store/selectors";

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
    const { title, dir = [] } = useSelector(selectFolder);

    React.useEffect(() => {
        dispatch(actionGetFolder(title));
    }, []);

    const handleClick = (_title) => {
        dispatch(actionGetFolder(_title));
    }
    const handleBack = () => {
        dispatch(actionGetFolder(title, 'BACK'));
    }
    return (
        <div className={classes.root}>
            <div className={classes.main} >
                {
                    title !== 'All' && (
                        <div style={{fontSize: 20, marginRight: 10}}>
                            <DropList className={classes.item} moveType='BACK' title='Back' currentFolderTitle={title} onClick={handleBack} />
                        </div>
                    )
                }
                <Grid container spacing={2} >
                    {
                        dir.map((item, index) => {
                            return (
                                <Grid key={index} item xs={12} xl={6} sm={4} md={4}>
                                    <DropList {...item} currentFolderTitle={title} onClick={handleClick} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
            <div>
                <div className={classes.folderTitle}>{title !== 'All' && title}</div>
                <DragList folderTitle={title} />
            </div>
        </div >
    );
}

export default FileExplorer;
