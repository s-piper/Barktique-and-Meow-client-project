import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AdminHeader from '../AdminHeader/AdminHeader';

// material-ui imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

// Component imports for employee
import {EmployeeEmail} from './AdminEditEmployeeComponents/EditEmail'

// setup styles for material-ui
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 195,
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
})); // end useStyles

// AdminCreateEmployee function
function AdminEditEmployee() {
  // variable for material-ui classes
  const classes = useStyles();

  const params = useParams();
  // set dispatch variable
  const dispatch = useDispatch();
  const history = useHistory();

  const adminSingleEmpInfo = useSelector((store) => store.adminSingleEmpInfo);


  const handleBackButton = () => {
    console.log('Clicked AdminDashboard button');
    history.push('/admin');
  };

  // function to handle dropdown selection and set Access Level
  const handleSelect = (event) => {
    event.preventDefault();

    // set local state to value (1 or 2) selected by user
    setAccessLevel(event.target.value);
  }; // end handleSelect

  useEffect(() => {
    dispatch({ type: 'FETCH_INDIVIDUAL_EMPLOYEE', payload: params.id });
  }, []);

  return (
    <>
      <div>
        <AdminHeader />
      </div>
      <div className="admin-dashboard-btn">
        <Button variant="contained" color="primary" onClick={handleBackButton}>
          Admin Dashboard
        </Button>
      </div>
      <br />
      <div>
        <h2>Create Artist</h2>
      </div>

      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item>
          <EmployeeEmail
            classes={classes}
            useStyles={useStyles}
            adminSingleEmpInfo={adminSingleEmpInfo}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="First Name"
            className={classes.textField}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="Last Name"
            required
            className={classes.textField}
            onChange={(event) => setLastName(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="Phone Number"
            required
            className={classes.textField}
            onChange={(event) => setPhone(event.target.value)}
          />
        </Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
} // end AdminCreateEmployee

// export AdminCreateEmployee
export default AdminEditEmployee;
