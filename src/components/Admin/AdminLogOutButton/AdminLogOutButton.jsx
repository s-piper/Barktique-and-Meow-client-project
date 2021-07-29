import React from 'react';
import { useDispatch } from 'react-redux';

// material-ui imports
import Button from '@material-ui/core/Button';

// AdminLogOutButton component function
function AdminLogOutButton(props) {

    // set dispatch variable
    const dispatch = useDispatch();

    return (
        <Button
            size="medium"
            variant="contained"
            color="primary"
            className={props.className}
            onClick={() => dispatch({ type: 'LOGOUT' })}
        >
            Admin Log Out
        </Button>
    )
} // end AdminLogOutButton

// export AdminLogOutButton
export default AdminLogOutButton;