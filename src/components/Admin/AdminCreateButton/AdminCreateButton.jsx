import React from 'react';
import { useHistory } from 'react-router-dom';

// function for create employee button
function AdminCreateButton() {
    
    // set useHistory variable
    const history = useHistory();

    return (
        <div>
            <button
                onClick={() => {
                    history.push('/createEmployee');
                }}
            >
                Create Employee
            </button>
        </div>
    )
} // end AdminCreateButton

// export AdminCreateButton
export default AdminCreateButton;