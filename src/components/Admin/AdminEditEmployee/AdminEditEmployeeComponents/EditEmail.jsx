import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Material-ui Imports
import TextField from '@material-ui/core/TextField';

import Swal from 'sweetalert2';

export const EmployeeEmail = ({ adminSingleEmpInfo, classes, useStyles }) => {
  useStyles();

  // Bring in dispatch
  const dispatch = useDispatch();
  // Function to check for valid email address.
  function validateEmail(email) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  const handleEmail = async () => {
    const { value: email } = await Swal.fire({
      title: 'Email',
      input: 'email',
      inputValue: adminSingleEmpInfo[0]?.username,
      showCancelButton: true,
      allowOutsideClick: true,
      allowEnterKey: true,
      backdrop: true,
      confirmButtonColor: '#000000',
      inputValidator: (value) => {
        if (!validateEmail(value)) {
          console.log(value);
          return 'Need a Valid Email Address!';
        }
      },
    });

    const data = {
      id: adminSingleEmpInfo[0].id,
      username: email,
    };
    // email shows message showing name change.
    if (email) {
      Swal.fire({
        text: `Email Changed to ${email}`,
      });
      // Dispatch Users email and their id to Saga.
      dispatch({
        type: 'UPDATE_EMPLOYEE_EMAIL',
        payload: { data },
      });
      // Show Updated name after User changes name.
      dispatch({
        type: 'FETCH_INDIVIDUAL_EMPLOYEE',
        payload: adminSingleEmpInfo[0].id,
      });
    }
  };

  return (
    <>
      <TextField
        className={classes.textStyling}
        fullWidth
        required
        placeholder="Email"
        onClick={handleEmail}
        value={adminSingleEmpInfo[0]?.username}
      />
    </>
  );
};
