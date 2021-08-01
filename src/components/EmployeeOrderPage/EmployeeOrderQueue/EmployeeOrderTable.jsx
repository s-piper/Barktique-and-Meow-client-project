import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  DataGrid,
  GridToolbar,
  GridApi,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Swal from "sweetalert2";
import Button from "@material-ui/core/Button";
import { STATUS_OPTIONS, COLORS } from "./StaticData";
import { renderEditStatus } from "./EmployeeOrderSelect";
import { renderStatus } from "./renderStatus";
function EmployeeOrderTable() {
  const history = useHistory();
  const dispatch = useDispatch();

  const userInfo = useSelector((store) => store.user);
  const orders = useSelector((store) => store.orders);
  const users = useSelector((store) => store.adminEmployeeInfoReducer);

  //create all table rows
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
    const orderId = config.value;
    return (
      <Button
        variant="outlined"
        color="secondary"
        style={{ marginLeft: 16 }}
        onClick={() => {
          handleClaimClick(orderId);
        }}
      >
        ClAIM
      </Button>
    );
  };

  const handleClaimClick = (orderId) => {
    Swal.fire({
      icon: "question",
      title: "Are you sure you want to claim this order?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Claim",
      denyButtonText: `Don't Claim`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (orderId && orders?.length) {
          console.log(orderId);
          console.log(orders);
          const foundOrder = orders.find((o) => o.order_id === orderId);

          if (foundOrder) {
            const startOrder = {
              cus_order_isStarted: true,
              cus_progress_status: "In Progress",
              cus_order_number: foundOrder.cus_order_number,
              id: userInfo.id,
            };

            dispatch({
              type: "START_ORDER_BUTTON",
              payload: {
                data: startOrder,
              },
            });

            history.push(`/orderpage/${orderId}`);
            Swal.fire("Order Claimed!", "", "success");
          } else {
            Swal.fire("Failure!", "We've lost track of the order...", "error");
          }
        } else {
          Swal.fire("Failure!", "We've lost track of the orders...", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Claim Canceled");
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
    dispatch({ type: "FETCH_ALL_PRODUCT_ORDERS" });
  }, []);

  useEffect(() => {
    dispatch({ type: "FETCH_EMPLOYEES_FROM_SERVER" });
  }, []);

  //data grid table

  const columns = [
    {
      field: "order_id",
      headerName: "Claim Order",
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: ClaimOrderButton,
    },
    { field: "cus_order_number", headerName: "Order #", width: 180 },
    { field: "fullName", headerName: "Customer", width: 150 },
    { field: "artist", headerName: "Employee", width: 150 },
    { field: "user_id_ref", headerName: "Employee ID", width: 150 },
    {
      field: "cus_progress_status",
      headerName: "Status",
      width: 150,
      type: "singleSelect",
      editable: true,
      valueOptions: STATUS_OPTIONS,
      renderCell: renderStatus,
      renderEditCell: renderEditStatus,
      type: "singleSelect",
    },
  ];

  return (
    <>
      <section>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <div style={{ height: 500, width: "100%" }}>
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
