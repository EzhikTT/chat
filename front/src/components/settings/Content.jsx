import React from "react";
import { useSelector } from "react-redux";
import Interface from "./Interface.jsx";
import Notifications from "./Notifications.jsx";
import Personal from "./Personal.jsx";

const Content = () => {
    const page = useSelector(({settings}) => settings.page)

    switch(page){
        case 'interface':
            return <Interface/>
        case 'notifications':
            return <Notifications/>
        case 'personal':
        default: 
            return <Personal/>
    }
}

export default Content