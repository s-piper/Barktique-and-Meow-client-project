import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AdminHeader from '../AdminHeader/AdminHeader';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


// AdminCreateEmployee function
function AdminCreateEmployee() {

    // set dispatch variable
    const dispatch = useDispatch();

    // local state for inputs
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState(0);
    const [password, setPassword] = useState('');
    const [accessLevel, setAccessLevel] = useState(0);

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

        // console log to see captured data
        console.log('New Employee is:', newEmployee);
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
                <TextField
                    id="outline-basic"
                    variant="outlined"
                    label="First Name"
                    required
                    onChange={(event) => setFirstName(event.target.value)}
                />
                <TextField
                    id="outline-basic"
                    variant="outlined"
                    label="Last Name"
                    required
                    onChange={(event) => setLastName(event.target.value)}
                />
                <TextField
                    id="outline-basic"
                    variant="outlined"
                    label="Phone Number"
                    required
                    onChange={(event) => setPhone(event.target.value)}
                />
                <TextField
                    id="outline-basic"
                    variant="outlined"
                    label="Password"
                    required
                    onChange={(event) => setPassword(event.target.value)}
                />
                <FormControl variant="outlined">
                    <InputLabel>Access Level</InputLabel>
                    <Select
                        defaultValue={accessLevel}
                        label="Access Level"
                        required
                        onChange={(event) => setAccessLevel(event.target.value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Artist</MenuItem>
                        <MenuItem value={2}>Admin</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={saveEmployee}
                >
                    Add Employee
                </Button>
            </FormControl>
        </>
    )
} // end AdminCreateEmployee

// export AdminCreateEmployee
export default AdminCreateEmployee;