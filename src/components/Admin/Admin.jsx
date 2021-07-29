import React from 'react';
import './Admin.css';
import AdminHeader from './AdminHeader/AdminHeader';
import AdminCreateButton from './AdminCreateButton/AdminCreateButton';
import AdminLogOutButton from './AdminLogOutButton/AdminLogOutButton';

// material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

// function for Admin component
function Admin() {

    const classes = useStyles();

    return (
        <div>
            <div>
                <AdminHeader />
            </div>
            <div className="admin-button-align">
                <div className="admin-buttons">
                    <AdminCreateButton />
                </div>
                <div className="admin-buttons">
                    <AdminLogOutButton />
                </div>
            </div>
            <div>
                <h2>Admin Page</h2>
            </div>
            <Paper className={classes.root}>
      <Tabs
        // value={value}
        // onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Orders" />
        <Tab label="Issues" />
        <Tab label="Artists" />
      </Tabs>
    </Paper>
        </div>
    )
}

// export Admin
export default Admin;