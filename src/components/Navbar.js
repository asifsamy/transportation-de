import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-item nav-link active" exact to='/'>Home</NavLink>
                        <NavLink className="nav-item nav-link active" exact to='/favorites'>My Favorites</NavLink>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar