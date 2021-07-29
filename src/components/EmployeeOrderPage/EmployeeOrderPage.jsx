import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import EmployeeOrderQueue from "./EmployeeOrderQueue/EmployeeOrderQueue";


function EmployeeOrderPage () {

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


    return(
        <>
        <EmployeeOrderQueue/>
        </>
    )

}


export default EmployeeOrderPage