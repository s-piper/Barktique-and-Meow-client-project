import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import './OrderForm.css'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


// setup styles for material-ui
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 195,
    },
    textField: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    }
})); // end useStyles

function OrderForm() {

    // variable for material-ui classes
    const classes = useStyles();

    const dispatch = useDispatch();
    
    //Captures inputs
    const [order, setOrder] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState(0);
    const [email, setEmail] = useState('');
    const [image, setImage] = useState([]);
    const [notes, setNotes] = useState('');
    const [rights, setRights] = useState(false);
    const [social, setSocial] = useState(false);

    console.log('Rights', rights);
    console.log('Social', social);

    // Checks the checkboxes
    const rightsCheck = () => {
        if (rights == false) {
            setRights(true);
        } else {
            setRights(false)
        }
    }

    const socialCheck = () => {
        if (social == false) {
            setSocial(true);
        } else {
            setSocial(false)
        }
    }

    // Validates the image size and alerts yah or nah
    const validateImage = () => {
        var img = document.getElementById('imageID')
        var width = img.naturalWidth;
        var height = img.naturalHeight;
        console.log("width, height", width, height)

        var area = width * height;
        console.log("area", area);

        if (area < 2_160_000) {
            Swal.fire({
                title: "Sorry",
                text: "Please select a higher quality image",
                icon: "error"
            });

            setImage([]);
        } else {
            Swal.fire({
                title: "Looks Good!",
                text: "Our Artists will be happy!!!",
                icon: "success"
            })

        }
    }

    const checkRights = () => {
        if (rights != true) {

            Swal.fire({
                title: "Sorry",
                text: "You must own the picture",
                icon: "error"
            })

        } else {
            saveOrder();
        }
    }

    //Packages inputs for dispatch then pushes to Barktique webpage
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

        console.log("newOrder", newOrder);

        dispatch({ type: 'POST_CUSTOMER_ORDER_FORM', payload: { newOrder } });
        //Fires alert and pushes to main website
        Swal.fire({
            title: "Success",
            text: "Thank You For Your Order",
            icon: "success"
        }).then(function () {
            window.location = "https://www.barktiqueandmeow.com/";
        });

    }


    return (

        <div>

            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
            >
                {/* User Inputs */}
                <FormControl variant="outlined" className={classes.formControl}>
                    <TextField
                        onChange={(event) => setOrder(event.target.value)}
                        id="outline-basic"
                        variant="outlined"
                        label="Order Number"
                        className={classes.textField}
                        required />
                    <TextField
                        onChange={(event) => setFirstName(event.target.value)}
                        id="outline-basic"
                        variant="outlined"
                        label="First Name"
                        className={classes.textField}
                        required />
                    <TextField
                        onChange={(event) => setLastName(event.target.value)}
                        id="outline-basic"
                        variant="outlined"
                        label="Last Name"
                        className={classes.textField}
                        required />
                    <TextField
                        onChange={(event) => setPhone(event.target.value)}
                        id="outline-basic"
                        variant="outlined"
                        label="Phone Number"
                        className={classes.textField}
                        required />
                    <TextField
                        onChange={(event) => setEmail(event.target.value)}
                        id="outline-basic"
                        variant="outlined"
                        label="Email"
                        className={classes.textField}
                        required />

                    {/* Uploaded Image */}

                    <img id="imageID"
                        onLoad={validateImage}
                        src={image.file}                       
                        class="center" />

                    {/* Upload Button and State Setter*/}
                    <Button
                        className={classes.textField}
                        variant="contained"
                        color="primary"
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
                        className={classes.textField}/>

                    {/* Creates the checkboxes for social. Still needs check box logic */}
                    {/* Image Rights */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={rightsCheck}
                                className={classes.textField}
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

                    {/* Submit Button */}
                    <Button
                        className={classes.textField}
                        onClick={checkRights}
                        variant="contained"
                        size="large"
                        color="primary">
                        Submit
                    </Button>
                </FormControl>
            </Grid>
        </div>
    )
}

export default OrderForm;