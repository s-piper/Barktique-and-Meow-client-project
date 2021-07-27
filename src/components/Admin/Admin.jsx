import React from 'react';
import EmployeeHeader from '../EmployeeHeader/EmployeeHeader';
import AdminHeader from './AdminHeader/AdminHeader';

// function for Admin component
function Admin() {
    return (
        <div>
            <div>
                <AdminHeader />
            </div>
            <div>
                <h2>Admin Page</h2>
            </div>
        </div>
    )
}

// export Admin
export default Admin;