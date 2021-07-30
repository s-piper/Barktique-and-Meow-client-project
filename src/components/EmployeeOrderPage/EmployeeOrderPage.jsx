import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import EmployeeOrderQueue from "./EmployeeOrderQueue/EmployeeOrderQueue";
import { renderEditStatus } from "./EmployeeOrderQueue/EmployeeOrderSelect";

function EmployeeOrderPage () {

    const history = useHistory();
    const dispatch = useDispatch();




    return(
        <>
        <EmployeeOrderQueue/>
        </>
    )

}


export default EmployeeOrderPage