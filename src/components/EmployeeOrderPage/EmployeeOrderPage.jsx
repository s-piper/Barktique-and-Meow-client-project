import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EmployeeOrderPage = () => {
    const { id } = useParams();
    const orders = useSelector((store) => store.employee); // I think this is the store with the orders in it?
    const [order, setOrder] = useState();

    useEffect(() => {
        if (id && orders?.length) {
            const foundOrder = orders.find((o) => o.order_id == id);
            setOrder(foundOrder);
        }
    }, [id, orders]);

    return (<div>
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
            <img src={order?.cus_image} style={{ height: 150, width: 150}}/>
        </div>

        <button>Error with Image</button>
        <button>Download Image</button>
        <button>Complete</button>
        <button>Download CSV</button>
        <button>Unassign Order</button>
    </div>);
};

export default EmployeeOrderPage;
