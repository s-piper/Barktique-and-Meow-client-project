import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  DataGrid,
  GridToolbar,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import moment from "moment";
import { Button } from "@material-ui/core/Button";
import { STATUS_OPTIONS, COLORS } from "./StaticData";
import { renderEditStatus } from "./EmployeeOrderSelect";
import { renderStatus } from "./renderStatus";
function EmployeeOrderQueue() {
  const history = useHistory();
  const dispatch = useDispatch();
  const employeeInfo = useSelector((store) => store.employee);
  const adminEmployeeInfo = useSelector((store) => store.adminEmployeeInfoReducer);
  const orderInfoMap = employeeInfo?.map((value) => {
    value.id = value.order_id;
    value.fullName = value.cus_first_name + " " + value.cus_last_name;
    const foundUser = adminEmployeeInfo?.find((adminEmployee) => {
      adminEmployee.id == value.user_id_ref;
    });
    if(foundUser){
    value.artist =
      foundUser.employee_first_name + " " + foundUser.employee_last_name;
    }
    return value;
  });
   //implement vailidation for status on admin level 
  //cus_progress_status,cus_order_isStarted
  //const customChips = chip switch statement by started, blue outline, inProgress orange outline, complete green outline, image Rejected red outline
  //cell clickable = true double click to pop up menu to change status
  // status cell handlers

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

  //data grid table

  const columns = [
    { field: "order_id", headerName: "ID", width: 100 },
    { field: "cus_order_number", headerName: "Order #", width: 180 },
    { field: "fullName", headerName: "Customer", width: 150 },
    { field: "artist", headerName: "Employee", width: 150 },
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

export default EmployeeOrderQueue;
