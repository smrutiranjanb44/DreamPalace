import { React, useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../context/auth-context'
import './NavLinks.css'

const NavLinks = props => {
    const auth = useContext(AuthContext)
    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>Dreamers</NavLink>
        </li>
        {auth.isLoggedIn && (
            <li>
                <NavLink to={`/${auth.userId}/dreams`} exact>My Dreams</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <NavLink to="/dreams/new" exact>Add Dream</NavLink>
            </li>
        )}
        {!auth.isLoggedIn && (
            <li>
                <NavLink to="auth" exact>Authnticate</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <button onClick={auth.logout}>LogOut</button>
            </li>
        )

        }
    </ul>
}

export default NavLinks