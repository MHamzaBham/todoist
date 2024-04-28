import React from "react";
import { Link } from "react-router-dom";
import Logo from '../Assets/logo.svg'

export default function NonAuthNav() {

    const loginNavStyle = {
        textAlign: 'center',
        height: '70px',
        backgroundColor: '#ff7f50'
    }

    return (
        <>
            <>

                <nav style={ loginNavStyle} className="login-nav">

                    <div className="logo-container" style={{}}>
                        <img src={Logo}></img>
                    </div>

                </nav>

            </>
        </>
    )
}