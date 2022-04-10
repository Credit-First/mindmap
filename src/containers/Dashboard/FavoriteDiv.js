
import React from "react";
import {
    Grid,
    Checkbox,
    Button,
    IconButton
} from '@material-ui/core';
// import Drag from "./Drag";
import { styled } from '@material-ui/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LinkIcon from '@material-ui/icons/Link';
import { useDispatch, useSelector } from "react-redux";
import { actionGetMap } from "store/actions";
import { selectMapList } from "store/selectors";
import StarOutlineIcon from '@material-ui/icons/StarOutline';

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

    const { title, duration, img } = props;
    const [checked, setChecked] = React.useState({
        active: false,
    });
    const handelCheckButton = (event) => {
        setChecked({ ...checked, [event.target.name]: event.target.checked });
    }

    const { active } = checked;

    return (
        <Item active={active ? 1 : 0}>
            <Checkbox className='active' color='primary' checked={active} onChange={handelCheckButton} name='active' />
            <div className='thumb_img' style={{ height: '180px', backgroundRepeat: 'round', backgroundImage: `url(${img})` }}>
            </div>
            <div className='detail'>
                <div className='title'>{title}</div>
                <div className='duration'>{duration}days</div>
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
export default function FavoriteDiv(props) {
    const { folderTitle } = props;
    const dispatch = useDispatch();
    const mapList = useSelector(selectMapList);
    React.useEffect(() => {
        folderTitle && dispatch(actionGetMap(folderTitle))
    }, []);

    if (mapList.length > 0) {
        return (
            <Grid container spacing={3} style={{ cursor: 'pointer' }} style={{ marginTop: 10 }}>
                {
                    mapList && mapList.map((item, index) => (
                        <Grid key={index} item xs={12} xl={6} sm={4} md={3}>
                            <MapItem {...item} />
                        </Grid>
                    ))
                }
            </Grid>
        );
    }
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

