import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';


import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';



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
    },
    input: {
        display: 'none',
    },
}));





const EmployeeOrderPage = () => {
    const { id } = useParams();
    const orders = useSelector((store) => store.orders); // I think this is the store with the orders in it?
    const [order, setOrder] = useState();
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if (id && orders?.length) {
            const foundOrder = orders.find((o) => o.order_id == id);
            setOrder(foundOrder);
        }
    }, [id, orders]);

    //Sends Error Package to Saga
    //Data is error status, order number, user id
    const imageError = () => {

        const data = {
            cus_error_image: true,
            cus_order_number: order?.cus_order_number,
            id: order?.user_id_ref,
        }

        dispatch({ type: 'IMAGE_ERROR_BUTTON', payload: { data } });
    }

    //Sends Complete Notification to Saga
    //Data is status, order number, user id
    const setComplete = () => {

       const data = {

            cus_progress_status: 'Complete',
            cus_order_number: order?.cus_order_number,
            id: order?.user_id_ref
        }

        dispatch({ type: 'PRODUCT_ORDER_COMPLETE_BUTTON', payload: { data } });
    }
    const downloadImage = (event) => {
        fetch(order?.cus_image)
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = `Order ${order?.cus_order_number}`;
                    a.click();
                });;
        });
    }
    return (

        <div>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center">

                <div id="orderNumber">
                    <p>Order Number: {order?.cus_order_number}</p>
                </div>
                <div id="fullName">
                    <p>Name: {order ? order.cus_first_name + ' ' + order.cus_last_name : ''}</p>
                </div>
                <div id="phone">
                    <p>Phone: {order?.cus_phone_number}</p>
                </div>
                <div id="email">
                    <p>Email: {order?.cus_email}</p>
                </div>
                <div id="note">
                    <p>Note: {order?.cus_notes}</p>
                </div>
                <div id="image">
                    <img src={order?.cus_image} style={{ height: 150, width: 150 }} />
                </div>

                <Button 
                    onClick={event => downloadImage(event)}
                    className={classes.button}
                    variant="contained"
                    color="primary">
                    
                    Download Image
                </Button>

                <Button onClick={imageError}
                    className={classes.button}
                    variant="contained"
                    color="primary">
                    Error with Image
                </Button>

                <Button onClick={setComplete}
                    className={classes.button}
                    variant="contained"
                    color="primary">
                    Complete
                </Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary">
                    Download CSV
                </Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary">
                    Unassign Order
                </Button>

            </Grid>
        </div>
    );
};

export default EmployeeOrderPage;
