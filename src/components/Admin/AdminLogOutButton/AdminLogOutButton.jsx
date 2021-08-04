import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// material-ui imports
import Button from '@material-ui/core/Button';

// AdminLogOutButton component function
function AdminLogOutButton(props) {
  const history = useHistory();
  // set dispatch variable
  const dispatch = useDispatch();

  const logoutHistoryPush = () => {
    history.push('/login');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <Button
      size="medium"
      variant="contained"
      color="primary"
      className={props.className}
      onClick={logoutHistoryPush}
    >
      LogOut
    </Button>
  );
} // end AdminLogOutButton

// export AdminLogOutButton
export default AdminLogOutButton;
