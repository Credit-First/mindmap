import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    IconButton,
    Grid,
    Menu,
    Checkbox,
    alpha,
    Button,
    MenuItem,
    Divider,
    Tooltip,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles, styled } from '@material-ui/styles';
import classNames from 'classnames';
import ReactLoading from "react-loading";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import InputIcon from '@material-ui/icons/Input';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LinkIcon from '@material-ui/icons/Link';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import HelpIcon from '@material-ui/icons/Help';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import PrintIcon from '@material-ui/icons/Print';
import HeadsetIcon from '@material-ui/icons/Headset';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { selectSortType, selectUpgradeType } from 'store/selectors';
import { useSelector } from 'react-redux';

const list = [
    {
        title: 'First Mind Map',
        duration: 5,
        img: '/assets/photo/background3.png',
        members: 10,
        modified: '2022-01-20'
    },
    {
        title: 'Second Mind Map',
        duration: 3,
        img: '/assets/photo/background1.png',
        members: 10,
        modified: '2022-01-20'
    },
    {
        title: 'Third Mind Map',
        duration: 6,
        img: '/assets/photo/background2.png',
        members: 10,
        modified: '2022-01-20'
    },
    {
        title: 'Fourth Mind Map',
        duration: 2,
        img: '/assets/photo/background3.png',
        members: 10,
        modified: '2022-01-20'
    },
    {
        title: 'Fifth Mind Map',
        duration: 5,
        img: '/assets/photo/background1.png',
        members: 10,
        modified: '2022-01-20'
    },
    {
        title: 'Sixth Mind Map',
        duration: 5,
        img: '/assets/photo/background2.png',
        members: 10,
        modified: '2022-01-20'
    }
]

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        height: '100vh',
        padding: 30,
        overflow: 'auto'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(5, 2),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    Item: {
        ...theme.typography.body2,
        flex: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgb(10 10 10 / 2%)',
        textAlign: 'center',
        boxShadow: 'none',
        borderRadius: 15,
        fontSize: 11,
        margin: 3,
        flexGrow: 1,
        flexShrink: 1,
        height: '100px',
        color: theme.palette.text.secondary,
        '&:hover': {
            backgroundColor: '#d3d3d3'
        }
    }
}));

const Dashboard = (props) => {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();

    const currentPath = location.pathname;

    const [loading, setLoading] = React.useState(false);
    const [upgrade, setUpgrade] = React.useState(false);
    const sortType = useSelector(selectSortType);
    const upgradeState = useSelector(selectUpgradeType);

    const handlePage = (type) => () => {
        setLoading(true);
        setUpgrade(false);
        setTimeout(() => {
            setLoading(false);
            if (type !== 'mindmap') return setUpgrade(true);
            navigate('/mindmap');
        }, 1000);
    }

    return (
        <Box component="main" className={classNames(classes.root, '')}>
            <div style={{ flex: 1 }}>
                <Modal loading={loading} />
                <UpgradeModal upgrade={upgrade} />
                <div className={classNames(classes.drawerHeader)} />
                {
                    currentPath != '/trash' && (
                        <Grid container spacing={1} style={{ cursor: 'pointer' }}>
                            <Grid item xs={12} xl={6} sm={3} md={2}>
                                <div className={classNames(classes.Item, '')}>
                                    <CustomizedMenus />
                                </div>
                            </Grid>
                            <Grid item xs={12} xl={6} sm={3} md={2} onClick={handlePage('mindmap')}>
                                <div className={classNames(classes.Item, '')}>
                                    <div style={{}}>
                                        <svg height={50} viewBox="0 0 80 60"><g fill="none" fillRule="evenodd" transform="translate(7 8)"><path stroke="#96DB0B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.467" d="M34.835 13.193l.615-2.955A7.333 7.333 0 0 1 42.63 4.4h11.637"></path><path stroke="#FA0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.467" d="M34.842 30.844l.608 2.918a7.333 7.333 0 0 0 7.18 5.838h11.637"></path><path stroke="#2BD9D9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.467" d="M31.518 13.11l-.43-2.582A7.333 7.333 0 0 0 23.854 4.4H12.467"></path><path stroke="#D01F2E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.467" d="M31.493 31.044l-.405 2.428a7.333 7.333 0 0 1-7.234 6.128H12.467"></path><path stroke="#FFD426" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.467" d="M42.088 22H63.8"></path><path stroke="#A179F2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.467" d="M2.2 22h21"></path><rect width="10" height="4" x="28" y="20" fill="#3D474D" rx="2"></rect><rect width="15" height="8.8" x="41.8" fill="#96DB0B" rx="4.4"></rect><rect width="15" height="9" x="10" fill="#2BD9D9" rx="4.5"></rect><rect width="15" height="9" x="51.333" y="17.6" fill="#FFD426" rx="4.5"></rect><rect width="15" height="9" y="17.6" fill="#A179F2" rx="4.5"></rect><rect width="14.667" height="8.8" x="41.8" y="35.2" fill="#FA0" rx="4.4"></rect><rect width="15" height="9" x="9" y="35" fill="#D01F2E" rx="4.5"></rect></g></svg>
                                    </div>
                                    <div>Mind Map</div>
                                </div>
                            </Grid>
                            <Grid item xs={12} xl={6} sm={3} md={2} onClick={handlePage('chart')}>
                                <div className={classNames(classes.Item, '')}>
                                    <div style={{}}>
                                        <svg height={50} viewBox="0 0 80 60"><g fill="none" fillRule="evenodd"><g stroke="#B2BBC0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47"><path d="M40 14v6H22a5 5 0 0 0-5 5v3m23-14v6h18a5 5 0 0 1 5 5v3M40 14v14"></path></g><path fill="#FFD426" d="M35.564 26h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#FA0" d="M58.564 26h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#96DB0B" d="M12.564 26h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#FFD426" d="M35.564 35h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#3D474D" d="M35.564 7h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54V9.563c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#FA0" d="M58.564 35h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#96DB0B" d="M12.564 35h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#FFD426" d="M35.564 44h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#FA0" d="M58.564 44h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#96DB0B" d="M12.564 44h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path></g></svg>
                                    </div>
                                    <div>Org Chart</div>
                                </div>
                            </Grid>
                            <Grid item xs={12} xl={6} sm={3} md={2} onClick={handlePage('chart')}>
                                <div className={classNames(classes.Item, '')}>
                                    <div style={{}}>
                                        <svg height={50} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60">
                                            <g fill="none" fillRule="evenodd">
                                                <path d="m10.836 21.189.614-2.951a7.333 7.333 0 0 1 7.18-5.838h11.637M10.84 38.839l.61 2.923A7.333 7.333 0 0 0 18.63 47.6h11.637M17.994 30H39.8M47.267 30l.859-4.152A7.333 7.333 0 0 1 55.307 20h3.96m-12 10 .859 4.152A7.333 7.333 0 0 0 55.307 40h3.96M43 30h17" stroke="#B2BBC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <rect fill="#D01F2E" x="4" y="28" width="10" height="4" rx="2" />
                                                <rect fill="#3D474D" x="17.8" y="8" width="15" height="8.8" rx="3" />
                                                <rect fill="#3D474D" x="27.333" y="25.6" width="15" height="9" rx="3" />
                                                <rect fill="#3D474D" x="17.8" y="43.2" width="14.667" height="8.8" rx="3" />
                                                <rect fill="#3ECB3D" x="59" y="17" width="15" height="6" rx="2" />
                                                <rect fill="#FFAB00" x="59" y="27" width="15" height="6" rx="2" />
                                                <rect fill="#8A9499" x="59" y="37" width="15" height="6" rx="2" />
                                            </g>
                                        </svg>
                                    </div>
                                    <div>Project Retrospective</div>
                                </div>
                            </Grid>
                            <Grid item xs={12} xl={6} sm={3} md={2} onClick={handlePage('chart')}>
                                <div className={classNames(classes.Item, '')}>
                                    <div style={{}}>
                                        <svg height={50} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60">
                                            <g fill="none" fillRule="evenodd">
                                                <path d="m41.845 21.143.605-2.905a7.333 7.333 0 0 1 7.18-5.838h11.637" stroke="#4070FF" strokeWidth="1.467" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="m41.846 38.863.604 2.9a7.333 7.333 0 0 0 7.18 5.837h11.637" stroke="#F7578C" strokeWidth="1.467" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="m38.516 21.097-.428-2.57a7.333 7.333 0 0 0-7.234-6.127H19.467h0" stroke="#FFD426" strokeWidth="1.467" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="m38.518 38.891-.43 2.581a7.333 7.333 0 0 1-7.234 6.128H19.467h0" stroke="#D01F2E" strokeWidth="1.467" strokeLinecap="round" strokeLinejoin="round" />
                                                <path stroke="#A179F2" strokeWidth="1.467" strokeLinecap="round" strokeLinejoin="round" d="M49.002 30H70.8" />
                                                <path stroke="#FA0" strokeWidth="1.467" strokeLinecap="round" strokeLinejoin="round" d="M9.2 30H31" />
                                                <path fill="#3D474D" d="M35 28h10v4H35z" />
                                                <path fill="#4070FF" d="M48.8 8h15v8.8h-15z" />
                                                <path fill="#FFD426" d="M17 8h15v9H17z" />
                                                <path fill="#A179F2" d="M58.333 25.6h15v9h-15z" />
                                                <path fill="#FA0" d="M7 25.6h15v9H7z" />
                                                <path fill="#F7578C" d="M48.8 43.2h14.667V52H48.8z" />
                                                <path fill="#D01F2E" d="M16 43h15v9H16z" />
                                            </g>
                                        </svg>
                                    </div>
                                    <div>Product Launch</div>
                                </div>
                            </Grid>
                            <Grid item xs={12} xl={6} sm={3} md={2} onClick={handlePage('chart')}>
                                <div className={classNames(classes.Item, '')}>
                                    <div style={{}}>
                                        <svg height={50} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60">
                                            <g fill="none" fillRule="evenodd">
                                                <path d="m41.837 21.18.613-2.942a7.333 7.333 0 0 1 7.18-5.838h11.637" stroke="#4070FF" strokeWidth="1.467" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="m41.846 38.863.604 2.9a7.333 7.333 0 0 0 7.18 5.837h11.637" stroke="#F7578C" strokeWidth="1.467" strokeLinecap="round" strokeLinejoin="round" />
                                                <path stroke="#A179F2" strokeWidth="1.467" strokeLinecap="round" strokeLinejoin="round" d="M48.983 30H70.8" />
                                                <rect fill="#3D474D" x="35" y="28" width="10" height="4" rx="2" />
                                                <rect fill="#4070FF" x="48.8" y="8" width="15" height="8.8" rx="4.4" />
                                                <rect fill="#A179F2" x="58.333" y="25.6" width="15" height="9" rx="4.5" />
                                                <rect fill="#F7578C" x="48.8" y="43.2" width="14.667" height="8.8" rx="4.4" />
                                                <g transform="matrix(-1 0 0 1 38.333 8)">
                                                    <path d="m.001 13.164.61-2.926A7.333 7.333 0 0 1 7.79 4.4h11.636" stroke="#96DB0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M5.406 16.642c2.13-.522 6.716-.736 13.754-.642" stroke="#FFD426" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M5.28 27.496c2.134.54 6.76.764 13.88.674" stroke="#FA0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="m0 30.83.61 2.932A7.333 7.333 0 0 0 7.79 39.6h11.637" stroke="#D01F2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <rect fill="#96DB0B" x="6.96" width="15" height="8.8" rx="4.4" />
                                                    <rect fill="#FFD426" x="12.494" y="11" width="15" height="9" rx="4.5" />
                                                    <rect fill="#FA0" x="12.494" y="24" width="15" height="9" rx="4.5" />
                                                    <rect fill="#D01F2E" x="6.96" y="35.2" width="14.667" height="8.8" rx="4.4" />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <div>Monthly Blog Schedule</div>
                                </div>
                            </Grid>
                        </Grid>
                    )
                }
                {
                    currentPath == '/dashboard' && (
                        sortType === 'grid' ? (
                            <Grid container spacing={3} style={{ cursor: 'pointer' }} style={{ marginTop: 10 }}>
                                {
                                    list.map((item) => {
                                        return (
                                            <MapItem key={item.title} {...item} />
                                        )
                                    })
                                }
                            </Grid>
                        ) : (
                            <div style={{ marginTop: 20 }}>
                                <div style={{ display: 'flex', backgroundColor: 'rgb(10 10 10 / 2%)', borderRadius: 20, padding: '5px 15px' }}>
                                    <div style={{ flex: 1 }}>Name</div>
                                    <div style={{ width: '100px' }}>Members</div>
                                    <div style={{ width: '230px' }}>Modified</div>
                                </div>
                                <div style={{}}>
                                    {
                                        list.map((item) => {
                                            const Item = styled('div')((theme) => ({
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: 20,
                                                padding: '15px',
                                                '&:hover': {
                                                    backgroundColor: 'rgb(10 10 10 / 2%)'
                                                }
                                            }))
                                            return (
                                                <Item key={item.title} >
                                                    <Checkbox color='primary' />
                                                    <img src={item.img} style={{ width: '70px' }} />
                                                    <div style={{ flex: 1 }}>{item.title}</div>
                                                    <div style={{ width: '100px' }}>{item.members}</div>
                                                    <div style={{ width: '200px' }}>{item.modified}</div>
                                                    <MoreMenu />
                                                </Item>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    )
                }
                {
                    currentPath == '/trash' && (
                        <TrashDiv />
                    )
                }
                {
                    currentPath == '/public' && (
                        <PublicDiv />
                    )
                }
                {
                    currentPath == '/favorites' && (
                        <FavoriteDiv />
                    )
                }
            </div>
            {
                upgradeState && (
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
        </Box>
    )
}
function MapItem(props) {
    const Item = styled('div')(({ theme, active }) => ({
        border: '1px solid rgb(0 0 0 / 9%)',
        borderRadius: 15,
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
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
    const error = [active].filter((v) => v).length !== 2;

    return (
        <Grid item xs={12} xl={6} sm={4} md={3}>
            <Item active={active ? 1 : 0}>
                <Checkbox className='active' color='primary' checked={active} onChange={handelCheckButton} name='active' />
                <div className='img'>
                    <img src={img} alt='img' style={{ height: '100%' }} />
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
        </Grid>
    )
}
function PublicDiv() {
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
function FavoriteDiv() {
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
function TrashDiv() {
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
const StyledMenu = withStyles((theme) => (
    {
        paper: {
            borderRadius: '4px',
            boxShadow: '3px 2px 10px 0px grey',
            '& ul': {
                padding: '5px 0',
            },
            '& li': {
                '& div': {
                    minWidth: 0,
                },
                '& svg': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.dark,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            }
        },

    }
))((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const useStyles = makeStyles((theme) => ({
        Button: {
            textAlign: 'center',
            fontSize: '20px',
            '&:hover': {
                boxShadow: `0px 9px 20px -4px ${theme.palette.primary.dark}`,
            },
            boxShadow: 'none',
            borderRadius: '15px',
            padding: 0,
            margin: 0,
            flexGrow: 1,
            flexShrink: 1,
            height: '100px',
            width: '100%',
        }
    }));
    const navigate = useNavigate();
    const classes = useStyles();
    return (
        <div>
            <Button
                className={classes.Button}
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                <AddIcon style={{ width: '50px', height: '50px' }} />
            </Button>
            <Menu
                id="customized-menu"
                color='primary'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={() => navigate('/mindmap')}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="New mind map" />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <InsertDriveFileIcon />
                    </ListItemIcon>
                    <ListItemText primary="New from template" />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <CreateNewFolderIcon />
                    </ListItemIcon>
                    <ListItemText primary="New folder" />
                </MenuItem>
                <Divider style={{ my: 0.5 }} />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <InputIcon />
                    </ListItemIcon>
                    <ListItemText primary="Import" />
                </MenuItem>
            </Menu>
        </div>
    );
}
export default Dashboard;

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

function MoreMenu(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ minWidth: 30 }}>
                    <Tooltip title='sort'>
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            style={{ ml: 2 }}
                            aria-controls={open ? 'sort-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </Box>
            <Menu
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id="sort-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    style: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        borderRadius: 10,
                        marginTop: 1,
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem >
                    <ListItemText primary='Open' />
                </MenuItem>
                <MenuItem >
                    <ListItemText primary='Duplicate' />
                </MenuItem>
                <MenuItem >
                    <ListItemText primary='Move to trash' />
                </MenuItem>
                <MenuItem >
                    <ListItemText primary='Move' />
                </MenuItem>
                <MenuItem >
                    <ListItemText primary='Export' />
                </MenuItem>
                <MenuItem >
                    <ListItemText primary='Information' />
                </MenuItem>
            </Menu>
        </React.Fragment >
    );
}