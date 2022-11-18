import React from "react";
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom'
import { setPage } from "../../store/settings";
import '../../style/atoms/menuItem.css'

const Item = ({url, name}) => {
    const dispatch = useDispatch()

    return <div className="menu-item">
        {/* <Link to={url}>{name}</Link> */}
        <a href="#" onClick={() => dispatch(setPage(url))}>{name}</a>
    </div>
}

export default Item