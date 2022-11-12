import React from "react";
import Item from '../atoms/MenuItem.jsx'

const Menu = ({items}) => {
    return <>
        {items.map(({url, name}) => <Item url={url} name={name}/>)}
    </>
}

export default Menu