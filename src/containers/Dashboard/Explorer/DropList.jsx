import React from "react";
import {
    Tooltip,
    Checkbox
} from '@material-ui/core';
import DropTarget from "./DropTarget";
import { styled } from '@material-ui/styles';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useDispatch } from "react-redux";
import { actionInsertItemsToFolder } from "store/actions";

const DIV = styled('div')(({ theme, active }) => ({
    backgroundColor: 'rgb(10 10 10 / 2%)',
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: 10,
    display: 'flex',
    overflow: 'hidden',
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
        alignItems: 'center'
    }
}))

export default (props) => {
    const dispatch = useDispatch();

    const { currentFolderTitle, title, moveType = '', onClick } = props;

    const itemDropped = item => {
        dispatch(actionInsertItemsToFolder(item, title, currentFolderTitle, moveType))
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
            <Tooltip title={title}>
                <DIV active={active ? 1 : 0}>
                    <div className='text' onClick={() => onClick(title)}>
                        <div className='icon'>
                            {moveType === 'BACK' ? <ArrowBackIcon /> : <FolderOpenOutlinedIcon />}
                        </div>
                        <div style={{ marginLeft: 10, fontSize: 20 }}>{ moveType !== 'BACK' && title}</div>
                    </div>
                    {moveType !== 'BACK' && <Checkbox className='active' color='primary' checked={active} onChange={handelCheckButton} name='active' />}
                </DIV>
            </Tooltip>
        </DropTarget>
    );
};