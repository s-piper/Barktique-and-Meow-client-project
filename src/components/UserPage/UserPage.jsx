import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();

  const adminPush = () => {
    if (user?.employee_access_level > 1) {
      history.push('/admin');
    } else {
      history.push('/employee');
    }
  };

  const employeePush = () => {};
  return (
    <>
      {user?.employee_access_level > 1 ? (
        <Link to="/admin">Admins</Link>
      ) : (
        <Link to="/employee">Employees</Link>
      )}
      {/* <div onLoad={() => adminPush()}>Redirecting</div> */}
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
