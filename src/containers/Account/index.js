import * as React from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Tab,
  Tabs,
  Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import General from './General';
import Password from './Password';
import Settings from './Settings';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(5, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`account-tabpanel-${index}`}
      aria-labelledby={`account-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `account-tab-${index}`,
    'aria-controls': `account-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box component="main" className={classNames(classes.root, '')}>
      <div className={classNames(classes.drawerHeader)} />
      <Box style={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered variant="fullWidth" aria-label="account tabs">
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Password & Email" wrapped {...a11yProps(1)} />
          <Tab label="Time & Language" wrapped {...a11yProps(2)} />
          <Tab label="Connected Accounts" wrapped {...a11yProps(3)} />
          <Tab label="Policies" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <General />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Password />
      </TabPanel>
      <TabPanel value={value} index={2}>
      </TabPanel>
      <TabPanel value={value} index={3}>
      </TabPanel>
      <TabPanel value={value} index={4}>
      </TabPanel>
      <Outlet />
    </Box>
  );
}
