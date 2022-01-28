import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Grid,
    Checkbox,
} from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/styles';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Explorer from './Explorer';
import PublicDiv from './PublicDiv';
import FavoriteDiv from './FavoriteDiv';
import TrashDiv from './TrashDiv';
import UpgradeDiv from './UpgradeDiv';
import { Modal, UpgradeModal } from './Modal';
import { CustomizedMenus, MoreMenu } from './Menu';
import style from './style';
import { actionInsertFolder } from 'store/actions';
import { selectSortType, selectUpgradeType, selectFolder } from 'store/selectors';

const useStyles = makeStyles(style);

const Dashboard = () => {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentPath = location.pathname;

    const [loading, setLoading] = React.useState(false);
    const [upgrade, setUpgrade] = React.useState(false);
    const sortType = useSelector(selectSortType);
    const upgradeState = useSelector(selectUpgradeType);
    const { title } = useSelector(selectFolder);

    const handleDisplay = (type) => () => {
        setLoading(true);
        setUpgrade(false);
        setTimeout(() => {
            setLoading(false);
            if (type !== 'mindmap') return setUpgrade(true);
            navigate('/mindmap');
        }, 1000);
    }
    const onNewFolder = () => {
        dispatch(actionInsertFolder('NewFolder', title));
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
                                    <CustomizedMenus onNewFolder={onNewFolder}/>
                                </div>
                            </Grid>
                            <Grid item xs={12} xl={6} sm={3} md={2} onClick={handleDisplay('mindmap')}>
                                <div className={classNames(classes.Item, '')}>
                                    <div style={{}}>
                                        <svg height={50} viewBox="0 0 80 60"><g fill="none" fillRule="evenodd" transform="translate(7 8)"><path stroke="#96DB0B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.467" d="M34.835 13.193l.615-2.955A7.333 7.333 0 0 1 42.63 4.4h11.637"></path><path stroke="#FA0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.467" d="M34.842 30.844l.608 2.918a7.333 7.333 0 0 0 7.18 5.838h11.637"></path><path stroke="#2BD9D9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.467" d="M31.518 13.11l-.43-2.582A7.333 7.333 0 0 0 23.854 4.4H12.467"></path><path stroke="#D01F2E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.467" d="M31.493 31.044l-.405 2.428a7.333 7.333 0 0 1-7.234 6.128H12.467"></path><path stroke="#FFD426" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.467" d="M42.088 22H63.8"></path><path stroke="#A179F2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.467" d="M2.2 22h21"></path><rect width="10" height="4" x="28" y="20" fill="#3D474D" rx="2"></rect><rect width="15" height="8.8" x="41.8" fill="#96DB0B" rx="4.4"></rect><rect width="15" height="9" x="10" fill="#2BD9D9" rx="4.5"></rect><rect width="15" height="9" x="51.333" y="17.6" fill="#FFD426" rx="4.5"></rect><rect width="15" height="9" y="17.6" fill="#A179F2" rx="4.5"></rect><rect width="14.667" height="8.8" x="41.8" y="35.2" fill="#FA0" rx="4.4"></rect><rect width="15" height="9" x="9" y="35" fill="#D01F2E" rx="4.5"></rect></g></svg>
                                    </div>
                                    <div>Mind Map</div>
                                </div>
                            </Grid>
                            <Grid item xs={12} xl={6} sm={3} md={2} onClick={handleDisplay('chart')}>
                                <div className={classNames(classes.Item, '')}>
                                    <div style={{}}>
                                        <svg height={50} viewBox="0 0 80 60"><g fill="none" fillRule="evenodd"><g stroke="#B2BBC0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47"><path d="M40 14v6H22a5 5 0 0 0-5 5v3m23-14v6h18a5 5 0 0 1 5 5v3M40 14v14"></path></g><path fill="#FFD426" d="M35.564 26h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#FA0" d="M58.564 26h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#96DB0B" d="M12.564 26h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#FFD426" d="M35.564 35h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#3D474D" d="M35.564 7h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54V9.563c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#FA0" d="M58.564 35h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#96DB0B" d="M12.564 35h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#FFD426" d="M35.564 44h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#FA0" d="M58.564 44h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path><path fill="#96DB0B" d="M12.564 44h8.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v1.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267h-8.873c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 0 1-.757-.756c-.174-.326-.267-.65-.267-1.54v-1.873c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"></path></g></svg>
                                    </div>
                                    <div>Org Chart</div>
                                </div>
                            </Grid>
                            <Grid item xs={12} xl={6} sm={3} md={2} onClick={handleDisplay('chart')}>
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
                            <Grid item xs={12} xl={6} sm={3} md={2} onClick={handleDisplay('chart')}>
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
                            <Grid item xs={12} xl={6} sm={3} md={2} onClick={handleDisplay('chart')}>
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
                            <Explorer />
                        ) : (
                            <>
                            </>
                            // <div style={{ marginTop: 20 }}>
                            //     <div style={{ display: 'flex', backgroundColor: 'rgb(10 10 10 / 2%)', borderRadius: 20, padding: '5px 15px' }}>
                            //         <div style={{ flex: 1 }}>Name</div>
                            //         <div style={{ width: '100px' }}>Members</div>
                            //         <div style={{ width: '230px' }}>Modified</div>
                            //     </div>
                            //     <div style={{}}>
                            //         {
                            //             mapList.map((item) => {
                            //                 const Item = styled('div')((theme) => ({
                            //                     display: 'flex',
                            //                     alignItems: 'center',
                            //                     borderRadius: 20,
                            //                     padding: '15px',
                            //                     '&:hover': {
                            //                         backgroundColor: 'rgb(10 10 10 / 2%)'
                            //                     }
                            //                 }))
                            //                 return (
                            //                     <Item key={item.title} >
                            //                         <Checkbox color='primary' />
                            //                         <img src={item.img} style={{ width: '70px' }} />
                            //                         <div style={{ flex: 1 }}>{item.title}</div>
                            //                         <div style={{ width: '100px' }}>{item.members}</div>
                            //                         <div style={{ width: '200px' }}>{item.modified}</div>
                            //                         <MoreMenu />
                            //                     </Item>
                            //                 )
                            //             })
                            //         }
                            //     </div>
                            // </div>
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
                    <UpgradeDiv />
                )
            }
        </Box>
    )
}
export default Dashboard;
