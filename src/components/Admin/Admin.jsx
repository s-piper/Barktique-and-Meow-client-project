import React from 'react';
import './Admin.css';

import AdminHeader from './AdminHeader/AdminHeader';
import AdminCreateButton from './AdminCreateButton/AdminCreateButton';
import AdminLogOutButton from './AdminLogOutButton/AdminLogOutButton';
// import AdminArtistTable from './AdminArtistTable/AdminArtistTable';

// material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AppBar } from '@material-ui/core';
import AdminArtistTable from './AdminArtistTable/AdminArtistTable';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

// function for Admin component
function Admin() {

    // set material-ui classes variable
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
                <h2>Admin</h2>
            </div>
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Orders" />
                        <Tab label="Issues" />
                        <Tab label="Artists" />
                    </Tabs>
                </AppBar>
            </div>
        </div>
    )
}

// export Admin
export default Admin;