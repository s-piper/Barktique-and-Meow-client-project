import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  DataGrid,
  GridToolbar,
  GridApi,
  GridToolbarExport,
  GridToolbarContainer,
} from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';
import './orderTable.css';
import { STATUS_OPTIONS, COLORS } from './StaticData';
import { renderEditStatus } from './EmployeeOrderSelect';
import { renderStatus } from './renderStatus';
import { actionChannel } from 'redux-saga/effects';

function EmployeeOrderTable() {
  const history = useHistory();
  const dispatch = useDispatch();

  const userInfo = useSelector((store) => store.user);
  const orders = useSelector((store) => store.orders);
  const users = useSelector((store) => store.adminEmployeeInfoReducer); // Regular employees can't hit this route!
  const user = useSelector((store) => store.user); // This is the user table to show who's logged in. This is the reducer to use.

  // Create all table rows
  const orderInfoMap = orders?.map((order) => {
    order.id = order.order_id; // adding id here because material-ui REQUIRES it.
    order.fullName = `${order.cus_first_name} ${order.cus_last_name}`;
    const assignedUser = users?.find((user) => user.id == order.user_id_ref);
    if (assignedUser) {
      order.artist = `${assignedUser.employee_first_name} ${assignedUser.employee_last_name}`;
    }

    return order;
  });
  //implement validation for status on admin level(stretch)

  // claim order functions
  const ClaimOrderButton = (config) => {
    console.log(
      `This is the config from ClaimOrderButton => `,
      config.row.cus_order_number
    );
    const orderNumber = config.row.cus_order_number;
    switch (config.row.cus_progress_status) {
      case 'In Progress':
        return <Button hidden />;
      case 'Complete':
        return <Button hidden />;
      case 'Image Rejected':
        return <Button hidden />;
      default:
        return (
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginLeft: 16 }}
            onClick={() => {
              handleClaimClick(orderNumber);
            }}
          >
            ClAIM
          </Button>
        );
    }
  };

  const orderNumberHandler = (config) => {
    const orderNumber = config.row.cus_order_number; // We need to hit the route with order number, not order_id
    return (
      <div
        onClick={() => {
          handleOrderNumberClick(orderNumber); // This is how we target the order number click event!
        }}
        className="OrderNum-Nav"
      >
        {config.row.cus_order_number}
      </div>
    );
  };

  const handleOrderNumberClick = (orderNumber) => {
    // We clicked this order number
    console.log('clicked handleOrderNumberClick', orderNumber);
    console.log(`This is the param orderNumber => `, orderNumber);
    console.log(`This is the user I am => `, user.id);
    // We pushed the user that's logged in and the order number here.
    history.push(`/orderPage/${user.id}/${orderNumber}`);
  };

  const handleClaimClick = (orderNumber) => {
    console.log(`This is the order number you clicked`, orderNumber);
    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to claim this order?',
      showCancelButton: true,
      confirmButtonText: 'Claim',
      confirmButtonColor: '#000000',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Order number to push to next page => `, orderNumber);
        const startOrder = {
          cus_order_isStarted: true,
          cus_progress_status: 'In Progress',
          cus_order_number: orderNumber,
          id: user.id,
        };

        console.log(`The order we are starting => `, startOrder);

        dispatch({
          type: "START_ORDER_BUTTON",
          payload: {
            data: startOrder,
          },
        });

        history.push(`/orderPage/${user.id}/${startOrder.cus_order_number}`);
      }
    });
  };

  //csv export toolbar
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport csvOptions={{ allColumns: true }} />
      </GridToolbarContainer>
    );
  };
  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_PRODUCT_ORDERS' });
  }, []);

  useEffect(() => {
    dispatch({ type: 'FETCH_EMPLOYEES_FROM_SERVER' });
  }, []);

  //data grid table

  const columns = [
    {
      field: 'order_id',
      headerName: 'Claim Order',
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: ClaimOrderButton,
    },
    {
      field: 'cus_order_number',
      headerName: 'Order #',
      width: 180,
      disableClickEventBubbling: true,
      renderCell: orderNumberHandler,
    },
    { field: 'fullName', headerName: 'Customer', width: 150 },
    { field: 'artist', headerName: 'Employee', width: 150 },
    {
      field: 'cus_progress_status',
      headerName: 'Status',
      width: 150,
      type: 'singleSelect',
      editable: false,
      valueOptions: STATUS_OPTIONS,
      renderCell: renderStatus,
      renderEditCell: renderEditStatus,
      type: 'singleSelect',
    },
  ];

  return (
    <>
      <section>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <div style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={orderInfoMap ?? []}
                columns={columns}
                pageSize={10}
                components={{
                  Toolbar: CustomToolbar,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EmployeeOrderTable;
