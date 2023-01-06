import React from 'react';
import { Link ,useNavigate  } from "react-router-dom";

const AdminNavbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div className="dropdown">
                            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-list"></i>
                                <span className="ml-2">Menu</span>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <Link className="dropdown-item" to="/admin/user-role/read" >Role</Link>
                                <Link className="dropdown-item" to="/admin/group/read" >Group </Link>
                                <Link className="dropdown-item" to="/admin/chart">Statitics Page</Link>
                                <Link className="dropdown-item" to="/">Home</Link>
                            </div>
                        </div>
                    </li>
                   
                </ul>
            </nav>
        </>
    )
}

export default AdminNavbar;