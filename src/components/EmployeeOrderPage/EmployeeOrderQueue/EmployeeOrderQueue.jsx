import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';

import EmployeeOrderTable from './EmployeeOrderTable';
import LogOutButton from '../../LogOutButton/LogOutButton';
import EmployeeHeader from '../../EmployeeHeader/EmployeeHeader';
import AdminHeader from '../../Admin/AdminHeader/AdminHeader';
import AdminLogOutButton from '../../Admin/AdminLogOutButton/AdminLogOutButton';

function EmployeeOrderQueue() {
  const history = useHistory();
  const dispatch = useDispatch();
  const ordersState = useSelector((store) => store.ordersState);
  const user = useSelector((store) => store.user);

  // const wereWaiting = () => {};

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_PRODUCT_ORDERS' });
    console.log(`What's our order state => `, ordersState);
  }, [ordersState]);
  return (
    <>
      {user?.employee_access_level > 1 ? (
        <Redirect to="/admin" />
      ) : (
        <>
          {!ordersState ? (
            ''
          ) : (
            <>
              <AdminHeader />
              <AdminLogOutButton />
              <div>
                <EmployeeOrderTable />
              </div>
            </>
          )}
        </>
      )}
      {/* {!ordersState ? (
        ''
      ) : (
        <>
          <AdminHeader />
          <AdminLogOutButton />
          <div>
            <EmployeeOrderTable />
          </div>
        </>
      )} */}
    </>
  );
}

export default EmployeeOrderQueue;
