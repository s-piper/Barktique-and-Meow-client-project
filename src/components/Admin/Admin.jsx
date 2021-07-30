import React, { useState } from 'react';
import './Admin.css';

import AdminHeader from './AdminHeader/AdminHeader';
import AdminCreateButton from './AdminCreateButton/AdminCreateButton';
import AdminLogOutButton from './AdminLogOutButton/AdminLogOutButton';
import AdminTabs from './AdminTabs/AdminTabs';

// function for Admin component
function Admin() {

    return (
        <div>
            <section>
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
            </section>
            <section>
                <div>
                    <h2>Admin</h2>
                </div>
                <div>
                    <AdminTabs />
                </div>
            </section>


        </div>
    )
}

// export Admin
export default Admin;