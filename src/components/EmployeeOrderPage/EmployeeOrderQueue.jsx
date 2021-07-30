import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import EmployeeOrderTable from "./EmployeeOrderQueue/EmployeeOrderTable";
import { renderEditStatus } from "./EmployeeOrderQueue/EmployeeOrderSelect";
import LogOutButton from "../LogOutButton/LogOutButton";
import EmployeeHeader from "../EmployeeHeader/EmployeeHeader";
function EmployeeOrderQueue() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <EmployeeHeader />
      </div>
      <EmployeeOrderTable />
      <div>
          <LogOutButton/>
      </div>
    </>
  );
}

export default EmployeeOrderQueue;
