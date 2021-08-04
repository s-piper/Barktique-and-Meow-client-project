import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Admin.css';

import AdminHeader from './AdminHeader/AdminHeader';
import AdminCreateButton from './AdminCreateButton/AdminCreateButton';
import AdminLogOutButton from './AdminLogOutButton/AdminLogOutButton';
import AdminTabs from './AdminTabs/AdminTabs';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    marginTop: 20,
  },
}));

// function for Admin component
function Admin() {
  // Bring some style in here
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  return (
    <div>
      <section>
        <div>
          <AdminHeader />
        </div>
        <Grid
          className={classes.buttonGroup}
          container
          direction="row"
          justifyContent="space-around"
        >
          <AdminCreateButton />
          <AdminLogOutButton />
        </Grid>
      </section>
      <section>
          <h2>{`Welcome`}</h2>
          <h3>{`${user.employee_first_name} ${user.employee_last_name}`}</h3>
        <div>
          <AdminTabs />
        </div>
      </section>
    </div>
  );
}

// export Admin
export default Admin;
