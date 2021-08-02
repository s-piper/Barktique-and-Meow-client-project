import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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

    useEffect(() => {
        if (id && orders?.length) {
            const foundOrder = orders.find((o) => o.order_id == id);
            setOrder(foundOrder);
        }
    }, [id, orders]);

    return (

        <div>
            <Grid>
                <div id="orderNumber">
                    {order?.cus_order_number}
                </div>
                <div id="fullName">
                    {order ? order.cus_first_name + ' ' + order.cus_last_name : ''}
                </div>
                <div id="phone">
                    {order?.cus_phone_number}
                </div>
                <div id="email">
                    {order?.cus_email}
                </div>
                <div id="note">
                    {order?.cus_notes}
                </div>
                <div id="image">
                    <img src={order?.cus_image} style={{ height: 150, width: 150 }} />
                </div>

                <Button>Error with Image</Button>
                <Button>
                    <a href={order?.cus_image} download> </a>
                    Download Image
                </Button>
                <Button>Complete</Button>
                <Button>Download CSV</Button>
                <Button>Unassign Order</Button>

            </Grid>
        </div>
    );
};

export default EmployeeOrderPage;
