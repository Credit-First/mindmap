import React from "react";
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Checkbox,
    Button,
    IconButton
} from '@material-ui/core';
import Drag from "./Drag";
import { styled } from '@material-ui/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import LinkIcon from '@material-ui/icons/Link';
import { useDispatch, useSelector } from "react-redux";
import { actionGetMap, actionSelectMap } from "store/actions";
import { selectMapList } from "store/selectors";

function MapItem(props) {
    const Item = styled('div')(({ theme, active }) => ({
        border: '1px solid rgb(0 0 0 / 9%)',
        borderRadius: 15,
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        '& .action-btn': {
            display:'flex',
            position: 'absolute',
            width: '100%',
            justifyContent: 'flex-end',
            padding: 10
        },
        '& .active': {
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'none',
            ...(active && {
                display: 'block'
            })

        },
        ...(active && {
            borderColor: theme.palette.primary.light,
        }),
        '&:hover .active': {
            display: 'block'
        },
        '& .img': {
            height: 180,
        },
        '& .detail': {
            padding: '10px 20px',
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
            '& .title': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: 18,
            },
            '& .duration': {
                fontSize: 14,
                padding: 5,
                color: 'rgb(0 0 0 / 45%)'
            },
            '& .btn-group': {
                display: 'flex',
                justifyContent: 'space-between'
            },
            '& .share': {
                height: 30,
                fontSize: 12,
                backgroundColor: 'rgb(0 0 0 / 8%)',
                textTransform: 'capitalize',
                padding: '0px 15px',
                boxShadow: 'none',
                borderRadius: 50,
            },
            '& .link': {
                padding: 0
            }
        },
        '&:hover .detail': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            transition: theme.transitions.create('all', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        '&:hover': {
            boxShadow: 'rgb(185 185 185) 0px 0px 9px 0px'
        }
    }));

    const { id, name, duration, img, created_at, onDelete, onClick } = props;
    const [checked, setChecked] = React.useState(false);

    const handelCheckButton = (event) => {
        setChecked(!checked);
    }
    const image = '/assets/photo/background.png';

    return (
        <Item active={checked ? 1 : 0}>
            <div className="action-btn">
                <Checkbox className='active' color='primary' checked={checked} onChange={handelCheckButton} name='active' />
                <DeleteOutlineIcon onClick={() => onDelete(id)} />
            </div>
            <div className='thumb_img' onClick={() => onClick(id)} style={{ height: '180px', backgroundRepeat: 'round', backgroundImage: `url(${image})` }}>
            </div>
            <div className='detail'>
                <div className='title'>{name}</div>
                <div className='duration'>{duration}days</div>
                <div className='duration'>{created_at.slice(0, 19)}</div>
                <div className='btn-group'>
                    <Button
                        className='share'
                    >
                        <PersonAddIcon style={{ width: 15, height: 15 }} />
                        Share
                    </Button>
                    <IconButton className='link'>
                        <LinkIcon />
                    </IconButton>
                </div>
            </div>
        </Item>
    )
}
export default (props) => {
    const { folderId, onDeleteMap } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mapList = useSelector(selectMapList);

    const image = '/assets/photo/background.png';

    const handleViewMap = (_id) => () => {
        dispatch(actionSelectMap(_id));
        navigate('/mindmap');
    }

    React.useEffect(() => {
        dispatch(actionGetMap(folderId))
    }, [folderId]);

    if (mapList.length > 0) {
        return (
            <Grid container spacing={3} style={{ cursor: 'pointer', marginTop: 10 }}>
                {
                    mapList && mapList.map((item, index) => (
                        <Grid key={index} item xs={12} xl={6} sm={4} md={3} >
                            <Drag dataItem={item.name || 'unnamed'} dragImage={image} dropEffect="link">
                                <MapItem {...item} onDelete={onDeleteMap} onClick={handleViewMap}/>
                            </Drag>
                        </Grid>
                    ))
                }
            </Grid>
        );
    }
    return (
        <div>There is no item</div>
    )
};
