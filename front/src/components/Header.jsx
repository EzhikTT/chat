import React from "react";
import avatar from '../assets/avatar.png'

const Header = ({children}) => {
    return <header>
        <img src={avatar}/>
        <div>User name</div>
        {children}
    </header>
}

export default Header