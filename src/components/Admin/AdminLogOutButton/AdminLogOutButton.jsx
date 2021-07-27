import React from 'react';
import { useDispatch } from 'react-redux';

function AdminLogOutButton(props) {

    // set dispatch variable
    const dispatch = useDispatch();

    return (
        <button
            className={props.className}
            onClick={() => dispatch({ type: 'LOGOUT' })}
        >
            Admin Log Out
        </button>
    )
} // end AdminLogOutButton

// export AdminLogOutButton
export default AdminLogOutButton;