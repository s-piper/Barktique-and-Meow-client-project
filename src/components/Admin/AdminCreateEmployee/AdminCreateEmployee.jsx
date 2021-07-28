import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AdminHeader from '../AdminHeader/AdminHeader';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'

// AdminCreateEmployee function
function AdminCreateEmployee() {

    // set dispatch variable
    const dispatch = useDispatch();

    // local state for inputs
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [accessLevel, setAccessLevel] = useState(1);

    // set variable for inputs to dispatch
    const saveEmployee = () => {
        const newEmployee = {
            username: email,
            employee_first_name: firstName,
            employee_last_name: lastName,
            employee_phone_number: phone,
            password: password,
            employee_access_level: accessLevel
        }
    }
    
    return (
        <>
            <div>
                <AdminHeader />
            </div>
            <br />
            <div>
                <h2>Create Employee</h2>
            </div>
            <FormControl>
                <TextField
                    id="outline-basic"
                    variant="outlined"
                    label="Employee Email"
                    required
                    onChange={(event) => setEmail(event.target.value)}
                />
            </FormControl>
        </>
    )
} // end AdminCreateEmployee

// export AdminCreateEmployee
export default AdminCreateEmployee;