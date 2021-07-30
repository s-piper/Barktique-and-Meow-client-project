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
import Swal from 'sweetalert2'
import Button from "@material-ui/core/Button";
import { STATUS_OPTIONS, COLORS } from "./StaticData";
import { renderEditStatus } from "./EmployeeOrderSelect";
import { renderStatus } from "./renderStatus";
function EmployeeOrderTable() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [startOrder, setStartOrder] = useState({
    cus_order_isStarted: true,
    cus_progress_status: "In Progress",
    cus_order_number: "order_id",
    id: "foundUser",
  });
  const userInfo = useSelector((store) => store.user)
  const employeeInfo = useSelector((store) => store.employee);
  const adminEmployeeInfo = useSelector(
    (store) => store.adminEmployeeInfoReducer
  );
  const orderInfoMap = employeeInfo?.map((value) => {
    value.id = value.order_id;
    
    value.fullName = value.cus_first_name + " " + value.cus_last_name;
    const foundUser = adminEmployeeInfo?.find((adminEmployee) => {
      adminEmployee.id == value.id;
    });
    if (foundUser) {
      value.artist =
        foundUser.employee_first_name + " " + foundUser.employee_last_name;
      value.employeeId = foundUser.id; //not working
    }
    return value;
  });
  //implement validation for status on admin level
  //cus_progress_status,cus_order_isStarted
  //const customChips = chip switch statement by started, blue outline, inProgress orange outline, complete green outline, image Rejected red outline
  //cell clickable = true double click to pop up menu to change status
  // status cell handlers

  // claim order functions
  const ClaimOrderButton = () => {
    return (
      <Button
        variant="outlined"
        color="secondary"
        style={{ marginLeft: 16 }}
        onClick={handleClaimClick}
      >
        ClAIM
      </Button>
    );
  };
  const handleClaimClick = (event) => {
    event.preventDefault();
    console.log("clicked Claim", adminEmployeeInfo);
    dispatch({
      type: "START_ORDER_BUTTON",
      payload: startOrder,
    });
    history.push("/orderpage");
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
    dispatch({ type: 'FETCH_EMPLOYEES_FROM_SERVER'})
  },[]);

  //data grid table

  const columns = [
    {
      field: "",
      headerName: "Claim Order",
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: ClaimOrderButton,
    },

    { field: "order_id", headerName: "ID", width: 100 },
    { field: "cus_order_number", headerName: "Order #", width: 180 },
    { field: "fullName", headerName: "Customer", width: 150 },
    { field: "artist", headerName: "Employee", width: 150 },
    { field: "employeeId", headerName: "Employee ID", width: 150 },
    {
      field: "cus_progress_status",
      headerName: "Status",
      width: 150,
      type: "singleSelect",
      editable: false,
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
