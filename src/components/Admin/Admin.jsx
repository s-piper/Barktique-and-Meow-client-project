import React from 'react';
import './Admin.css';
import AdminHeader from './AdminHeader/AdminHeader';
import AdminCreateButton from './AdminCreateButton/AdminCreateButton';
import AdminLogOutButton from './AdminLogOutButton/AdminLogOutButton';

// function for Admin component
function Admin() {
    return (
        <div>
            <div>
                <AdminHeader />
            </div>
            <div className="admin-button-align">
                <div className="admin-buttons">
                    <AdminCreateButton />
                </div>
                <div className="admin-buttons">
                    <AdminLogOutButton />
                </div>
            </div>
            <div>
                <h2>Admin Page</h2>
            </div>
        </div>
    )
}

// export Admin
export default Admin;