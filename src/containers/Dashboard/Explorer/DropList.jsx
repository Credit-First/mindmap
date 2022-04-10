import React from "react";
import {
    Tooltip,
    Checkbox
} from '@material-ui/core';
import DropTarget from "./DropTarget";
import { styled } from '@material-ui/styles';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useDispatch } from "react-redux";
import { actionInsertItemsToFolder } from "store/actions";

const DIV = styled('div')(({ theme, active }) => ({
    backgroundColor: 'rgb(10 10 10 / 2%)',
    cursor: 'pointer',
    borderRadius: 10,
    display: 'flex',
    overflow: 'hidden',
    alignitems: 'center',
    justifyContent: 'space-between',
    transition: theme.transitions.create('all', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    '&:hover': {
        boxShadow: 'rgb(185 185 185) 0px 0px 9px 0px'
    },
    '& .active': {
        padding: 0,
        flex: 0,
        display: 'none',
        ...(active && {
            display: 'block'
        })
    },
    ...(active ? {
        border: `1px solid ${theme.palette.primary.light}`,
    } : {
        border: '1px solid rgb(10 10 10 / 2%)',
    }),
    '&:hover .active': {
        display: 'block',
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    '& .icon': {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    '& .badge': {
        position: 'absolute',
        paddingTop: '2px',
        top: '-5px',
        right: '-8px',
        backgroundColor: 'rgb(249 24 24 / 40%)',
        borderRadius: '100%',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '20px'
    },
    '& .text': {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
    '& .action': {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    }
}))

export default (props) => {
    const dispatch = useDispatch();

    const { currentFolderName, id, name, moveType = '', onClick, onDelete } = props;

    const itemDropped = item => {
        // dispatch(actionInsertItemsToFolder(item, name, currentFolderName, moveType))
    }
    const [checked, setChecked] = React.useState({
        active: false,
    });
    const handelCheckButton = (event) => {
        setChecked({ ...checked, [event.target.name]: event.target.checked });
    }
    const { active } = checked;

    return (
            <DropTarget onItemDropped={itemDropped} dropEffect="link" >
                <Tooltip title={name || moveType}>
                    <DIV active={active ? 1 : 0}>
                        <div className='text' onClick={() => onClick(id)}>
                            <div className='icon'>
                                {moveType === 'BACK' ? <ArrowBackIcon /> : <FolderOpenOutlinedIcon />}
                            </div>
                            <div style={{ marginLeft: 5, fontSize: 17 }}>{moveType !== 'BACK' && name}</div>
                        </div>
                        {moveType !== 'BACK' && (
                            <div className='action'>
                                <Checkbox className='active' color='primary' checked={active} onChange={handelCheckButton} name='active' />
                                <DeleteOutlineIcon onClick={() => onDelete(id)} />
                            </div>
                        )}
                    </DIV>
                </Tooltip>
            </DropTarget>
    );
};