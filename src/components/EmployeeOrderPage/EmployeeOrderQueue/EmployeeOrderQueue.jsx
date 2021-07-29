import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { DataGrid, GridToolbar, GridToolbarExport, GridToolbarContainer } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment'
import { Button } from "@material-ui/core/Button";
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import { STATUS_OPTIONS, COLORS } from "./StaticData";

function EmployeeOrderQueue(){
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const employee = useSelector ((store) => store.employeeReducer.employee) 
    const user = useSelector((store) => store.userReducer)
    useEffect(() => {
        dispatch({ type: "FETCH_EMPLOYEE"})
    }, []);

    useEffect(() => {
        dispatch({ type: "FETCH_USER"})
    }, []);

    const fullName = "employee.cus_first_name " + "employee.cus_last_name"
    const employeeFullName = "user.first_name " + "user.last_name"
    const chipStatusArray = []
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
      }
    //data grid table
    
    const columns = [
    {field: "cus_order_number", headerName: "Order #", width: 180},
    {field: fullName, headerName: "Customer", width: 150},
    {field: employeeFullName, headerName: "Employee", width: 150},
    {field: "cus_progress_status", 
    headerName: "Status", 
    width: 150, 
    type: 'singleSelect', 
    editable: true,
    valueOptions: STATUS_OPTIONS,
    renderCell: renderStatus,
    renderEditCell: renderEditStatus,
    type: 'singleSelect',
                    

                        },
    
    ]

    return(
        <>
        <section>
        <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
        <div style={{ height: 500, width: "100%" }}>
       <DataGrid
       rows={employee}
       columns={columns} 
       components ={{
           Toolbar: CustomToolbar,
       }}
       />
       </div>
       </div>
       </div>
       </section>
       
       </>
    )

}

export default EmployeeOrderQueue;