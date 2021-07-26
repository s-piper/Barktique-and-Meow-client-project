import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './RegisterForm.css';

// Material-ui imports
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    padding: 20,
    height: '100vh',
    width: 225,
    margin: '100px auto',
    paddingTop: theme.spacing(3),
  },
  avatarStyling: {
    backgroundColor: '#3f51b5',
  },
  textFieldBox: {
    margin: '5px auto',
    backgroundColor: 'white',
  },
  signInButton: {
    margin: '5px auto',
    backgroundColor: '#3f51b5',
    color: 'white',
  },
  signUpButton: {
    display: 'relative',
    position: 'fixed',
    width: '225px',
    margin: '100px -225px',
    backgroundColor: '#3f51b5',
    color: 'white',
  },
  quickSignIn: {
    color: 'white',
  },
}));

function RegisterForm() {
  // Custom CSS
  const classes = useStyles();
  // Bring in history
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessLevel, setAccessLevel] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        accessLevel: accessLevel,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber
      },
    });
  }; // end registerUser

  return (
    <>
      <div className="area">
        <ul className="circles">
          <Grid className={classes.root}>
            <Paper elevation={10} className={classes.paperStyle}>
              <Grid align="center">
                <Avatar className={classes.avatarStyling}></Avatar>
                <h4>Register</h4>
              </Grid>
              {errors.registrationMessage && (
                <h3 className="alert" role="alert">
                  {errors.registrationMessage}
                </h3>
              )}
              <TextField
                className={classes.textFieldBox}
                fullWidth
                label="Email"
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter Email"
                required
                value={username}
                variant="outlined"
              />
              <TextField
                className={classes.textFieldBox}
                fullWidth
                label="Password"
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Enter Password"
                required
                value={password}
                variant="outlined"
              />
              <TextField
                className={classes.textFieldBox}
                fullWidth
                label="Access Level"
                onChange={(event) => setAccessLevel(event.target.value)}
                placeholder="Access Level"
                required
                value={accessLevel}
                variant="outlined"
              />
              <TextField
                className={classes.textFieldBox}
                fullWidth
                label="First Name"
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="First Name"
                required
                value={firstName}
                variant="outlined"
              />
              <TextField
                className={classes.textFieldBox}
                fullWidth
                label="Last Name"
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Last Name"
                required
                value={lastName}
                variant="outlined"
              />
              <TextField
                className={classes.textFieldBox}
                fullWidth
                label="Phone Number"
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="Phone Number"
                required
                value={phoneNumber}
                variant="outlined"
              />

              <Button
                className={classes.signInButton}
                fullWidth
                onClick={registerUser}
                value="Register"
              >
                Sign Me Up
              </Button>
              <Button
                className={classes.signUpButton}
                fullWidth
                onClick={() => {
                  history.push('/login');
                }}
              >
                Back to login
              </Button>
            </Paper>
          </Grid>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}

export default RegisterForm;
