import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import { Notes } from '@material-ui/icons';

function OrderForm() {

    const dispatch = useDispatch();

    const[order, setOrder]=useState('');
    const[firstName, setFirstName]=useState('');
    const[lastName, setLastName]=useState('');
    const[phone, setPhone]=useState(0);
    const[email, setEmail]=useState('');
    const[image, setImage]=useState([]);
    const[notes, setNotes]=useState('');


//Packages inputs for dispatch
    const saveOrder = () => {
        const newOrder={
            cus_order_number: order,
            cus_first_name: firstName,
            cus_last_name: lastName,
            cus_phone_number: phone,
            cus_email: email,
            cus_image: image,
            cus_notes: notes,
        }

        dispatch({type: 'ADD_ORDER', payload:newOrder})
        
    }


    return (

        <div className={classes.root}>

            <FormControl>
                <TextField
                    onChange="do something"
                    id="outline-basic"
                    variant="outlined"
                    label="Order Number"
                    required />
                <TextField
                    onChange="do something"
                    id="outline-basic"
                    variant="outlined"
                    label="First Name"
                    required />
                <TextField
                    onChange="do something"
                    id="outline-basic"
                    variant="outlined"
                    label="Last Name"
                    required />
                <TextField
                    onChange="do something"
                    id="outline-basic"
                    variant="outlined"
                    label="Phone Number"
                    required />
                <TextField
                    onChange="do something"
                    id="outline-basic"
                    variant="outlined"
                    label="Email"
                    required />

           

            </FormControl>

        </div>
    )
}

export default OrderForm;