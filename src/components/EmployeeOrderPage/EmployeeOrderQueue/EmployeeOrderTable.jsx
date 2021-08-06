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
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';
import './orderTable.css';
import { STATUS_OPTIONS, COLORS } from './StaticData';
import { renderEditStatus } from './EmployeeOrderSelect';
import { renderStatus } from './renderStatus';
import { actionChannel } from 'redux-saga/effects';
import { QuickSearchToolbar, escapeRegExp } from './SearchBar';

function EmployeeOrderTable() {
  const history = useHistory();
  const dispatch = useDispatch();

  const userInfo = useSelector((store) => store.user);
  const orders = useSelector((store) => store.orders);
  // const users = useSelector((store) => store.adminEmployeeInfoReducer); // Regular employees can't hit this route!
  const user = useSelector((store) => store.user); // This is the user table to show who's logged in. This is the reducer to use.
  const ordersState = useSelector((store) => store.ordersState);
  // Create all table rows
  const orderInfoMap = orders?.map((order) => {
    // adding id here because material-ui REQUIRES it.
    order.id = order.order_id;
    order.fullName = `${order.cus_first_name} ${order.cus_last_name}`;
    return order;
  });

  // claim order functions
  const ClaimOrderButton = (config) => {
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

  const nameHandler = (config) => {
    const orderNumber = config.row.cus_order_number; // We need to hit the route with order number, not order_id
    return (
      <div
        onClick={() => {
          handleOrderNumberClick(orderNumber); // This is how we target the order number click event!
        }}
        className="OrderNum-Nav"
      >
        {config.row.cus_first_name} {config.row.cus_last_name}
      </div>
    );
  };

  const employeeHandler = (config) => {
    const orderNumber = config.row.cus_order_number; // We need to hit the route with order number, not order_id
    return (
      <>
        <div
          onClick={() => {
            handleOrderNumberClick(orderNumber); // This is how we target the order number click event!
          }}
          className="OrderNum-Nav"
        >
          {config.row.employee_full_name}
        </div>
      </>
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
          type: 'START_ORDER_BUTTON',
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
    {
      field: 'fullName',
      headerName: 'Customer',
      width: 150,
      renderCell: nameHandler,
    },
    {
      field: 'employee_full_name',
      headerName: 'Employee',
      width: 150,
      renderCell: employeeHandler,
    },
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

  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState(orderInfoMap);
  const [loading, setLoading] = useState(true);

  const requestSearch = (searchValue) => {
    console.log(`This is searchText >`, searchText);
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    console.log(`This is rows > `, rows);
    const filteredRows = rows.filter((row) => {
      console.log(`inside of filteredRows`, row);
      return Object.keys(row).some((field) => {
        console.log(`inside of field `, field);
        if (row[field] !== null) {
          return searchRegex.test(row[field].toString());
        }
      });
    });
    setRows(filteredRows);
    if (searchValue.length == 0) {
      setRows(orderInfoMap);
    }
  };

  useEffect(() => {
    setRows(orderInfoMap);
  }, [ordersState]);

  return (
    <>
      {!ordersState ? (
        ''
      ) : (
        <section>
          {orders.length == 0 ? (
            <center>
              <p>You Don't have any orders yet.</p>
            </center>
          ) : (
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{ height: 500, width: '100%' }}>
                  <DataGrid
                    rows={rows ?? []}
                    columns={columns}
                    pageSize={10}
                    components={{
                      Toolbar: CustomToolbar,
                      Toolbar: QuickSearchToolbar,
                    }}
                    componentsProps={{
                      toolbar: {
                        value: searchText,
                        onChange: (event) => requestSearch(event.target.value),
                        clearSearch: () => requestSearch(''),
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default EmployeeOrderTable;
