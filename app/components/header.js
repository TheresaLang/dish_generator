import React from "react"
import logo from '../images/logo_small.jpg'

function Header() {
    return (
        <div className="header">
            <div>
                <img src={logo} alt="Logo" className="logo"/>
            </div>
        </div>
    )
}

export default Header
