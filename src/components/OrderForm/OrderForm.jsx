import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'

function OrderForm() {

    const dispatch = useDispatch();

    const [order, setOrder] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState(0);
    const [email, setEmail] = useState('');
    const [image, setImage] = useState([]);
    const [notes, setNotes] = useState('');
    const [rights, setRights] = useState(false);
    const [social, setSocial] = useState(false);



    //Packages inputs for dispatch
    const saveOrder = () => {
        const newOrder = {
            cus_order_number: order,
            cus_first_name: firstName,
            cus_last_name: lastName,
            cus_phone_number: phone,
            cus_email: email,
            cus_image: image,
            cus_notes: notes,
            cus_image_owner_rights: rights,
            cus_social_permission: social,
        }

        dispatch({ type: 'ADD_ORDER', payload: newOrder })

    }

    console.log('Rights', rights);
    console.log('Social', social);

    const rightsCheck = () => {
        if(rights==false) {
            setRights(true);
        } else {
            setRights(false)
        }
    }

    const socialCheck = () => {
        if(social==false) {
            setSocial(true);
        } else {
            setSocial(false)
        }
    }

    


    return (

        <div>
            {/* User Inputs */}
            <FormControl>
                <TextField
                    onChange={(event) => setOrder(event.target.value)}
                    id="outline-basic"
                    variant="outlined"
                    label="Order Number"
                    required />
                <TextField
                    onChange={(event) => setFirstName(event.target.value)}
                    id="outline-basic"
                    variant="outlined"
                    label="First Name"
                    required />
                <TextField
                    onChange={(event) => setLastName(event.target.value)}
                    id="outline-basic"
                    variant="outlined"
                    label="Last Name"
                    required />
                <TextField
                    onChange={(event) => setPhone(event.target.value)}
                    id="outline-basic"
                    variant="outlined"
                    label="Phone Number"
                    required />
                <TextField
                    onChange={(event) => setEmail(event.target.value)}
                    id="outline-basic"
                    variant="outlined"
                    label="Email"
                    required />

                {/* Upload Button and Iframe */}
                <iframe src={image.file} height="250px" width="350px" />

                <Button
                    variant="contained"
                    component="label">
                    Upload Picture
                    <input
                        onChange={(event) => setImage({ file: URL.createObjectURL(event.target.files[0]) })}
                        type="file"
                        hidden />
                </Button>

                <TextField
                    onChange={(event) => setNotes(event.target.value)}
                    id="outline-basic"
                    variant="outlined"
                    label="Notes"
                    required />

                {/* Creates the checkboxes for social. Still needs check box logic */}
                {/* Image Rights */}
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={rightsCheck}
                            color="primary" />
                    }
                    label="Yes, I own the rights to the image I am submitting and I give permission to Barktique + Meow 
                    to use the file in order to produce the product"/>
                {/* Social Permission */}
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={socialCheck}
                            color="primary" />
                    }
                    label="Yes, I give permission to Barktique + Meow to use my pet photo on their social media and website"
                />

                <Button 
                    onClick="DO SOMETHING"
                    variant="outlined" 
                    size="large" 
                    color="primary">
                    Submit
                </Button>
            </FormControl>

        </div>
    )
}

export default OrderForm;