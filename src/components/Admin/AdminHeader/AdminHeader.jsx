import './AdminHeader.css';
import AdminCreateButton from '../AdminCreateButton/AdminCreateButton';

function AdminHeader() {
    return (
        <div>
            <header className="admin-header">
                <div className="admin-logo">
                    <img 
                        className="admin_bark_logo"
                        src="./images/Barktique-and-meow-logo-final-color.png" 
                    />
                </div>
            </header>
        </div>
    )
} // end AdminHeader

// export AdminHeader
export default AdminHeader;